import pencil from '/images/Atomo_Icono_Editar.svg'
import '../../styles/headerMainTeacherCoordinator.css'

export default function HeaderMainTeacherCoordinator ({ title = 'Coordinacion', subtitle = 'Institucion Educativa Education Soul' }) {
  return (
    <div className='HeaderMainTeacherCoordinator'>
      <div className='HeaderMainTeacherCoordinator__group'>
        <div className='HeaderMainTeacherCoordinator__group--logo' />
        <div className='HeaderMainTeacherCoordinator__group--title'>
          <p>{title}</p>
          <span>{subtitle}</span>
        </div>
      </div>
      <div className='HeaderMainTeacherCoordinator__pencil'>
        <img src={pencil} alt='pencil' />
      </div>
    </div>
  )
}
