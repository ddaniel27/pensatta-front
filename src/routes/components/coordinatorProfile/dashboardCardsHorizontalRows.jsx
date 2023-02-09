import CardHorizontalRow from '../CardHorizontalRow'
import FooterTeacherCoordinatorView from '../footerTeacherCoordinatorView'
import '../../../styles/dashboardCardsHorizontalRows.css'
import CoordinatorContext from '../../../context/CoordinatorContext'
import { useContext } from 'react'

export default function DashboardCardsHorizontalRows ({ cards = defaultData }) {
  const { setPhase } = useContext(CoordinatorContext)

  return (
    <div className='DashboardCardsHorizontalRows'>
      <div className='DashboardCardsHorizontalRows__container'>
        {cards.map((item, index) => (
          <div className='DashboardCardsHorizontalRows__container__card' key={index} onClick={()=>setPhase("horizontalBar")}>
            <CardHorizontalRow key={index} {...item} />
          </div>
        ))}
      </div>
      <FooterTeacherCoordinatorView />
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
