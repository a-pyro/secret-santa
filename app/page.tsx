import { decodeName, getAssignedPerson } from '@/lib/utils'

export default function Home({
  searchParams,
}: {
  searchParams: { code?: string }
}) {
  const { code } = searchParams

  if (!code) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center p-8'>
          <h1 className='text-2xl font-bold mb-4'>Secret Santa 🎅</h1>
          <p>Please use your assigned link to see your Secret Santa person.</p>
        </div>
      </div>
    )
  }

  const name = decodeName(code)
  const assignedPerson = getAssignedPerson(name)
  console.log({ name, assignedPerson })

  if (!assignedPerson) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center p-8'>
          <h1 className='text-2xl font-bold mb-4'>Invalid Link 😕</h1>
          <p>This link appears to be invalid.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center p-8'>
        <h1 className='text-2xl font-bold mb-4'>Ho Ho Ho! 🎅</h1>
        <p className='mb-4'>Hello {name}!</p>
        <p className='text-xl font-bold'>You are the Secret Santa for:</p>
        <p className='text-3xl font-bold text-red-600 mt-4'>{assignedPerson}</p>
      </div>
    </div>
  )
}
