import { useEffect, useState } from 'react'
import { useShop, useShopDispatch } from '@/ShopContext'
import Notification from '@/components/Notification/Notification'
import Basket from '@/components/Basket/Basket'
import Loader from '@/components/Loader/Loader'
import Items from '@/components/Items/Items'
import Item from '@/components/Item/Item'
import styles from './Main.module.scss'

let didInit = false
export default function Main() {
  const { items, isLoading, isError } = useShop()
  const [showNotification, setShowNotification] = useState(false)
  const dispatch = useShopDispatch()

  useEffect(() => {
    async function searchItems() {
      try {
        const response = await fetch('https://fortnite-api.com/v2/shop')
        if (!response.ok) throw new Error('HTTP:' + response.status)
        const data = await response.json()
        // ! custom limit
        dispatch({
          type: 'received_items',
          payload: data?.data.entries.slice(0, 20) ?? [],
        })
      } catch (error) {
        dispatch({ type: 'received_error' })

        throw new Error(error.message, {
          cause: error,
        })
      }
    }

    if (!didInit) {
      didInit = true
      searchItems()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // only on first init

  function notificationHandler() {
    setShowNotification(false)
    setTimeout(() => {
      setShowNotification(true)
    }, 0)
  }

  return (
    <main className={styles.main}>
      <Basket />
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
            <Item
              key={item.offerId}
              {...item}
              notificationHandler={notificationHandler}
            ></Item>
          ))
        )}
      </Items>
    </main>
  )
}
