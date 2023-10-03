import useData from "../../../hooks/useData"
import NoScoringComponent from '../components/noScoringComponent'
import MapsGame from '../components/mapsGame'

export default function Ex93 () {
  const { data } = useData("ex93")
  return (
    <NoScoringComponent initMessages={data.initMessages} title={data.name} background={data.color}>
      {(setPhase) => (
        <MapsGame setPhase={setPhase} countries={data.countries} />
      )}
    </NoScoringComponent>
  )
}
