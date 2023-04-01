import ScoringComponent from '../components/scoringComponent.jsx'
import data from './data.json'
import DigitalCircuitGame from '../components/digitalCircuitGame.jsx'

export default function Ex90 () {
  return (
    <ScoringComponent initMessages={data.initMessages} background={data.color} title={data.name} exerciseId={data.id} threshold={data.threshold}>
      {
        (setScore, setPhase) => (
          <DigitalCircuitGame setPhase={setPhase} setScore={setScore} texts={data.texts}/>
        )
      }
    </ScoringComponent>)
}
