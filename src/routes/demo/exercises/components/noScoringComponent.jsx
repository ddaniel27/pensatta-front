import React from "react"
import Information from "../../../components/information"
import ActivityContext from "../../../../context/ActivityContext"

export default function NoScoringComponent({initMessages=["Inicia dando click al boton"], finalMessages=["Buen trabajo"], title="Actividad", children, background="#E0E0E0"}){

    const { setActivity, setTitle, setBackground } = React.useContext(ActivityContext)
    const [phase, setPhase] = React.useState("init")

    React.useEffect(()=>{
        setTitle(title)
        setBackground(background)
    },[setTitle, title, setBackground, background])

    const handleStart = () => {
        setPhase("activity")
    }


    return(
        <>

            {
                phase === "init" && <><Information messages={initMessages} /> <button onClick={handleStart}>INICIAR</button></>
            }

            {
                phase === "activity" && children(setPhase)
            }
            {
                phase === "end" && <><Information messages={finalMessages} /> <button onClick={()=>{setActivity(true)}} >FINALIZAR</button></>
            }
        </>
        )
}