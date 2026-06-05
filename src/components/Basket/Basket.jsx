import { useRef } from 'react'
import styles from './Basket.module.scss'
import icon from '@/assets/icons/basket.svg'

export default function Basket({ basketItems }) {
  const modal = useRef()

  function showModal() {
    modal.current.showModal()
  }

  function closeModal() {
    modal.current.close()
  }

  function renderItems() {
    const uniqBasketItems = [...new Set(basketItems)]
    return uniqBasketItems.map((uniqBasketItem) => {
      const quantity = basketItems.filter(
        (basketItem) => uniqBasketItem.offerId === basketItem.offerId,
      ).length
      return (
        <>
          <li>
            {uniqBasketItem.devName
              .slice(0, uniqBasketItem.devName.indexOf(' for '))
              .replace('[VIRTUAL]', '')
              .replaceAll('1 x ', '')}
          </li>
          <span>{quantity}</span>
        </>
      )
    })
  }

  return (
    <>
      <button className={styles.basket_openBtn} onClick={showModal}>
        <span>Go to Basket...</span>
        <img src={icon} alt='basket image' />
        <div className={styles.count}>{basketItems.length}</div>
      </button>
      <dialog className={styles.basket} aria-modal='true' ref={modal}>
        <ul>{renderItems()}</ul>
        <button className={styles.basket_closeBtn} onClick={closeModal}>
          Close
        </button>
      </dialog>
    </>
  )
}
