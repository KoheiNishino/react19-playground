import Link from 'next/link';
import { JSX, Suspense, use } from 'react';
import { sleep } from '../util/sleep'

type Comment = {
  id: number;
  body: string;
};

async function fetchComments(): Promise<{ comments: Comment[] }> {
  await sleep(1000)
  const response = await fetch('https://dummyjson.com/comments');
  return response.json();
}

function CommentList(): JSX.Element {
  const { comments } = use(fetchComments());
  return (
    <ul className='list-disc p-8'>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.body}</li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <main>
      <Link className='underline text-blue-600 hover:text-blue-800' href={'/'}>
        Top
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <CommentList />
      </Suspense>
    </main>
  );
}
