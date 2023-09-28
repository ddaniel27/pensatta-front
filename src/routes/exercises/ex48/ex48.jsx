import {useEffect, useState} from "react"
import MazeCardsComponent from "../components/mazeCardsComponent"
import ScoringComponent from "../components/scoringComponent"
import useData from "../../../hooks/useData"

const Ex48 = () => {
    const [lab, setLab] = useState(Math.floor(Math.random() * 6) + 1);
    useEffect(()=>{
        setLab(Math.floor(Math.random() * 6) + 1)
        
    },[])

  const { data } = useData("ex48")
  const [myData, setMyData] = useState({ ...data })

  useEffect(() => {
    setMyData({ ...data })
  }, [data])

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <MazeCardsComponent cardsArray={myData.cards} setPhase={setPhase} setScore={setScore}/>
                )
            }
        </ScoringComponent>
        
    )

}

export default Ex48
