import React from 'react'
import lottie from 'lottie-web'
import "../../../../styles/animation.css"

export default function Animation({animationSequence, path, functionToAnimate, start=true, simple=false}) {

    const animationContainer = React.useRef(null)
    const [peluche, setPeluche] = React.useState(null)

    React.useEffect(() => {
        setPeluche(lottie.loadAnimation({
            container: animationContainer.current,
            renderer: "svg",
            loop: false,
            autoplay: false,
            rendererSettings: {
                //className:"vehicle",
                id: "Peluche_a",
    
            },
            path: `../../../../images/exercises/${path}/Peluche_All.json`
        }))
    }, [])

    React.useEffect(() => {
        if(peluche && animationSequence && start){
            functionToAnimate(peluche, animationSequence)
        }
    }, [peluche, start, animationSequence])

    return(
        <div className={simple? "animation-container-simple": "animation-container"} ref={animationContainer}>
        </div>
    )
}