import { env } from '@/env'

export async function api(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  const apiPrefix = '/api'
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const url = new URL(apiPrefix.concat(path), baseUrl)
  return fetch(url, init)
}
