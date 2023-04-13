import { useState, useEffect } from 'react'
import GenericSelector from '../../components/genericSelector'
import blackboxSrc from '../../../../public/images/exercises/40/blackbox.svg'
import '../../../styles/blackboxWithDropdown.css'

const opts = [
  { value: 0, label: 'Sumar' },
  { value: 1, label: 'Restar' },
  { value: 2, label: 'Multiplicar' },
  { value: 3, label: 'Dividir' }
]

export default function BlackboxWithDropdown ({ inputs = [0, 0], idBox = 0, options = opts, setOperationResult }) {
  const [selectedOption, setSelectedOption] = useState(null)

  useEffect(() => {
    if (selectedOption === null) return
    const [a, b] = inputs
    const result = selectedOption === '0' ? a + b : selectedOption === '1' ? a - b : selectedOption === '2' ? a * b : a / b
    if (setOperationResult) setOperationResult(result)
  }, [selectedOption])

  return (
    <div className='blackbox-with-dropdown'>
      <img src={blackboxSrc} alt='blackbox' />
      <div className='blackbox-with-dropdown__selector-area'>
        <h2>Caja {idBox}: {inputs[0]} y {inputs[1]}</h2>
        <GenericSelector options={options} setCurrentValue={setSelectedOption} />
      </div>
    </div>
  )
}
