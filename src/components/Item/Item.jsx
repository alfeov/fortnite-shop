import Loader from '@/components/Loader/Loader'
import { useState } from 'react'
import { useShopDispatch } from '../../ShopContext'
import noImage from '@/assets/images/no-image.png'
import styles from './Item.module.scss'

export default function Item({
  offerId,
  devName,
  regularPrice,
  newDisplayAsset,
  tracks,
  colors: { color1, color2, color3 },
  notificationHandler = Function.prototype,
}) {
  const [imgLoading, setImgLoading] = useState(true)
  const dispatch = useShopDispatch()
  const handleLoad = () => {
    setImgLoading(false)
  }

  const desc = devName
    .slice(0, devName.indexOf(' for '))
    .replace('[VIRTUAL]', '')

  const title = desc.replaceAll('1 x ', '')

  return (
    <article className={styles.item}>
      <div className={styles.imgWrapper}>
        {imgLoading && (
          <div className={styles.imgLoader}>
            <Loader />
          </div>
        )}
        <img
          className={styles.img}
          style={{
            opacity: imgLoading ? '0' : '1',
            background: `linear-gradient(#${color1}, ${color2 ? '#' + color2 + ',' : ''} #${color3})`,
          }}
          src={
            newDisplayAsset?.renderImages?.[0]?.image ??
            tracks?.[0]?.albumArt ??
            noImage
          }
          alt='Item image'
          loading='lazy'
          onLoad={handleLoad}
        />
      </div>
      <footer className={styles.footer}>
        <p className={styles.title}>{title}</p>
        <ul className={styles.info}>
          <li>{desc}</li>
        </ul>
        <button
          className={styles.button}
          onClick={() => {
            dispatch({
              type: 'add_to_order',
              payload: { offerId, title, regularPrice },
            })
            notificationHandler()
          }}
          aria-label='add to order'
        >
          {regularPrice}$
        </button>
      </footer>
    </article>
  )
}
