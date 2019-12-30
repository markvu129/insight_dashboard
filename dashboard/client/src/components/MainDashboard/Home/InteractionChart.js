import React, {Component} from 'react';
import {Line} from "react-chartjs-2";
import axios from "axios";
import Utils from "../../../modules/Utils";

class InteractionChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      labels: []
    };
    this.fetchData = this.fetchData.bind(this);
  }


  fetchData(){
    let uri = "https://api.thehotzebra.site/api/info/fb/month/" + new Date().getFullYear() + "/page_actions_post_reactions_like_total/facebook/12";
    let labels = [];
    let data = [];
    axios.get(uri)
      .then(response => {
        let sorted_data = Utils.sortByMonth(response.data);
        sorted_data.forEach(eachValue => {
          labels.push(eachValue.stats[0].month);
          data.push(eachValue.stats[0].stats)
        });
        this.setState({
          labels: labels,
          data: data
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    if (this.state.data.length > 0 && this.state.labels.length > 0){
      const data = {
        labels: this.state.labels,
        datasets: [
          {
            label: 'Facebook',
            fill: true,
            lineTension: 0.1,
            backgroundColor: '#3b5998',
            borderColor: '#3b5998',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#fff',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#2F323B',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.state.data,
          },
        ]
      };

      const options = {
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false
      };

      return (
        <div>
          <Line data={data} options={options} width={400} height={150} />
        </div>
      )
    }

    else {
      return (<div></div>)
    }

  }
}

export default InteractionChart;
