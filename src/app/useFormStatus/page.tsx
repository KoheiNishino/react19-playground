'use client'

import { useFormStatus } from 'react-dom'

async function action(formData: FormData) {
  const name = formData.get('name')
  await new Promise(resolve => setTimeout(resolve, 500))
  // eslint-disable-next-line no-console
  console.log('submitted:', name)
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
    >
      送信する
    </button>
  )
}

export default function Page() {
  return (
    <form action={action} className="flex gap-2">
      <input
        className="h-12 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        name="name"
      />
      <SubmitButton />
    </form>
  )
}
