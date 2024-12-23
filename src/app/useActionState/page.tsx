'use client'

import Link from 'next/link'
import { useActionState, useState, useTransition } from 'react'
import { cn } from '../util/cn'
import { sleep } from '../util/sleep'

interface User { firstName: string, lastName: string, age: number }

async function addUser(): Promise<User> {
  await sleep(500)
  const res = await fetch('https://dummyjson.com/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: 'Muhammad',
      lastName: 'Ovi',
      age: 250,
    }),
  })
  const json = await res.json()
  return json
}

export default function Page() {
  const [addedUser, dispatch, isPending] = useActionState(async () => {
    const user = await addUser()
    return user
  }, null)

  return (
    <main>
      <Link className={cn('text-blue-600 underline hover:text-blue-800')} href="/">
        Top
      </Link>
      <form action={dispatch} className="p-4">
        <button
          type="submit"
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
      </form>
    </main>
  )
}
