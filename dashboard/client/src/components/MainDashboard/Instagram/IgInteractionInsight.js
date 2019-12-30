import React, {Component} from 'react';
import {Line} from "react-chartjs-2";

class IgInteractionInsight extends Component {
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
          backgroundColor: '#ea5b81',
          borderColor: '#ea5b81',
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
        }
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: false
    };

    return (
      <div>
        <Line data={data} options={options} width="400" height="200" />
      </div>
    )

  }

}

export default IgInteractionInsight;
