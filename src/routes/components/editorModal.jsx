import React from 'react'
import { updateInsitutions } from '../../requests'
import styles from '../../styles/popups.module.css'

export default function EditorModal ({ institution, field, close }) {
  const [value, setValue] = React.useState('')
  const [enabled, setEnabled] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const [textDone, setTextDone] = React.useState('')

  React.useEffect(() => {
    if (value !== '') {
      setEnabled(false)
    } else {
      setEnabled(true)
    }
  }, [value])

  const handleClick = () => {
    updateInsitutions(
      { institution_code: institution, field, value },
      (data) => {
        if (data.updated) {
          setTextDone('Se ha actualizado correctamente')
        } else {
          setTextDone('No se ha podido actualizar')
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
              <h2>Ingrese el nuevo valor</h2>
              <input type='text' placeholder={field} value={value} onChange={(e) => { setValue(e.target.value) }} />
              <button onClick={handleClick} disabled={enabled}>Guardar</button>
              </>
        }
      </div>
    </div>
  )
}
