'use client'

import Link from 'next/link'
import { useState, useTransition } from 'react'
import { addUser } from '../util/addUser'
import { cn } from '../util/cn'

interface User { firstName: string, lastName: string, age: number }

export default function Page() {
  const [addedUser, setAddedUser] = useState<User | null>(null)
  // const [isPending, setIsPending] = useState(false)

  // const handleClick = async () => {
  //   setAddedUser(null)
  //   setIsPending(true)
  //   const user = await addUser()
  //   setAddedUser(user)
  //   setIsPending(false)
  // }

  const [isPending, startTransition] = useTransition()
  const handleClick = () => {
    setAddedUser(null)
    startTransition(async () => {
      const user = await addUser()
      setAddedUser(user)
    })
  }

  return (
    <main>
      <Link className={cn('text-blue-600 underline hover:text-blue-800')} href="/">
        Top
      </Link>
      <div className="p-4">
        <button
          type="button"
          onClick={handleClick}
          disabled={isPending}
          className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          ユーザーを追加する
        </button>
        {addedUser
          ? (
              <div className="mt-4 w-80 rounded-lg border bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  {`${addedUser.firstName} ${addedUser.lastName}`}
                </h2>
                <p className="text-lg text-gray-600">
                  年齢:
                  {addedUser.age}
                </p>
              </div>
            )
          : isPending
            ? (
                <p className="mt-8 text-lg text-gray-500">ユーザーを追加しています...</p>
              )
            : null}
      </div>
    </main>
  )
}
