import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function triggerReqGET(
  url: string,
  { arg }: { arg: Record<string, string> }
) {
  const qs = new URLSearchParams(arg)
  const res = await fetch(`${url}?${qs}`)
  const r = await res.json()
  return r
}
