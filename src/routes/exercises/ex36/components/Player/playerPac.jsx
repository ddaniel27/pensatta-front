import { useEffect, useState } from 'react'
import { PLAYER_RADIUS } from '../constants.js'
import { cssPosition } from '../helpers.js'
import './style.scss'
import PlayerPath from './playerSvg.jsx'

export default function Player ({ lost, onEnd, gridSize, position }) {
  const [timerLose, setTimerLose] = useState(null)

  const radius = gridSize * PLAYER_RADIUS

  const style = {
    ...cssPosition(position, gridSize),
    width: radius * 2,
    height: radius * 2,
    marginLeft: -radius,
    marginTop: -radius
  }

  const onLoseAnimation = () => {
    if (onEnd) {
      setImmediate(() => onEnd())
    }

    return null
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerLose)
    }
  }, [])

  useEffect(() => {
    if (!lost) {
      return
    }
    clearTimeout(timerLose)
    setTimerLose(onLoseAnimation())
  })

  return (
    <PlayerPath style={style} radius={radius} className="pacman-player"/>
  )
}

/**
 * @param {number} gridSize
 * @param {bool} animate
 * @param {bool} lost
 * @param {array} position
 * @param {number} direction
 * @param {function} onEnd
 */
