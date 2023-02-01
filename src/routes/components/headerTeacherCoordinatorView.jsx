import leftArrow from '../../../public/images/AuxButtons/left_Default.svg'
import '../../styles/headerTeacherCoordinatorView.css'

export default function HeaderTeacherCoordinatorView ({ title = 'Grado', grade = '6 A', text = 'Unidad actual: 11' }) {
  return (
    <div className='HeaderTeacherCoordinatorView'>
      <div className='HeaderTeacherCoordinatorView__group'>
        <img src={leftArrow} alt='left arrow' />
        <div className='HeaderTeacherCoordinatorView__title'>{title}</div>
        <div className='HeaderTeacherCoordinatorView__id'>{grade}</div>
      </div>
      <div className='HeaderTeacherCoordinatorView__average'>{text}</div>
    </div>
  )
}
