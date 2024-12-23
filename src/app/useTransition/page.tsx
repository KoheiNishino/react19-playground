'use client'

import { useState } from 'react'
import { sleep } from '../util/sleep'

interface Product { title: string, price: number }

async function getRandomProduct(): Promise<Product> {
  await sleep(500)
  const res = await fetch(
    `https://dummyjson.com/products/${Math.floor(Math.random() * 100) + 1}`,
  )
  const json = await res.json()
  return json
}

export default function Page() {
  const [product, setProduct] = useState<Product | null>(null)

  const [isPending, setIsPending] = useState(false)
  const handleClick = async () => {
    setProduct(null)
    setIsPending(true)
    const product = await getRandomProduct()
    setProduct(product)
    setIsPending(false)
  }

  // const [isPending, startTransition] = useTransition()
  // const handleClick = () => {
  //   setProduct(null)
  //   startTransition(async () => {
  //     const product = await getRandomProduct()
  //     setProduct(product)
  //   })
  // }

  return (
    <div className="p-4">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        商品を取得する
      </button>
      {product
        ? (
            <div className="mt-4 w-80 rounded-lg border bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                {product.title}
              </h2>
              <p className="text-lg text-gray-600">
                価格: $
                {product.price}
              </p>
            </div>
          )
        : isPending
          ? (
              <p className="mt-8 text-lg text-gray-500">Loading...</p>
            )
          : null}
    </div>
  )
}
