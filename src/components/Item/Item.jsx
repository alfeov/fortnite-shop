import Loader from '@/components/Loader/Loader'
import { memo, useState } from 'react'
import styles from './Item.module.scss'

const Item = memo(function Item({
  offerId,
  devName,
  regularPrice,
  newDisplayAsset,
  tracks,
  colors: { color1, color2, color3 },
  addToBasket,
}) {
  const [imgLoading, setImgLoading] = useState(true)

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
          src={newDisplayAsset?.renderImages[0]?.image ?? tracks[0]?.albumArt}
          alt='Item image'
          onLoad={handleLoad}
        />
      </div>
      <footer className={styles.footer}>
        <p className={styles.title}>{title}</p>
        <ul className={styles.info}>
          <li>{desc}</li>
        </ul>
        <button className={styles.button} onClick={() => addToBasket(offerId)}>
          {regularPrice}
        </button>
      </footer>
    </article>
  )
})

export default Item
