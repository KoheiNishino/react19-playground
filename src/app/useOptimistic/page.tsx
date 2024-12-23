'use client'

import Link from 'next/link'
import { useOptimistic, useState } from 'react'
import { cn } from '../util/cn'
import { sleep } from '../util/sleep'

export default function Page() {
  const [baseName, setBaseName] = useState('currentName')
  const [optimisticName, setOptimisticName] = useOptimistic(baseName)

  const action = async (formData: FormData) => {
    const newName = formData.get('name') as string
    setOptimisticName(newName)
    await sleep(1000)
    setBaseName(newName)
    // eslint-disable-next-line no-console
    console.log(`${newName}に更新しました。`)
  }

  return (
    <main>
      <Link className={cn('text-blue-600 underline hover:text-blue-800')} href="/">
        Top
      </Link>
      <form action={action}>
        <p>
          Your name is:
          {optimisticName}
        </p>
        <p>
          <label>Change Name: </label>
          <input
            className={cn(
              'rounded-md border',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              'disabled:bg-gray-100 disabled:text-gray-500',
              'disabled:cursor-not-allowed disabled:border-gray-200',
            )}
            type="text"
            name="name"
            disabled={baseName !== optimisticName}
          />
        </p>
      </form>
    </main>
  )
}
