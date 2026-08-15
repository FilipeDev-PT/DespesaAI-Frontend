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
    /** Set by the mobile WebView to deep-link after loading the SPA root. */
    __MOBILE_PATH__?: string
  }
}

export {}
