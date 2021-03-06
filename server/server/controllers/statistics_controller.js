const Collection = require('../models/mongo_config');
const statisticsController = {};


statisticsController.getAllStatistics = function (req, res) {
    Collection.collection.find({}).toArray((error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
};

module.exports = statisticsController;

