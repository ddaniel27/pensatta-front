/**
  * @param {string} label
  * @param {string} valueGreen
  * @param {string} valueYellow
  * @param {string} valueRed
  *
  * @returns {component}
  * */
import '../../styles/horizontalBar.css'
export default function HorizontalBar ({ label = '', valueGreen = 0.15, valueYellow = 0.40, valueRed = 0.45 }) {
  return (
    <div className='HorizontalBar'>
      <div className='HorizontalBar__label'>{label}</div>
      <div className='HorizontalBar__bar'>
        <div className='HorizontalBar__bar__green' style={{ width: `${valueGreen * 100}%` }} />
        <div className='HorizontalBar__bar__yellow' style={{ width: `${valueYellow * 100}%` }} />
        <div className='HorizontalBar__bar__red' style={{ width: `${valueRed * 100}%` }} />
      </div>
    </div>
  )
}
