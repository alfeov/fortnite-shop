import { useEffect, useState } from 'react'
import Basket from '@/components/Basket/Basket'
import Loader from '@/components/Loader/Loader'
import Items from '@/components/Items/Items'
import Item from '@/components/Item/Item'
import Notification from '@/components/Notification/Notification'
import styles from './Main.module.scss'

export default function Main() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [order, setOrder] = useState([])
  const [showNotification, setShowNotification] = useState(false)

  function addToBasket(item) {
    let isItemInOrder = false
    const updatedOrder = [...order].map((orderItem) => {
      if (orderItem.offerId === item.offerId) {
        isItemInOrder = true
        return { ...orderItem, quantity: orderItem.quantity + 1 }
      }
      return orderItem
    })
    setOrder(
      isItemInOrder ? updatedOrder : [...order, { ...item, quantity: 1 }],
    )
    if (showNotification) setShowNotification(false)
    setTimeout(() => {
      setShowNotification(true)
    }, 0)
  }

  function increaseOrderItem(itemId) {
    const updatedOrder = [...order].map((orderItem) => {
      if (orderItem.offerId === itemId)
        return { ...orderItem, quantity: orderItem.quantity + 1 }
      return orderItem
    })
    setOrder(updatedOrder)
  }

  function decreaseOrderItem(itemId, quantity) {
    if (quantity <= 1) {
      removeFromBasket(itemId)
    } else {
      const updatedOrder = [...order].map((orderItem) => {
        if (orderItem.offerId === itemId)
          return { ...orderItem, quantity: orderItem.quantity - 1 }
        return orderItem
      })
      setOrder(updatedOrder)
    }
  }

  function removeFromBasket(itemId) {
    const updatedOrder = [...order].filter(({ offerId }) => offerId !== itemId)
    setOrder(updatedOrder)
  }

  function removeAllOrderItems() {
    if (order.length) setOrder([])
  }

  useEffect(() => {
    async function searchItems() {
      try {
        const response = await fetch('https://fortnite-api.com/v2/shop')
        if (!response.ok) throw new Error('HTTP:' + response.status)
        const data = await response.json()
        // ! custom limit
        setItems(data?.data.entries.slice(0, 10) ?? [])
      } catch (error) {
        setIsError(true)
        setItems([])
        throw new Error(error.message, {
          cause: error,
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (isLoading) {
      searchItems()
    }
  }, [isLoading])

  return (
    <main className={styles.main}>
      <Basket
        order={order}
        removeAllOrderItems={removeAllOrderItems}
        increaseOrderItem={increaseOrderItem}
        decreaseOrderItem={decreaseOrderItem}
      />
      {showNotification && <Notification message={'Item has been added'} />}
      <Items>
        {isLoading ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : isError ? (
          <div className={styles.emptyMessage}>
            <p>Something wrong</p>
          </div>
        ) : items.length === 0 ? (
          <div className={styles.emptyMessage}>
            <p>There are no results</p>
          </div>
        ) : (
          items.map((item) => (
            <Item key={item.offerId} {...item} addToBasket={addToBasket}></Item>
          ))
        )}
      </Items>
    </main>
  )
}
