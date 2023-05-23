import data from './data.json'
import NoScoringComponent from '../components/NoScoringComponent'
import MapsGame from '../components/mapsGame'

export default function Ex93 () {
  return (
    <NoScoringComponent>
      {(setPhase) => (
        <MapsGame setPhase={setPhase} countries={data.countries} />
      )}
    </NoScoringComponent>
  )
}
