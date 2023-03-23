import ScoringComponent from '../components/scoringComponent'
import data from './data.json'
import TextSelectComponent from '../components/textSelectComponent'

export default function Ex72 () {
  const myData = data

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <TextSelectComponent text={myData.options[1].texto} options={myData.options[1].opciones} setPhase={setPhase} setScore={setScore}/>
        )
      }
    </ScoringComponent>
  )
}
