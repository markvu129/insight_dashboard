import React, {Component} from 'react';
import FbTrafficInsight from "../Facebook/FbTrafficInsight";
import FbInteractionInsight from "../Facebook/FbInteractionInsight";
import FbVideoTopicInsight from "../Facebook/FbVideoTopicInsight";
import FbVisitorInsight from "../Facebook/FbVisitorInsight";
import axios from "axios";

class FbInsight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topPosts: []
    };
    this.fetchTopPosts = this.fetchTopPosts.bind(this);
    this.renderTopPosts = this.renderTopPosts.bind(this);
  }

  fetchTopPosts(){
    let uri = "https://api.thehotzebra.site/api/info/fb/posts/top/" + new Date().getFullYear() + '/1';
    axios.get(uri)
      .then(response => {
        this.setState({
         topPosts: response.data[0].stats.stats
        })
      })
      .catch(err => console.log(err))
  }

  renderTopPosts(){
    if(this.state.topPosts.length > 0){
      return this.state.topPosts.map((post, index) => {
        let id = post.id.split('_')[1];
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>Facebook</td>
            <td>Video</td>
            <td>{post.insights.data[0].values[0].value}</td>
            <td>{post.insights.data[1].values[0].value}</td>
            <td>{post.insights.data[2].values[0].value}</td>
          </tr>
        )
      })
    }
    else {
      return (<div></div>)
    }
  }

  componentDidMount() {
    this.fetchTopPosts();
  }

  render(){
    return(
      <section className="content">
        <div className="container-fluid">

          <div className="row">

            <div className="col-lg-2 col-xs-6">
              <div className="panel panel-filled">

                <div className="panel-body">
                  <h2 className="m-b-none">
                    206 <span className="slight"><i className="fa fa-play fa-rotate-270 text-warning"> </i> +20%</span>
                  </h2>

                  <div className="small">Daily views</div>
                  <div className="slight m-t-sm"><i className="fa fa-clock-o"> </i> Updated: <span
                    className="c-white">10:22pm</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-xs-6">
              <div className="panel panel-filled">
                <div className="panel-body">
                  <h2 className="m-b-none">
                    140 <span className="slight"><i className="fa fa-play fa-rotate-90 c-white"> </i> 5%</span>
                  </h2>

                  <div className="small">Impressions</div>
                  <div className="slight m-t-sm">
                    <div className="section-breakdown"><i className="fa fa-money"> </i> Paid: <span
                      className="c-white">120</span></div>
                    <div className="section-breakdown"><i className="fa fa-users"> </i> Organic: <span
                      className="c-white">20</span></div>
                    <div className="section-breakdown"><i className="fa fa-clock-o"> </i> Updated: <span
                      className="c-white">9:10am</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-xs-6">
              <div className="panel panel-filled">
                <div className="panel-body">
                  <h2 className="m-b-none">
                    262 <span className="slight"><i className="fa fa-play fa-rotate-270 text-warning"> </i> +56%</span>
                  </h2>

                  <div className="small">Post interactions</div>
                  <div className="slight m-t-sm"><i className="fa fa-clock-o"> </i> Updated: <span
                    className="c-white">05:42pm</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-xs-12">
              <div className="panel panel-filled panel-visitor">
                <div className="visitor-chart">
                  <FbVisitorInsight height={80}/>
                </div>
                <div className="panel-body">
                  <div className="m-t-sm">
                    <div className="pull-right">
                      <a href="#" className="btn btn-default btn-xs">See locations</a>
                    </div>
                    <div className="c-white"><span className="label label-accent">+45</span> New visits</div>
                    <span className="small c-white">1444 <i className="fa fa-play fa-rotate-270 text-warning"> </i> -22%</span>
                    <br/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="panel">
                <div className="row">
                  <div className="col-md-4">

                    <div className="panel-body h-200 list">
                      <div className="stats-title">
                        <h4><i className="fa fa-bar-chart text-warning" aria-hidden="true"></i> Traffic source</h4>
                      </div>
                      <div className="small">
                        Total number of daily views across different countries
                      </div>

                      <div className="sparkline3">
                        <FbTrafficInsight/>
                      </div>

                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="panel-body">
                      <div className="text-center slight">
                      </div>

                      <div className="flot-chart">
                        <div className="flot-chart-content" id="flot-line-chart">
                          <FbInteractionInsight/>
                        </div>
                      </div>

                      <div className="small text-center" style={{'marginTop':'50px'}}>All active likes/comments from last month</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="panel panel-filled">
                <div className="panel-body">
                  <h4>Top 3 posts</h4>
                  <table className="table table-responsive-sm">
                    <thead>
                    <tr>
                      <th>ID</th>
                      <th>Source</th>
                      <th>Type</th>
                      <th>Impressions</th>
                      <th>Likes</th>
                      <th>Video views</th>
                    </tr>
                    </thead>
                    <tbody>
                      {this.renderTopPosts()}

                    </tbody>
                  </table>
                </div>
                <div className="panel-body">
                  <h4>Top videos</h4>
                  <table className="table table-responsive-sm">
                    <thead>
                    <tr>
                      <th>Id</th>
                      <th>Country</th>
                      <th>Paid views</th>
                      <th>Organic views</th>
                      <th>Complete view 30 secs</th>
                      <th>Click to play</th>
                      <th>Avg time watch</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <id>2555358131189851</id>
                      <td>Vietnam</td>
                      <td>102</td>
                      <td>56</td>
                      <td>45</td>
                      <td>158</td>
                      <td>0:14</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="panel panel-b-accent">
                <div className="panel-body text-center p-m">
                  <h2 className="font-light">
                    280k post views
                  </h2>
                  <small>New views from the last month.</small>
                  <br/>
                  120,312 <span className="slight"><i className="fa fa-play fa-rotate-270 c-white"> </i> -22%</span>

                  <div className="sparkline7 m-t-xs"></div>
                </div>
              </div>
              <div className="panel panel-b-accent">
                <div className="panel-body text-center p-m">
                  <h2 className="font-light">
                    300 video views
                  </h2>
                  <small>New views from the last month.</small>
                  <br/>
                  12 <span className="slight"><i className="fa fa-play fa-rotate-270 c-white"> </i> -22%</span>

                  <div className="sparkline7 m-t-xs"></div>
                </div>
              </div>
              <div className="panel-body">
                <FbVideoTopicInsight/>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

}

export default FbInsight;
