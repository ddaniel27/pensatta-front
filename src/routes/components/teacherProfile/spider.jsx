import { useState, useEffect } from 'react'
import { Radar } from 'react-chartjs-2'
import { 
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js'
import '../../../styles/charts.css'

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
)

export default function Spider({ spider, setImgURL }){

    const [ spiderData, setSpiderData ] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    })

    useEffect(()=>{
        if(spider){
            Object.keys(spider).forEach(key => {
                setSpiderData(prevData => (
                    {
                        ...prevData,
                        [key]: spider[key]
                    }
                ))
            })
        }
    }, [spider])

    const marksData = {
        labels: [
          "Abstracción",
          ["Pensamiento", "Lógico"], 
          "Descomponer", 
          ["Reconocimiento", "de Patrones"], 
          ["Modelaje y", "Simulación"], 
          "Evaluación"
        ],
        datasets: [
            {
                label: "",
                backgroundColor: "#008E86",
                data: Object.values(spiderData),
                pointRadius: 4,
                pointBackgroundColor: "#008E86",
                borderColor: "#008E86",
            }
        ]
    }
    const RadarOptions = {
        animation:{
            onComplete: ({chart}) => {
                if(setImgURL){
                    setImgURL(chart.toBase64Image())
                }
            }
        },
        maintainAspectRatio: false,
        plugins:{
            legend:{
                display: false
            }
        },
        scales: {
            r:{
                angleLines:{
                    color: '#828282AA',
                    lineWidth: 3
                },
                grid:{
                    color:'#828282AA',
                    lineWidth: 3
                },
                pointLabels:{
                    color:'#008E86',
                    font:{
                        size: 10,
                        weight: 'bold',
                        family: 'Montserrat'
                    }
                },
                ticks:{
                    display: false,
                    stepSize: 20
                }
            } 
        }
    }

    

    return(
        <div className="chart-container spider-container">
            <Radar data={marksData} options={RadarOptions} />
        </div>
    )
}