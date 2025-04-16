'use client'

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()

function Product() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await fetch('https://dummyjson.com/products/1')
      return res.json()
    },
  })

  if (isPending) {
    return (
      <span>Loading...</span>
    )
  }

  if (isError) {
    return (
      <span>
        Error:
        {error.message}
      </span>
    )
  }
  return <div>{JSON.stringify(data)}</div>
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Product />
    </QueryClientProvider>
  )
}
