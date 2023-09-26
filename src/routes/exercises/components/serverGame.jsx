import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styles from '../../../styles/serverGame.module.css'
import Select from 'react-select'
import Mouse from '/images/exercises/91/mouse.svg'
import Car from '/images/exercises/91/car.svg'
import Katty from '/images/exercises/91/katty.svg'
import Roomba from '/images/exercises/91/roomba.svg'

const Selector = ({ options = [], handleChange = () => {}, defaultValue = { label: '-', value: 'empty' }, isFinish = false, idParent }) => {
  return (
    <Select options={options} onChange={(e) => handleChange(e, idParent)} defaultValue={defaultValue}
      styles={{
        singleValue: (base) => ({
          ...base,
          borderRadius: 5,
          background: '#F2F2F2',
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
      }/>
  )
}

const Computer = ({ color }) => {
  return (
    <svg width="180" height="130" viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="110" rx="9.47368" fill="#333333"/>
      <rect x="4.73682" y="4.73682" width="170.526" height="85.2632" rx="4.73684" fill={color}/>
      <rect x="71" y="90" width="38" height="38" fill="#333333"/>
      <rect x="71" y="110" width="38" height="4" fill="#272727"/>
      <path d="M50 124.737C50 122.121 52.1208 120 54.7368 120H125.263C127.879 120 130 122.121 130 124.737V130H50V124.737Z" fill="#333333"/>
    </svg>

  )
}

export default function ServerGame ({ setPhase }) {
  const [transmitters, setTransmitters] = useState({})
  const [receivers, setReceivers] = useState({})
  const [isFinish, setIsFinish] = useState(false)

  const options = [{ label: '192.168.0.1', value: 1 }, { label: '192.168.0.2', value: 2 }, { label: '192.168.0.3', value: 3 }, { label: '192.168.0.4', value: 4 }]
  const elements = new Array(4).fill(0).map((e, i) => i + 1)
  const colors = { 1: '#E78CFE', 2: '#3FDFE9', 3: '#69E485', 4: '#EDCA71' }
  const images = {
    mouse: <img src={Mouse} alt='mouse' className={styles.mouse}/>,
    car: <img src={Car} alt='car' className={styles.car}/>,
    katty: <img src={Katty} alt='katty' className={styles.katty}/>,
    roomba: <img src={Roomba} alt='roomba' className={styles.roomba}/>
  }
  const handleChange = (e, idParent) => {
    const newReceivers = { ...receivers }
    newReceivers[`computer-receiver-${e.value}`] = idParent
    setReceivers(newReceivers)
  }
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }
    if (destination.droppableId.includes('computer-server')) {
      const newTransmitters = { ...transmitters }
      newTransmitters[destination.droppableId] = draggableId
      setTransmitters(newTransmitters)
    }
  }

  return (
    <>
      <div className={styles['game-container']}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles['network-container']}>
            <div className={styles['receiver-network']}>
              {
                elements.map((e, index) => (
                  <div key={index} className={styles['computer-container']}>
                    {
                      isFinish && receivers[`computer-receiver-${index + 1}`] ? images[transmitters[`computer-server-${receivers[`computer-receiver-${index + 1}`]}`]] : null
                    }
                    <Computer color={!isFinish ? '#FFFFFF' : (colors[receivers[`computer-receiver-${index + 1}`]] || '#FFFFFF')}/>
                    {!isFinish && <span>{options.find(e => e.value === index + 1).label}</span>}
                  </div>
                ))

              }
            </div>
            <div className={styles['cables-container']}>
              {
                elements.map(_ => <div className={styles.cable}/>)
              }
            </div>
            <div className={styles['server-container']}>
              <span>Servidor</span>
            </div>
            <div className={styles['cables-container']}>
              {
                elements.map(_ => <div className={styles.cable}/>)
              }
            </div>
            <div />
            <div className={styles['transceiver-network']}>
              {
                elements.map((_, index) => (
                  <div key={index}>
                    <Droppable droppableId={`computer-server-${index + 1}`}>
                      {
                        (provided) => (
                          <div {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={styles['computer-container']}
                          >
                            {
                              transmitters[`computer-server-${index + 1}`] ? images[transmitters[`computer-server-${index + 1}`]] : null
                            }
                            <Computer color={colors[index + 1]}/>
                            {provided.placeholder}
                          </div>
                        )
                      }
                    </Droppable>
                    <div className={styles['select-container']}>
                      <Selector options={options} idParent={index + 1} handleChange={handleChange} isFinish={isFinish}/>
                    </div>
                  </div>
                ))
              }

            </div>
          </div>
          <div className={styles['info-to-send-container']}>
            <Droppable droppableId='info-to-send'>
              {
                (provided) => (
                  <div {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={styles['info-to-send']}
                  >
                    <Draggable draggableId='mouse' index={0}>
                      {(provided) => <img {...provided.dragHandleProps} ref={provided.innerRef} {...provided.draggableProps} src={Mouse} alt='mouse'/>}
                    </Draggable>
                    <Draggable draggableId='car' index={1}>
                      {(provided) => <img {...provided.dragHandleProps} ref={provided.innerRef} {...provided.draggableProps} src={Car} alt='car'/>}
                    </Draggable>
                    <Draggable draggableId='katty' index={2}>
                      {(provided) => <img {...provided.dragHandleProps} ref={provided.innerRef} {...provided.draggableProps} src={Katty} alt='katty'/>}
                    </Draggable>
                    <Draggable draggableId='roomba' index={3}>
                      {(provided) => <img {...provided.dragHandleProps} ref={provided.innerRef} {...provided.draggableProps}src={Roomba} alt='roomba'/>}
                    </Draggable>
                    {provided.placeholder}
                  </div>
                )
              }
            </Droppable>
          </div>
        </DragDropContext>
      </div>
      {!isFinish && <button onClick={() => setIsFinish(true)}>FINALIZAR</button>}
      {isFinish && <button onClick={() => setPhase('end')}>SIGUIENTE</button>}
    </>
  )
}
