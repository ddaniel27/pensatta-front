import {useState, useEffect} from "react"
import {Droppable, Draggable} from "react-beautiful-dnd"
import styles from "../../../styles/draggableQuestions.module.css"

const DraggableQuestions = ({column1, column2, columnAnswers, isFinish}) => {
    return(
        <div className={styles["dnd-all-columns-container"]}>
            <div>
                {
                    column1.map((item, index)=>(
                        <Droppable droppableId={`column-1-${item.id}`}>
                            {
                                (provided)=>(
                                    <div ref={provided.innerRef} {...provided.droppableProps} className={styles["droppable-area"]}>
                                        <Draggable key={item.id} draggableId={`object-${item.id}`} index={item.id}>
                                            {
                                                (draggableProvided)=>(
                                                    <div ref={draggableProvided.innerRef}
                                                        {...draggableProvided.draggableProps}
                                                        {...draggableProvided.dragHandleProps}
                                                        className={!isFinish?styles["card-question"]:(item.value?`${styles["card-question"]} ${styles["card-true"]}`:`${styles["card-question"]} ${styles["card-grey"]}`)}>
                                                        {item.text}
                                                    </div>
                                                )
                                            }
                                        </Draggable>
                                    </div>
                                )
                            }
                        </Droppable>
                    ))
                }
            </div>
            <div className={styles["answers-container"]}>
                <div>
                        <img src="/images/exercises/63/badge.svg"/>
                </div>
            {
                    columnAnswers.map((item, index)=>(
                        <Droppable droppableId={`column-answers-${item.id}`}>
                            {
                                (provided)=>(
                                    <div ref={provided.innerRef} {...provided.droppableProps} className={styles["droppable-area"]}>
                                        <Draggable key={item.id} draggableId={`answer-${item.id}`} index={item.id}>
                                            {
                                                (draggableProvided)=>(
                                                    <div ref={draggableProvided.innerRef}
                                                        {...draggableProvided.draggableProps}
                                                        {...draggableProvided.dragHandleProps}
                                                        className={!isFinish?(item.text!=""?styles["card-question"]:styles["droppable-area2"]):(item.value?`${styles["card-question"]} ${styles["card-true"]}`:`${styles["card-question"]} ${styles["card-red"]}`)}>
                                                        {item.text}
                                                    </div>
                                                )
                                            }
                                        </Draggable>
                                    </div>
                                )
                            }
                        </Droppable>
                    ))
                }

            </div>
            <div>
                {
                    column2.map((item, index)=>(
                        <Droppable droppableId={`column-2-${item.id}`}>
                            {
                                (provided)=>(
                                    <div ref={provided.innerRef} {...provided.droppableProps} className={styles["droppable-area"]}>
                                        <Draggable key={item.id} draggableId={`object-${item.id}`} index={item.id}>
                                            {
                                                (draggableProvided)=>(
                                                    <div ref={draggableProvided.innerRef}
                                                        {...draggableProvided.draggableProps}
                                                        {...draggableProvided.dragHandleProps}
                                                        className={!isFinish?styles["card-question"]:(item.value?`${styles["card-question"]} ${styles["card-true"]}`:`${styles["card-question"]} ${styles["card-grey"]}`)}>
                                                        {item.text}
                                                    </div>
                                                )
                                            }
                                        </Draggable>
                                    </div>
                                )
                            }
                        </Droppable>
                    ))
                }

            </div>
        </div>
        
    )


}
export default DraggableQuestions