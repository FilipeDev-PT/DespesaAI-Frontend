import { apiClient } from '@/lib/api-client'
import type { AuthUser } from '@/types/api'
import type { UserFormValues } from '../schemas'

export async function listUsers() {
  return apiClient<AuthUser[]>('/users')
}

export async function createUser(values: UserFormValues) {
  const { password, ...rest } = values
  return apiClient<AuthUser>('/users', {
    method: 'POST',
    body: {
      ...rest,
      password: password || undefined,
      complement: rest.complement || undefined,
    },
  })
}

export async function updateUser(id: string, values: UserFormValues) {
  const { password, ...rest } = values
  return apiClient<AuthUser>(`/users/${id}`, {
    method: 'PATCH',
    body: {
      ...rest,
      ...(password ? { password } : {}),
      complement: rest.complement || undefined,
    },
  })
}

export async function deleteUser(id: string) {
  return apiClient<void>(`/users/${id}`, { method: 'DELETE' })
}
