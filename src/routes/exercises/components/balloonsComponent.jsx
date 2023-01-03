import React,{useEffect, useState} from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";


const BalloonSVG = ({color,text, draggableProvided}) => {
    
    return (
        <div            
            {...draggableProvided.draggableProps}
            ref={draggableProvided.innerRef}
            {...draggableProvided.dragHandleProps}>
            <svg   width="80" height="182" viewBox="0 0 80 182" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="40" fill={color}/>
            <text x="51%" y="21%" textAnchor="middle" fill="#333333" fontSize="100%" fontFamily="Montserrat" dy=".3em">{text}</text>
            <path d="M32.4853 83.7254L39.8462 70.1538L48.115 83.2462C49.3556 85.2104 47.9889 87.7786 45.6668 87.8469L35.2106 88.1544C32.8985 88.2224 31.3825 85.7587 32.4853 83.7254Z" fill="#BDBDBD"/>
            <path d="M39.9773 80C48.8474 99.3939 45.1915 108.284 35.0834 122.727C19.1783 145.455 45.7887 168.485 44.5652 180" stroke="#F2F2F2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M40.2671 80.2406C33.4978 75.0098 22.1131 79.9329 24.2669 84.856C26.4208 89.7791 35.9593 87.3175 40.2671 80.2406Z" stroke="#F2F2F2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M39.9592 80.5483C47.551 75.0576 58.3748 82.4575 55.9593 87.6252C53.5437 92.7929 44.7903 87.9769 39.9592 80.5483Z" stroke="#F2F2F2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
        

    )

}

const BalloonsComponent = ({data})=>{
    const [balloons, setBalloons] = useState(data.balloons)
    return(
        <Droppable droppableId="balloons" >
            {
                (droppableProvided)=>(
                    <div    {...droppableProvided.droppableProps} 
                            ref={droppableProvided.innerRef}>
                            {
                            balloons.map(
                                 (balloon, index) => (
                                    <Draggable key={balloon.id} draggableId={balloon.id.toString()} index={index}>
                                         {
                                            (draggableProvided) => (
                                                <BalloonSVG text = {balloon.text} color = "#BDBDBD" draggableProvided={draggableProvided}/>
                                            )
                                         }
                                    </Draggable>
                                   
                            )
                            )
                            }
                            {droppableProvided.placeholder}                                            
                    </div>
                )
            }
        </Droppable>

    )
}

export default BalloonsComponent