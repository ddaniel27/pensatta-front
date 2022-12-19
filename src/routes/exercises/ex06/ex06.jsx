import React from 'react'
import Slider from '../components/slider.jsx'
import ScreenRenderUniqueOptionsEncapsulate from "../components/screenRenderUniqueOptionsEncapsulate"
import ScoringComponent from '../components/scoringComponent'
import data from "./data.json"
import '../../../styles/ex06.css'

export default function Ex06(){

    // eslint-disable-next-line no-unused-vars
    const [ mySlides, setMySlides ] = React.useState({
        slides: data.slides,
        path: data.path
    })

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
        options: data.options.sort(() => Math.random() - 0.5).slice(0, data.threshold.perfect)
    })

    const [ nextScene, setNextScene ] = React.useState(true)
    const [ enableButton, setEnableButton ] = React.useState(true)
    const [ finalScene, setFinalScene ] = React.useState(false)


    React.useEffect(()=>{
        return () => {
            setNextScene(true)
            setEnableButton(true)
            setFinalScene(false)
        }
    },[])

    return (
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
        {
            (setScore, setPhase) => (nextScene ? 
            (<>
                <Slider data={mySlides} enableButton={setEnableButton} />
                <button onClick={()=>{setNextScene(false)}} disabled={enableButton} >CONTINUAR</button>
            </>):
            (finalScene ? <ScreenRenderUniqueOptionsEncapsulate data={myData} hasImages={false} returnScore={setScore} isFinished={setPhase} /> :
                (
                    <>
                        <div className="next-scene">
                            {mySlides.slides.map((slide, index) => {
                                return (
                                    <div key={index}>
                                        <img src={`./images/exercises/${mySlides.path}/${slide.img}`} alt={slide.img} style={{"--prog":`${(index+1)*15}%`}}/>
                                        <p style={{color:slide.color}}><span>{slide.legend1}</span><span>{slide.legend2}</span></p>
                                    </div>
                                )
                                })
                            }
                        </div>
                        <button onClick={()=>setFinalScene(true)}> FINAL </button>
                    </>
                )
            ))

        }
        </ScoringComponent>
    )
}