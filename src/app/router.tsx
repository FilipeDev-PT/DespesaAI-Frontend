import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { CardDashboardPage } from '@/pages/CardDashboardPage'
import { CardFormPage } from '@/pages/CardFormPage'
import { CardsPage } from '@/pages/CardsPage'
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage'
import { GlobalDashboardPage } from '@/pages/GlobalDashboardPage'
import { LoginPage } from '@/pages/LoginPage'
import { ResetPasswordPage } from '@/pages/ResetPasswordPage'
import { UsersPage } from '@/pages/UsersPage'
import { GuestOnly, RequireAdmin, RequireAuth } from './guards'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

export const router = createBrowserRouter(
  [
    {
      element: <GuestOnly />,
      children: [
        { path: '/login', element: <LoginPage /> },
        { path: '/forgot-password', element: <ForgotPasswordPage /> },
        { path: '/reset-password', element: <ResetPasswordPage /> },
      ],
    },
    {
      element: <RequireAuth />,
      children: [
        {
          element: <AppShell />,
          children: [
            { path: '/', element: <CardsPage /> },
            { path: '/cards/new', element: <CardFormPage /> },
            { path: '/cards/:id/edit', element: <CardFormPage /> },
            { path: '/cards/:id/dashboard', element: <CardDashboardPage /> },
            { path: '/dashboard', element: <GlobalDashboardPage /> },
            {
              element: <RequireAdmin />,
              children: [{ path: '/users', element: <UsersPage /> }],
            },
          ],
        },
      ],
    },
  ],
  basename ? { basename } : undefined,
)
