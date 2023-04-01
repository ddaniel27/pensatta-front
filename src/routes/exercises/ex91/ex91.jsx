import NoScoringComponent from '../components/noScoringComponent'
import data from './data.json'
import ServerGame from '../components/serverGame'

export default function Ex91 () {
  return (
    <NoScoringComponent initMessages={data.initMessages} background={data.color} title={data.name}>
      {
        (setPhase) => (
          <ServerGame setPhase={setPhase}/>
        )
      }
    </NoScoringComponent>
  )
}
