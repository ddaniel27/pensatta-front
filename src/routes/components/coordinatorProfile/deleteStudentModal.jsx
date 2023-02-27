import { useState } from 'react'
import { deleteStudentFromCourse } from '../../../requests'
import styles from '../../../styles/popups.module.css'

export default function DeleteStudentModal ({ close, userId, student, courseId }) {
  const [done, setDone] = useState(false)
  const [textDone, setTextDone] = useState('')

  const handleClick = () => {
    deleteStudentFromCourse(
      userId,
      { id_Grado: courseId, id_Estudiante: student.id },
      (response) => {
        if (response.updated) {
          setTextDone('Estudiante eliminado correctamente')
        } else {
          setTextDone('No se ha podido eliminar al estudiante')
        }
        setDone(true)
      },
      () => {
        alert('Error')
      })
  }

  return (
    <div className={styles['big-container']}>
      <div className={styles['editor-modal']}>
        {
          done
            ? <>
              <h2>{textDone}</h2>
              <button onClick={() => { window.location.reload() }}>ACTUALIZAR</button>
            </>
            : <>
              <span onClick={() => { close(false) }} />
              <h2>{`¿Eliminar al estudiante ${student.name}?`}</h2>
              <button onClick={handleClick}>Sí</button>
              <button onClick={() => { close(false) }}>No</button>
            </>
        }
      </div>
    </div>
  )
}
