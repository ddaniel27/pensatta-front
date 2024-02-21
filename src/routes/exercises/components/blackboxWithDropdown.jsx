import { useState, useEffect } from 'react'
import GenericSelector from '../../components/genericSelector'
import blackboxSrc from '../../../../public/images/exercises/40/blackbox.svg'
import '../../../styles/blackboxWithDropdown.css'
import { useTranslation } from 'react-i18next'

export default function BlackboxWithDropdown ({ inputs = [0, 0], idBox = 0, setOperationResult }) {
  const { t } = useTranslation('blackboxWithDropdown')
  const options = [
    { value: 0, label: t('sum') },
    { value: 1, label: t('res') },
    { value: 2, label: t('mul') },
    { value: 3, label: t('div') }
  ]
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
        <h2>{t('box')} {idBox}: {inputs[0]} y {inputs[1]}</h2>
        <GenericSelector options={options} setCurrentValue={setSelectedOption} defaultLabel={t('default')} />
      </div>
    </div>
  )
}
