import FooterTeacherCoordinatorView from '../footerTeacherCoordinatorView'
import styles from '../../../styles/dashboardListGrades.module.css'
import GradeInfoCard from '../gradeInfoCard'
import { useEffect, useState, useContext } from 'react'
import CoordinatorContext from '../../../context/CoordinatorContext'
import { coordinacionGrupos, profesorResumen } from '../../../requests'
import NewGradeModal from './newGradeModal'
import Loading from '../loadingView'

export default function DashboardListGrades ({ cards = [], coordinator = true, userId }) {
  const [showAddModal, setShowAddModal] = useState(false)
  const { setCtx_lG_mC } = useContext(CoordinatorContext)
  const [cursos, setCursos] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [conformedData, setConformedData] = useState(cards)
  const titles = {
    6: 'Grado sexto',
    7: 'Grado séptimo',
    8: 'Grado octavo',
    9: 'Grado noveno',
    10: 'Grado décimo',
    11: 'Grado undécimo'
  }

  useEffect(() => {
    if (coordinator) {
      coordinacionGrupos(userId, (response) => {
        setCursos(response.cursos)
        setIsLoaded(true)
      })
    } else {
      profesorResumen(userId, (response) => {
        setCursos(response.courses)
        setIsLoaded(true)
      })
    }
  }, [])

  useEffect(() => {
    if (cursos.length > 0) {
      const lvls = new Set(cursos.map((curso) => {
        return curso.level
      }))
      const levels = [...lvls]

      const formData = levels.map((level) => {
        const lst = cursos.filter((curso) => {
          return curso.level === level
        })
        const lista = lst.map((curso) => {
          return {
            course_id: curso.course_id,
            grade: `${curso.level} ${curso.course}`,
            teacher: curso.teacher_name,
            teacher_id: curso.teacher_id,
            students: curso.students
          }
        })

        return {
          title: titles[level],
          lista,
          level
        }
      })
      setConformedData(formData)
      setCtx_lG_mC(formData)
    }
  }, [cursos])

  return (
    isLoaded
      ? <div className={styles['dashboard-list-grades']}>
        <div className={styles['header-container']}>
          <div className={styles['title-container']}>
            {coordinator ? 'Grupos' : 'Mis listados'}
          </div>
          <div className={styles['button-header-container']}>
            {coordinator && !showAddModal && <button id={styles['button-header']} onClick={() => { setShowAddModal(true) }}>NUEVO GRUPO</button>}
          </div>
        </div>
        <div className={styles['list-grades-container']}>
          {conformedData.map((item, index) => (
            <GradeInfoCard key={index} {...item} coordinator={coordinator} />
          ))}
        </div>
        {showAddModal && <NewGradeModal close={setShowAddModal} userId={userId} />}
        <FooterTeacherCoordinatorView downloadPDF={false} coordinator={coordinator}/>
      </div>
      : <Loading/>
  )
}
/* const defaultData = [{
  title: 'Grado',
  lista: [
    {
      grade: '6 A',
      teacher: 'Profesor'
    }
  ]
}
] */
