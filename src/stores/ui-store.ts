import { create } from 'zustand'

type UiState = {
  embedded: boolean
  setEmbedded: (embedded: boolean) => void
}

export const useUiStore = create<UiState>((set) => ({
  embedded: false,
  setEmbedded: (embedded) => set({ embedded }),
}))
