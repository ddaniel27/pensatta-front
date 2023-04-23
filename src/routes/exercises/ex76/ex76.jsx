import data from './data.json'
import WindowsExplorer from '../components/windowsExplorer'
import NoScoringComponent from '../components/noScoringComponent'

export default function Ex76 () {
  return (
    <NoScoringComponent initMessages={data.initMessages} title={data.name} background={data.color}>
      {
        (setPhase) => (
          <>
            <WindowsExplorer content={data.content}/>
            <button onClick={() => setPhase('end')}>SIGUIENTE</button>
          </>
        )
      }
    </NoScoringComponent>
  )
}
