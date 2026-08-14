import { describe, expect, it } from 'vitest'
import {
  buildExpenseQuery,
  hasSpecificPeriod,
  shouldShowMonthStrip,
} from '../utils/filters'

describe('dashboard filter helpers', () => {
  it('identifica período específico quando from e to estão preenchidos', () => {
    expect(hasSpecificPeriod({ from: '2026-01-01', to: '2026-01-31' })).toBe(true)
    expect(hasSpecificPeriod({ from: '2026-01-01', to: '' })).toBe(false)
    expect(hasSpecificPeriod({ from: '', to: '2026-01-31' })).toBe(false)
  })

  it('esconde MonthStrip quando período específico está aplicado', () => {
    expect(shouldShowMonthStrip({ from: '2026-01-01', to: '2026-01-31' })).toBe(false)
    expect(shouldShowMonthStrip({ from: '', to: '' })).toBe(true)
    expect(shouldShowMonthStrip({})).toBe(true)
  })

  it('prioriza from/to sobre month na query', () => {
    expect(
      buildExpenseQuery({
        month: '2026-08',
        from: '2026-01-01',
        to: '2026-01-31',
        category: 'LAZER',
      }),
    ).toBe('?category=LAZER&from=2026-01-01&to=2026-01-31')

    expect(buildExpenseQuery({ month: '2026-08', merchant: 'Cafe' })).toBe(
      '?merchant=Cafe&month=2026-08',
    )
  })
})
