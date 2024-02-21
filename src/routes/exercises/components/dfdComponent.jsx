import React, { useEffect, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import '../../../styles/ex20.css'

const ProcessComponent = ({ process, text }) => {
  const colors = {
    instruction: '#69E485',
    begin: '#E78CFE',
    end: '#3FDFE9',
    condition: '#EDCA71',
    dragcondition: '#EDCA71',
    draginstruction: '#69E485'
  }
  if (process == 'arrowDown') {
    return (
      <svg width="4%" height="5%" viewBox="0 0 12 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 1C7 0.447715 6.55228 0 6 0C5.44772 0 5 0.447715 5 1L7 1ZM6 41L11.7735 31H0.226497L6 41ZM5 1V32H7V1L5 1Z" fill="white"/>
      </svg>
    )
  }
  if (process == 'arrowDownYes') {
    return (<svg transform="translate(5)" width="8%" height="12%" viewBox="0 0 30 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 1C7 0.447715 6.55228 0 6 0C5.44772 0 5 0.447715 5 1L7 1ZM6 41L11.7735 31H0.226497L6 41ZM5 1V32H7V1L5 1Z" fill="white"/>
      <text x="50%" y="30%" textAnchor="middle" fill="#FFFFFF" fontSize="90%" fontFamily="Montserrat" dy=".3em" fontWeight="bold">{text}</text>
    </svg>)
  }
  if (process == 'arrowLeftNo') {
    return (
      <svg width="50%" height="0%" viewBox="0 0 41 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 18C0.447715 18 -2.41411e-08 18.4477 0 19C2.41411e-08 19.5523 0.447715 20 1 20L1 18ZM41 19L31 13.2265L31 24.7735L41 19ZM1 20L32 20L32 18L1 18L1 20Z" fill="white"/>
        <text x="50%" y="30%" textAnchor="middle" fill="#FFFFFF" fontSize="90%" fontFamily="Montserrat" dy=".3em" fontWeight="bold">{text}</text>
      </svg>

    )
  }
  if (process == 'condition' || process == 'dragcondition') {
    return (
      <svg width="60%" height="80%" viewBox="0 0 180 108" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M80.0959 2.64532L5.24171 45.3122C-1.48892 49.1487 -1.48891 58.8513 5.24171 62.6878L80.0959 105.355C86.235 108.854 93.765 108.854 99.9041 105.355L174.758 62.6878C181.489 58.8513 181.489 49.1487 174.758 45.3122L99.9041 2.64531C93.765 -0.853958 86.235 -0.853954 80.0959 2.64532Z" fill={colors[process]}/>
        <text x="50%" y="50%" textAnchor="middle" fill="#333333" fontSize="90%" fontFamily="Montserrat" dy=".3em" fontWeight="bold">{text}</text>
      </svg>
    )
  }
  if (process == 'empty') {
    return (<span />)
  }
  return (
    <svg width="100%" height="100%" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="60" rx="20" fill={colors[process]}/>
      <text x="50%" y="50%" textAnchor="middle" fill="#333333" fontSize="70%" fontFamily="Montserrat" dy=".3em" fontWeight="bold">{text}</text>
    </svg>
  )
}

const DfdComponent = ({ data, column1, column2 }) => {
  return (
    <>

      <Droppable droppableId="elements">
        {
          (provided) => (
            <div {...provided.droppableProps}
              ref={provided.innerRef}
              className="elementContainer">
              {
                column1.map((element, index) => {
                  return (<Draggable key={element.id} draggableId={`element${element.id}`} index={index}>
                    {
                      (draggableProvided) => (
                        <div
                          {...draggableProvided.draggableProps}
                          ref = {draggableProvided.innerRef}
                          {...draggableProvided.dragHandleProps}
                          className={element.type}><ProcessComponent process={element.type} text={element.text}/></div>
                      )
                    }
                  </Draggable>)
                })
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>

      <div className="column2Ex20">
        { column2.map((element) => {
          if (element.type.includes('drag')) {
            return (
              <Droppable droppableId={`drag${element.id}`}>
                {
                  (provided) => (
                    <div {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={element.type}
                    >   <ProcessComponent process={element.type} text={element.text}/>

                    </div>

                  )
                }

              </Droppable>)
          }
          return (
            <div className={element.type} >
              <ProcessComponent process={element.type} text={element.text}/>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default DfdComponent
