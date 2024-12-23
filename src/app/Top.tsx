'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Top() {
  const pathname = usePathname()

  return pathname !== '/'
    ? (
        <Link className="text-blue-600 underline hover:text-blue-800" href="/">
          Top
        </Link>
      )
    : null
}
