import { Role } from '@controle-financeiro/shared'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth-store'

export function RequireAuth() {
  const accessToken = useAuthStore((s) => s.accessToken)
  const bootstrapped = useAuthStore((s) => s.bootstrapped)
  const location = useLocation()

  if (!bootstrapped) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Carregando sessão...
      </div>
    )
  }

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export function RequireAdmin() {
  const user = useAuthStore((s) => s.user)

  if (user?.role !== Role.ADMIN) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export function GuestOnly() {
  const accessToken = useAuthStore((s) => s.accessToken)
  const bootstrapped = useAuthStore((s) => s.bootstrapped)

  if (!bootstrapped) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Carregando sessão...
      </div>
    )
  }

  if (accessToken) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
