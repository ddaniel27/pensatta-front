import { useState, useEffect, useRef } from 'react'
import styles from '../../../styles/tankGame.module.css'
import { useTranslation } from 'react-i18next'

const Tanks = () => {
  return (
    <div className={styles.tanks}>
      <svg width="680" height="480" viewBox="0 0 680 480" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1_29)">
          <path d="M110 100H270V360C270 371.046 261.046 380 250 380H130C118.954 380 110 371.046 110 360V100Z" fill="#D8F8FF" fillOpacity="0.15"/>
        </g>
        <rect x="268" y="332" width="144" height="16" fill="#2F80ED" stroke="#333333" strokeWidth="4"/>
        <path d="M112 102H268V360C268 369.941 259.941 378 250 378H130C120.059 378 112 369.941 112 360V102Z" stroke="#333333" strokeWidth="4"/>
        <g clipPath="url(#clip1_1_29)">
          <path d="M410 100H570V360C570 371.046 561.046 380 550 380H430C418.954 380 410 371.046 410 360V100Z" fill="#D8F8FF" fillOpacity="0.15"/>
        </g>
        <path d="M412 102H568V360C568 369.941 559.941 378 550 378H430C420.059 378 412 369.941 412 360V102Z" stroke="#333333" strokeWidth="4"/>
        <path d="M114.417 102H265.583C271.165 102 275.032 96.4262 273.076 91.1972L271.579 87.1972C270.41 84.0715 267.424 82 264.086 82H115.914C112.576 82 109.59 84.0715 108.421 87.1972L106.924 91.1972C104.968 96.4262 108.835 102 114.417 102Z" fill="#4F4F4F" stroke="#333333" strokeWidth="4"/>
        <path d="M156.176 89.312H152.736V86.8H162.768V89.312H159.344V98H156.176V89.312ZM167.078 89.184C168.518 89.184 169.617 89.5147 170.374 90.176C171.132 90.8267 171.51 91.8293 171.51 93.184V98H168.678V96.88C168.241 97.7227 167.388 98.144 166.118 98.144C165.446 98.144 164.865 98.0267 164.374 97.792C163.884 97.5573 163.51 97.2427 163.254 96.848C163.009 96.4427 162.886 95.984 162.886 95.472C162.886 94.6507 163.201 94.016 163.83 93.568C164.46 93.1093 165.43 92.88 166.742 92.88H168.47C168.417 91.9627 167.804 91.504 166.63 91.504C166.214 91.504 165.793 91.5733 165.366 91.712C164.94 91.84 164.577 92.0213 164.278 92.256L163.254 90.192C163.734 89.872 164.316 89.6267 164.998 89.456C165.692 89.2747 166.385 89.184 167.078 89.184ZM166.966 96.224C167.318 96.224 167.628 96.1387 167.894 95.968C168.161 95.7973 168.353 95.5467 168.47 95.216V94.464H167.158C166.273 94.464 165.83 94.7573 165.83 95.344C165.83 95.6107 165.932 95.824 166.134 95.984C166.337 96.144 166.614 96.224 166.966 96.224ZM179.077 89.184C180.154 89.184 181.018 89.504 181.669 90.144C182.33 90.784 182.661 91.7493 182.661 93.04V98H179.621V93.536C179.621 92.352 179.146 91.76 178.197 91.76C177.674 91.76 177.253 91.9307 176.933 92.272C176.624 92.6133 176.469 93.1253 176.469 93.808V98H173.429V89.328H176.325V90.272C176.666 89.92 177.072 89.6533 177.541 89.472C178.01 89.28 178.522 89.184 179.077 89.184ZM193.863 89.328V101.104H190.823V97.232C190.236 97.84 189.431 98.144 188.407 98.144C187.617 98.144 186.897 97.9627 186.247 97.6C185.607 97.2267 185.095 96.704 184.711 96.032C184.337 95.3493 184.151 94.56 184.151 93.664C184.151 92.768 184.337 91.984 184.711 91.312C185.095 90.6293 185.607 90.1067 186.247 89.744C186.897 89.3707 187.617 89.184 188.407 89.184C189.548 89.184 190.401 89.52 190.967 90.192V89.328H193.863ZM189.047 95.728C189.58 95.728 190.017 95.5467 190.359 95.184C190.7 94.8107 190.871 94.304 190.871 93.664C190.871 93.024 190.7 92.5227 190.359 92.16C190.017 91.7867 189.58 91.6 189.047 91.6C188.513 91.6 188.076 91.7867 187.735 92.16C187.393 92.5227 187.223 93.024 187.223 93.664C187.223 94.304 187.393 94.8107 187.735 95.184C188.076 95.5467 188.513 95.728 189.047 95.728ZM204.94 89.328V98H202.044V97.072C201.724 97.424 201.34 97.6907 200.892 97.872C200.444 98.0533 199.969 98.144 199.468 98.144C198.348 98.144 197.452 97.8133 196.78 97.152C196.118 96.4907 195.788 95.4987 195.788 94.176V89.328H198.828V93.68C198.828 94.3307 198.95 94.8053 199.196 95.104C199.441 95.4027 199.798 95.552 200.268 95.552C200.748 95.552 201.137 95.3867 201.436 95.056C201.745 94.7147 201.9 94.1973 201.9 93.504V89.328H204.94ZM215.762 93.68C215.762 93.7013 215.746 93.952 215.714 94.432H209.41C209.538 94.88 209.783 95.2267 210.146 95.472C210.519 95.7067 210.983 95.824 211.538 95.824C211.954 95.824 212.311 95.7653 212.61 95.648C212.919 95.5307 213.229 95.3387 213.538 95.072L215.138 96.736C214.295 97.6747 213.063 98.144 211.442 98.144C210.429 98.144 209.538 97.952 208.77 97.568C208.002 97.184 207.405 96.6507 206.978 95.968C206.562 95.2853 206.354 94.512 206.354 93.648C206.354 92.7947 206.557 92.032 206.962 91.36C207.378 90.6773 207.949 90.144 208.674 89.76C209.399 89.376 210.215 89.184 211.122 89.184C211.986 89.184 212.77 89.3653 213.474 89.728C214.178 90.08 214.733 90.5973 215.138 91.28C215.554 91.952 215.762 92.752 215.762 93.68ZM211.138 91.344C210.669 91.344 210.274 91.4773 209.954 91.744C209.645 92.0107 209.447 92.3733 209.362 92.832H212.914C212.829 92.3733 212.626 92.0107 212.306 91.744C211.997 91.4773 211.607 91.344 211.138 91.344ZM226.188 86.8V98H223.02V89.248H220.94V86.8H226.188Z" fill="#00D8CC"/>
        <path d="M414.417 102H565.583C571.165 102 575.032 96.4262 573.076 91.1972L571.579 87.1972C570.41 84.0715 567.424 82 564.086 82H415.914C412.576 82 409.59 84.0715 408.421 87.1972L406.924 91.1972C404.968 96.4262 408.835 102 414.417 102Z" fill="#4F4F4F" stroke="#333333" strokeWidth="4"/>
        <path d="M454.629 89.312H451.189V86.8H461.221V89.312H457.797V98H454.629V89.312ZM465.531 89.184C466.971 89.184 468.07 89.5147 468.827 90.176C469.585 90.8267 469.963 91.8293 469.963 93.184V98H467.131V96.88C466.694 97.7227 465.841 98.144 464.571 98.144C463.899 98.144 463.318 98.0267 462.827 97.792C462.337 97.5573 461.963 97.2427 461.707 96.848C461.462 96.4427 461.339 95.984 461.339 95.472C461.339 94.6507 461.654 94.016 462.283 93.568C462.913 93.1093 463.883 92.88 465.195 92.88H466.923C466.87 91.9627 466.257 91.504 465.083 91.504C464.667 91.504 464.246 91.5733 463.819 91.712C463.393 91.84 463.03 92.0213 462.731 92.256L461.707 90.192C462.187 89.872 462.769 89.6267 463.451 89.456C464.145 89.2747 464.838 89.184 465.531 89.184ZM465.419 96.224C465.771 96.224 466.081 96.1387 466.347 95.968C466.614 95.7973 466.806 95.5467 466.923 95.216V94.464H465.611C464.726 94.464 464.283 94.7573 464.283 95.344C464.283 95.6107 464.385 95.824 464.587 95.984C464.79 96.144 465.067 96.224 465.419 96.224ZM477.53 89.184C478.608 89.184 479.472 89.504 480.122 90.144C480.784 90.784 481.114 91.7493 481.114 93.04V98H478.074V93.536C478.074 92.352 477.6 91.76 476.65 91.76C476.128 91.76 475.706 91.9307 475.386 92.272C475.077 92.6133 474.922 93.1253 474.922 93.808V98H471.882V89.328H474.778V90.272C475.12 89.92 475.525 89.6533 475.994 89.472C476.464 89.28 476.976 89.184 477.53 89.184ZM492.316 89.328V101.104H489.276V97.232C488.689 97.84 487.884 98.144 486.86 98.144C486.071 98.144 485.351 97.9627 484.7 97.6C484.06 97.2267 483.548 96.704 483.164 96.032C482.791 95.3493 482.604 94.56 482.604 93.664C482.604 92.768 482.791 91.984 483.164 91.312C483.548 90.6293 484.06 90.1067 484.7 89.744C485.351 89.3707 486.071 89.184 486.86 89.184C488.001 89.184 488.855 89.52 489.42 90.192V89.328H492.316ZM487.5 95.728C488.033 95.728 488.471 95.5467 488.812 95.184C489.153 94.8107 489.324 94.304 489.324 93.664C489.324 93.024 489.153 92.5227 488.812 92.16C488.471 91.7867 488.033 91.6 487.5 91.6C486.967 91.6 486.529 91.7867 486.188 92.16C485.847 92.5227 485.676 93.024 485.676 93.664C485.676 94.304 485.847 94.8107 486.188 95.184C486.529 95.5467 486.967 95.728 487.5 95.728ZM503.393 89.328V98H500.497V97.072C500.177 97.424 499.793 97.6907 499.345 97.872C498.897 98.0533 498.422 98.144 497.921 98.144C496.801 98.144 495.905 97.8133 495.233 97.152C494.572 96.4907 494.241 95.4987 494.241 94.176V89.328H497.281V93.68C497.281 94.3307 497.404 94.8053 497.649 95.104C497.894 95.4027 498.252 95.552 498.721 95.552C499.201 95.552 499.59 95.3867 499.889 95.056C500.198 94.7147 500.353 94.1973 500.353 93.504V89.328H503.393ZM514.215 93.68C514.215 93.7013 514.199 93.952 514.167 94.432H507.863C507.991 94.88 508.236 95.2267 508.599 95.472C508.972 95.7067 509.436 95.824 509.991 95.824C510.407 95.824 510.764 95.7653 511.063 95.648C511.372 95.5307 511.682 95.3387 511.991 95.072L513.591 96.736C512.748 97.6747 511.516 98.144 509.895 98.144C508.882 98.144 507.991 97.952 507.223 97.568C506.455 97.184 505.858 96.6507 505.431 95.968C505.015 95.2853 504.807 94.512 504.807 93.648C504.807 92.7947 505.01 92.032 505.415 91.36C505.831 90.6773 506.402 90.144 507.127 89.76C507.852 89.376 508.668 89.184 509.575 89.184C510.439 89.184 511.223 89.3653 511.927 89.728C512.631 90.08 513.186 90.5973 513.591 91.28C514.007 91.952 514.215 92.752 514.215 93.68ZM509.591 91.344C509.122 91.344 508.727 91.4773 508.407 91.744C508.098 92.0107 507.9 92.3733 507.815 92.832H511.367C511.282 92.3733 511.079 92.0107 510.759 91.744C510.45 91.4773 510.06 91.344 509.591 91.344ZM528.497 95.488V98H519.777V96.016L523.969 92.096C524.374 91.712 524.646 91.3867 524.785 91.12C524.924 90.8427 524.993 90.5653 524.993 90.288C524.993 89.9253 524.87 89.6427 524.625 89.44C524.38 89.2373 524.022 89.136 523.553 89.136C523.137 89.136 522.753 89.232 522.401 89.424C522.06 89.6053 521.777 89.872 521.553 90.224L519.201 88.912C519.638 88.1867 520.252 87.616 521.041 87.2C521.83 86.784 522.764 86.576 523.841 86.576C524.694 86.576 525.446 86.7147 526.097 86.992C526.758 87.2693 527.27 87.6693 527.633 88.192C528.006 88.704 528.193 89.3013 528.193 89.984C528.193 90.592 528.06 91.168 527.793 91.712C527.537 92.2453 527.036 92.8533 526.289 93.536L524.177 95.488H528.497Z" fill="#00D8CC"/>
        <defs>
          <clipPath id="clip0_1_29">
            <path d="M110 100H270V360C270 371.046 261.046 380 250 380H130C118.954 380 110 371.046 110 360V100Z" fill="white"/>
          </clipPath>
          <clipPath id="clip1_1_29">
            <path d="M410 100H570V360C570 371.046 561.046 380 550 380H430C418.954 380 410 371.046 410 360V100Z" fill="white"/>
          </clipPath>
        </defs>
      </svg>

    </div>

  )
}
const Fills = ({ oneSign = -1, twoSign = 1, triggerFill = false, oneColor = '#2F80ED', twoColor = '#2F80ED', setTriggerFill }) => {
  const [one, setOne] = useState(280)
  const [two, setTwo] = useState(280)
  const fillInterval = useRef(null)

  useEffect(() => {
    if (triggerFill) {
      fillInterval.current = setInterval(() => {
        setOne(prev => prev + oneSign)
        setTwo(prev => prev + twoSign)
      }, 10)
    }
  }, [triggerFill])

  useEffect(() => {
    if (one >= 330 || two >= 330) {
      clearInterval(fillInterval.current)
      setTriggerFill(false)
    }
  }, [one, two])
  return (
    <div className={styles['fills-tanks']}>
      <svg width="680" height="480" viewBox="0 0 680 480" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className={styles['one-big']} d={`M110 ${one}H270V360C270 371.046 261.046 380 250 380H130C118.954 380 110 371.046 110 360V280Z`} fill={oneColor}/>
        <path className={styles['two-little']} d={`M410 ${two}H570V360C570 371.046 561.046 380 550 380H430C418.954 380 410 371.046 410 360V280Z`} fill={twoColor}/>
      </svg>
    </div>

  )
}

const TankGameComponent = ({ setAct1, setAct2, setAct3, setAct4, setStage, setPhase, setScore, algorithm = [{ function: 'tempIncrease', tank: 1 }, { function: 'decreasePressure', tank: 1 }, { function: 'fromOneToAnother', tank: 1 }, { function: 'tempDecrease', tank: 2 }], corrects = [{ function: 'tempIncrease', tank: 1 }, { function: 'decreasePressure', tank: 1 }, { function: 'fromOneToAnother', tank: 2 }, { function: 'tempDecrease', tank: 2 }] }) => {
  const { t } = useTranslation('tankGameComponent')
  const [oneSign, setOneSign] = useState(1)
  const [twoSign, setTwoSign] = useState(1)
  const [colorOne, setColorOne] = useState('#2F80ED')
  const [colorTwo, setColorTwo] = useState('#2F80ED')
  const [triggerFill, setTriggerFill] = useState(false)
  const [isFinish, setIsFinish] = useState(false)
  const [validationAns, setValidationAns] = useState([])

  const texts = {
    1: {
      tempIncrease: t('instructions1.tempIncrease'),
      tempDecrease: t('instructions1.tempDecrease'),
      increasePressure: t('instructions1.increasePressure'),
      decreasePressure: t('instructions1.decreasePressure'),
      fromOneToAnother: t('instructions1.fromOneToAnother')
    },
    2: {
      tempIncrease: t('instructions2.tempIncrease'),
      tempDecrease: t('instructions2.tempDecrease'),
      increasePressure: t('instructions2.increasePressure'),
      decreasePressure: t('instructions2.decreasePressure'),
      fromOneToAnother: t('instructions2.fromOneToAnother')
    }

  }

  function objectsAreEqual (obj1, obj2) {
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) {
      return false
    }

    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false
      }
    }
    return true
  }

  function arraysAreEqual (arr1, arr2) {
    const newValidationsAns = arr1.map((item, index) => {
      return objectsAreEqual(item, arr2[index])
    })
    return newValidationsAns
  }

  const tempIncrease = (tank) => {
    if (tank == 1) {
      setColorOne('#FF7171')
    } else {
      setColorTwo('#FF7171')
    }
  }
  const tempDecrease = (tank) => {
    if (tank == 1) {
      setColorOne('#56CCF2')
    } else {
      setColorTwo('#56CCF2')
    }
  }
  const increasePressure = (tank) => {
    setOneSign(prev => prev * 3)
    setTwoSign(prev => prev * 3)
  }
  const decreasePressure = (tank) => {
    setOneSign(prev => prev / 3)
    setTwoSign(prev => prev / 3)
  }

  const fromOneToAnother = (tank) => {
    if (tank == 1) {
      setOneSign(prev => Math.abs(prev))
      setTwoSign(prev => -Math.abs(prev))
    } else {
      setOneSign(prev => -Math.abs(prev))
      setTwoSign(prev => Math.abs(prev))
    }
    setTriggerFill(true)
  }

  const functionsForAlgorithm = {
    tempIncrease,
    tempDecrease,
    fromOneToAnother,
    increasePressure,
    decreasePressure
  }

  function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function runAlgorithm () {
    await sleep(800)
    functionsForAlgorithm[algorithm[0].function](algorithm[0].tank)
    await sleep(2000)
    functionsForAlgorithm[algorithm[1].function](algorithm[1].tank)
    await sleep(2000)
    functionsForAlgorithm[algorithm[2].function](algorithm[2].tank)
    await sleep(2000)
    functionsForAlgorithm[algorithm[3].function](algorithm[3].tank)
    await sleep(1000)
    setIsFinish(true)
  }

  const handleFinish = () => {
    const scr = validationAns.filter(item => item).length
    setScore(scr)
    setPhase('end')
  }

  useEffect(() => {
    if (isFinish) {
      setValidationAns(arraysAreEqual(algorithm, corrects))
    }
  }, [isFinish])

  useEffect(() => {
    runAlgorithm()

    return () => {
      setStage(0)
      setAct1(null)
      setAct2(null)
      setAct3(null)
      setAct4(null)
    }
  }, [])

  return (
    <>
      <div className={styles['phase-two-container']}>
        <div className={styles['tanks-container']}>
          <Fills triggerFill={triggerFill} setTriggerFill={setTriggerFill} oneSign={oneSign} twoSign={twoSign} oneColor={colorOne} twoColor={colorTwo} />
          <Tanks />
        </div>
        <div className={styles['answers-container']}>
          {t('controlPanel')}
          {
            algorithm.map((item, index) => {
              return (
                <div key={index} className={`${styles.answer} ${isFinish ? (validationAns[index] ? styles['correct-answer'] : styles['wrong-answer']) : ''}`}>
                  {
                    texts[item.tank][item.function]
                  }
                </div>
              )
            })
          }
        </div>
      </div>
      {isFinish && <button onClick={handleFinish}>{t('btnNext')}</button>}
    </>

  )
}
export default TankGameComponent
