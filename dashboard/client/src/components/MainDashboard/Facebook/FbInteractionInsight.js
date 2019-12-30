import React, {Component} from 'react';
import {Line} from "react-chartjs-2";

class FbInteractionInsight extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
      datasets: [
        {
          label: 'Intl',
          fill: true,
          lineTension: 0.1,
          backgroundColor: '#6a8cd1',
          borderColor: '#6a8cd1',
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
          data: [28, 48, 40, 19, 86, 27, 90, 92, 67, 98, 75, 78]
        },
        {
          label: 'Vietnam',
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
          data: [65, 59, 80, 81, 56, 55, 40, 45, 57, 82, 77, 67],
        },
        {
          label: 'Thailand',
          fill: true,
          lineTension: 0.1,
          backgroundColor: '#244c9e',
          borderColor: '#244c9e',
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
          data: [34, 58, 42, 35, 57, 63, 49, 11, 78, 89, 64, 43],
        },

      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false
    };

    return (
      <div>
        <Line data={data} options={options} width="400" height="200" />
      </div>
    )

  }

}

export default FbInteractionInsight;
