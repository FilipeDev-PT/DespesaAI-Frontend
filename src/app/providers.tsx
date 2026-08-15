import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState, type ReactNode } from 'react'
import { bootstrapSession } from '@/lib/api-client'
import { useAuthStore } from '@/stores/auth-store'

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )
  const [ready, setReady] = useState(false)

  useEffect(() => {
    void bootstrapSession().finally(() => setReady(true))
  }, [])

  // Late injection from the mobile WebView (Android sometimes injects after first paint).
  useEffect(() => {
    const apply = () => {
      const injected = window.__AUTH__
      if (!injected?.accessToken) return
      if (injected.user) {
        useAuthStore.getState().setSession(injected.accessToken, injected.user)
      } else {
        useAuthStore.getState().setAccessToken(injected.accessToken)
      }
    }
    window.addEventListener('mobile-auth', apply)
    return () => window.removeEventListener('mobile-auth', apply)
  }, [])

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Inicializando...
      </div>
    )
  }

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
