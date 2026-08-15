import { getDeviceId } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'
import type { AuthResponse } from '@/types/api'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export class ApiError extends Error {
  status: number
  body: unknown

  constructor(message: string, status: number, body: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
  auth?: boolean
  skipRefresh?: boolean
}

let refreshPromise: Promise<string | null> | null = null

async function parseBody(response: Response) {
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text) as unknown
  } catch {
    return text
  }
}

async function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deviceId: getDeviceId() }),
        })

        if (!response.ok) {
          useAuthStore.getState().clearSession()
          return null
        }

        const data = (await response.json()) as AuthResponse
        useAuthStore.getState().setSession(data.accessToken, data.user)
        return data.accessToken
      } catch {
        useAuthStore.getState().clearSession()
        return null
      } finally {
        refreshPromise = null
      }
    })()
  }

  return refreshPromise
}

export async function apiClient<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, auth = true, skipRefresh = false, headers, ...rest } = options
  const token = useAuthStore.getState().accessToken

  const requestHeaders = new Headers(headers)
  if (body !== undefined && !(body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json')
  }
  if (auth && token) {
    requestHeaders.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    credentials: 'include',
    headers: requestHeaders,
    body:
      body === undefined
        ? undefined
        : body instanceof FormData
          ? body
          : JSON.stringify(body),
  })

  if (response.status === 401 && auth && !skipRefresh) {
    const newToken = await refreshAccessToken()
    if (newToken) {
      return apiClient<T>(path, { ...options, skipRefresh: true })
    }
    useAuthStore.getState().clearSession()
  }

  const data = await parseBody(response)

  if (!response.ok) {
    const message =
      typeof data === 'object' &&
      data !== null &&
      'message' in data &&
      (typeof (data as { message: unknown }).message === 'string' ||
        Array.isArray((data as { message: unknown }).message))
        ? Array.isArray((data as { message: unknown }).message)
          ? ((data as { message: string[] }).message).join(', ')
          : ((data as { message: string }).message)
        : `Erro HTTP ${response.status}`
    throw new ApiError(message, response.status, data)
  }

  return data as T
}

export async function bootstrapSession() {
  const params = new URLSearchParams(window.location.search)
  const embedded = params.get('embedded') === '1' || Boolean(window.__MOBILE_PATH__)

  let injected = window.__AUTH__
  if (embedded && !injected?.accessToken) {
    const deadline = Date.now() + 1500
    while (Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 50))
      injected = window.__AUTH__
      if (injected?.accessToken) break
    }
  }

  if (injected?.accessToken) {
    if (injected.user) {
      useAuthStore.getState().setSession(injected.accessToken, injected.user)
    } else {
      useAuthStore.getState().setAccessToken(injected.accessToken)
    }
    useAuthStore.getState().setBootstrapped(true)
    return
  }

  // Cookie refresh only works in the browser — not inside the mobile WebView.
  if (!embedded) {
    await refreshAccessToken()
  }
  useAuthStore.getState().setBootstrapped(true)
}
