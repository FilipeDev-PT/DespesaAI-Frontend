import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import type { ExpenseFilters } from '@/types/api'
import * as dashboardApi from '../api/dashboard-api'

export function useExpenses(filters: ExpenseFilters) {
  return useQuery({
    queryKey: queryKeys.expenses.list(filters),
    queryFn: () => dashboardApi.listExpenses(filters),
  })
}

export function useExpenseInsights(filters: ExpenseFilters) {
  return useQuery({
    queryKey: queryKeys.expenses.insights(filters),
    queryFn: () => dashboardApi.getExpenseInsights(filters),
  })
}
