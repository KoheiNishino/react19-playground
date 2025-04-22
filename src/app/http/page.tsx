import { Suspense } from 'react'
import { Product } from './product'

async function fetchProduct() {
  return (await fetch('https://dummyjson.com/products/1')).json()
}

export default function App() {
  const productPromise = fetchProduct()
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <Product productPromise={productPromise} />
    </Suspense>
  )
}
