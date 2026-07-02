import { useShopDispatch } from '@/ShopContext'
import styles from './BasketItem.module.scss'
import MinusIcon from '@/assets/icons/minus.svg?react'
import PlusIcon from '@/assets/icons/plus.svg?react'

export default function BasketItem({ offerId, title, regularPrice, quantity }) {
  const dispatch = useShopDispatch()
  return (
    <li className={styles.basketItem}>
      <p className={styles.basketItem__actions}>
        <button
          aria-label='decrease'
          className={styles.basketItem__decreaseBtn}
          onClick={() => {
            if (quantity <= 1) {
              dispatch({ type: 'remove_from_order', payload: offerId })
            } else {
              dispatch({ type: 'decrease_order_item', payload: offerId })
            }
          }}
        >
          <MinusIcon />
        </button>
        <span className={styles.basketItem__quantity}>{quantity}</span>
        <button
          aria-label='increase'
          className={styles.basketItem__increaseBtn}
          onClick={() => {
            dispatch({ type: 'increase_order_item', payload: offerId })
          }}
        >
          <PlusIcon />
        </button>
      </p>
      <p className={styles.basketItem__title}>{title}</p>
      <p className={styles.basketItem__price}>{regularPrice * quantity}$</p>
    </li>
  )
}
