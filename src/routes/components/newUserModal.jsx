import { useState, useEffect } from 'react'
import { postRegister } from '../../requests'
import GenericSelector from '../components/genericSelector'
import styles from '../../styles/popups.module.css'

const options = [
  { value: 'student', label: 'Estudiante' },
  { value: 'teacher', label: 'Profesor' },
  { value: 'coordinator', label: 'Coordinador' }
]

export default function NewUserModal ({ close }) {
  const [code, setCode] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [numb, setNumb] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState('')

  const [enabled, setEnabled] = useState(false)
  const [done, setDone] = useState(false)
  const [textDone, setTextDone] = useState('')

  useEffect(() => {
    if (code !== '' && firstname !== '' && lastname !== '' && numb !== '' && password !== '' && rol !== '') {
      setEnabled(false)
    } else {
      setEnabled(true)
    }
  }, [code, firstname, lastname, numb, password, rol])
  const handleClick = () => {
    postRegister(
      { institution_code: code, password, first_name: firstname, last_name: lastname, list_number: numb, role: rol },
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
                <input type='text' placeholder='Código de la Institución' value={code} onChange={(e) => { setCode(e.target.value) }} />
                <input type='text' placeholder='Primer Nombre' value={firstname} onChange={(e) => { setFirstname(e.target.value) }} />
                <input type='text' placeholder='Primer Apellido' value={lastname} onChange={(e) => { setLastname(e.target.value) }} />
                <input type='text' placeholder='Numero de lista' value={numb} onChange={(e) => { setNumb(e.target.value) }} />
                <input type='password' placeholder='Contraseña' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <GenericSelector options={options} defaultLabel='Rol' setCurrentValue={setRol} />
              </div>
              <button onClick={handleClick} disabled={enabled}>Guardar</button>
            </>
        }
      </div>
    </div>
  )
}
