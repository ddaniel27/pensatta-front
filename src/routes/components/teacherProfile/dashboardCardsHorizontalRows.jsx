import HorizontalBar from '../horizontalBar'
import FooterTeacherCoordinatorView from '../footerTeacherCoordinatorView'
import '../../../styles/dashboardCardsHorizontalRows.css'

export default function DashboardCardsHorizontalRows ({ cards = defaultData }) {
  return (
    <div className='DashboardCardsHorizontalRows'>
      <div className='DashboardCardsHorizontalRows__container'>
        {cards.map((item, index) => (
          <CardHorizontalRow key={index} {...item} />
        ))}
      </div>
      <FooterTeacherCoordinatorView />
    </div>
  )
}

function CardHorizontalRow ({ title = 'Grado', average = 5, rows = [] }) {
  return (
    <div className='CardHorizontalRow'>
      <div className='CardHorizontalRow__title'>
        <div className='CardHorizontalRow__title__text'>{title}</div>
        <div className='CardHorizontalRow__title__average'>Unidad promedio: {average}</div>
      </div>
      <HorizontalBarGrid data={rows} />
    </div>
  )
}

function HorizontalBarGrid ({ data }) {
  return (
    <div className='HorizontalBarGrid'>
      {data.map((item, index) => (
        <HorizontalBar key={index} {...item} />
      ))}
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
