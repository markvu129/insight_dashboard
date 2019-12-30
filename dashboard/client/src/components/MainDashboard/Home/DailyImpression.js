import React, {Component} from 'react';

class DailyView extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="panel-body">
        <h2 className="m-b-none">
          206 <span className="slight"><i className="fa fa-play fa-rotate-270 text-warning"> </i> +20%</span>
        </h2>
        <div className="small">Daily views</div>
        <div className="slight m-t-sm"><i className="fa fa-clock-o"> </i> Updated: <span
          className="c-white">10:22pm</span>
        </div>
      </div>
    )
  }
}

export default DailyView
