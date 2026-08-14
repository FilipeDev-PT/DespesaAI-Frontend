import type { ExpenseFilters } from '@/types/api'

export const queryKeys = {
  cards: {
    all: ['cards'] as const,
    detail: (id: string) => ['cards', id] as const,
  },
  users: {
    all: ['users'] as const,
    detail: (id: string) => ['users', id] as const,
  },
  expenses: {
    list: (filters: ExpenseFilters) => ['expenses', filters] as const,
    insights: (filters: ExpenseFilters) => ['expenses', 'insights', filters] as const,
  },
}
