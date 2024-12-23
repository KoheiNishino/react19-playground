import { Suspense, use } from 'react'
import { addUser } from '../util/addUser'

function User({ addUserPromise }: { addUserPromise: ReturnType<typeof addUser> }) {
  const user = use(addUserPromise)
  return (
    <div className="mt-4 w-80 rounded-lg border bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        {`${user.firstName} ${user.lastName}`}
      </h2>
      <p className="text-lg text-gray-600">
        年齢:
        {user.age}
      </p>
    </div>
  )
}

export default function Page() {
  const addUserPromise = addUser()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <User addUserPromise={addUserPromise} />
    </Suspense>
  )
}
