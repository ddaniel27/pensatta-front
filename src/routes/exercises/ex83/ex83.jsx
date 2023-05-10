import ScoringComponent from '../components/ScoringComponent'
import DfdSelect from '../components/dfdSelect'
import data from './data.json'

export default function ex83 () {
  const variations = data.variations[0]
  return (
    <ScoringComponent initMessages={data.initMessages} title={data.name} background={data.color} exerciseId={data.id} threshold={data.threshold} >
      {
        (setScore, setPhase) => (
          <DfdSelect purple={variations.purple} yellow={variations.yellow} gray1={variations.gray1} gray2={variations.gray2} gray3={variations.gray3} gray4={variations.gray4} corrects={variations.corrects} setScore={setScore} setPhase={setPhase} />
        )
      }
    </ScoringComponent>
  )
}