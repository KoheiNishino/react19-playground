'use client'

import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { cn } from '../util/cn'
import { sleep } from '../util/sleep'

async function action(formData: FormData) {
  const name = formData.get('name')
  await sleep(1000)
  // eslint-disable-next-line no-console
  console.log('submitted:', name)
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        'h-12 w-16 rounded-md font-medium',
        'bg-blue-500 text-white',
        'hover:bg-blue-600',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        'disabled:bg-gray-100 disabled:text-gray-500',
        'disabled:cursor-not-allowed disabled:border-gray-200',
      )}
    >
      送信
    </button>
  )
}

export default function Page() {
  return (
    <main>
      <Link className={cn('text-blue-600 underline hover:text-blue-800')} href="/">
        Top
      </Link>
      <form action={action} className={cn('flex gap-2')}>
        <input
          className={cn(
            'h-12 rounded-md border',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
          )}
          type="text"
          name="name"
        />
        <SubmitButton />
      </form>
    </main>
  )
}
