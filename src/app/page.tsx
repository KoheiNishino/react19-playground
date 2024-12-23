import { promises } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import Link from 'next/link'
import { cn } from './util/cn'

async function getPageDirectories(): Promise<string[]> {
  const pageDirectories: string[] = []
  const absoluteRootDir = path.join(process.cwd(), 'src/app')

  async function searchPages(dir: string) {
    const items = await promises.readdir(dir)

    if (items.includes('page.tsx') && dir !== absoluteRootDir) {
      pageDirectories.push(path.relative(absoluteRootDir, dir))
    }

    await Promise.all(
      items.map(async (item) => {
        const fullPath = path.join(dir, item)
        const stats = await promises.stat(fullPath)
        if (stats.isDirectory()) {
          await searchPages(fullPath)
        }
      }),
    )
  }

  await searchPages(absoluteRootDir)
  return pageDirectories
}

export default async function Page() {
  return (
    <main>
      <h2 className={cn('text-lg font-bold')}>react19-playground</h2>
      <ul className={cn('list-disc p-8')}>
        {(await getPageDirectories()).map(dir => (
          <li key={dir}>
            <Link
              className={cn('text-blue-600 underline hover:text-blue-800')}
              href={dir}
            >
              {dir}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
