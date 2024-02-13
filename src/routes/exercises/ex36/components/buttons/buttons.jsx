import React from 'react'
import styles from '../../../../../styles/mazeButton.module.css'
import { useTranslation } from 'react-i18next'

const MazeButton = ({ onClick, direction }) => {
  const icon = {
    right: <span className={styles.iconR} />,
    left: <span className={styles.iconL} />,
    up: <span className={styles.iconU} />,
    down: <span className={styles.iconD} />
  }

  return (
    <div className={styles.box} onClick={onClick}>
      {icon[direction]}
    </div>
  )
}
export default function CrossButtons ({ onClickUp, onClickLeft, onClickRight, onClickDown }) {
  const { t } = useTranslation('maze2Component')
  return (
    <div className={styles.containerCross}>
      <div className={styles.containerBtnsText}>
        <div className={styles.buttonsContainer}>
          <div className={styles.btnR}>
            <MazeButton onClick = {onClickRight} direction="right" />
          </div>
          <div className={styles.btnD}>
            <MazeButton onClick = {onClickDown} direction="down" />
          </div>
          <div className={styles.btnL}>
            <MazeButton onClick = {onClickLeft} direction="left" />
          </div>
          <div className={styles.btnU}>
            <MazeButton onClick={onClickUp} direction="up" />
          </div>
        </div>
        <div className={styles.infoText}>
          {t('info-text')}
        </div>

      </div>
    </div>
  )
}
