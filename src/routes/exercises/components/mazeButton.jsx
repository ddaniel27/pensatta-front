import React from 'react'
import styles from '../../../styles/mazeButton.module.css'

const MazeButton = ({ onMouseDown, onMouseUp, onMouseLeave, direction }) => {
  let icon
  if (direction === 'right') {
    icon = <span className={styles.iconR} />
  }

  if (direction === 'left') {
    icon = <span className={styles.iconL} />
  }
  if (direction === 'up') {
    icon = <span className={styles.iconU} />
  }
  if (direction == 'down') {
    icon = <span className={styles.iconD} />
  }

  return (
    <div className={styles.box} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}>
      {icon}
    </div>
  )
}

export default MazeButton
