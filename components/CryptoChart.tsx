"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js"
import "chartjs-adapter-date-fns"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale)

interface CryptoChartProps {
  data: [number, number][]
}

export default function CryptoChart({ data }: CryptoChartProps) {
  const chartData = {
    labels: data.map((item) => new Date(item[0])),
    datasets: [
      {
        label: "Price",
        data: data.map((item) => ({ x: new Date(item[0]), y: item[1] })),
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Price History",
      },
    },
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: "day" as const,
        },
      },
      y: {
        beginAtZero: false,
      },
    },
  }

  return <Line data={chartData} options={options} />
}

