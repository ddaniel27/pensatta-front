import {useEffect,useState} from "react";
import { DragDropContext } from "react-beautiful-dnd";
import data from "./data.json"
import DraggableQuestions from "../components/draggableQuestions";
import ScoringComponent from "../components/scoringComponent";
import styles from "../../../styles/draggableQuestions.module.css"

const Ex63 = ()=>{
    const emptyAnswers =() =>{
        let ans = []
        for (let i = 0; i < 4; i++){
            ans.push({id: 1000+i, answerId: "", text:"",isEmpty:true})

        }
        return ans
    }

    const [myData, setmyData] = useState(data)
    const [options, setOptions] = useState([])
    const [column1, setColumn1] = useState([])
    const [column2, setColumn2] = useState([])
    const [columnAnswer, setColumnAnswer] = useState(emptyAnswers())
    const [isAllanswered, setIsAllAnswered] = useState(false)
    const [isFinish, setIsFinish] = useState(false)

    useEffect(()=>{
        const selected = [...myData.options.corrects.sort(()=> Math.random() - 0.5).slice(0,4), ...myData.options.falses.sort(()=> Math.random() - 0.5).slice(0,4)].sort(()=> Math.random() - 0.5)
        setColumn1(selected.slice(0,4))
        setColumn2(selected.slice(4,8))
        setOptions(selected)
       
    },[])
    
    

    const onDragEnd = (result)=>{
        if(!result.destination) return
        if(result.source.index === result.destination.index &&
            result.source.droppableId === result.destination.droppableId) return
        if(isFinish) return
        if(result.destination.droppableId.includes("column-answers")&&
            (result.source.droppableId.includes("column-1") || result.source.droppableId.includes("column-2"))){
            setColumnAnswer( prev =>{
                const option = options.find(o=> o.id === result.source.index)
                return prev.map(
                    a =>{
                        if(a.id === result.destination.index){
                            return {...a, isEmpty:false, answerId: option.id, text: option.text, value: option.value}
                        }
                        return a
                    }
                )
            })
            if(columnAnswer.find(a=> a.id === result.destination.index).isEmpty){
                if(result.source.droppableId.includes("column-1")){
                    setColumn1(prev => prev.filter(o=> o.id !== result.source.index))
                }
                if(result.source.droppableId.includes("column-2")){
                    setColumn2(prev => prev.filter(o=> o.id !== result.source.index))
                }
            }else{
                if(result.source.droppableId.includes("column-1")){
                    setColumn1( prev =>{
                        const ans = columnAnswer.find(a=> a.id === result.destination.index)
                        return prev.map( o=>{
                            if(o.id === result.source.index){
                                return {id:ans.answerId, text:ans.text, value:ans.value}
                            }
                            return o
                        })
                        
                    })
                   
                }
                if(result.source.droppableId.includes("column-2")){
                    setColumn2( prev =>{
                        const ans = columnAnswer.find(a=> a.id === result.destination.index)
                        return prev.map( o=>{
                            if(o.id === result.source.index){
                                return {id:ans.answerId, text:ans.text, value:ans.value}
                            }
                            return o
                        })
                        
                    }

                    )
                    
                }
            }
        }

    }
    useEffect(()=>{
        if(columnAnswer.every(a=> !a.isEmpty)){
            setIsAllAnswered(true)}
    },[columnAnswer,column1,column2])
    const handleFinish = (setPhase,setScore) =>{
        setScore(columnAnswer.filter(a=> a.value).length)
        setPhase("end")
    }

    return(
       
       <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
       {
           (setScore,setPhase) => (
            <div className={styles["game-container"]}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <DraggableQuestions column1={column1} column2={column2} columnAnswers={columnAnswer} isFinish={isFinish}/>
                    
                </DragDropContext>
                <div className="buttons-field">
                       {!isFinish && <button onClick={()=>{setIsFinish(true)}} disabled={!isAllanswered}>RESPONDER</button>}
                       {isFinish && <button onClick={()=>{handleFinish(setPhase,setScore)}}>SIGUIENTE</button>}
                   </div>
            </div>
           )
       }
   </ScoringComponent>
           
       
    )
}
export default Ex63
