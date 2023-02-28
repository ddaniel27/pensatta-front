import GameComponent from './components/gameComponent'

export default function Ex36 () {
  const props = {
    gridSize: 12,
    animate: true
  }
  return (
    <GameComponent {...props}/>
  )
}
