import { Component } from 'react'
import { EAST, NORTH, WEST, SOUTH } from './constants'
import getInitialState from './state'
import { animate, changeDirection } from './game/game'
import Board from './Board/board'
import AllFood from './AllFood/allFood'
import Monster from './Monster/monster'
import Player from './Player/playerPac'
import './style.scss'
import CrossButtons from './buttons/buttons'

export default class Pacman extends Component {
  constructor (props) {
    super(props)

    this.state = getInitialState()

    this.onKey = evt => {
      if (evt.key === 'ArrowRight') {
        return this.changeDirection(EAST)
      }
      if (evt.key === 'ArrowUp') {
        return this.changeDirection(NORTH)
      }
      if (evt.key === 'ArrowLeft') {
        return this.changeDirection(WEST)
      }
      if (evt.key === 'ArrowDown') {
        return this.changeDirection(SOUTH)
      }

      return null
    }

    this.timers = {
      start: null,
      animate: null
    }
  }

  componentDidMount () {
    window.addEventListener('keydown', this.onKey)

    this.timers.start = setTimeout(() => {
      this.setState({ stepTime: Date.now() })

      this.step()
    }, 3000)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onKey)

    clearTimeout(this.timers.start)
    clearTimeout(this.timers.animate)
  }

  step () {
    const result = animate(this.state)

    this.setState(result)

    clearTimeout(this.timers.animate)
    this.timers.animate = setTimeout(() => this.step(), 20)
  }

  changeDirection (direction) {
    this.setState(changeDirection(this.state, { direction }))
  }

  render () {
    const { onEnd, ...otherProps } = this.props

    const props = { gridSize: 12, ...otherProps }

    const monsters = this.state.monsters.map(({ id, ...monster }) => (
      <Monster key={id} {...props} {...monster} />
    ))

    return (
      <div className='pacman-game-all-container'>
        <div className='pacman-game-container'>
          <div className="pacman">
            <Board {...props} />
            <AllFood {...props} food={this.state.food} setPhase={this.props.setIsFinish}/>
            {monsters}
            <Player {...props} {...this.state.player} lost={this.state.lost} onEnd={onEnd} />
          </div>
          <CrossButtons onClickDown={() => this.changeDirection(SOUTH)} onClickUp={() => this.changeDirection(NORTH)} onClickLeft={() => this.changeDirection(WEST)} onClickRight={() => this.changeDirection(EAST)} />
          {(this.state.lost || this.props.isFinish) && <button onClick={() => this.props.setPhase('end')}>SIGUIENTE</button>}
        </div>
      </div>
    )
  }
}

/**
 * @param {number} gridSize
 * @param {function} onEnd
 */
