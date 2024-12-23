'use client'

import { useOptimistic, useState } from 'react'

export default function Page() {
  const [baseName, setBaseName] = useState('currentName')
  const [optimisticName, setOptimisticName] = useOptimistic(baseName)

  const action = async (formData: FormData) => {
    const newName = formData.get('name') as string
    setOptimisticName(newName)
    await new Promise(resolve => setTimeout(resolve, 500))
    setBaseName(newName)
    // eslint-disable-next-line no-console
    console.log(`${newName}に更新しました。`)
  }

  return (
    <form action={action}>
      <p>
        Your name is:
        {optimisticName}
      </p>
      <p>
        <label>Change Name: </label>
        <input
          className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          type="text"
          name="name"
          disabled={baseName !== optimisticName}
        />
      </p>
    </form>
  )
}
