import useData from "../../../hooks/useData"
import ScoringComponet from '../components/scoringComponent'
import MazeMouseComponent from '../components/labratComponent'

export default function Ex49 () {
  const { data } = useData("ex49")
  return (
    <>
      <ScoringComponet initMessages={data.initMessages} background={data.color} title={data.name} exerciseId={data.id} threshold={data.threshold}>
        {
          (setScore, setPhase) => (<MazeMouseComponent lab={1} setScore={setScore} setPhase={setPhase} />)
        }
      </ScoringComponet>
    </>
  )
}
