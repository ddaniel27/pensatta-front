import '../../styles/rowTwentyColors.css'
import { useContext } from 'react'
import CoordinatorContext from '../../context/CoordinatorContext'

const rowList = new Array(20).fill(0)

export default function RowTwentyColors ({ label = '', list = [{ id: 0, score: 0 }], id = null }) {
  const { setPhase, setCtx_hB_r_sI, phase } = useContext(CoordinatorContext)
  const handleClickRow = () => {
    if (phase === 'rows') {
      setCtx_hB_r_sI(prev => ({ ...prev, studentSelected: id, studentSelectedUser: label }))
      setPhase('studentIndividual')
    } else if (phase === 'studentIndividual') {
      setPhase('studentView')
    }
  }

  console.log('list', list)

  return (
    <div className='RowTwentyColors' onClick={handleClickRow}>
      <div className='RowTwentyColors__label'>{label}</div>
      <div className='RowTwentyColors__list'>
        {rowList.map((_item, index) => {
          const text = list[index]?.id < 9 ? `0${list[index]?.id}` : `${list[index]?.id}`
          let className = ''
          if (list[index]?.score || list[index]?.score === 0) {
            className = list[index]?.score < 0.6
              ? 'RowTwentyColorsRed'
              : (list[index]?.score < 0.8 ? 'RowTwentyColorsYellow' : 'RowTwentyColorsGreen')
          }
          return (
            <div className={`RowTwentyColors__item ${className}`} key={index}>{text !== 'undefined' ? text : '-'}</div>
          )
        })}
      </div>
    </div>
  )
}
