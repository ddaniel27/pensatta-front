import React from 'react'
import { addInstitution } from '../../requests'
import GenericSelector from '../components/genericSelector'
import styles from '../../styles/popups.module.css'

const options = [
  { value: 'student', label: 'Estudiante' },
  { value: 'teacher', label: 'Profesor' },
  { value: 'coordinator', label: 'Coordinador' }
]

export default function NewUserModal ({ close }) {
  const [code, setCode] = React.useState('')
  const [name, setName] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [enabled, setEnabled] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const [textDone, setTextDone] = React.useState('')

  React.useEffect(() => {
    if (code !== '' && name !== '' && username !== '' && password !== '') {
      setEnabled(false)
    } else {
      setEnabled(true)
    }
  }, [code, name, username, password])
  const handleClick = () => {
    addInstitution(
      { institution_code: code, name, username, password },
      (data) => {
        if (data.registered) {
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
                          <input type='text' placeholder='Código' value={code} onChange={(e) => { setCode(e.target.value) }} />
                          <input type='text' placeholder='Nombre Completo' value={name} onChange={(e) => { setName(e.target.value) }} />
                          <input type='text' placeholder='Nombre de usuario' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                          <input type='text' placeholder='Contraseña' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                          <GenericSelector options={options} defaultLabel='Rol' />
                        </div>
                        <button onClick={handleClick} disabled={enabled}>Guardar</button>
                      </>
                }
      </div>
    </div>
  )
}
