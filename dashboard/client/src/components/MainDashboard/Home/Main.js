import React, {Component} from 'react';
import TrafficChart from "../Home/TrafficChart.js";
import InteractionChart from "../Home/InteractionChart.js";
import DailyView from "../Home/DailyImpression";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="content">
        <div className="container-fluid">

          <div className="row">

            <div className="col-lg-2 col-xs-6">
              <div className="panel panel-filled">
                <DailyView/>
              </div>
            </div>
            <div className="col-lg-2 col-xs-6">
              <div className="panel panel-filled">
                <div className="panel-body">
                  <h2 className="m-b-none">
                    140 <span className="slight"><i className="fa fa-play fa-rotate-90 c-white"> </i> 5%</span>
                  </h2>

                  <div className="small">Daily impressions</div>
                  <div className="slight m-t-sm">
                    <div className="section-breakdown"><i className="fa fa-facebook-f"> </i> Facebook: <span
                      className="c-white">510</span></div>
                    <div className="section-breakdown"><i className="fa fa-instagram"> </i> Instagram: <span
                      className="c-white">512</span></div>
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

                  <div className="small">Daily interactions</div>

                  <div className="slight m-t-sm">
                    <div className="section-breakdown"><i className="fa fa-thumbs-up"> </i> Likes: <span
                      className="c-white">11</span></div>
                    <div className="section-breakdown"><i className="fa fa-comment"> </i> Comments: <span
                      className="c-white">11</span></div>
                    <div className="section-breakdown"><i className="fa fa-clock-o"> </i> Updated: <span
                      className="c-white">05:42pm</span></div>

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
                        Total number of views across Facebook and Instagram
                      </div>

                      <div className="sparkline3">
                        <TrafficChart/>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <small className="stat-label">Today </small>
                          <h4 className="m-t-xs">170,20 <i className="fa fa-level-up text-warning"></i></h4>
                        </div>
                        <div className="col-md-4">
                          <small className="stat-label">Last week </small>
                          <h4 className="m-t-xs">20,20 <i className="fa fa-level-down c-white"></i></h4>
                        </div>
                        <div className="col-md-4">
                          <small className="stat-label">Last month  </small>
                          <h4 className="m-t-xs">2180,50 <i className="fa fa-level-up text-warning"></i></h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="panel-body">
                      <div className="text-center slight">
                      </div>

                      <div className="flot-chart">
                        <div className="flot-chart-content" id="flot-line-chart">
                          <InteractionChart/>
                        </div>
                      </div>

                      <div className="small text-center">All positive feedback (likes/comments/shares) from last month</div>
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
                      <th>Time</th>
                      <th>Likes</th>
                      <th>Comments</th>
                      <th>Shares</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Abraham</td>
                      <td>076 9477 4896</td>
                      <td>294-318</td>
                      <td>294-318</td>
                      <td>294-318</td>
                      <td>Vosselaar</td>
                      <td>5</td>
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
                    1500 views
                  </h2>
                  <small>New views from the last month.</small>
                  <br/>
                  243 <span className="slight"><i className="fa fa-play fa-rotate-270 c-white"> </i> +6%</span>

                  <div className="sparkline7 m-t-xs"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    )
  }
}

export default Main;
