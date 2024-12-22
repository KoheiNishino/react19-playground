import Link from 'next/link';

const LINKS = ['/use'] as const;

export default function Page() {
  return (
    <main>
      <ul className='list-disc p-8'>
        <li>
          {LINKS.map((link) => (
            <Link
              key={link}
              className='underline text-blue-600 hover:text-blue-800'
              href={link}
            >
              {link}
            </Link>
          ))}
        </li>
      </ul>
    </main>
  );
}
