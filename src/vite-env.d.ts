/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface InjectedAuth {
  accessToken: string
  user?: import('./types/api').AuthUser
}

declare global {
  interface Window {
    __AUTH__?: InjectedAuth
  }
}

export {}
