import { useState, useEffect } from 'react'
import { addGroup, getTeachers } from '../../../requests'
import styles from '../../../styles/popups.module.css'

export default function NewGradeModal ({ close, userId }) {
  const [level, setLevel] = useState('')
  const [course, setCourse] = useState('')
  const [teacherSelected, setTeacherSelected] = useState('')
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    getTeachers(userId, response => {
      setTeachers(response.profesores)
    })
  }, [])

  useEffect(() => {

  }, [teachers])

  const [enabled, setEnabled] = useState(false)
  const [done, setDone] = useState(false)
  const [textDone, setTextDone] = useState('')

  useEffect(() => {
    if (level !== '' && course !== '' && teacherSelected !== '') {
      setEnabled(false)
    } else {
      setEnabled(true)
    }
  }, [level, course, teacherSelected])
  const handleClick = () => {
    addGroup(
      { nivel: level, curso: course, profesor: teacherSelected },
      (response) => {
        if (response.added) {
          setTextDone('Se ha añadido correctamente')
        } else {
          setTextDone('No se ha podido añadir')
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
              <input type='text' placeholder='Grado' value={level} onChange={(e) => { setLevel(e.target.value) }} />
              <input type='text' placeholder='Grupo' value={course} onChange={(e) => { setCourse(e.target.value) }} />
              <button onClick={handleClick} disabled={enabled}>Guardar</button>
            </>
        }
      </div>
    </div>
  )
}
