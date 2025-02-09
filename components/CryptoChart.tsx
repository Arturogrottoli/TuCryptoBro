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
    labels: data.map((item) => new Date(item[0]).toISOString()),
    datasets: [
      {
        label: "Price",
        data: data.map((item) => ({ x: item[0], y: item[1] })),
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
        tension: 0.4,
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
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD" }).format(context.parsed.y)
            }
            return label
          },
          title: (tooltipItems: any) => {
            const date = new Date(tooltipItems[0].parsed.x)
            return date.toLocaleString("es-AR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "dd/MM/yyyy",
          },
        },
        display: true,
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        ticks: {
          callback: (value: any) => "$" + value.toLocaleString(),
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        title: {
          display: true,
          text: "Price (USD)",
        },
      },
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 5,
      },
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
  }

  return <Line data={chartData} options={options} />
}

