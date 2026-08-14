import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth-store'
import * as authApi from '../api/auth-api'
import type { ForgotFormValues, LoginFormValues, ResetFormValues } from '../schemas'

export function useLogin() {
  const navigate = useNavigate()
  const setSession = useAuthStore((s) => s.setSession)

  return useMutation({
    mutationFn: (values: LoginFormValues) => authApi.login(values),
    onSuccess: (data) => {
      setSession(data.accessToken, data.user)
      navigate('/', { replace: true })
    },
  })
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (values: ForgotFormValues) => authApi.forgotPassword(values),
  })
}

export function useResetPassword() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (values: ResetFormValues) =>
      authApi.resetPassword({
        token: values.token,
        newPassword: values.newPassword,
      }),
    onSuccess: () => {
      navigate('/login', { replace: true })
    },
  })
}

export function useLogout() {
  const clearSession = useAuthStore((s) => s.clearSession)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      clearSession()
      navigate('/login', { replace: true })
    },
  })
}
