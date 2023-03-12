import CardHorizontalRow from '../CardHorizontalRow'
import FooterTeacherCoordinatorView from '../footerTeacherCoordinatorView'
import '../../../styles/dashboardCardsHorizontalRows.css'
import { useContext, useEffect, useState } from 'react'
import CoordinatorContext from '../../../context/CoordinatorContext'

export default function DashboardCardsHorizontalRows ({ cards = defaultData, coordinator = true }) {
  const { ctx_main_hR, setCtx_hB_r_sI } = useContext(CoordinatorContext)
  const { setPhase } = useContext(CoordinatorContext)
  const [conformedData, setConformedData] = useState(cards)

  const titles = {
    6: 'Grado sexto',
    7: 'Grado séptimo',
    8: 'Grado octavo',
    9: 'Grado noveno',
    10: 'Grado décimo',
    11: 'Grado undécimo'
  }

  const handleClick = (level) => {
    setPhase('horizontalBar')

    setCtx_hB_r_sI(
      { hB: conformedData.find((item) => item.level === level), level }
    )
  }

  useEffect(() => {
    console.log('hola', ctx_main_hR)
    const levels = [...new Set(ctx_main_hR.map((curso) => curso.nivel))]
    const formData = levels.map((level) => {
      const lst = ctx_main_hR.filter((curso) => curso.nivel === level)
      const rows = lst.map((curso) => {
        return {
          label: `${curso.nivel} ${curso.curso}`,
          valueGreen: curso.apropiacionValues[3] ? curso.apropiacionValues[3] : 0,
          valueYellow: curso.apropiacionValues[2] ? curso.apropiacionValues[2] : 0,
          valueRed: curso.apropiacionValues[1] ? curso.apropiacionValues[1] : 0,
          spiderValues: curso.spiderValues
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
  }, [])

  return (
    <div className='DashboardCardsHorizontalRows'>
      <div className='DashboardCardsHorizontalRows__container'>
        {conformedData.map((item, index) => (
          <CardMetricsGrade key={index} index={index} item={item} handleClick={handleClick} level={item.level} />
        ))}
      </div>
      <FooterTeacherCoordinatorView coordinator={coordinator} />
    </div>
  )
}

function CardMetricsGrade ({ index, item, handleClick, level }) {
  return (
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
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 B',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 C',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 D',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      }
    ]
  },
  {
    title: 'Grado septimo',
    average: 5,
    rows: [
      {
        label: '6 A',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 B',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 C',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 D',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      }
    ]
  },
  {
    title: 'Grado octavo',
    average: 5,
    rows: [
      {
        label: '6 A',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 B',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 C',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 D',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      }
    ]
  },
  {
    title: 'Grado noveno',
    average: 5,
    rows: [
      {
        label: '6 A',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 B',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 C',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 D',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      }
    ]
  },
  {
    title: 'Grado decimo',
    average: 5,
    rows: [
      {
        label: '6 A',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 B',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 C',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 D',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      }
    ]
  },
  {
    title: 'Grado once',
    average: 5,
    rows: [
      {
        label: '6 A',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 B',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 C',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      },
      {
        label: '6 D',
        valueGreen: 0,
        valueYellow: 0,
        valueRed: 0
      }
    ]
  }
]
