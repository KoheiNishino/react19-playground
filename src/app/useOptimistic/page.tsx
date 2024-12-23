'use client';

import Link from 'next/link';
import { useOptimistic, useState } from 'react';
import { sleep } from '../util/sleep';
import { cn } from '../util/cn';

export default function Page() {
  const [baseName, setBaseName] = useState('currentName');
  const [optimisticName, setOptimisticName] = useOptimistic(baseName);

  const action = async (formData: FormData) => {
    const newName = formData.get('name') as string;
    setOptimisticName(newName);
    await sleep(1000);
    setBaseName(newName);
    console.log(`${newName}に更新しました。`);
  };

  return (
    <main>
      <Link className={cn('underline text-blue-600 hover:text-blue-800')} href={'/'}>
        Top
      </Link>
      <form action={action}>
        <p>Your name is: {optimisticName}</p>
        <p>
          <label>Change Name: </label>
          <input
            className={cn(
              'border rounded-md',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              'disabled:bg-gray-100 disabled:text-gray-500',
              'disabled:border-gray-200 disabled:cursor-not-allowed'
            )}
            type='text'
            name='name'
            disabled={baseName !== optimisticName}
          />
        </p>
      </form>
    </main>
  );
}
