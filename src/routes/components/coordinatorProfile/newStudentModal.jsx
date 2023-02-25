import { useState, useEffect } from 'react'
import { addStudent } from '../../../requests'
import styles from '../../../styles/popups.module.css'

export default function NewStudentModal ({ close, userId, courseId }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [numLista, setNumLista] = useState('')
  const [password, setPassword] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [done, setDone] = useState(false)
  const [textDone, setTextDone] = useState('')

  useEffect(() => {
    if (firstName !== '' && lastName !== '' && numLista !== '' && password !== '') {
      setEnabled(false)
    } else {
      setEnabled(true)
    }
  }, [firstName, lastName, numLista, password])
  const handleClick = () => {
    addStudent(
      userId,
      { first_name: firstName, last_name: lastName, num_lista: numLista, password, id_Grado: courseId },
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
                <input type='text' placeholder='Primer Nombre' value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                <input type='text' placeholder='Primer Apellido' value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                <input type='number' placeholder='Número de lista' value={numLista} onChange={(e) => { setNumLista(e.target.value) }} />
                <input type='password' placeholder='Contraseña' value={password} onChange={(e) => { setPassword(e.target.value) }} />
              </div>
              <button onClick={handleClick} disabled={enabled}>GUARDAR</button>
            </>
        }
      </div>
    </div>
  )
}
