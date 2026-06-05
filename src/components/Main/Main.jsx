import { useCallback, useEffect, useState } from 'react'
import Basket from '@/components/Basket/Basket'
import Loader from '@/components/Loader/Loader'
import Items from '@/components/Items/Items'
import Item from '@/components/Item/Item'
import styles from './Main.module.scss'

export default function Main() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [basketItems, setBasketItems] = useState([])

  const addToBasket = useCallback(
    (itemId) => {
      const item = items.find(({ offerId }) => offerId === itemId)
      setBasketItems([...basketItems, item])
    },
    [basketItems, items],
  )

  useEffect(() => {
    async function searchItems() {
      try {
        const response = await fetch('https://fortnite-api.com/v2/shop')
        if (!response.ok) throw new Error('HTTP:' + response.status)
        const data = await response.json()
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
      <Basket basketItems={basketItems} />
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
