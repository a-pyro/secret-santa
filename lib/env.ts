import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    PARTICIPANTS: z.string().min(1),
    SECRET_KEY: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    PARTICIPANTS: process.env.PARTICIPANTS,
    SECRET_KEY: process.env.SECRET_KEY,
  },
})
