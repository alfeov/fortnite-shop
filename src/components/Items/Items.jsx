import styles from './Items.module.scss'

export default function Items({ children }) {
  return <div className={styles.items}>{children}</div>
}
