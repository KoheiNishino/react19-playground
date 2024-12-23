import type { JSX } from 'react'
import { Suspense, use } from 'react'

interface Comment {
  id: number
  body: string
}

async function fetchComments(): Promise<{ comments: Comment[] }> {
  await new Promise(resolve => setTimeout(resolve, 500))
  const response = await fetch('https://dummyjson.com/comments')
  return response.json()
}

function CommentList(): JSX.Element {
  const { comments } = use(fetchComments())
  return (
    <ul className="list-disc p-8">
      {comments.map(comment => (
        <li key={comment.id}>{comment.body}</li>
      ))}
    </ul>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CommentList />
    </Suspense>
  )
}
