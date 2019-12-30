import React, {Component} from 'react';
import {Line} from "react-chartjs-2";

class FbVisitorInsight extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
      datasets: [
        {
          label: 'Views',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#fff',
          borderColor: '#fff',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#fff',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40, 41, 42]
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
        <Line data={data} options={options} height="100" />
      </div>
    )
  }
}

export default FbVisitorInsight;
