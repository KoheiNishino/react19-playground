import { Suspense } from 'react'
import { Product } from './product'

async function fetchProduct() {
  const res = await fetch('https://dummyjson.com/products/1')
  return res.json()
}

export default function App() {
  const productPromise = fetchProduct()
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <Product productPromise={productPromise} />
    </Suspense>
  )
}
