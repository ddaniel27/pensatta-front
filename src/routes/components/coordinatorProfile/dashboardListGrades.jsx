import FooterTeacherCoordinatorView from '../footerTeacherCoordinatorView'
import styles from '../../../styles/dashboardListGrades.module.css'
import GradeInfoCard from '../gradeInfoCard'
import { useEffect, useState, useContext } from 'react'
import CoordinatorContext from '../../../context/CoordinatorContext'
import { coordinacionGrupos } from '../../../requests'

export default function DashboardListGrades ({ cards = defaultData ,coordinator = true, userId }) {
  const {setCtx_lG_mC} = useContext(CoordinatorContext)
  const [cursos, setCursos] = useState([])
  const [conformedData, setConformedData] = useState(cards)
  const titles = {
    '6': 'Grado sexto',
    '7': 'Grado séptimo',
    '8': 'Grado octavo',
    '9': 'Grado noveno',
    '10': 'Grado décimo',
    '11': 'Grado undécimo'
  }

  useEffect(()=>{
    coordinacionGrupos(userId, (response)=>{
      console.log(response)
      setCursos(response.cursos)
    })
  },[])

  useEffect(()=>{
    if (cursos.length > 0 ){
      const lvls = new Set(cursos.map((curso)=>{
        return curso.level
      }))
      const levels = [...lvls]

      const formData = levels.map((level)=>{
        const lst = cursos.filter((curso)=>{
          return curso.level === level
        })
        const lista = lst.map((curso)=>{
          return {
            grade: `${curso.level} ${curso.course}`,
            teacher: curso.teacher_name,
            teacher_id: curso.teacher_id,
            students: curso.students
          }
        })
  
        return {
          title: titles[level],
          lista: lista,
          level: level
        }
      })
      setConformedData(formData)
      setCtx_lG_mC(formData)

    }
  },[cursos])

  return (
    <div className={styles['dashboard-list-grades']}>
      <div className={styles['header-container']}>
        <div className={styles['title-container']}>
          {coordinator?'Grupos':'Mis listados'}
        </div>
        <div className={styles['button-header-container']}>
          {coordinator&&<button id={styles['button-header']}>NUEVO GRUPO</button>}
        </div>
      </div>
      <div className={styles['list-grades-container']}>
        {conformedData.map((item, index) => (
          <GradeInfoCard key={index} {...item} coordinator={coordinator}  />
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
