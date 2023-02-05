import FooterTeacherCoordinatorView from '../footerTeacherCoordinatorView'
import styles from '../../../styles/dashboardListGrades.module.css'
import GradeInfoCard from '../gradeInfoCard'

export default function DashboardListGrades ({ cards = defaultData }) {
  return (
    <div className={styles['dashboard-list-grades']}>
      <div className={styles['header-container']}>
        <div className={styles['title-container']}>
          Grupos
        </div>
        <div className={styles['button-header-container']}>
          <button id={styles['button-header']}>NUEVO GRUPO</button>
        </div>
      </div>
      <div className={styles['list-grades-container']}>
        {cards.map((item, index) => (
          <GradeInfoCard key={index} {...item} />
        ))}
      </div>
      <FooterTeacherCoordinatorView downloadPDF={false} />
    </div>
  )
}
const defaultData = [{
  title: 'Grado',
  lista: [
    {
      grade: '6 A',
      teacher: 'Ramirez'
    },
    {
      grade: '6 B',
      teacher: 'Ramirez'
    },
    {
      grade: '6 C',
      teacher: 'Ramirez'
    },
    {
      grade: '6 D',
      teacher: 'Ramirez'
    }
  ]
},
{
  title: 'Grado',
  lista: [
    {
      grade: '7 A',
      teacher: 'Ramirez'
    },
    {
      grade: '7 B',
      teacher: 'Ramirez'
    },
    {
      grade: '7 C',
      teacher: 'Ramirez'
    },
    {
      grade: '7 D',
      teacher: 'Ramirez'
    }
  ]
},
{
  title: 'Grado',
  lista: [
    {
      grade: '8 A',
      teacher: 'Albán'
    },
    {
      grade: '8 B',
      teacher: 'Albán'
    },
    {
      grade: '8 C',
      teacher: 'Dorado'
    },
    {
      grade: '8 D',
      teacher: 'Dorado'
    }
  ]
},
{
  title: 'Grado',
  lista: [
    {
      grade: '9 A',
      teacher: 'Ramirez'
    },
    {
      grade: '9 B',
      teacher: 'Ramirez'
    },
    {
      grade: '9 C',
      teacher: 'Ramirez'
    },
    {
      grade: '9 D',
      teacher: 'Ramirez'
    }
  ]
}
]
