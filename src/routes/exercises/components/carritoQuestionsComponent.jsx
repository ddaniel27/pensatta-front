import { useState, useEffect,useLayoutEffect } from "react";
import carrito from "/images/exercises/64/carrito.svg"
import styles from "../../../styles/carritoQuestions.module.css"


const Pista = ({corrects})=>{
    return(
        <div className={styles.pista}>
            <img src={carrito} className={styles[`carrito${corrects}`]}></img>
        </div>
    )

}

const Card = ({id, question, value, isFinish,setAnswers})=>{
    const [selection, setSelection] = useState(null)
    const [isSelection, setIsSelection] = useState(false)

    const handleClick = (selected)=>{
        if(!isFinish){
            setIsSelection(true)
            setSelection(selected)
            setAnswers(
                prev => (
                    prev.map( ans =>{
                        if(ans.id == id){
                            return {id:ans.id, answer:selected, isSelected:true}
                        }
                        return ans
                    })
            )
        )
        }

    }
        
    return (
        <div className={styles.card}>
            <div className={styles.cardSentence}>{question}</div>
            <div className={styles.cardButtonsContainer}>
                <div className={isSelection&&!selection?styles.buttonPress:styles.cardButton} style={isFinish&&!selection?(selection==value?{backgroundColor:"#69E485"}:{backgroundColor:"#FF7171"}):null} onClick={()=>{handleClick(false)}}>F</div>
                <div className={isSelection&&selection?styles.buttonPress:styles.cardButton} style={isFinish&&selection?(selection==value?{backgroundColor:"#69E485"}:{backgroundColor:"#FF7171"}):null} onClick={()=>{handleClick(true)}}>V</div>
            </div>
        </div>
    )
}

const GridCards = ({questions,setAnswers,isFinish})=>{
    return(
        <div className={styles.gridCard}>
            {
                questions.map(
                    question =>(<Card key={question.id} id={question.id} question={question.question} value={question.value} setAnswers={setAnswers} isFinish={isFinish}/>)
                )
            }
        </div>
    )

}

const CarritoQuestionsComponent = ({data,setPhase,setScore})=>{
    const [questions, setQuestions] = useState(data.questions)
    const [answers, setAnswers] = useState(questions.map(
        q => ({id: q.id, answer:null, isSelected:false})
    ))
    const [answered, setAnswered] = useState(0)
    const [isFinish, setIsFinish] = useState(false)
    const [corrects, setCorrects] = useState(0)

    function selectRandomElements(arr, num) {
        let selectedElements = [];
        for (let i = 0; i < num; i++) {
            let randomIndex = Math.floor(Math.random() * arr.length);
            selectedElements.push(arr[randomIndex]);
            arr.splice(randomIndex, 1);
        }
        return selectedElements;
    }

    const sortQuestions = ()=>{
        const shuffleQuestions = [...questions]
        shuffleQuestions.sort( () => Math.random() - 0.5)
        setQuestions(shuffleQuestions)
    }
    
    useEffect(()=>{
        sortQuestions()
    },[])
    useEffect(()=>{
        console.log(answers)
    },[answers])

    useEffect(()=>{
        setAnswered(answers.filter((ans) => ans.isSelected === true).length)
    },[answers])

    const handleResponder = ()=>{
        answers.map(ans => {
            const correct = questions.filter(q => q.id == ans.id)[0].value == ans.answer
                       
            if (correct){
                setCorrects(prev => prev+1)
            }

        })
        setIsFinish(true)
    }
    useEffect(()=>{console.log(corrects)},[corrects])
    useEffect(()=>{
        setScore(corrects)
    },[isFinish])

    return(
        <div className={styles.gameContainer}>
            <Pista corrects={corrects} />
            <GridCards questions={questions} setAnswers={setAnswers} isFinish={isFinish}/>
            {answered == questions.length && !isFinish?<button onClick={handleResponder}>RESPONDER</button>:<></>}
            {isFinish?<button onClick={()=>{setPhase("end")}}>SIGUIENTE</button>:<></>}
        </div>
    )

}

export default CarritoQuestionsComponent