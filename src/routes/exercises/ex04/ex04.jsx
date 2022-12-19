import React from "react"
import ImageSelector from "../components/imageSelector"
import ImageSelected from "../components/imageSelected"
import ScoringComponent from "../components/scoringComponent"
import data from "./data.json"
import "../../../styles/ex04.css"

export default function Ex04(){

    const [ myData, setMyData ] = React.useState({
        ...data,
    })

    const [ selectedImage1, setSelectedImage1 ] = React.useState(null)
    const [ selectedImage2, setSelectedImage2 ] = React.useState(null)
    const [ selectedImage3, setSelectedImage3 ] = React.useState(null)
    const [ selectedImage4, setSelectedImage4 ] = React.useState(null)
    const [ selectedImage5, setSelectedImage5 ] = React.useState(null)
    const [ selectedImage6, setSelectedImage6 ] = React.useState(null)

    const [ selectedValue1, setSelectedValue1 ] = React.useState(null)
    const [ selectedValue2, setSelectedValue2 ] = React.useState(null)
    const [ selectedValue3, setSelectedValue3 ] = React.useState(null)
    const [ selectedValue4, setSelectedValue4 ] = React.useState(null)
    const [ selectedValue5, setSelectedValue5 ] = React.useState(null)
    const [ selectedValue6, setSelectedValue6 ] = React.useState(null)

    const [ selectedList, setSelectedList ] = React.useState(null)
    const [ showButton, setShowButton ] = React.useState(false)
    const [ confirmationButton, setConfirmationButton ] = React.useState(true)
    const [ nextQuestion, setNextQuestion ] = React.useState(false)
    const [finished, setFinished ] = React.useState(false)

    const stateArr = [ selectedImage1, selectedImage2, selectedImage3, selectedImage4, selectedImage5, selectedImage6 ]
    const setStateArr = [ setSelectedImage1, setSelectedImage2, setSelectedImage3, setSelectedImage4, setSelectedImage5, setSelectedImage6 ]

    const valueArr = [ selectedValue1, selectedValue2, selectedValue3, selectedValue4, selectedValue5, selectedValue6 ]
    const setValueArr = [ setSelectedValue1, setSelectedValue2, setSelectedValue3, setSelectedValue4, setSelectedValue5, setSelectedValue6 ]


    const handleChange = ({target}) => {
        if(target.checked){
            setSelectedList(target.value)
        }
    }
    const handleClick = () => {
        setNextQuestion(true)
        setFinished(true)
        setConfirmationButton(false)
    }
    const handleFinish = (cb1, cb2) => {
        const value = myData.questions.map(question => question.correct).reduce((acc, curr, idx) => {const valueAcc = curr == valueArr[idx] ? 1 : 0; return acc + valueAcc}, 0)
        cb1(value)
        cb2("end")

    }

    React.useEffect(()=>{
        if(valueArr.every(item => item !== null)){
            setShowButton(true)
        }
    }, [valueArr])

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
        {
            (setScore, setPhase) =>(

                <div className="ex04-component">
                    <div className = "img-selector">
                        {selectedList === null && <span>Elige una casilla para iniciar</span>}
                        {
                            setStateArr.map((item, index) => (
                                <div className="img-selector-item" hidden={index != selectedList} key={index}>
                                    <ImageSelector 
                                    keyIndex={index}
                                    options={myData.options}
                                    setCurrentValue={setValueArr[index]}
                                    setCurrentImage={item}
                                    disabled={nextQuestion}
                                    />
                                </div>

                            ))
                        }
                    </div>
                    <div className = "img-selected">
                        {
                            myData.questions.map((question,index)=>(
                                <label key={index} style={{backgroundColor: nextQuestion ? (question.correct == valueArr[index] ? "#69E485":"#F97D61") : "#FFFFFF"}}>
                                    <input type="radio" name={`question`} value={index} onChange={handleChange} hidden disabled={nextQuestion}/>
                                    <ImageSelected img={stateArr[index]}/>
                                    <p>{question.question}</p>
                                </label>
                            ))
                        }
                    </div>
                    {showButton && confirmationButton && <button onClick={handleClick}>RESPONDER</button>}
                    {finished && <button onClick={()=>{handleFinish(setScore,setPhase)}}>VOLVER</button>}
                </div>
                        )}
        </ScoringComponent>
    )

}