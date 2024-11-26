import { env } from '@/lib/env'
import { generateLink } from '@/lib/utils'
import NextLink from 'next/link'

const getBaseUrl = async () =>
  process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT || 3000}`

export default async function GenerateLinks() {
  const origin = await getBaseUrl()
  const participants = env.PARTICIPANTS.split(',')

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Generated Links</h1>
      <div className='space-y-4'>
        {participants.map((name) => {
          const code = generateLink(name)
          const link = `${origin}?code=${code}`
          return (
            <div key={name} className='border p-4 rounded'>
              <p className='font-bold'>{name}:</p>
              <NextLink href={link} className='break-all'>
                {link}
              </NextLink>
            </div>
          )
        })}
      </div>
    </div>
  )
}
