import { useState, useEffect } from 'react'
import { addGroup, getTeachers } from '../../../requests'
import styles from '../../../styles/popups.module.css'
import GenericSelector from '../genericSelector'

export default function NewGradeModal ({ close, userId }) {
  const [level, setLevel] = useState('')
  const [course, setCourse] = useState('')
  const [teacherSelected, setTeacherSelected] = useState('')
  const [teachers, setTeachers] = useState([])
  const [enabled, setEnabled] = useState(false)
  const [done, setDone] = useState(false)
  const [textDone, setTextDone] = useState('')

  const onChangeGrado = (e) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      setLevel(value)
    }
  }

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
    if (level !== '' && course !== '' && teacherSelected !== '') {
      setEnabled(false)
    } else {
      setEnabled(true)
    }
  }, [level, course, teacherSelected])
  const handleClick = () => {
    addGroup(
      userId,
      { nivel: level, curso: course, id_Profesor: teacherSelected },
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
              <div className={styles['form-container']}>
                <input type='text' placeholder='Grado' value={level} onChange={onChangeGrado} />
                <input type='text' placeholder='Grupo' value={course} onChange={(e) => { setCourse(e.target.value) }} />
                <GenericSelector setCurrentValue={setTeacherSelected} defaultLabel='Elige un profesor' options={teachers}/>
              </div>
              <button onClick={handleClick} disabled={enabled}>GUARDAR</button>
            </>
        }
      </div>
    </div>
  )
}
