import { useState, useEffect } from 'react'
import BuiltImage from '@components/BuiltImage'

import styles from './QueryImage.module.css'

export function useQuery(passed) {
  let [planet, setPlanet] = useState(passed)

  useEffect(() => {
    let current = true
    fetch(`https://images-api.nasa.gov/search?q=${passed}`)
      .then((res) => res.json())
      .then((res) => {
        if (current) {
          setPlanet(res)
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
    return () => {
      current = false
    }
  }, [passed])

  return planet
}

export default function QueryImage() {
  let [query, setQuery] = useState('pluto')
  let data = useQuery(query)

  let image = data.collection?.items[0] || null
  if (image?.links) {
    image = image.links[0]
  }

  let info = data.collection?.items[0]?.data[0]

  return (
    <div className={styles.query}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
      />
      {image && <BuiltImage image={image?.href} info={info} />}
    </div>
  )
}
