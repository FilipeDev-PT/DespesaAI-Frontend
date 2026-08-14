import type { ExpenseFilters } from '@/types/api'

export function hasSpecificPeriod(filters: Pick<ExpenseFilters, 'from' | 'to'>) {
  return Boolean(filters.from?.trim() && filters.to?.trim())
}

export function shouldShowMonthStrip(filters: Pick<ExpenseFilters, 'from' | 'to'>) {
  return !hasSpecificPeriod(filters)
}

export function buildExpenseQuery(filters: ExpenseFilters) {
  const params = new URLSearchParams()
  if (filters.cardId) params.set('cardId', filters.cardId)
  if (filters.category) params.set('category', filters.category)
  if (filters.merchant) params.set('merchant', filters.merchant)

  if (hasSpecificPeriod(filters)) {
    params.set('from', filters.from!)
    params.set('to', filters.to!)
  } else if (filters.month) {
    params.set('month', filters.month)
  }

  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

export function currentMonthKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

export function buildMonthOptions(reference = new Date(), count = 12) {
  const months: { key: string; label: string }[] = []
  for (let i = count - 1; i >= 0; i -= 1) {
    const d = new Date(reference.getFullYear(), reference.getMonth() - i, 1)
    const key = currentMonthKey(d)
    const label = d.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' })
    months.push({ key, label })
  }
  return months
}
