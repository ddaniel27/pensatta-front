import {useState,useEffect} from "react"
import styles from "../../../styles/monitor.module.css"

const Monitor = ({color,text,phase,error,secuence})=>{
    
    
    return(
        <div className={styles.monitor}>
            {error?<div className={styles.screenMonitor}>
                <div className={styles.static}>
                    <div></div>
                </div>
                <div className={styles.scan}></div>
            </div>:
            <div className={`${styles.screenMonitorColor} ${styles[color]}`}>
                {phase=="init" && !error && <div>
                                                {secuence.map((color,index)=>{
                                                    if(index < secuence.length-1){
                                                        return <span>{`${color.color}>`} </span>
                                                    }
                                                    return <span>{`${color.color}`} </span>
                                                })}
                                            </div>}
            </div>}
        </div>

    )
}
const BoardInfo = ({colors})=>{
    return(
        <div className={styles.boardColorsInfo}>
            {
                colors.map(color=>(
                    <p>{color.color}&nbsp;:&nbsp;{color.code}</p>
                ))
            }

        </div>
    )
}
function InputComponent({index,id,setAnswers,isFinish,correct}) {
    const [value, setValue] = useState("");

    const handleChange = (event) =>{
        if(event.target.value.length <= 6){
            setValue(event.target.value.replace(/[^0-1]/g, '').trim())
        }        
    }
    useEffect(()=>{
        if(value.length == 6){
            setAnswers((prev)=>{
                return prev.map( ans =>{
                    if(ans.id == id){
                        return {...ans, isAnswered:true, value:value}
                    }
                    return ans
                }
                )
            })
        }else{
            setAnswers((prev)=>{
                return prev.map( ans =>{
                    if(ans.id == id){
                        return {...ans, isAnswered:false,value:value}
                    }
                    return ans
                }
                )
            })
        }
    },[value])
  
    return (
      <div>
        <label>
            Color {index+1}
            <input
            className={!isFinish?styles.inputColor:(correct?styles.inputTrue:styles.inputFalse)}
            pattern="[01]"
            value={value}
            disabled={isFinish}
            onChange={handleChange}
            />
      </label>
      </div>
    );
  }

const BoardInputs = ({secuence,setAnswers,isFinish,corrects})=>{

    return(
        <div className={styles.boardColorsInputs}>
            {
                secuence.map((color,index)=>(
                    <InputComponent index={index} id={color.id} setAnswers={setAnswers} isFinish={isFinish} correct={corrects.find(c=>c.id==color.id).isCorrect}/>
                ))
            }

        </div>

    )

}

const MonitorColorsComponent = ({data,setPhase,setScore})=>{
    const shuffledData = data.slice().sort(() => Math.random() - 0.5).slice(0,3)
    const [color,setColor] = useState("white")
    const [phase, setPhaseSec] = useState("init")
    const [error, setError] = useState(false)
    const [secuence, setSecuente] = useState(shuffledData)
    const [answers, setAnswers] = useState(shuffledData.map(obj =>({id:obj.id, isAnswered:false, value:null})))
    const [isAllAnswered, setIsAllAnswered] = useState(false)
    const [isFinish, setIsFinish] = useState(false)
    const [corrects, setCorrects] =useState(shuffledData.map(obj =>({id:obj.id, isCorrect:null})))
    

    useEffect(()=>{
        setIsAllAnswered(answers.filter(ans => ans.isAnswered).length == answers.length)

    },[answers])

    useEffect(()=>{
        if(isFinish){
            const corr = corrects.map(c =>{
    
                return({
                ...c,
                isCorrect: answers.find(a => a.id == c.id).value == secuence.find(s => s.id == c.id).code
            })})
            setCorrects(corr)
            setPhaseSec("inSecuence")
            
        }

    },[isFinish])

    useEffect(()=>{

        if(isFinish){
            setScore(corrects.filter(obj => obj.isCorrect).length)
            corrects.forEach((c,index) => {
                setTimeout(() => {
                    if(c.isCorrect){
                        setError(false)
                        setColor(secuence.find(s => s.id == c.id).colour)
                    }else{
                        setError(true)
                    }
                }, 4000 * index);
                
            });
        }
       
    },[corrects])

    const handleResponder = ()=>{
        setIsFinish(true)
    }

    return(
        <>
            <div className={styles.gameContainer}>
                <div>
                    <Monitor error={error} color={color} secuence={secuence} phase={phase}/>
                </div>
                <div className={styles.boardsContainer}>
                    <BoardInfo colors={data}/>
                    <BoardInputs secuence={secuence} setAnswers={setAnswers} isFinish={isFinish} corrects={corrects}/>
                </div>
                <div className={styles.infoText}>Utiliza el teclado para ingresar el código</div>
            </div>
            
            {isAllAnswered&&!isFinish&&<button onClick={handleResponder}>RESPONDER</button>}
            {isFinish&&<button onClick={()=>setPhase("end")}>SIGUIENTE</button>}
        </>
    )

}
export default MonitorColorsComponent