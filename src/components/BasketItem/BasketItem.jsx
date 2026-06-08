import styles from './BasketItem.module.scss'

export default function BasketItem({ title, regularPrice, quantity }) {
  return (
    <li className={styles.basketItem}>
      <p className={styles.basketItem__actions}>
        <button aria-label='decrease' className={styles.basketItem__minusBtn}>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g
              id='SVGRepo_tracerCarrier'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></g>
            <g id='SVGRepo_iconCarrier'>
              {' '}
              <path
                d='M6 12L18 12'
                stroke='#000000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>{' '}
            </g>
          </svg>
        </button>
        <span className={styles.basketItem__quantity}>{quantity}</span>
        <button aria-label='increase' className={styles.basketItem__plusBtn}>
          <svg
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g
              id='SVGRepo_tracerCarrier'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></g>
            <g id='SVGRepo_iconCarrier'>
              {' '}
              <path
                d='M6 12H18M12 6V18'
                stroke='#000000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>{' '}
            </g>
          </svg>
        </button>
      </p>
      <p className={styles.basketItem__title}>{title}</p>
      <p className={styles.basketItem__price}>{regularPrice * quantity}$</p>
    </li>
  )
}
