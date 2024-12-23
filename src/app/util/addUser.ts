export async function addUser(): Promise<{ firstName: string, lastName: string, age: number }> {
  await new Promise(resolve => setTimeout(resolve, 500))
  const res = await fetch('https://dummyjson.com/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: 'Muhammad',
      lastName: 'Ovi',
      age: 250,
    }),
  })
  const json = await res.json()
  return json
}
