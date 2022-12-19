import React from "react"
import { SnakeGame } from "react-game-snake"
import NoScoringComponent from "../components/noScoringComponent"

import data from "./data.json"
import "../../../styles/ex35.css"

export default function Ex35(){

    const [ myData, setMyData ] = React.useState({
        ...data,
    })

    const [score, setScore] = React.useState(0)
    const [stopped, setStopped] = React.useState(false)

    function stopScroll(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }

    React.useEffect(()=>{

        window.addEventListener("keydown", stopScroll, false)

        if(stopped){
            const interval_id = setInterval(function(){}, Number.MAX_SAFE_INTEGER);

            // Clear any timeout/interval up to that id
            for (let i = 1; i < interval_id; i++) {
                clearInterval(i)
            }
        }
        return () => {    
            // Get a reference to the last interval + 1
            const interval_id = setInterval(function(){}, Number.MAX_SAFE_INTEGER);

            // Clear any timeout/interval up to that id
            for (let i = 1; i < interval_id; i++) {
                clearInterval(i)
            }
            window.removeEventListener("keydown", stopScroll, false)
        }
    }, [stopped])

    return(
        <NoScoringComponent initMessages={myData.initMessages} finalMessages={[`¡Tu puntaje es de ${score} puntos!`]}>
        {
            (setPhase)=>(
                <div className="snake-component">
                    <div className="snake-description">
                        <p>
                            Usa las flechas de dirección para moverte.
                        </p>
                        <p>
                            ¡Evita tocar las paredes!
                        </p>
                        <p>
                            ¡No te toques a ti mismo!
                        </p>
                        <p>
                            Come todos los datos que puedas
                        </p>
                    </div>
                    <div className="snake-container">
                    <SnakeGame
                        colors={{
                            field: "#FFFFFF",
                            food: "#9b59b6",
                            snake: "#00635D",
                        }}
                        countOfHorizontalFields={20}
                        countOfVerticalFields={20}
                        fieldSize={20}
                        loopTime={300}
                        pauseAllowed={true}
                        restartAllowed={false}
                        onLoose={(context) => {
                                    console.log(context)
                                    setScore(+context.game.points * 10)
                                    setPhase("end")
                                    setStopped(true)
                                }}
                    />
                    </div>

                </div>
            )
        }
        </NoScoringComponent>
        
    )
    
}