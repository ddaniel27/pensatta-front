import '../../styles/gradeInfoCard.css'

const defaultData = {
  title: 'Grado',
  lista: [
    {
      grade: '6 A',
      teacher: 'Ramirez'
    },
    {
      grade: '6 B',
      teacher: 'Ramirez'
    },
    {
      grade: '6 C',
      teacher: 'Ramirez'
    },
    {
      grade: '6 D',
      teacher: 'Ramirez'
    },
  ]
}

export default function GradeInfoCard ({ title = defaultData.title, lista = defaultData.lista }) {
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
