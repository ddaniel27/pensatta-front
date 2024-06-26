// eslint-disable-next-line
import leftArrow from '/images/AuxButtons/left_Default.svg'
import '../../styles/headerTeacherCoordinatorView.css'
import { useContext } from 'react'
import CoordinatorContext from '../../context/CoordinatorContext'

export default function HeaderTeacherCoordinatorView ({ title = 'Grado', grade = '6 A', text = 'Unidad actual: 11' }) {
  const { setPhase, phase } = useContext(CoordinatorContext)

  const handleClick = () => {
    const phases = {
      horizontalBar: 'horizontalRows',
      rows: 'horizontalBar',
      studentIndividual: 'rows',
      studentView: 'studentIndividual'
    }
    setPhase(phases[phase])
  }

  return (
    <div className='HeaderTeacherCoordinatorView'>
      <div className='HeaderTeacherCoordinatorView__group'>
        <img src={leftArrow} alt='left arrow' onClick={handleClick}/>
        {title && <div className='HeaderTeacherCoordinatorView__title'>{title}</div>}
        {grade && <div className='HeaderTeacherCoordinatorView__id'>{grade}</div>}
      </div>
      {text && <div className='HeaderTeacherCoordinatorView__average'>{text}</div>}
    </div>
  )
}
