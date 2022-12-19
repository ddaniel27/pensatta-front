import React from "react"
import ScoringComponent from "../components/scoringComponent"
import ScreenRenderUniqueOptionsEncapsulate from "../components/screenRenderUniqueOptionsEncapsulate"
import data from "./data.json"

export default function Ex01(){

    const [ myData, setMyData ] = React.useState({
        ...data,
        options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })

    const [currentOption, setCurrentOption] = React.useState({})
    const [counter, setCounter] = React.useState({})
    const [nextQuestion, setNextQuestion] = React.useState(false)
    const [nextPhase, setNextPhase] = React.useState(false)

    React.useEffect(()=>{
        if(myData){
            setCounter(Object.fromEntries(myData.informative_text.map(item=>[item.id,0])))
        }
    },[myData])

    React.useEffect(()=>{
        setNextQuestion(Object.values(counter).every(item => item >= 1))
    },[counter])

    
    const handleChange = ({target}) => {
        setCurrentOption(myData.informative_text.filter(item=> item.id === target.value)[0])
        setCounter(prevState => ({
            ...prevState,
            [target.value]: prevState[target.value] + 1
        }))
    }

    const handleClick = ()=>{
        setNextPhase(true)
        setNextQuestion(false)
    }

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id} dim={myData.dim} apr={myData.apr}>
        { (setScore, setPhase) => (
            !nextPhase ?
                <div className="fix-ex23">
                    <div className="ex01-explaination">
                        <h2>{ currentOption.title ? currentOption.title : "Componenetes internos" }</h2>
                        <p>{ currentOption.text ? currentOption.text : "¡Revisa todos los componentes de la lista inferior!" }</p>
                    </div>
                    <div className="ex23-options ex01-custom">
                        <label className="Board01">
                            <input onChange={handleChange} type="radio" name="internal" value="Board" />
                            <p className="color"></p>
                            <p className="img-container"></p>
                        </label>
                        <label className="HDD01">
                            <input onChange={handleChange} type="radio" name="internal" value="HDD" />
                            <p className="color"></p>
                            <p className="img-container"></p>
                        </label>
                        <label className="GPU01">
                            <input onChange={handleChange} type="radio" name="internal" value="GPU" />
                            <p className="color"></p>
                            <p className="img-container"></p>
                        </label>
                        <label className="CPU01">
                            <input onChange={handleChange} type="radio" name="internal" value="CPU" />
                            <p className="color"></p>
                            <p className="img-container"></p>
                        </label>
                        <label className="RAM01">
                            <input onChange={handleChange} type="radio" name="internal" value="RAM" />
                            <p className="color"></p>
                            <p className="img-container"></p>
                        </label>
                        <label className="INPUT01">
                            <input onChange={handleChange} type="radio" name="internal" value="INPUT" />
                            <p className="color"></p>
                            <p className="img-container"></p>
                        </label>
                        <label className="OUTPUT01">
                            <input onChange={handleChange} type="radio" name="internal" value="OUTPUT" />
                            <p className="color"></p>
                            <p className="img-container"></p>
                        </label>
                        <label className="READER01">
                            <input onChange={handleChange} type="radio" name="internal" value="READER" />
                            <p className="color"></p>
                            <p className="img-container"></p>
                        </label>
                    </div>
                    {nextQuestion && <button className="continue-button" onClick={handleClick}>CONTINUAR</button>}
                </div> :
                <ScreenRenderUniqueOptionsEncapsulate data={myData} hasImages={false} returnScore={setScore} isFinished={setPhase} center={true} /> 
            )
        }
        </ScoringComponent>
        
    )
}