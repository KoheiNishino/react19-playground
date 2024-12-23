import type { ReactNode } from 'react'
import { Top } from './Top'
import './css/globals.css'

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <main>
          <Top />
          {children}
        </main>
      </body>
    </html>
  )
}
