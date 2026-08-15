import type { CardType, ExpenseCategory, Role } from '@controle-financeiro/shared'

export type AuthUser = {
  id: string
  name: string
  email: string
  role: Role
  cpf?: string
  phone?: string
  street?: string
  number?: string
  complement?: string | null
  neighborhood?: string
  city?: string
  state?: string
  zipCode?: string
  createdAt?: string
  updatedAt?: string
}

export type AuthResponse = {
  accessToken: string
  refreshToken?: string
  expiresIn: number
  user: AuthUser
}

export type Card = {
  id: string
  userId: string
  name: string
  numberLast4: string
  bank: string
  type: CardType
  createdAt: string
  updatedAt: string
}

export type Expense = {
  id: string
  userId: string
  cardId: string
  amount: number | string
  merchantName: string
  category: ExpenseCategory
  purchaseDate: string
  paymentType: string
  installmentCount?: number | null
  createdAt?: string
}

export type CategoryInsight = {
  category: ExpenseCategory | string
  total: number
  count: number
}

export type ExpenseInsights = {
  total: number
  count: number
  byCategory: CategoryInsight[]
  /** First day of the earliest installment due month (YYYY-MM-DD). */
  firstInstallmentDueMonth?: string | null
  /** First day of the latest installment due month (YYYY-MM-DD). */
  lastInstallmentDueMonth?: string | null
}

export type ExpenseFilters = {
  cardId?: string
  category?: string
  merchant?: string
  month?: string
  from?: string
  to?: string
}
