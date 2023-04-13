import GenericSelector from '../../components/genericSelector'
import blackboxSrc from '../../../../public/images/exercises/40/blackbox.svg'
import '../../../styles/blackboxWithDropdown.css'

const opts = [
  { value: 0, label: 'Sumar' },
  { value: 1, label: 'Restar' },
  { value: 2, label: 'Multiplicar' },
  { value: 3, label: 'Dividir' }
]

export default function BlackboxWithDropdown ({ inputs = [0, 0], idBox = 0, options = opts }) {
  return (
    <div className='blackbox-with-dropdown'>
      <img src={blackboxSrc} alt='blackbox' />
      <div className='blackbox-with-dropdown__selector-area'>
        <h2>Caja {idBox}: {inputs[0]} y {inputs[1]}</h2>
        <GenericSelector options={options} />
      </div>
    </div>
  )
}
