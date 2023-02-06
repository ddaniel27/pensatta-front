import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import '../../../styles/charts.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Brechas frente a la media',
      color: '#000',
      font: {
        size: 16,
        weight: 'bold',
        family: 'Montserrat'
      }
    },
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true,
      display: false
    }
  },
  layout: {
    padding: {
      top: 0,
      bottom: 0,
      left: 20,
      right: 20
    }
  },
  responsive: true,
  aspectRatio: 1,
  maintainAspectRatio: false
}

const labels = ['aprop1', 'aprop2', 'aprop3', 'aprop4', 'aprop5', 'aprop6']
const dataSets = {
  aprop1: { obt: 50, med: 50 },
  aprop2: { obt: 20, med: 60 },
  aprop3: { obt: 30, med: 70 },
  aprop4: { obt: 40, med: 80 },
  aprop5: { obt: 50, med: 90 },
  aprop6: { obt: 60, med: 95 }
}

export const data = {
  labels,
  datasets: [
    {
      label: 'Obtenido',
      data: labels.map((label) => {
        const g = dataSets[label].obt / dataSets[label].med
        return 100 * g / (1 + g)
      }),
      backgroundColor: '#008E86'
    },
    {
      label: 'Media',
      data: labels.map((label) => {
        const g = dataSets[label].obt / dataSets[label].med
        return 100 / (1 + g)
      }),
      backgroundColor: '#F97D61'
    }

  ]
}

export function MeanBarChart ({ dataValues = data }) {
  return (
    <div className='chart-container bar-container'>
      <Bar options={options} data={dataValues} />
    </div>
  )
}
