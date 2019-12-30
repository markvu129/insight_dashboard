const express = require('express');
const bodyParser = require('body-parser');
const fetch = require("node-fetch");
const fs = require('fs');
const cron = require("node-cron");
const Utils = require("./utils/Utils");
const compression = require('compression');

// Get the env variables
const ENV = process.env['NODE_ENV'] || 'development';

const MongoClient = require("mongodb").MongoClient;
const DBCONFIG_DEV = require('./server/load_db_config');
const DATABASE_URI = DBCONFIG_DEV.mongoDb.mongoClient;
const DATABASE_NAME = 'insights';
let database, collection;

const app = express();
// compress all responses
app.use(compression())
// tell the app to look for static files in these directories
app.use(express.static('./client/static/'));
app.use(express.static('./client/dist/'));
// tell the app to parse HTTP body messages
app.use(bodyParser.json());

// routes
// const apiRoutes = require('./server/routes/api');
// app.use('/api', apiRoutes);

// Get fb_graph_api_access_token
let rawdata =  JSON.parse(fs.readFileSync('fb_graph_api.json'));
let fetchCurrentAccessToken = function(){
    return rawdata.fb_graph_api.currentAccessToken;
};
let fetchPageAccessToken = function(){
  return rawdata.fb_graph_api.pageAccessToken;
};
let writeNewAccessToken = function(token){
  rawdata.fb_graph_api.currentAccessToken = token;
  rawdata.fb_graph_api.updatedAt = new Date();
  fs.writeFileSync('fb_graph_api.json', JSON.stringify(rawdata));
};

// Fetch IG User Id
let fetchIgUserId = function() {
  return rawdata.ig_graph_api.userId;
};

// Fetching FB graph api
const fetchFbData = async(uri, media) => {
  let data, token;
  if (media === 'facebook'){
    token = fetchCurrentAccessToken()
  }
  else if (media === 'instagram'){
    token = fetchPageAccessToken();
  }
  try {
    const result = await fetch(uri + "&access_token=" + token);
    data = await result.json();
    // If access token expires, fetch new token
    if ('error' in data && data.error.code === 190) {
      const fetchNewToken = await fetch("https://graph.facebook.com/v5.0/862708063775607?fields=access_token&access_token=" + fetchPageAccessToken());
      let newToken = await fetchNewToken.json();
      const new_result = await fetch(uri + "&access_token=" + newToken.access_token);
      data = await new_result.json();
      writeNewAccessToken(newToken.access_token);
    }
    return data;
  }
  catch (e) {
    console.log("HTTP error");
    throw (e);
  }
};

const writeDataToDB = async(data) => {
  try {
    collection.insert(data, (error, result) => {
      if(error) {
      }
    });
    return (data);
  }
  catch (error) {
    console.log("Write error");
    throw (e);
  }
};

// Utils
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
  MongoClient.connect(DATABASE_URI, { useNewUrlParser: true }, (error, client) => {
    if(error) {
      throw error;
    }
    database = client.db(DATABASE_NAME);
    console.log("Connected to `" + DATABASE_NAME + "`!");
  });
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//API routes
app.get("/api/info/fb/:period", (request, response) => {
  switch (request.params.period) {
    case 'day':
      collection = database.collection('daily_overview');
    case 'month':
      collection = database.collection('monthly_overview');
    default:
      collection = database.collection('daily_overview');
  }
  try {
    collection.find({}).toArray((error, result) => {
      if(error) {
        return response.status(500).send(error);
      }
      response.send(result);
    });
  }
  catch(e){
    console.log(e);
  }
});

app.get("/api/info/fb/:by_period/:year/:type/:source/:limit", (request, response) => {
  let by_period = request.params.by_period;
  if (by_period === "month"){
    collection = database.collection('monthly_overview');
  }
  else if (by_period === 'day'){
    collection = database.collection('daily_overview');
  }
  else if (by_period === 'week'){
    collection = database.collection('weekly_overview');
  }

  let filter;
  if (request.params.source === "all"){
    filter = {
      'year': parseInt(request.params.year),
      'type': [request.params.type]
    };
  }
  else {
    filter = {
      'year': parseInt(request.params.year),
      'type': [request.params.type],
      'source': request.params.source
    };
  }

  try {
    collection.find(filter).limit(parseInt(request.params.limit)).sort({updatedAt: -1}).toArray((error, result) => {
      if(error) {
        return response.status(500).send(error);
      }
      response.send(result);
    });
  }
  catch(e){
    console.log(e);
  }
});

// Retrieve and add fb page data by range of days
app.post("/api/info/fb/:by_period/range/:since/:until/:metric", async (request, response) => {
  let metric = request.params.metric;
  let by_period = request.params.by_period;
  if (by_period === 'month'){
    collection = database.collection('monthly_overview');
  }
  else if (by_period === "day") {
    collection = database.collection('daily_overview');
  }
  else if (by_period === "week") {
    collection = database.collection('weekly_overview');
  }

  let since = request.params.since;
  let until = request.params.until;
  let period = {'since': since, 'until': until};

  // Fetch data from fb graph api
  let data;
  let uri = "https://graph.facebook.com/v5.0/862708063775607/insights?&since=" + period.since + '&until=' + period.until + "&metric=" + metric ;
  data = await fetchFbData(uri, 'facebook');

  // Get requested metric from list of result and aggregate result if requested by month
  const list_of_requested_metric = data.data.find(x => x.name == metric).values;
  if (by_period === 'month' || by_period === 'week'){
    const aggregate = list_of_requested_metric.reduce(function(prev, cur) {
      return prev + cur.value;
    }, 0);
    data = aggregate;
  }
  // if period is by day, filter out only daily data
  else {
    data = data.data.filter(function (x){return x.period === by_period});
  }

  // Build mongo data set
  let current_date = new Date();
  // Calculate since day
  if(by_period === 'week'){
    since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  }
  else {
    since = new Date()
  }
  let dataToDb = {
    'stats': [{'name': metric, 'stats': data, 'month': monthNames[since.getMonth()], 'year': since.getFullYear()}],
    'period': by_period,
    'year': current_date.getFullYear(),
    'type': [metric],
    'source': 'facebook',
    'updatedAt': current_date
  };
  await writeDataToDB(dataToDb);
  response.send('success');
});

// Retrieve and add top 3 posts from fb page
app.post("/api/info/fb/posts/:metric", async (request, response) => {
  let metric = request.params.metric;
  collection = database.collection('fb_posts');
  let uri = "https://graph.facebook.com/v5.0/862708063775607/posts?fields=insights.metric(" + metric + ")";
  let result = await fetchFbData(uri, 'facebook');

  // Select top 3 posts
  let data = Utils.getTopThreeFromArray(result.data);

  // Build data set
  let current_date = new Date();
  let dataToDb = {
    'stats': {'name': 'top_posts', 'stats': data},
    'year': current_date.getFullYear(),
    'type': [metric],
    'source': 'facebook',
    'month': current_date.getMonth(),
    'updatedAt': current_date
  };
  await writeDataToDB(dataToDb);
  response.send('success');
});

// Retrieve and add top 3 ig media posts
app.post("/api/info/ig/posts/:hash_tag_id/:metric", async (request, response) => {
  collection = database.collection('ig_posts');
  let hashTagId = request.params.hash_tag_id;
  let metric = request.params.metric;
  let uri = "https://graph.facebook.com/"+ hashTagId + "/top_media?user_id=" + fetchIgUserId() + "&fields=" + metric;
  let result = await fetchFbData(uri, 'instagram');

  // Select top 3 posts
  let data = Utils.getTopThreeFromArray(result.data);

  // Build mongo data set
  let current_date = new Date();
  let dataToDb = {
    'stats': {'name': 'top_posts', 'stats': data},
    'year': current_date.getFullYear(),
    'type': [metric],
    'source': "instagram",
    'month': current_date.getMonth(),
    'updatedAt': current_date
  };
  await writeDataToDB(dataToDb);
  response.send('success');
});

// Fetch fb top posts from db
app.get("/api/info/:media_type/posts/top/:year/:limit", async (request, response) => {
  if(request.params.media_type === 'fb'){
    collection = database.collection('fb_posts');
  }
  else if (request.params.media_type === 'ig'){
    collection = database.collection('ig_posts');
  }

  let filter = {
    'year': parseInt(request.params.year)
  };

  try {
    collection.find(filter).limit(parseInt(request.params.limit)).sort({updatedAt: -1}).toArray((error, result) => {
      if(error) {
        return response.status(500).send(error);
      }
      response.send(result);
    });
  }
  catch(e){
    console.log(e);
  }
});


// Cron scheduler
const fetchDailyData = async (metric) => {
  collection = database.collection('daily_overview');
  let period = {'period': 'day'};
  const data = await fetchFbData(period, "&metric=" + metric);
  let date = new Date();
  let dataToDb = {
    'stats': data.data,
    'period': 'day',
    'year': date.getFullYear(),
    'type': metric.split(","),
    'updatedAt': date
  };
  await writeDataToDB(dataToDb);
};

// Schedule cron to fetch daily fb data every 12 hour
// let daily_task = cron.schedule("0 */12 * * *", () => {
//   let metric = "page_views_total,page_impressions,page_engaged_users,page_actions_post_reactions_like_total,page_total_actions,page_video_views,page_posts_impressions,post_video_avg_time_watched,post_video_complete_views_organic,post_video_views_unique"
//   console.log(`every 12 hour, got new data`);
//   fetchDailyData(metric);
// });
// daily_task.start();



module.exports = {collection};