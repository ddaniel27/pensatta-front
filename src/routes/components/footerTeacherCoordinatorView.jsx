import '../../styles/footerTeacherCoordinatorView.css'
import { useContext } from 'react'
import CoordinatorContext from '../../context/CoordinatorContext'


export default function FooterTeacherCoordinatorView ({downloadPDF=true}) {
  const {setPhase} = useContext(CoordinatorContext)  


  return (
    <div className='FooterTeacherCoordinatorView'>
      {downloadPDF?<div className='FooterTeacherCoordinatorView__informe'>DESCARGAR INFORME DEL CURSO</div>:<div></div>}
      <div className='FooterTeacherCoordinatorView__group'>
        <div className='FooterTeacherCoordinatorView__listado' onClick={()=>setPhase("listGrades")} >LISTADOS</div>
        <div className='FooterTeacherCoordinatorView__progreso' onClick={()=>setPhase("horizontalRows")}>PROGRESO</div>
        <div className='FooterTeacherCoordinatorView__perfil' onClick={()=>setPhase("main")}>PERFIL</div>
      </div>
    </div>
  )
}
