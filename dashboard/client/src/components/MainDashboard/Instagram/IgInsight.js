import React, {Component} from 'react';
import FbVisitorInsight from "../Facebook/FbVisitorInsight";
import IgInteractionInsight from "../Instagram/IgInteractionInsight";
import TrafficChart from "../Home/TrafficChart";
import axios from "axios";


class IgInsight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topPosts: []
    };
    this.fetchTopPosts = this.fetchTopPosts.bind(this);
    this.renderTopPosts = this.renderTopPosts.bind(this);
  }

  fetchTopPosts(){
    let uri = "https://api.thehotzebra.site/api/info/ig/posts/top/" + new Date().getFullYear() + '/1';
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
        let id = post.id;
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>Image</td>
            <td>{post.like_count}</td>
            <td>{post.comments_count}</td>
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


  render() {
    return (
      <section className="content">
        <div className="container-fluid">

          <div className="row">

            <div className="col-lg-2 col-xs-6">
              <div className="panel panel-filled">
                <div className="panel-body">
                  <h2 className="m-b-none">
                    206 <span className="slight"><i className="fa fa-play fa-rotate-270 text-warning"> </i> +20%</span>
                  </h2>

                  <div className="small">Reach</div>
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
                    34 <span className="slight"><i className="fa fa-play fa-rotate-90 c-white"> </i> 5%</span>
                  </h2>

                  <div className="small">Impressions</div>
                  <div className="slight m-t-sm">
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
                    33 <span className="slight"><i className="fa fa-play fa-rotate-270 text-warning"> </i> -27%</span>
                  </h2>

                  <div className="small">Post interactions</div>
                  <div className="slight m-t-sm"><i className="fa fa-clock-o"> </i> Updated: <span
                    className="c-white">05:42pm</span>
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

                  <div className="small">Mentions</div>
                  <div className="slight m-t-sm"><i className="fa fa-clock-o"> </i> Updated: <span
                    className="c-white">05:42pm</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-xs-12">
              <div className="panel panel-filled panel-visitor">
                <div className="visitor-chart">
                  <span className="sparkline">
                    <FbVisitorInsight/>
                  </span>
                </div>
                <div className="panel-body">
                  <div className="m-t-sm">
                    <div className="pull-right">
                      <a href="#" className="btn btn-default btn-xs">See locations</a>
                    </div>
                    <div className="c-white"><span className="label label-accent">+45</span> New visits</div>
                    <span className="small c-white">17 <i className="fa fa-play fa-rotate-270 text-warning"> </i> -22%</span>
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
                        Total account visits this year
                      </div>

                      <div className="sparkline3">
                        <TrafficChart/>
                      </div>

                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="panel-body">
                      <div className="text-center slight">
                      </div>

                      <div className="flot-chart">
                        <div className="flot-chart-content" id="flot-line-chart">
                          <IgInteractionInsight/>
                        </div>
                      </div>

                      <div className="small text-center" style={{'marginTop': '50px'}}>All followers count
                        last month
                      </div>
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
                      <th>Type</th>
                      <th>Likes</th>
                      <th>Comments</th>
                    </tr>
                    </thead>
                    <tbody>
                      {this.renderTopPosts()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-4">

              <div className="panel panel-b-accent">
                <div className="panel-body text-center p-m">
                  <h2 className="font-light">
                    156 followers
                  </h2>
                  <small>New followers from the last month.</small>
                  <br/>
                  10 <span className="slight"><i className="fa fa-play fa-rotate-270 c-white"> </i> +22%</span>

                  <div className="sparkline7 m-t-xs"></div>
                </div>
              </div>
              <div className="panel-body">

              </div>
            </div>

          </div>

        </div>
      </section>
    )
  }
}

export default IgInsight;
