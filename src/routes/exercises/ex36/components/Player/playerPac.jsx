import React, { Component } from 'react'
import { PLAYER_RADIUS } from '../constants'
import { cssPosition } from '../helpers'
import PlayerPath from './playerSvg'
import './style.scss'

const ANIMATION_SPEED = 30

export default class Player extends Component {
  constructor (props) {
    super(props)

    this.state = {
      angle: 1,
      timerBite: null,
      timerLose: null
    }

    this.startTime = Date.now()
  }

  componentDidMount () {
    this.setState({
      timerBite: setInterval(() => this.setState({
        angle: 1 + 0.5 * Math.sin((Date.now() - this.startTime) / 50)
      }), ANIMATION_SPEED)
    })
  }

  componentWillUnmount () {
    clearInterval(this.state.timerBite)
    clearTimeout(this.state.timerLose)
  }

  onLoseAnimation () {
    if (this.state.angle < Math.PI * 2) {
      return setTimeout(() => {
        this.setState({
          angle: Math.min(Math.PI * 2, this.state.angle + 0.1),
          timerLose: this.onLoseAnimation()
        })
      }, ANIMATION_SPEED)
    }

    if (this.props.onEnd) {
      setImmediate(() => this.props.onEnd())
    }

    return null
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.lost && this.props.lost) {
      clearInterval(this.state.timerBite)
      clearTimeout(this.state.timerLose)

      this.setState({ angle: 0, timerLose: this.onLoseAnimation() })
    }
  }

  render () {
    const { gridSize, position } = this.props

    const radius = gridSize * PLAYER_RADIUS

    const style = {
      ...cssPosition(position, gridSize),
      width: radius * 2,
      height: radius * 2,
      marginLeft: -radius,
      marginTop: -radius
    }

    return (
      <PlayerPath style={style} className="pacman-player"/>
    )
  }
}

/**
 * @param {number} gridSize
 * @param {bool} animate
 * @param {bool} lost
 * @param {array} position
 * @param {number} direction
 * @param {function} onEnd
 */
