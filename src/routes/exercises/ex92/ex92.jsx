import { useState, useEffect, useRef } from 'react'
import ScoringComponent from '../components/scoringComponent'
import TankGameComponent from '../components/tankGameComponent'
import GenericSelector from '../../components/genericSelector'
import data from './data.json'
import styles from '../../../styles/ex92.module.css'

export default function Ex92 () {
  const [stage, setStage] = useState(0)
  const [conti, setConti] = useState(false)

  const [act1, setAct1] = useState(null)
  const [act2, setAct2] = useState(null)
  const [act3, setAct3] = useState(null)
  const [act4, setAct4] = useState(null)

  const [myData] = useState({
    ...data,
    variations: data.variations.sort(() => 0.5 - Math.random()).slice(0, 1)[0]
  })

  const pRef = useRef()

  useEffect(() => {
    if (act1?.function && act2?.function && act3?.function && act4?.function) {
      if (act1?.tank && act2?.tank && act3?.tank && act4?.tank) {
        setConti(true)
      }
    }
  }, [act1, act2, act3, act4])

  useEffect(() => {
    async function test () {
      while (!pRef.current) {
        await new Promise(resolve => setTimeout(resolve, 500))
        console.log('waiting...')
      }
      pRef.current.innerHTML = myData.variations.text
    }
    test()
  })

  return (
    <ScoringComponent initMessages={data.initMessages} title={data.name} background={data.color} threshold={data.threshold} exerciseId={data.id}>
      {
        (setScore, setPhase) => (
          <>
            {
              stage === 0 &&
                <div className={styles['fase-1']}>
                  <div className={styles['fase-1__actions']}>
                    <ActionSelector setAction={setAct1} />
                    <ActionSelector setAction={setAct2} />
                    <ActionSelector setAction={setAct3} />
                    <ActionSelector setAction={setAct4} />
                  </div>
                  <div className={styles.texts}>
                    <p ref={pRef} />
                  </div>
                  {conti && <button onClick={() => setStage(1)}>SIGUIENTE</button>}
                </div>
            }
            {stage === 1 &&
              <TankGameComponent
                setPhase={setPhase} setScore={setScore}
                algorithm={[act1, act2, act3, act4]}
                corrects={myData.variations.sequence}
              />}
          </>
        )
      }
    </ScoringComponent>
  )
}

function ActionSelector ({ setAction }) {
  const [func, setFunc] = useState('')
  const [tank, setTank] = useState(0)

  useEffect(() => {
    if (func && tank && setAction) {
      setAction({ function: func, tank: Number(tank) })
    }
  }, [func, tank])

  const functions = [
    { value: 'tempIncrease', label: 'Aumentar temperatura' },
    { value: 'tempDecrease', label: 'Disminuir temperatura' },
    { value: 'increasePressure', label: 'Aumentar presión' },
    { value: 'decreasePressure', label: 'Disminuir presión' },
    { value: 'fromOneToAnother', label: 'Transferir de un tanque a otro' }
  ]

  const tanks = [
    { value: 1, label: 'Tanque 1' },
    { value: 2, label: 'Tanque 2' }
  ]
  return (
    <div className={styles['action-selector']}>
      <GenericSelector setCurrentValue={setFunc} options={functions} defaultLabel='Instrucciones' />
      <GenericSelector setCurrentValue={setTank} options={tanks} defaultLabel='Tanques' />
    </div>
  )
}
