import { Role } from '@controle-financeiro/shared'
import { CreditCard, LayoutDashboard, LogOut, Users } from 'lucide-react'
import { useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useLogout } from '@/features/auth/hooks/use-auth'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'
import { useUiStore } from '@/stores/ui-store'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-primary text-primary-foreground'
      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
  )

export function AppShell() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const embeddedQuery = searchParams.get('embedded') === '1'
  const embedded = useUiStore((s) => s.embedded)
  const setEmbedded = useUiStore((s) => s.setEmbedded)
  const user = useAuthStore((s) => s.user)
  const logout = useLogout()

  useEffect(() => {
    if (embeddedQuery || window.__MOBILE_PATH__) {
      setEmbedded(true)
    } else {
      setEmbedded(embeddedQuery)
    }
  }, [embeddedQuery, setEmbedded])

  // Mobile WebView loads the SPA root (avoids GitHub Pages 404 on deep links),
  // then asks us to navigate to the intended screen.
  useEffect(() => {
    const go = () => {
      const target = window.__MOBILE_PATH__
      if (!target || typeof target !== 'string') return
      window.__MOBILE_PATH__ = undefined
      const path = target.startsWith('/') ? target : `/${target}`
      const sep = path.includes('?') ? '&' : '?'
      navigate(`${path}${sep}embedded=1`, { replace: true })
    }

    go()
    window.addEventListener('mobile-auth', go)
    return () => window.removeEventListener('mobile-auth', go)
  }, [navigate])

  const hideChrome = embedded || embeddedQuery

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!hideChrome ? (
        <header className="border-b border-border bg-surface/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <Link to="/" className="text-lg font-semibold tracking-tight text-primary">
              Controle Financeiro
            </Link>
            <nav className="flex flex-wrap items-center gap-1">
              <NavLink to="/" end className={navLinkClass}>
                <span className="inline-flex items-center gap-1.5">
                  <CreditCard className="size-4" />
                  Cartões
                </span>
              </NavLink>
              <NavLink to="/dashboard" className={navLinkClass}>
                <span className="inline-flex items-center gap-1.5">
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </span>
              </NavLink>
              {user?.role === Role.ADMIN ? (
                <NavLink to="/users" className={navLinkClass}>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-4" />
                    Usuários
                  </span>
                </NavLink>
              ) : null}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logout.mutate()}
                disabled={logout.isPending}
              >
                <LogOut className="size-4" />
                Sair
              </Button>
            </nav>
          </div>
        </header>
      ) : null}

      <main className={cn('mx-auto max-w-6xl px-4 py-6', hideChrome && 'py-4')}>
        <Outlet />
      </main>
    </div>
  )
}
