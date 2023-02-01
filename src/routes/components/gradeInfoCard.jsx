import '../../styles/gradeInfoCard.css'

export default function GradeInfoCard ({ title = 'Grado', lista = [] }) {
  return (
    <div className='GradeInfoCard'>
      <div className='GradeInfoCard__title'>
        <h2>{title}</h2>
      </div>
      <div className='GradeInfoCard__list'>
        {lista.map((item, index) => (
          <div className='GradeInfoCard__item' key={index}>
            <span className='GradeInfoCard__item__title'>{item.grade}</span>
            <span className='GradeInfoCard__item__value'>Docente: {item.teacher}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
