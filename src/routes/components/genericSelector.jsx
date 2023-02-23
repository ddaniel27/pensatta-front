import React from 'react'
import styles from '../../styles/genericSelector.module.css'

export default function GenericSelector ({ setCurrentValue, options = [], defaultLabel = 'Select an option' }) {
  const handleChange = ({ target }) => {
    if (setCurrentValue) {
      setCurrentValue(target.value)
    }
  }

  return (
    <div className={styles['exercise-selector-area']}>
      <select defaultValue={0} onChange={handleChange}>
        <option value='0' hidden disabled>{defaultLabel}</option>
        {
          options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))
        }
      </select>
    </div>
  )
}
