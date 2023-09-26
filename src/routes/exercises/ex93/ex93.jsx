import data from './data.json'
import NoScoringComponent from '../components/noScoringComponent'
import MapsGame from '../components/mapsGame'

export default function Ex93 () {
  return (
    <NoScoringComponent initMessages={data.initMessages} title={data.name} background={data.color}>
      {(setPhase) => (
        <MapsGame setPhase={setPhase} countries={data.countries} />
      )}
    </NoScoringComponent>
  )
}
