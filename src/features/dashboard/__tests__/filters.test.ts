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

describe('month horizon helpers', () => {
  it('converte data ISO para chave de mês', async () => {
    const { toMonthKey, lastDayOfMonthKey, buildMonthOptions } = await import(
      '../utils/filters'
    )
    expect(toMonthKey('2027-07-01')).toBe('2027-07')
    expect(lastDayOfMonthKey('2026-02')).toBe('2026-02-28')

    const months = buildMonthOptions({
      firstMonthKey: '2026-06',
      lastMonthKey: '2026-08',
      reference: new Date(2026, 6, 1),
    })
    expect(months.map((m) => m.key)).toEqual(['2026-06', '2026-07', '2026-08'])
  })
})
