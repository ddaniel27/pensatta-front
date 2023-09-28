import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../../../styles/laboratory.module.css'

const Bottle = ({ color, selected, setSelected, id, onClick }) => {
  const handleClick = () => {
    const newSelected = [...selected]
    if (!newSelected.includes(id)) {
      if (newSelected.length <= 1) {
        newSelected.push(id)
      } else {
        newSelected.shift()
        newSelected.push(id)
      }
    }
    setSelected(newSelected)
  }
  return (
    <div className={`${styles['bottle-container']} ${selected.includes(id) ? styles['bottle-selected'] : ''}`} onClick = {() => onClick(id)}>
      <svg width="24" height="84" viewBox="0 0 24 84" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleClick}>
        <path d="M4 6H3V7V74C3 78.9706 7.02944 83 12 83C16.9706 83 21 78.9706 21 74V7V6H20H4Z" fill="#D8F8FF" fillOpacity="0.75" stroke="white" strokeWidth="2"/>
        <path d="M4 24H20V74C20 78.4183 16.4183 82 12 82V82C7.58172 82 4 78.4183 4 74V24Z" fill={color}/>
        <rect x="1" y="1" width="22" height="6" rx="3" fill="#D8F8FF" stroke="white" strokeWidth="2"/>
      </svg>
    </div>

  )
}

const BowlFill = ({ color }) => {
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">

      <path d="M2 52H82V52C82 68.5685 68.5685 82 52 82H32C15.4315 82 2 68.5685 2 52V52Z" fill={color}/>
    </svg>

  )
}

const LaboratoryGame = ({ algorithm = ['green', 'blue', 'bowl', 'fire', 'mix'], image = 'var1', setPhase, setScore }) => {
  const [selected, setSelected] = useState([])
  const [fire, setFire] = useState(false)
  const [bowl, setBowl] = useState(false)
  const [bowlFull, setBowlFull] = useState(false)
  const [answer, setAnswer] = useState([])
  const [isFinish, setIsFinish] = useState(false)
  const { t } = useTranslation("laboratoryComponent")

  const bottles = { yellow: '#EDCA71', blue: '#2F80ED', red: '#EB5757', green: '#27AE60', orange: '#F2994A', violet: '#B251E0' }
  const r = Math.round
  function toRGBA (d) {
    const l = d.length
    const rgba = {}
    if (d.slice(0, 3).toLowerCase() === 'rgb') {
      d = d.replace(' ', '').split(',')
      rgba[0] = parseInt(d[0].slice(d[3].toLowerCase() === 'a' ? 5 : 4), 10)
      rgba[1] = parseInt(d[1], 10)
      rgba[2] = parseInt(d[2], 10)
      rgba[3] = d[3] ? parseFloat(d[3]) : -1
    } else {
      if (l < 6) d = parseInt(String(d[1]) + d[1] + d[2] + d[2] + d[3] + d[3] + (l > 4 ? String(d[4]) + d[4] : ''), 16)
      else d = parseInt(d.slice(1), 16)
      rgba[0] = (d >> 16) & 255
      rgba[1] = (d >> 8) & 255
      rgba[2] = d & 255
      rgba[3] = l === 9 || l === 5 ? r((((d >> 24) & 255) / 255) * 10000) / 10000 : -1
    }
    return rgba
  }

  function blend (from = '#00000', to = '#00000', p = 0.5) {
    from = from.trim()
    to = to.trim()
    const b = p < 0
    p = b ? p * -1 : p
    const f = toRGBA(from)
    const t = toRGBA(to)
    if (to[0] === 'r') {
      return 'rgb' + (to[3] === 'a' ? 'a(' : '(') +
        r(((t[0] - f[0]) * p) + f[0]) + ',' +
        r(((t[1] - f[1]) * p) + f[1]) + ',' +
        r(((t[2] - f[2]) * p) + f[2]) + (
        f[3] < 0 && t[3] < 0
          ? ''
          : ',' + (
            f[3] > -1 && t[3] > -1
              ? r((((t[3] - f[3]) * p) + f[3]) * 10000) / 10000
              : t[3] < 0 ? f[3] : t[3]
          )
      ) + ')'
    }

    return '#' + (0x100000000 + ((
      f[3] > -1 && t[3] > -1
        ? r((((t[3] - f[3]) * p) + f[3]) * 255)
        : t[3] > -1 ? r(t[3] * 255) : f[3] > -1 ? r(f[3] * 255) : 255
    ) * 0x1000000) +
      (r(((t[0] - f[0]) * p) + f[0]) * 0x10000) +
      (r(((t[1] - f[1]) * p) + f[1]) * 0x100) +
      r(((t[2] - f[2]) * p) + f[2])
    ).toString(16).slice(f[3] > -1 || t[3] > -1 ? 1 : 3)
  }

  const handleBowlClick = () => {
    if (answer.length <= algorithm.length) {
      setBowl(true)
      setAnswer([...answer, 'bowl'])
    }
  }
  const handleFireClick = () => {
    if (answer.length <= algorithm.length) {
      setFire(true)
      setAnswer([...answer, 'fire'])
    }
  }

  const handleBowlFullClick = () => {
    if (answer.length <= algorithm.length) {
      setBowlFull(true)
      setAnswer([...answer, 'mix'])
    }
  }

  const handleBottleClick = (color) => {
    if (answer.length <= algorithm.length) {
      setAnswer([...answer, color])
    }
  }

  useEffect(() => {
    if (answer.length > 0) {
      setIsFinish(!answer.every((item, index) => item === algorithm[index]) || answer.length === algorithm.length)
    }
  }, [answer])

  useEffect(() => {
    if (isFinish) {
      const isWin = algorithm.every((item, index) => item === answer[index])
      setScore(isWin ? 1 : 0)
      if (isWin) {
        setTimeout(() => {
          setPhase('end')
        }, 3000)
      } else {
        setPhase('end')
      }
    }
  }, [isFinish])

  return (
    <>
      <div className={styles['all-game-container']}>
        <div className={styles['game-container']}>
          <div className={styles['game-algorithm']} style={{ backgroundImage: `url(/images/exercises/80/${image}.svg)` }} />
          <div className={styles['game-lab']}>
            <div className={styles['bottles-container']}>
              {
                Object.keys(bottles).map((bottle, index) => {
                  return (
                    <Bottle color={bottles[bottle]} key={index} id={bottle} selected={selected} setSelected={setSelected} onClick={handleBottleClick}/>
                  )
                })
              }
            </div>
            <div className={styles['lab-container']}>
              <div className = {styles['experiment-container']}>
                {bowl && <div className={styles.bowl} />}
                {bowlFull && <BowlFill color={blend(bottles[selected[0]], bottles[selected[1]], 0.5)} />}
                {fire && <div className={styles.fire} />}
                <div className={styles.burner} />
              </div>
            </div>
          </div>
          <div className={styles['game-buttons']}>
            <div className={`${styles['game-button']} ${styles['game-button-bowl']}`} onClick={handleBowlClick}>{t("recipient")}</div>
            <div className={`${styles['game-button']} ${styles['game-button-fire']}`} onClick={handleFireClick}>{t("turn-on")}</div>
            <div className={`${styles['game-button']} ${styles['game-button-mix']}`} onClick={handleBowlFullClick}>{t("mix")}</div>
          </div>

        </div>

      </div>
    </>
  )
}
export default LaboratoryGame
