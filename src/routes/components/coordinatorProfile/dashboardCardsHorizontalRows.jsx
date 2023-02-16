import CardHorizontalRow from '../CardHorizontalRow'
import FooterTeacherCoordinatorView from '../footerTeacherCoordinatorView'
import '../../../styles/dashboardCardsHorizontalRows.css'
import { useContext, useEffect, useState } from 'react'
import CoordinatorContext from '../../../context/CoordinatorContext'



export default function DashboardCardsHorizontalRows ({ cards = defaultData }) {
  const { ctx_main_hR, setCtx_hB_r_sI } = useContext(CoordinatorContext)
  const { setPhase } = useContext(CoordinatorContext)
  const [conformedData, setConformedData] = useState(cards)

  const titles = {
    '6': 'Grado sexto',
    '7': 'Grado séptimo',
    '8': 'Grado octavo',
    '9': 'Grado noveno',
    '10': 'Grado décimo',
    '11': 'Grado undécimo'
  }

  const handleClick = (level) => {
    setPhase("horizontalBar")
    console.log(level)
    console.log( conformedData.find((item) => item.level === level))
    setCtx_hB_r_sI(
      conformedData.find((item) => item.level === level)
    )
   
  }


  useEffect(() => {
    console.log(ctx_main_hR)
    const levels = [... new Set(ctx_main_hR.map((curso) => curso.nivel))]
    const formData = levels.map((level) => {
      const lst = ctx_main_hR.filter((curso) => curso.nivel === level)
      const rows = lst.map((curso) => {
        return {
          label: `${curso.nivel} ${curso.curso}`,
          valueGreen: curso.apropiacionValues[3],
          valueYellow: curso.apropiacionValues[2],
          valueRed: curso.apropiacionValues[1]
        }
      })

      return {
        level,
        title: titles[level],
        rows,
        average: level
      }
    })
    setConformedData(formData)
   

  },[])

  return (
    <div className='DashboardCardsHorizontalRows'>
      <div className='DashboardCardsHorizontalRows__container'>
        {conformedData.map((item, index) => (
          <CardMetricsGrade key={index} index={index} item={item} handleClick={handleClick} level={item.level} />
        ))}
      </div>
      <FooterTeacherCoordinatorView />
    </div>
  )
}

function CardMetricsGrade({index, item, handleClick, level}){
  return  (
    <div className='DashboardCardsHorizontalRows__container__card' key={index} onClick={() => handleClick(level)}>
            <CardHorizontalRow key={index} {...item} />
    </div>
  )
}


const defaultData = [
  {
    title: 'Grado sexto',
    average: 5,
    rows: [
      {
        label: '6 A',
        valueGreen: 0.3,
        valueYellow: 0.2,
        valueRed: 0.5
      },
      {
        label: '6 B',
        valueGreen: 0.5,
        valueYellow: 0.2,
        valueRed: 0.3
      },
      {
        label: '6 C',
        valueGreen: 0.2,
        valueYellow: 0.5,
        valueRed: 0.3
      },
      {
        label: '6 D',
        valueGreen: 0.34,
        valueYellow: 0.33,
        valueRed: 0.33
      }
    ]
  },
  {
    title: 'Grado septimo',
    average: 5,
    rows: [
      {
        label: '6 A',
        valueGreen: 0.3,
        valueYellow: 0.2,
        valueRed: 0.5
      },
      {
        label: '6 B',
        valueGreen: 0.5,
        valueYellow: 0.2,
        valueRed: 0.3
      },
      {
        label: '6 C',
        valueGreen: 0.2,
        valueYellow: 0.5,
        valueRed: 0.3
      },
      {
        label: '6 D',
        valueGreen: 0.34,
        valueYellow: 0.33,
        valueRed: 0.33
      }
    ]
  },
  {
    title: 'Grado octavo',
    average: 5,
    rows: [
      {
        label: '6 A',
        valueGreen: 0.3,
        valueYellow: 0.2,
        valueRed: 0.5
      },
      {
        label: '6 B',
        valueGreen: 0.5,
        valueYellow: 0.2,
        valueRed: 0.3
      },
      {
        label: '6 C',
        valueGreen: 0.2,
        valueYellow: 0.5,
        valueRed: 0.3
      },
      {
        label: '6 D',
        valueGreen: 0.34,
        valueYellow: 0.33,
        valueRed: 0.33
      }
    ]
  },
  {
    title: 'Grado noveno',
    average: 5,
    rows: [
      {
        label: '6 A',
        valueGreen: 0.3,
        valueYellow: 0.2,
        valueRed: 0.5
      },
      {
        label: '6 B',
        valueGreen: 0.5,
        valueYellow: 0.2,
        valueRed: 0.3
      },
      {
        label: '6 C',
        valueGreen: 0.2,
        valueYellow: 0.5,
        valueRed: 0.3
      },
      {
        label: '6 D',
        valueGreen: 0.34,
        valueYellow: 0.33,
        valueRed: 0.33
      }
    ]
  },
  {
    title: 'Grado decimo',
    average: 5,
    rows: [
      {
        label: '6 A',
        valueGreen: 0.3,
        valueYellow: 0.2,
        valueRed: 0.5
      },
      {
        label: '6 B',
        valueGreen: 0.5,
        valueYellow: 0.2,
        valueRed: 0.3
      },
      {
        label: '6 C',
        valueGreen: 0.2,
        valueYellow: 0.5,
        valueRed: 0.3
      },
      {
        label: '6 D',
        valueGreen: 0.34,
        valueYellow: 0.33,
        valueRed: 0.33
      }
    ]
  },
  {
    title: 'Grado once',
    average: 5,
    rows: [
      {
        label: '6 A',
        valueGreen: 0.3,
        valueYellow: 0.2,
        valueRed: 0.5
      },
      {
        label: '6 B',
        valueGreen: 0.5,
        valueYellow: 0.2,
        valueRed: 0.3
      },
      {
        label: '6 C',
        valueGreen: 0.2,
        valueYellow: 0.5,
        valueRed: 0.3
      },
      {
        label: '6 D',
        valueGreen: 0.34,
        valueYellow: 0.33,
        valueRed: 0.33
      }
    ]
  }
]
