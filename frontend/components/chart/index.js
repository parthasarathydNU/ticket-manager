import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const graphOptions = {
  fill: false,
  lineTension: 0.1,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10
};

const graphColours = (colourValue) => ({
  borderColor: colourValue,
  pointBorderColor: colourValue,
  pointHoverBackgroundColor: colourValue,
  backgroundColor: colourValue, // change this to lighter value for better ux
  pointBackgroundColor: '#fff',
  pointHoverBorderColor: 'rgba(220,220,220,1)'
});

const data = {
  labels: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  datasets: [
    {
      label: 'Number of incoming tickets',
      data: [99, 79, 23, 50, 12, 33, 44, 5, 38, 19, 10, 99],
      ...graphOptions,
      ...graphColours('#12344D')
    },
    {
      label: 'Number of resolved tickets',
      data: [32, 94, 12, 43, 23, 109, 12, 43, 23, 109, 12, 43],
      ...graphOptions,
      ...graphColours('#ff5722')
    },
    {
      label: 'Number of overdue tickets',
      data: [3, 8, 1, 4, 2, 5, 0, 10, 6, 7, 9, 11],
      ...graphOptions,
      ...graphColours('red')
    }

  ]
};

export default () => (
  <div>
    <h2>Past Trends</h2>
    <Line
      data={data}
      height={30}
      width={100}
      options={{
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }}
    />
  </div>
);