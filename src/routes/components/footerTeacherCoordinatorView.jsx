import '../../styles/footerTeacherCoordinatorView.css'

export default function FooterTeacherCoordinatorView ({downloadPDF=true}) {
  return (
    <div className='FooterTeacherCoordinatorView'>
      {downloadPDF?<div className='FooterTeacherCoordinatorView__informe'>DESCARGAR INFORME DEL CURSO</div>:<div></div>}
      <div className='FooterTeacherCoordinatorView__group'>
        <div className='FooterTeacherCoordinatorView__listado'>LISTADOS</div>
        <div className='FooterTeacherCoordinatorView__progreso'>PROGRESO</div>
        <div className='FooterTeacherCoordinatorView__perfil'>PERFIL</div>
      </div>
    </div>
  )
}
