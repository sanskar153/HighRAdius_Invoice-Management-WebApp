import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'

export default function PieChart({b_code_data}) {
Chart.register(ArcElement);

    const total_count = b_code_data?.map(x => x.count)?.reduce(function (x, y) {
        return x + y;
    }, 0)

    console.log(total_count)  
    const total_sum =  b_code_data?.map(x => x.sum)

    const labels = b_code_data?.map(x => x.identifier);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total open amount',
        data: total_sum,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };
  

  return (
  <div style={{ height:'300px',width:'300px',margin:'0 auto' }}>
    <Pie data={data} />
  </div>
  );

}