import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Bar Chart',
    },
  },
};


export default function BarChart({b_code_data}) {

const total_count = b_code_data?.map(x => x.count)?.reduce(function (x, y) {
    return x + y;
}, 0)

console.log(total_count)  
 const total_sum =  b_code_data?.map(x => x.sum).reduce(function (x, y) {
    return x + y;
}, 0)
const labels = b_code_data?.map(x => x.identifier);

const data = {
  labels,
  datasets: [
    {
      label: 'No of customers %',
      data: b_code_data?.map(x => (x.count/total_count)*100.0),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Total_open_amount %',
      data: b_code_data?.map(x => (x.sum/total_sum)*100.0),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

  return <Bar options={options} data={data} width={600} height={600}/>;
}