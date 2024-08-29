import React from 'react';
import { Line } from 'react-chartjs-2';
// chart.js configuration file or component where you use Chart.js
import { Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js';

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);


interface PriceChartProps {
  labels: string[];
  data: number[];
}

const PriceChart: React.FC<PriceChartProps> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Price Over Time',
        data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options: any = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `$${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price',
        },
        ticks: {
          callback: function (value: number) {
            return `$${value}`;
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default PriceChart;
