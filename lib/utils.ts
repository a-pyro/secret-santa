import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { env } from './env'

const participants = shuffleArray(env.PARTICIPANTS.split(','))

const assignments = new Map<string, string>()

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateLink(name: string): string {
  const index = participants.indexOf(name)
  if (index === -1) return ''
  const assignedPerson = participants[(index + 1) % participants.length]
  assignments.set(name, assignedPerson)
  return Buffer.from(assignedPerson).toString('base64')
}

export function decodeName(encoded: string): string {
  try {
    return Buffer.from(encoded, 'base64').toString()
  } catch {
    return ''
  }
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffleArray(array: string[]) {
  const shuffled = [...array]
  const date = new Date()
  const seed = date.getFullYear() * 12 + date.getMonth()
  const random = mulberry32(seed)

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function getAssignedPerson(name: string): string {
  return assignments.get(name) || ''
}
