import styles from '../../../styles/backButtonInGame.module.css'

export default function BackButtonInGame ({ onClick = () => {} }) {
  return (
    <div className={styles['back-button-in-game']} onClick={onClick}>{'<'}</div>
  )
}
