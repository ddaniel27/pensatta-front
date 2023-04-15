import { useState, useEffect } from 'react'
import { getTeachers, reasignTeacher } from '../../../requests'
import styles from '../../../styles/popups.module.css'
import GenericSelector from '../genericSelector'

export default function ReasignTeacherModal ({ close, userId, courseId }) {
  const [teachers, setTeachers] = useState([])
  const [teacher, setTeacher] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [done, setDone] = useState(false)
  const [textDone, setTextDone] = useState('')

  useEffect(() => {
    getTeachers(userId, response => {
      const options = response.profesores.map(teacher => ({
        value: teacher.id,
        label: `${teacher.first_name} ${teacher.last_name}`
      }))
      setTeachers(options)
    })
  }, [])

  useEffect(() => {
    if (teacher !== '') {
      setEnabled(false)
    } else {
      setEnabled(true)
    }
  }, [teacher])

  const handleClick = () => {
    reasignTeacher(
      userId,
      { id_Grado: courseId, id_Profesor: teacher },
      (response) => {
        if (response.reassigned) {
          setTextDone('Se cambió correctamente')
        } else {
          setTextDone('No se ha podido cambiar')
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
              <h2>Llene los siguientes campos</h2>
              <div className={styles['form-container']}>
                <GenericSelector setCurrentValue={setTeacher} defaultLabel='Elige un profesor' options={teachers}/>
              </div>
              <button onClick={handleClick} disabled={enabled}>GUARDAR</button>
            </>
        }
      </div>
    </div>
  )
}
