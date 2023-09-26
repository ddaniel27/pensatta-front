import ScoringComponent from '../components/scoringComponent.jsx'
import data from './data.json'
import BloodnameComponent from '../components/bloodnameComponent.jsx'

const Ex52 = () => {
  return (
    <ScoringComponent initMessages={data.initMessages} title={data.name} background={data.color} threshold={data.threshold} exerciseId={data.id}>
      {
        (setScore, setPhase) => (
          <BloodnameComponent setPhase={setPhase} setScore={setScore} />
        )
      }
    </ScoringComponent>
  )
}
export default Ex52
