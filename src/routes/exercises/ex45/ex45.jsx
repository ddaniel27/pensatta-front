import data from './data.json'
import NoScoringComponent from '../components/noScoringComponent'
import FishGame from '../components/fishGame'
export default function Ex45 () {
  return (
    <NoScoringComponent initMessages={data.initMessages} background={data.color} title={data.name}>
      {(setPhase) => (
        <FishGame setPhase={setPhase}/>
      )}
    </NoScoringComponent>
  )
}
