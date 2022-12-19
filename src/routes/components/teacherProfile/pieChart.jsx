import { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import '../../../styles/charts.css'
import { 
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ArcElement
)



export default function PieChart({ pieValues, setImgURL }){

  const [ pieData, setPieData ] = useState({
    1: 0,
    2: 0,
    3: 0
  })

  useEffect(()=>{
    if(pieValues){
      Object.keys(pieValues).forEach(key => {
        setPieData(prevData => (
          {
            ...prevData,
            [key]: pieValues[key]
          }
        ))
      })
    }
  }, [pieValues])

  const data = {
    labels: [
      'Conoce',
      'Utiliza',
      'Transforma'
    ],
    datasets: [
      {
        label: '',
        data: Object.values(pieData),
        backgroundColor: [
          '#F87777',
          '#EDCA71',
          '#82C993'
        ],
        hoverOffset: 4
      }
    ]
  }
  const options = {
    animation: {
      onComplete: ({chart}) => {
        if(setImgURL){
          setImgURL(chart.toBase64Image())
        }
      }
    },
    maintainAspectRatio: false,
    plugins: {
      legend:{
        position: 'bottom',
        labels: {
          color: '#000',
          font:{
            size: 16,
            weight: 'bold',
            family: 'Montserrat'
          }
        }
      }
    }
  }
  return(
    <div className='chart-container pie-container'>
      <Doughnut data={data} options={options} />
    </div>
  )
}