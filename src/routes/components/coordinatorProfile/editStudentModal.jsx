import { useState, useEffect } from 'react'
import { changePassword } from '../../../requests'
import styles from '../../../styles/popups.module.css'

export default function EditStudentModal ({ close, userId, studentId }) {
  const [password, setPassword] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [done, setDone] = useState(false)
  const [textDone, setTextDone] = useState('')

  useEffect(() => {
    if (password !== '') {
      setEnabled(false)
    } else {
      setEnabled(true)
    }
  }, [password])
  const handleClick = () => {
    changePassword(
      userId,
      { value: password, field: 'password', id_Estudiante: studentId },
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
                <input type='password' placeholder='Contraseña' value={password} onChange={(e) => { setPassword(e.target.value) }} />
              </div>
              <button onClick={handleClick} disabled={enabled}>GUARDAR</button>
            </>
        }
      </div>
    </div>
  )
}
