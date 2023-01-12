import React, {useEffect,useState} from "react";
import { Draggable, Droppable} from "react-beautiful-dnd";
import "../../../styles/ex20.css";

const ProcessComponent = ({process,text})=>{
    const colors = {
        instruction: "#69E485",
        begin:"#E78CFE",
        end:"#3FDFE9",
        condition:"#EDCA71",
    }
    if (process == "arrowDown"){
        return(
            <svg width="4%" height="5%" viewBox="0 0 12 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1C7 0.447715 6.55228 0 6 0C5.44772 0 5 0.447715 5 1L7 1ZM6 41L11.7735 31H0.226497L6 41ZM5 1V32H7V1L5 1Z" fill="white"/>
            </svg>
        )
    }
    if (process =="arrowDownYes"){
        return(<svg transform="translate(5)" width="8%" height="12%" viewBox="0 0 30 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 1C7 0.447715 6.55228 0 6 0C5.44772 0 5 0.447715 5 1L7 1ZM6 41L11.7735 31H0.226497L6 41ZM5 1V32H7V1L5 1Z" fill="white"/>
        <path d="M18.2814 27.192C17.3961 27.192 16.5374 27.0747 15.7054 26.84C14.8841 26.5947 14.2228 26.28 13.7214 25.896L14.6014 23.944C15.0814 24.296 15.6521 24.5787 16.3134 24.792C16.9748 25.0053 17.6361 25.112 18.2974 25.112C19.0334 25.112 19.5774 25.0053 19.9294 24.792C20.2814 24.568 20.4574 24.2747 20.4574 23.912C20.4574 23.6453 20.3508 23.4267 20.1374 23.256C19.9348 23.0747 19.6681 22.9307 19.3374 22.824C19.0174 22.7173 18.5801 22.6 18.0254 22.472C17.1721 22.2693 16.4734 22.0667 15.9294 21.864C15.3854 21.6613 14.9161 21.336 14.5214 20.888C14.1374 20.44 13.9454 19.8427 13.9454 19.096C13.9454 18.4453 14.1214 17.8587 14.4734 17.336C14.8254 16.8027 15.3534 16.3813 16.0574 16.072C16.7721 15.7627 17.6414 15.608 18.6654 15.608C19.3801 15.608 20.0788 15.6933 20.7614 15.864C21.4441 16.0347 22.0414 16.28 22.5534 16.6L21.7534 18.568C20.7188 17.9813 19.6841 17.688 18.6494 17.688C17.9241 17.688 17.3854 17.8053 17.0334 18.04C16.6921 18.2747 16.5214 18.584 16.5214 18.968C16.5214 19.352 16.7188 19.64 17.1134 19.832C17.5188 20.0133 18.1321 20.1947 18.9534 20.376C19.8068 20.5787 20.5054 20.7813 21.0494 20.984C21.5934 21.1867 22.0574 21.5067 22.4414 21.944C22.8361 22.3813 23.0334 22.9733 23.0334 23.72C23.0334 24.36 22.8521 24.9467 22.4894 25.48C22.1374 26.0027 21.6041 26.4187 20.8894 26.728C20.1748 27.0373 19.3054 27.192 18.2814 27.192ZM24.8046 15.8H27.3966V27H24.8046V15.8ZM26.8046 12.584H29.4926L26.5966 14.888H24.6446L26.8046 12.584Z" fill="white"/>
        </svg>)
    }
    if (process == "arrowLeftNo"){
        return(
            <svg width="50%" height="0%" viewBox="0 0 41 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 18C0.447715 18 -2.41411e-08 18.4477 0 19C2.41411e-08 19.5523 0.447715 20 1 20L1 18ZM41 19L31 13.2265L31 24.7735L41 19ZM1 20L32 20L32 18L1 18L1 20Z" fill="white"/>
            <path d="M21.8891 0.799999V12H19.7611L14.1771 5.2V12H11.6171V0.799999H13.7611L19.3291 7.6V0.799999H21.8891ZM29.9629 12.192C28.8003 12.192 27.7496 11.9413 26.8109 11.44C25.8829 10.9387 25.1523 10.2507 24.6189 9.376C24.0963 8.49067 23.8349 7.49867 23.8349 6.4C23.8349 5.30133 24.0963 4.31467 24.6189 3.44C25.1523 2.55467 25.8829 1.86133 26.8109 1.36C27.7496 0.858666 28.8003 0.608 29.9629 0.608C31.1256 0.608 32.1709 0.858666 33.0989 1.36C34.0269 1.86133 34.7576 2.55467 35.2909 3.44C35.8243 4.31467 36.0909 5.30133 36.0909 6.4C36.0909 7.49867 35.8243 8.49067 35.2909 9.376C34.7576 10.2507 34.0269 10.9387 33.0989 11.44C32.1709 11.9413 31.1256 12.192 29.9629 12.192ZM29.9629 9.984C30.6243 9.984 31.2216 9.83467 31.7549 9.536C32.2883 9.22667 32.7043 8.8 33.0029 8.256C33.3123 7.712 33.4669 7.09333 33.4669 6.4C33.4669 5.70667 33.3123 5.088 33.0029 4.544C32.7043 4 32.2883 3.57867 31.7549 3.28C31.2216 2.97067 30.6243 2.816 29.9629 2.816C29.3016 2.816 28.7043 2.97067 28.1709 3.28C27.6376 3.57867 27.2163 4 26.9069 4.544C26.6083 5.088 26.4589 5.70667 26.4589 6.4C26.4589 7.09333 26.6083 7.712 26.9069 8.256C27.2163 8.8 27.6376 9.22667 28.1709 9.536C28.7043 9.83467 29.3016 9.984 29.9629 9.984Z" fill="white"/>
            </svg>

        )
    }
    if(process == "condition"){
        return(
            <svg width="60%" height="80%" viewBox="0 0 180 108" fill="none" xmlns="http://www.w3.org/2000/svg">            
            <path d="M80.0959 2.64532L5.24171 45.3122C-1.48892 49.1487 -1.48891 58.8513 5.24171 62.6878L80.0959 105.355C86.235 108.854 93.765 108.854 99.9041 105.355L174.758 62.6878C181.489 58.8513 181.489 49.1487 174.758 45.3122L99.9041 2.64531C93.765 -0.853958 86.235 -0.853954 80.0959 2.64532Z" fill={colors[process]}/>
            <text x="50%" y="50%" textAnchor="middle" fill="#333333" fontSize="90%" fontFamily="Montserrat" dy=".3em" fontWeight="bold">{text}</text>
            </svg>
        )
    }
    if(process == "empty"){
        return(<span></span>)
    }
    return (
        <svg width="100%" height="100%" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">        
        <rect width="240" height="60" rx="20" fill={colors[process]}/>
        <text x="50%" y="50%" textAnchor="middle" fill="#333333" fontSize="90%" fontFamily="Montserrat" dy=".3em" fontWeight="bold">{text}</text>
        </svg>
    )

}

const DfdComponent = ({data, column1, column2})=>{
    return(
        <>
            
                <Droppable droppableId="elements">
                    {
                        (provided) =>(
                            <div    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="elementContainer">
                                {   
                                    column1.map( (element,index)=> {
                                        
                                        return(<Draggable key={element.id} draggableId={`element${element.id}`} index={index}>
                                        {
                                            (draggableProvided)=>(
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
                { column2.map((element)=>{
                    if (element.type.includes("drag")){
                        return(
                            <Droppable droppableId={`drag${element.id}`}>
                                {
                                    (provided) =>(
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