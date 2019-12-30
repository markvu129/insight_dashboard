import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import Utils from "../../../modules/Utils";

class TrafficChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: false,
      data: false
    };
    this.fetchData = this.fetchData.bind(this);
  }


  fetchData(){
    let uri = "https://api.thehotzebra.site/api/info/fb/month/" + new Date().getFullYear() + '/page_views_total/facebook/12';
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

  render(){
    if (this.state.labels.length > 0 && this.state.data.length > 0){
      const data = {
        labels: this.state.labels,
        datasets: [
          {
            label: 'Views',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.state.data
          }
        ]
      };

      const options = {
        scales: {
          yAxes: [
            {
              display: false
            }
          ],
          xAxes: [
            {
              gridLines: {
                color: '#aaa',
                borderDash: [1, 3],
              },
              display: false,
            },

          ],
        },
        legend: {
          display: false,
        }
      };

      return (
        <div>
          <Line data={data} options={options} height={100} />
        </div>
      )
    }

    else {
      return (
        <div></div>
      )
    }

  }
}

export default TrafficChart;
