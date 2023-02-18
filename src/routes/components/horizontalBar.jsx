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

export default function HorizontalBar ({ label = '', valueGreen = 0, valueYellow = 0, valueRed = 0, gradoId = null }) {

  const { setPhase, phase, setCtx_hB_r_sI } = useContext(CoordinatorContext)
  const phases = {
    "horizontalBar": "rows"
  }
  console.log('valueGreen', valueGreen)
  console.log('valueYellow', valueYellow)
  console.log('valueRed', valueRed)
  const total = valueGreen + valueYellow + valueRed
  const handleClickBar = () => {
    if(phases[phase]) {
      setPhase(phases[phase]) 
          
    }
    if(gradoId) {
      setCtx_hB_r_sI(prev => ({...prev, gradoId}))
      console.log("gradoId", gradoId)
    }
    
  }

  return (
    <div className='HorizontalBar' onClick={handleClickBar}>
      <div className='HorizontalBar__label'>{label}</div>
      <div className='HorizontalBar__bar'>
        <div className='HorizontalBar__bar__green' style={{ width: `${valueGreen/(total!=0?total:1) * 100}%` }} />
        <div className='HorizontalBar__bar__yellow' style={{ width: `${valueYellow/(total!=0?total:1) * 100}%` }} />
        <div className='HorizontalBar__bar__red' style={{ width: `${valueRed/(total!=0?total:1) * 100}%` }} />
      </div>
    </div>
  )
}
