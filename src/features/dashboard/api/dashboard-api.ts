import { apiClient } from '@/lib/api-client'
import type { Expense, ExpenseFilters, ExpenseInsights } from '@/types/api'
import { buildExpenseQuery } from '../utils/filters'

export async function listExpenses(filters: ExpenseFilters = {}) {
  return apiClient<Expense[]>(`/expenses${buildExpenseQuery(filters)}`)
}

export async function getExpenseInsights(filters: ExpenseFilters = {}) {
  return apiClient<ExpenseInsights>(`/expenses/insights${buildExpenseQuery(filters)}`)
}
