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

const labels = [
  'abstraccion',
  'pensamiento algoritmico',
  'descomposicion',
  'reconocimiento de patrones',
  'modelado y simulacion',
  'evaluacion'
]
const dataSets = {
  dim1: { obt: 50, med: 50 },
  dim2: { obt: 20, med: 60 },
  dim3: { obt: 30, med: 70 },
  dim4: { obt: 40, med: 80 },
  dim5: { obt: 50, med: 90 },
  dim6: { obt: 60, med: 95 }
}

const data = (dataVal, labs) => ({
  labels: labs,
  datasets: [
    {
      label: 'Obtenido',
      data: labs.map((label) => {
        const g = dataVal[label].obt / dataVal[label].med
        return 100 * g / (1 + g)
      }),
      backgroundColor: '#008E86'
    },
    {
      label: 'Media',
      data: labs.map((label) => {
        const g = dataVal[label].obt / dataVal[label].med
        return 100 / (1 + g)
      }),
      backgroundColor: '#F97D61'
    }

  ]
})

export function MeanBarChart ({ dataValues = dataSets, labs = labels }) {
  return (
    <div className='chart-container bar-container'>
      <Bar options={options} data={data(dataValues, labs)} />
    </div>
  )
}
