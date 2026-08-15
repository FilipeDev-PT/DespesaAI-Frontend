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

/** YYYY-MM-DD or YYYY-MM → YYYY-MM */
export function toMonthKey(value?: string | null) {
  if (!value) return null
  const match = value.match(/^(\d{4})-(\d{2})/)
  return match ? `${match[1]}-${match[2]}` : null
}

export function parseMonthKey(key: string) {
  const [y, m] = key.split('-').map(Number)
  return new Date(y, m - 1, 1)
}

export function lastDayOfMonthKey(key: string) {
  const [y, m] = key.split('-').map(Number)
  const last = new Date(y, m, 0)
  const day = String(last.getDate()).padStart(2, '0')
  return `${y}-${String(m).padStart(2, '0')}-${day}`
}

export function formatMonthLabel(key: string) {
  return parseMonthKey(key).toLocaleDateString('pt-BR', {
    month: 'short',
    year: '2-digit',
  })
}

/**
 * Builds month chips from the installment horizon.
 * Falls back to the last 12 months ending at `reference` when no horizon exists.
 */
export function buildMonthOptions(options?: {
  firstMonthKey?: string | null
  lastMonthKey?: string | null
  reference?: Date
  fallbackCount?: number
}) {
  const reference = options?.reference ?? new Date()
  const fallbackCount = options?.fallbackCount ?? 12
  const nowKey = currentMonthKey(reference)

  let startKey = toMonthKey(options?.firstMonthKey)
  let endKey = toMonthKey(options?.lastMonthKey)

  if (!startKey || !endKey) {
    endKey = nowKey
    const start = new Date(reference.getFullYear(), reference.getMonth() - (fallbackCount - 1), 1)
    startKey = currentMonthKey(start)
  } else {
    // Always include the current month so the strip stays usable.
    if (startKey > nowKey) startKey = nowKey
    if (endKey < nowKey) endKey = nowKey
  }

  const months: { key: string; label: string }[] = []
  let cursor = parseMonthKey(startKey)
  const end = parseMonthKey(endKey)

  // Cap strip length to avoid huge ranges (e.g. 60 months).
  const maxMonths = 36
  while (cursor <= end && months.length < maxMonths) {
    const key = currentMonthKey(cursor)
    months.push({
      key,
      label: formatMonthLabel(key),
    })
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)
  }

  return months
}
