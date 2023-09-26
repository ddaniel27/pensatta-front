import HorizontalBar from './horizontalBar'
import '../../styles/CardHorizontalRow.css'

export default function CardHorizontalRow ({ title = 'Grado', average = 5, rows = [] }) {
  return (
    <div className='CardHorizontalRow'>
      <div className='CardHorizontalRow__title'>
        <div className='CardHorizontalRow__title__text'>{title}</div>
        <div className='CardHorizontalRow__title__average'>Unidad promedio: {average}</div>
      </div>
      <HorizontalBarGrid data={rows} />
    </div>
  )
}

function HorizontalBarGrid ({ data }) {
  return (
    <div className='HorizontalBarGrid'>
      {data.map((item, index) => (
        <HorizontalBar key={index} {...item}  />
      ))}
    </div>
  )
}
