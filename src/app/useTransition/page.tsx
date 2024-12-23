'use client'

import { useState, useTransition } from 'react'
import { addUser } from '../util/addUser'

export default function Page() {
  const [addedUser, setAddedUser] = useState<{ firstName: string, lastName: string, age: number } | null>(null)
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
    <div className="p-4">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
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
  )
}
