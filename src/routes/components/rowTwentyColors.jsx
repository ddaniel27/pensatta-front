import '../../styles/rowTwentyColors.css'
import { useContext } from 'react'
import CoordinatorContext from '../../context/CoordinatorContext'

const rowList = new Array(20).fill(0)

export default function RowTwentyColors ({ label = '', list = [] }) {

  const { setPhase } = useContext(CoordinatorContext)

  return (
    <div className='RowTwentyColors' onClick={()=> setPhase("studentIndividual")}>
      <div className='RowTwentyColors__label'>{label}</div>
      <div className='RowTwentyColors__list'>
        {rowList.map((_item, index) => {
          const text = index < 9 ? `0${index + 1}` : `${index + 1}`
          let className = ''
          if (index < list.length) {
            className = list[index] < 0.6
              ? 'RowTwentyColorsRed'
              : (list[index] < 0.8 ? 'RowTwentyColorsYellow' : 'RowTwentyColorsGreen')
          }
          return (
            <div className={`RowTwentyColors__item ${className}`} key={index}>{text}</div>
          )
        })}
      </div>
    </div>
  )
}
