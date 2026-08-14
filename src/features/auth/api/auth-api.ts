import { apiClient } from '@/lib/api-client'
import { getDeviceId } from '@/lib/utils'
import type { AuthResponse } from '@/types/api'
import type { ForgotFormValues, LoginFormValues, ResetFormValues } from '../schemas'

export async function login(values: LoginFormValues) {
  return apiClient<AuthResponse>('/auth/login', {
    method: 'POST',
    auth: false,
    body: {
      email: values.email,
      password: values.password,
      deviceId: getDeviceId(),
    },
  })
}

export async function forgotPassword(values: ForgotFormValues) {
  return apiClient<{ message: string }>('/auth/forgot-password', {
    method: 'POST',
    auth: false,
    body: values,
  })
}

export async function resetPassword(values: Pick<ResetFormValues, 'token' | 'newPassword'>) {
  return apiClient<{ message: string }>('/auth/reset-password', {
    method: 'POST',
    auth: false,
    body: {
      token: values.token,
      newPassword: values.newPassword,
    },
  })
}

export async function logout() {
  return apiClient<{ message?: string }>('/auth/logout', {
    method: 'POST',
    body: { deviceId: getDeviceId() },
  })
}
