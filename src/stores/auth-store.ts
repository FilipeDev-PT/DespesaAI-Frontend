import { create } from 'zustand'
import type { AuthUser } from '@/types/api'

type AuthState = {
  accessToken: string | null
  user: AuthUser | null
  bootstrapped: boolean
  setSession: (accessToken: string, user: AuthUser) => void
  setAccessToken: (accessToken: string) => void
  clearSession: () => void
  setBootstrapped: (bootstrapped: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  bootstrapped: false,
  setSession: (accessToken, user) => set({ accessToken, user }),
  setAccessToken: (accessToken) => set({ accessToken }),
  clearSession: () => set({ accessToken: null, user: null }),
  setBootstrapped: (bootstrapped) => set({ bootstrapped }),
}))
