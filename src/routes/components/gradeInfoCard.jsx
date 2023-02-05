import styles from '../../styles/gradeInfoCard.module.css'
import pencil from '/images/Atomo_Icono_Editar.svg'

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
    }
  ]
}

export default function GradeInfoCard ({ title = defaultData.title, lista = defaultData.lista }) {
  return (
    <div className={styles['grade-info-card']}>
      <div className={styles['grade-info-card-title']}>
        <h2>{title}</h2>
        <img src={pencil} alt='pencil' />
      </div>
      <div className={styles['grade-info-card-list']}>
        {lista.map((item, index) => (
          <div className={styles['grade-info-card-item']} key={index}>
            <span className={styles['grade-info-card-item-title']}>{item.grade}</span>
            <span className={styles['grade-info-card-item-value']}>Docente: {item.teacher}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
