import { useState, useEffect, useRef } from "react";
import styles from "../../../styles/keyBoardComponent2.module.css"
import backspacesvg from "/images/exercises/59/backspace.svg"
import spacesvg from "/images/exercises/59/space.svg"

const ScreenText = ({textType, textTyped})=>{
    return(
        <div className={styles.screenContainer}>
            <div className={styles.display}>{textTyped}</div>
            <div className={styles.textType}>{textType}</div>
            <div className={styles.info}>Escribe el mensaje presionando los botones del teclado digital.</div>
        </div>
    )
}

const KeyPair = ({char1, char2, setTextTyped,setTextDecoded,isFinish})=>{
    function handleClick(charCoded,charDeco,erasing){
        if(!isFinish){
            
            if (erasing){
                setTextTyped((prev)=>prev.slice(0,-1))
                setTextDecoded((prev)=>prev.slice(0,-1))
                return
            }
            setTextTyped((prev)=>{
                if(prev.length <=24 ){
                    return(prev + charCoded)
                }
                return prev
            })
            setTextDecoded((prev)=>{
                if(prev.length <=24 ){
                    return(prev + charDeco)
                }
                return prev
            })
        }
    }

    if(char1=="backspace"){
        return (
        <div className={styles.keypairContainer}>
            <div className={styles.backspaceKey} onClick={()=>handleClick("","",true)}>
                <img src={backspacesvg}></img>
            </div>
        </div>
    )
    }

    if(char1=="space"){
        return (
        
            <div className={styles.spaceKey} onClick={()=>handleClick(" "," ")} >
                <img src={spacesvg}></img>
            </div>
        
    )
    }
    return(
        <div className={styles.keypairContainer}>
            <div className={styles.char1}>
                {char1}
            </div>
            <div className={styles.char2} onClick={()=>handleClick(char1,char2)}>
                {char2}
            </div>
        </div>
    )

}

const Timer = ({setIsFinish})=>{
    const [time, setTime] = useState(20)
    const interval = useRef(null)

    useEffect(()=>{
        interval.current = setInterval(
            ()=>{
                setTime(prevTime => {
                    if (prevTime - 1 <= 0 ){

                        clearInterval(interval.current)
                        setIsFinish(true)
   
                    }
                    return prevTime-1
                })
            }, 1000  
        )
    },[])

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }

    return(
        <div className={styles.timer}>{`${padTo2Digits(Math.floor(time / 60))} : ${padTo2Digits(time%60)}`}</div>  
    )
}

const KeyBoardComponent = ({keyPairs, textType, setPhase, setScore})=>{
    const [textTyped, setTextTyped] = useState("")
    const [isFinish, setIsFinish] = useState(false)
    const [textDecoded, setTextDecoded] = useState("")

    useEffect(()=>{
        setScore( textDecoded==textType.text ? 1:0)
    },[isFinish])
    
    return(
        <>
        <div className={styles.gameContainer}>
            <Timer setIsFinish={setIsFinish}/>
            <ScreenText textType={textType.text} textTyped={textTyped}/>
            <div className={styles.keyBoardContainer}>
                <div className={styles.keyBoard1}>
                    {keyPairs.keyBoard1.map(
                        (keyPair) =>{
                            return <KeyPair key={keyPair.id} char1={keyPair.char1} char2={keyPair.char2} setTextTyped={setTextTyped} setTextDecoded={setTextDecoded} isFinish={isFinish}/>
                        }
                    )}
                </div>
                <div className={styles.keyBoard2}>
                    <KeyPair char1={keyPairs.keyBoard2.char1} setTextTyped={setTextTyped}  setTextDecoded={setTextDecoded} isFinish={isFinish}/>
                </div>

            </div>
        </div>
        {isFinish? <button onClick={()=>setPhase("end")}>SIGUIENTE</button>:<></>}
        </>
    )
}
export default KeyBoardComponent