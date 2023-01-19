import { useState, useEffect } from "react";
import styles from "../../../styles/toggleSwitch.module.scss"
import "../../../styles/toggleSwitch.css"

const Switch = ({right,left,title,setAnswers,id,corrects,isFinish})=>{
    const [value, setValue] = useState(1);
    const [wasTouched, setWastouched] = useState(false)
    const handlerChange = (event)=>{
        setValue(event.target.value)
        if(!wasTouched){
            setWastouched(true)
        }
    }
    useEffect(()=>{
        if(value!=1){
            setAnswers((prev)=>{
                return prev.map( ans =>{
                    if(ans.id == id){
                        return {...ans, isAnswered:true, value:value=="0"?left:right}
                    }
                    return ans
                }
                    )
            }) 
        }  
    },[value])

    return (
      <div className={styles.cardSliderContainer}>
        <div className={styles.title}>{title}</div>
        <div className="slider-container">
          <div className={styles.left}>{left}</div>
          <input
          name={!isFinish?"in-game":(corrects.find(obj => obj.id == id).isCorrect?"true":"false")}
          className={styles.myThumb}
          type="range"
          min="0"
          max="2"
          step={!wasTouched?"1":"2"}
          value={value}
          disabled={isFinish}
          onChange={handlerChange}
            />
        <div className={styles.right}>{right}</div>
      </div>
      </div>
    );

}

const ToggleSwitches = ({setPhase,setScore,data})=>{
    const shuffledData = data.slice().sort(() => Math.random() - 0.5).slice(0,4)
    const [options, setOptions] = useState(shuffledData)
    const [answers, setAnswers] = useState(shuffledData.map(obj =>({id:obj.id, isAnswered:false, value:null})))
    const [corrects, setCorrects] = useState(shuffledData.map(obj =>({id:obj.id, isCorrect:null})))
    const [isAllAnswered, setIsAllAnswered] = useState(false)
    const [isFinish, setIsFinish] = useState(false)

    useEffect(()=>{
       if(answers.filter(ans=> ans.isAnswered ==true).length == options.length){
        setIsAllAnswered(true)
       }
    },[answers])

    useEffect(()=>{
        const corr = corrects.map( c =>{
            return {...c, isCorrect: options.find(option => option.id == c.id).value == answers.find(ans => ans.id == c.id).value}
        }
        )
        setCorrects(corr)

    },[isFinish])

    useEffect(()=>{
        setScore(corrects.filter(obj => obj.isCorrect).length)
    },[corrects])

    return(
        <>
            <div className={styles.gameContainer}>
                {options.map( option => <Switch key={option.id} 
                                                left={"Antigua"}
                                                right={"Actual"}
                                                title={option.text}
                                                setAnswers={setAnswers}
                                                id={option.id}
                                                corrects={corrects}
                                                isFinish={isFinish}
                                                />  )}
            </div>
            {isAllAnswered&&!isFinish&&<button onClick={()=>setIsFinish(true)}>RESPONDER</button>}
            {isFinish&&<button onClick={()=>setPhase("end")}>SIGUIENTE</button>}
        </>
    )

}
export default ToggleSwitches