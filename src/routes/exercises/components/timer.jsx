import React from "react"
import "../../../styles/timer.css"

function Timer({startTime=180, returnTimerValue}){

    const [time, setTime] = React.useState(startTime)

    React.useEffect(()=>{
        const actualTimer = setTimeout(()=>{
            if(time > 0){
            setTime(time-1)
            returnTimerValue(time)
            }else{
                clearTimeout(actualTimer)
            }
        },1000)
        return ()=>{
            clearTimeout(actualTimer)
        }
    })

    return(
        <div className={`timer ${Math.floor((time/startTime)*100) < 65 && Math.floor((time/startTime)*100) > 30 ? "warning" : null} ${Math.floor((time/startTime)*100) <= 30 ? "danger" : null}`}>
            <h1>{`${Math.floor(time/60)}:${time%60 < 10 ? "0"+time%60 : time%60}`}</h1>
        </div>
    )

}

export default React.memo(Timer)