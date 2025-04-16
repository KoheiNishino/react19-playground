'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function App() {
  const { data, error, isLoading } = useSWR(
    'https://dummyjson.com/products/1',
    fetcher,
  )

  if (isLoading) {
    return (
      <span>Loading...</span>
    )
  }

  if (error) {
    return (
      <span>
        Error:
        {error.message}
      </span>
    )
  }

  return <div>{JSON.stringify(data)}</div>
}
