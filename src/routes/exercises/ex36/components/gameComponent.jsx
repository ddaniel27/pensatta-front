import { useState, useEffect, useRef } from 'react'
import { EAST, NORTH, WEST, SOUTH } from './constants'
import getInitialState from './state'
import { animate, changeDirection } from './game/game'
import Player from './Player/playerPac'
import './style.scss'

export default function GameComponent ({ gridSize = 12, isAnimate = true, onEnd = () => {} }) {
  const [state, setState] = useState(getInitialState())
  const timerStart = useRef(null)
  const timerAnimate = useRef(null)
  const props = { gridSize, animate: isAnimate }

  const changeDirectionOnThis = direction => {
    const result = changeDirection(state, direction)
    setState(result)
  }

  const onKey = evt => {
    if (evt.key === 'ArrowRight') {
      return changeDirectionOnThis(EAST)
    }
    if (evt.key === 'ArrowUp') {
      return changeDirectionOnThis(NORTH)
    }
    if (evt.key === 'ArrowLeft') {
      return changeDirectionOnThis(WEST)
    }
    if (evt.key === 'ArrowDown') {
      return changeDirectionOnThis(SOUTH)
    }

    return null
  }
  const step = () => {
    const result = animate(state)
    setState(result)
    clearTimeout(timerAnimate.current)
    timerAnimate.current = setTimeout(step, 20)
  }

  useEffect(() => {
    window.addEventListener('keydown', onKey)
    timerStart.current = setTimeout(() => {
      setState({ stepTime: Date.now() })
      step()
    }, 3000)

    return () => {
      window.removeEventListener('keydown', onKey)

      clearTimeout(timerStart.current)
      clearTimeout(timerAnimate.current)
    }
  }, [])

  return (
    <div className="pacman">
      <Player {...props} {...state.player} lost={state.lost} onEnd={onEnd} />
    </div>
  )
}

/**
 * @param {number} gridSize
 * @param {function} onEnd
 */
