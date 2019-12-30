import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class FbTrafficInsight extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const data = {
      labels: ['Intl.', 'Vietnam', 'Thailand'],
      datasets: [
        {
          label: 'Site',
          fill: true,
          backgroundColor: ['#71B37C','#488953', '#267f35'],
          borderColor: '#71B37C',
          hoverBackgroundColor: '#71B37C',
          hoverBorderColor: '#71B37C',
          data: [65, 59, 80]
        }
      ]
    };

    return(
      <div>
        <Bar
          data={data}
          width={100}
          height={150}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    )
  }



}

export default FbTrafficInsight;
