import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import styles from '../../../styles/textSelect.module.css'

const TextSelectComponent = ({ text, options, setPhase, setScore }) => {
  const [answers, setAnswers] = useState(options.map(option => ({ value: option.value, answer: null, isCorrect: false })))
  const [allAnswered, setAllAnswered] = useState(false)
  const [isFinish, setIsFinish] = useState(false)
  const { t } = useTranslation("textSelectComponent")

  const handleChange = (event, index) => {
    const newAnswers = answers.map(
      ans => {
        if (ans.value == index) {
          return { ...ans, answer: event.value }
        }
        return ans
      }
    )
    setAnswers(newAnswers)
  }

  useEffect(() => {
    if (answers.filter((obj) => obj.answer != null).length >= options.length) {
      setAllAnswered(true)
    }
  }, [answers])

  const handleFinish = () => {
    setScore(answers.filter((obj) => obj.isCorrect === true).length)
    setPhase('end')
  }

  const handleResponder = () => {
    setIsFinish(true)
    const newAnswers = answers.map(
      ans => {
        if (ans.value == ans.answer) {
          return { ...ans, isCorrect: true }
        }
        return ans
      }
    )
    setAnswers(newAnswers)
  }

  return (
    <>
      <div className={styles.allContainer}>
        <div className={styles.gameContainer}>
          <p>
            {
              text.map((str, index) => {
                return str == '%INSERTTEXT%'
                  ? <div key={index} style={{ display: 'inline-block', verticalAlign: 'middle' }}> <Select options={options.sort(() => Math.random() - 0.5)} onChange={(e) => handleChange(e, index)} defaultValue={{ label: '-', value: 'empty' }}
                    styles={{
                      singleValue: (base) => ({
                        ...base,
                        borderRadius: 5,
                        background: !isFinish ? '#F2F2F2' : answers.find(ans => ans.value == index).isCorrect ? '#69E485' : '#FF7171',
                        display: 'flex',
                        minWidth: 100,
                        minHeight: 20,
                        maxHeight: 20,
                        color: '#00635D',
                        fontSize: 14,
                        padding: 0

                      }),
                      indicatorsContainer: (provided) => ({
                        ...provided,
                        minHeight: 20,
                        maxHeight: 20
                      }),
                      valueContainer: (provided) => ({
                        ...provided,
                        minHeight: 20,
                        maxHeight: 20
                      }),
                      input: (provided) => ({
                        ...provided,
                        minHeight: 20,
                        maxHeight: 20
                      }),
                      indicatorSeparator: (provided) => ({
                        ...provided,
                        display: 'none'
                      }),
                      control: (provided) => ({
                        ...provided,
                        border: 'none',
                        borderRadius: 10,
                        background: '#F2F2F2',
                        minHeight: 20,
                        maxHeight: 20
                      })
                    }}
                    components={!isFinish
                      ? null
                      : {
                        Menu: () => null,
                        MenuList: () => null,
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null
                      }
                    }/> </div>
                  : str
              })
            }
          </p>
        </div>
      </div>
      {allAnswered && !isFinish && <button onClick={handleResponder}>{t("answer-button")}</button>}
      {isFinish && <button onClick={handleFinish}>{t("next-button")}</button>}
    </>
  )
}
export default TextSelectComponent
