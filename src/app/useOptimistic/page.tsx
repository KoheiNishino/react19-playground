'use client'

import { useActionState, useOptimistic } from 'react'
import { useFormStatus } from 'react-dom'
import { addUser } from '../util/addUser'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
    >
      ユーザーを追加する
    </button>
  )
}

export default function Page() {
  const [addedUser, dispatch] = useActionState(async () => {
    // eslint-disable-next-line ts/no-use-before-define
    addOptimisticUser({ firstName: '🦄', lastName: '🦄', age: 0 })
    const user = await addUser()
    return user
  }, null)
  const [optimisticUser, addOptimisticUser] = useOptimistic(addedUser)

  return (
    <form action={dispatch} className="p-4">
      <SubmitButton />
      {optimisticUser !== null
        && (
          <div className="mt-4 w-80 rounded-lg border bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              {`${optimisticUser.firstName} ${optimisticUser.lastName}`}
            </h2>
            <p className="text-lg text-gray-600">
              年齢:
              {optimisticUser.age}
            </p>
          </div>
        )}
    </form>
  )
}
