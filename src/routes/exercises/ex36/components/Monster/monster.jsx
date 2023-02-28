import React, { Component } from 'react'
import { cssPosition } from '../helpers'
import './style.scss'

function getColor (eating, eatingFlash, color) {
  if (eating) {
    if (eatingFlash) {
      return '#9261F9'
    }

    return '#1B6893'
  }

  return color
}

function MonsterIcon ({ gridSize, eating, eatingFlash, position, direction, color }) {
  const radius = gridSize * 0.75
  const pathProps = {
    stroke: 'none',
    fill: getColor(eating, eatingFlash, color)
  }

  const style = {
    ...cssPosition(position, gridSize),
    width: radius * 2,
    height: radius * 2,
    marginLeft: -radius,
    marginTop: -radius
  }

  return (
    <div className="pacman-monster" style={style}>
      <svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${radius * 3.5} ${radius * 3.5}`}>
        <path fillRule="evenodd" clipRule="evenodd" d="M6.16005 23.7262C2.66532 21.418 0.357178 17.4545 0.357178 12.9559C0.357178 5.83706 6.13729 0.0569458 13.2561 0.0569458C20.375 0.0569458 26.1551 5.83706 26.1551 12.9559C26.1551 17.4545 23.8469 21.418 20.3522 23.7262V25.851C20.3522 26.321 20.1656 26.7723 19.8327 27.1052C19.5005 27.4381 19.0493 27.6247 18.5785 27.6247C18.5785 27.6247 18.5785 27.6247 18.5779 27.6247C18.1078 27.6247 17.6566 27.4381 17.3237 27.1052C16.9914 26.7723 16.8042 26.321 16.8042 25.851V25.3594V25.851C16.8042 26.321 16.6176 26.7723 16.2847 27.1052C15.9518 27.4381 15.5012 27.6247 15.0305 27.6247H15.0298C14.5598 27.6247 14.1085 27.4381 13.7756 27.1052C13.444 26.7736 13.2574 26.3236 13.2561 25.8549C13.2548 26.3236 13.0682 26.7736 12.7366 27.1052C12.4037 27.4381 11.9525 27.6247 11.4824 27.6247H11.4818C11.0111 27.6247 10.5605 27.4381 10.2276 27.1052C9.89469 26.7723 9.70809 26.321 9.70809 25.851V25.3594V25.851C9.70809 26.321 9.52084 26.7723 9.1886 27.1052C8.8557 27.4381 8.40448 27.6247 7.9344 27.6247C7.93375 27.6247 7.93375 27.6247 7.93375 27.6247C7.46301 27.6247 7.01179 27.4381 6.67955 27.1052C6.34665 26.7723 6.16005 26.321 6.16005 25.851V23.7262V23.7262ZM11.2809 18.855C11.6547 18.1066 12.4194 17.634 13.2561 17.634C14.0929 17.634 14.8575 18.1066 15.2314 18.855C15.232 18.8557 15.232 18.8563 15.2327 18.857C15.4603 19.3127 15.4362 19.8537 15.1683 20.2867C14.9004 20.7197 14.4278 20.9837 13.918 20.9837C13.483 20.9837 13.0292 20.9837 12.5943 20.9837C12.0845 20.9837 11.6118 20.7197 11.344 20.2867C11.0761 19.8537 11.052 19.3127 11.2796 18.857C11.2802 18.8563 11.2802 18.8557 11.2809 18.855V18.855ZM20.1422 9.43517C20.3919 9.57171 20.6207 9.74335 20.8223 9.94491C21.9952 11.1178 21.9952 13.0222 20.8223 14.1958C19.6494 15.3687 17.745 15.3687 16.5714 14.1958C16.3705 13.9942 16.1989 13.7654 16.0617 13.5157L20.1422 9.43517ZM6.37006 9.43517C6.12039 9.57171 5.89153 9.74335 5.68997 9.94491C4.51704 11.1178 4.51704 13.0222 5.68997 14.1958C6.8629 15.3687 8.76728 15.3687 9.94086 14.1958C10.1418 13.9942 10.3134 13.7654 10.4506 13.5157L6.37006 9.43517Z" {...pathProps}/>
      </svg>
    </div>
  )
}

export default class Monster extends Component {
  constructor (props) {
    super(props)

    this.state = {
      eatingFlash: 0,
      timerFlash: this.getTimerFlash()
    }
  }

  getTimerFlash () {
    if (this.state) {
      clearInterval(this.state.timerFlash)
    }

    if (!this.props.eatingTime) {
      return null
    }

    return setInterval(() => {
      this.setState({ eatingFlash: (this.state.eatingFlash + 1) % 2 })
    }, 500)
  }

  componentDidUpdate (prevProps) {
    if ((this.props.eatingTime > 0 && prevProps.eatingTime === 0) ||
            (this.props.eatingTime === 0 && prevProps.eatingTime > 0)) {
      this.setState({ timerFlash: this.getTimerFlash() })
    }
  }

  componentWillUnmount () {
    clearInterval(this.state.timerFlash)
  }

  render () {
    if (this.props.deadTime > 0) {
      return null
    }

    const { eatingTime, ...props } = this.props
    const eating = eatingTime > 0

    return (
      <MonsterIcon eating={eating} {...props} {...this.state} />
    )
  }
}
