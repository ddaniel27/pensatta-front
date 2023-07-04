import styles from '../../styles/loadingView.module.css'
export default function Loading () {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div className={styles['loader-circle']} />
        <span className={styles['loader-text']}>Loading...</span>
      </div>
    </div>
  )
}
