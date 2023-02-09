/**
  * @param {string} label
  * @param {string} valueGreen
  * @param {string} valueYellow
  * @param {string} valueRed
  *
  * @returns {component}
  * */
import '../../styles/horizontalBar.css'
import { useContext } from 'react'
import CoordinatorContext from '../../context/CoordinatorContext'

export default function HorizontalBar ({ label = '', valueGreen = 0.34, valueYellow = 0.33, valueRed = 0.33 }) {
  const { setPhase, phase } = useContext(CoordinatorContext)
  const phases = {
    "horizontalBar": "rows"
  }
  const handleClickBar = () => {
    if(phases[phase]) {
      setPhase(phases[phase])      
    }
    
  }

  return (
    <div className='HorizontalBar' onClick={handleClickBar}>
      <div className='HorizontalBar__label'>{label}</div>
      <div className='HorizontalBar__bar'>
        <div className='HorizontalBar__bar__green' style={{ width: `${valueGreen * 100}%` }} />
        <div className='HorizontalBar__bar__yellow' style={{ width: `${valueYellow * 100}%` }} />
        <div className='HorizontalBar__bar__red' style={{ width: `${valueRed * 100}%` }} />
      </div>
    </div>
  )
}
