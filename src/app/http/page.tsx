'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

export default function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get('https://dummyjson.com/products/1')
      setData(await res.data)
    }

    getProduct()
  }, [])

  return (
    <div>{JSON.stringify(data)}</div>
  )
}
