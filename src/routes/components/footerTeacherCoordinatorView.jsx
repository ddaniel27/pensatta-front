import '../../styles/footerTeacherCoordinatorView.css'
import { useContext, useEffect, useState } from 'react'
import CoordinatorContext from '../../context/CoordinatorContext'
import { Link } from 'react-router-dom'
import { coordinacionMetricsAll } from '../../requests'

export default function FooterTeacherCoordinatorView ({ downloadPDF = true, coordinator = true, data, spiderURL, pieURL, userId }) {
  const { setPhase } = useContext(CoordinatorContext)
  const [coordinatorName, setCoordinatorName] = useState('')

  useEffect(() => {
    coordinacionMetricsAll(userId, (response) => {
      setCoordinatorName(response.coordinator)
    })
  }
  , [])

  return (
    <div className='FooterTeacherCoordinatorView'>
      {downloadPDF
        ? <Link
          to={`/coordinator/${userId}`}
          state={{
            data,
            loginUser: {
              id: userId,
              name: coordinatorName
            },
            badges: 0,
            dummyHistory: [{}],
            spiderImg: spiderURL,
            pieImg: pieURL
          }}>
          <div className='FooterTeacherCoordinatorView__informe'>DESCARGAR INFORME DEL CURSO</div> </Link>
        : <div />}
      <div className='FooterTeacherCoordinatorView__group'>
        { coordinator && <div className='FooterTeacherCoordinatorView__listado' onClick={() => setPhase('listGrades')} >LISTADOS</div>}
        <div className='FooterTeacherCoordinatorView__progreso' onClick={() => setPhase('horizontalRows')}>PROGRESO</div>
        <div className='FooterTeacherCoordinatorView__perfil' onClick={() => setPhase('main')}>PERFIL</div>
      </div>
    </div>
  )
}
