'use client'

import { use } from 'react'

export function Product({ productPromise }: {
  productPromise: Promise<any>
}) {
  const productContent = use(productPromise)
  return <div>{JSON.stringify(productContent)}</div>
}
