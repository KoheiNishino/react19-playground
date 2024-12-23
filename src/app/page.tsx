import Link from 'next/link'
import { cn } from './util/cn'

const LINKS = ['/use', '/useOptimistic'] as const

export default function Page() {
  return (
    <main>
      <ul className={cn('list-disc p-8')}>
        {LINKS.map(link => (
          <li key={link}>
            <Link
              className={cn('text-blue-600 underline hover:text-blue-800')}
              href={link}
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
