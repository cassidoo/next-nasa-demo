import styles from './BuiltImage.module.css'

export default function BuiltImage({ image, info }) {
  return (
    <div role="figure" aria-labelledby="caption" className={styles.figure}>
      <img src={image} alt={info?.description} />
      <p id="caption">
        <strong>{info?.title}:</strong> {info?.description}
      </p>
    </div>
  )
}
