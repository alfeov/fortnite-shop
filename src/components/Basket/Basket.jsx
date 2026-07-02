import { useRef } from 'react'
import { useShop, useShopDispatch } from '@/ShopContext'
import BasketItem from '@/components/BasketItem/BasketItem'
import styles from './Basket.module.scss'
import BasketIcon from '@/assets/icons/basket.svg?react'
import TrashIcon from '@/assets/icons/trash.svg?react'
import XIcon from '@/assets/icons/x.svg?react'

export default function Basket() {
  const { order } = useShop()
  const dispatch = useShopDispatch()
  const modal = useRef()

  function showModal() {
    modal.current.showModal()
  }

  function closeModal() {
    modal.current.close()
  }

  const totalPrice = order.reduce(
    (acc, { regularPrice, quantity }) => acc + regularPrice * quantity,
    0,
  )

  function handleConfirmClick() {
    dispatch({ type: 'clear_order' })
    closeModal()
  }

  function handleDeleteAllClick() {
    dispatch({ type: 'clear_order' })
  }

  function handleCloseClick() {
    closeModal()
  }

  function handleEmptySpaceClick({ target, currentTarget }) {
    if (target === currentTarget) {
      closeModal()
    }
  }

  return (
    <>
      <button
        className={styles.openBasketBtn}
        onClick={showModal}
        aria-label='Open basket'
      >
        Go to Basket...
        <BasketIcon className={styles.icon} />
        <div className={styles.openBasketBtn__counter}>{order.length}</div>
      </button>
      <dialog
        className={styles.basket}
        aria-label='basket'
        ref={modal}
        onClick={handleEmptySpaceClick}
      >
        <div className={styles.basket__container}>
          <p className={styles.basket__title}>Basket</p>
          {order.length === 0 ? (
            <div className={styles.emptyMessage}>
              <p>There is nothing here yet...</p>
            </div>
          ) : (
            <ul className={styles.basket__list}>
              {order.map((orderItem) => {
                return <BasketItem key={orderItem.offerId} {...orderItem} />
              })}
              <li className={styles.basket__item}>
                <p className={styles.basket__text}>Total Price: </p>
                <p>{totalPrice}$</p>
              </li>
            </ul>
          )}
          <button
            className={styles.basket__confirmBtn}
            onClick={handleConfirmClick}
            aria-label='Confirm'
          >
            Confirm
          </button>
          <button
            aria-label='close'
            className={styles.basket__closeBtn}
            onClick={handleCloseClick}
          >
            <XIcon />
          </button>
          <button
            aria-label='delete all'
            className={styles.basket__deleteAllBtn}
            onClick={handleDeleteAllClick}
          >
            <TrashIcon />
          </button>
        </div>
      </dialog>
    </>
  )
}
