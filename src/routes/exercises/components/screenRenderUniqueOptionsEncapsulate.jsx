import React from "react"
import UniqueOption from "./uniqueOption"
import MultipleOption from "./multipleOption"
import "../../../styles/screenRenderUniqueOptionsEncapsulate.css"
import "../../../styles/screenRenderUniqueOption.css"


export default function ScreenRenderUniqueOptionsEncapsulate({ data, hasImages = false, returnScore, isFinished, center=false, hasBackground = false, smallImg=false }){
    const [currentOption, setCurrentOption] = React.useState({})
    const [ optionsSet, setOptionsSet ] = React.useState([])
    const [ score, setScore ] = React.useState(false)
    const [ gobalScore, setGlobalScore ] = React.useState(0)
    const [ disabled, setDisabled ] = React.useState(true)
    const [ options, setOptions ] = React.useState(data.options)
    const [ nextQuestion, setNextQuestion ] = React.useState(false)
    const [ loadedImg, setLoadedImg ] = React.useState(false)
    const [ prevPath, setPrevPath ] = React.useState(false)
    const didMount = React.useRef(false)

    React.useEffect(() => {
        setOptions(data.options)
        setCurrentOption(getRandomOption())
        return () => {
            setScore(false)
            setGlobalScore(0)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    React.useEffect(() => {
        if ( !didMount.current ) {
            didMount.current = true;
            return;
        }
        setOptionsSet(getOptions(currentOption))
        if(prevPath !== currentOption.image){
            setLoadedImg(false)
        }
        setPrevPath(currentOption.image)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentOption])


    function getOptions({answers}){
        return answers.sort(()=>0.5-Math.random())
    }

    function getRandomOption() {
        if (options.length) {
            const value = options[options.length - 1]
            setOptions(options.slice(0, options.length - 1))
            return value
        }
        return null
    }

    const handleClick = () => {
        const value = getRandomOption()
        setNextQuestion(false)
        setGlobalScore(handleScore())
        setDisabled(true)
        if(value){
            document.querySelector(`${hasImages ? '.screenRenderUniqueOption' : '.screenRenderUniqueOptionsEncapsulate'}`).scrollTop = 0;
            setCurrentOption(value)
        }else{
            if(isFinished) { isFinished("end") }
        }
    }

    const handleScore = () =>{
        let value = null
        if(typeof score === "object"){
            value = (Object.values(score).length === currentOption.maxOptions && Object.values(score).every(curr=>curr)) ? gobalScore + 1 : gobalScore
        }else{
            value = score ? gobalScore + 1 : gobalScore
        }
        setScore(null)
        returnScore(value)
        return value
    }

    return (
        <div className={`${hasImages ? 'screenRenderUniqueOption' : 'screenRenderUniqueOptionsEncapsulate'} ${center && "center"}`}>
            {hasImages &&
                    <>
                        {loadedImg ? null : <div className="spinner-3"/> }
                        <img style={loadedImg ? {} : { display: 'none' }} src={`./images/exercises/${data.path}/${currentOption.image}`} alt={currentOption.image} className={`${hasBackground ? 'img-styled' : ''} ${smallImg? 'img-mini' : ''}`} onLoad={()=>{setLoadedImg(true)}}/>                
                    </>                
            }
            {currentOption.multiple ? 
                <MultipleOption options={optionsSet} isCorrectOption={setScore} enableButton={setDisabled} showCorrect={nextQuestion} title={currentOption.question} maxOptions={currentOption.maxOptions}/>:
                <UniqueOption options={optionsSet} isCorrectOption={setScore} enableButton={setDisabled} showCorrect={nextQuestion} title={currentOption.question} />
            }
            {!nextQuestion && <button className="button-play" onClick={()=>{setNextQuestion(true)}} disabled={disabled}>RESPONDER</button>}
            {nextQuestion && <button className="button-play" onClick={handleClick}>SIGUIENTE</button>}
        </div>
    )
}