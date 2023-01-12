import { useState, useEffect, useRef } from "react";
import styles from "../../../styles/keyBoardComponent.module.css"

const Timer = ()=>{
    const [time, setTime] = useState(60)
    const interval = useRef(null)

    useEffect(()=>{
        interval.current = setInterval(
            ()=>{
                setTime(prevTime => {
                    if (prevTime - 1 <= 0 ){

                        clearInterval(interval.current)
   
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

const KeyBoardComponent = ()=>{

}
export default KeyBoardComponent