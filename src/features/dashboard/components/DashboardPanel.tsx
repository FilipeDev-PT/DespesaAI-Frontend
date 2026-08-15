import { useMemo, useState } from 'react'
import { ExpenseCharts } from '@/components/charts/ExpenseCharts'
import type { ExpenseFilters } from '@/types/api'
import { useExpenseInsights } from '../hooks/use-dashboard'
import {
  currentMonthKey,
  formatMonthLabel,
  shouldShowMonthStrip,
  toMonthKey,
} from '../utils/filters'
import { Filters } from './Filters'
import { MonthStrip } from './MonthStrip'

type DashboardPanelProps = {
  cardId?: string
  title: string
}

export function DashboardPanel({ cardId, title }: DashboardPanelProps) {
  const [filters, setFilters] = useState<ExpenseFilters>({
    cardId,
    month: currentMonthKey(),
  })

  const queryFilters = useMemo(
    () => ({
      ...filters,
      cardId,
    }),
    [filters, cardId],
  )

  const insights = useExpenseInsights(queryFilters)
  const showMonths = shouldShowMonthStrip(filters)

  const firstMonthKey = toMonthKey(insights.data?.firstInstallmentDueMonth)
  const lastMonthKey = toMonthKey(insights.data?.lastInstallmentDueMonth)
  const lastLabel = lastMonthKey ? formatMonthLabel(lastMonthKey) : null

  return (
    <div className="space-y-6" data-testid="dashboard-panel">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">
          Filtre por mês de competência das parcelas, período, categoria ou estabelecimento.
        </p>
        {lastLabel ? (
          <p
            className="mt-2 text-sm font-medium text-primary"
            data-testid="last-installment-horizon"
          >
            Última parcela cadastrada: {lastLabel}
            {firstMonthKey ? ` (desde ${formatMonthLabel(firstMonthKey)})` : ''}
          </p>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            Nenhuma parcela cadastrada ainda.
          </p>
        )}
      </div>

      <Filters
        value={filters}
        onChange={setFilters}
        firstInstallmentDueMonth={insights.data?.firstInstallmentDueMonth}
        lastInstallmentDueMonth={insights.data?.lastInstallmentDueMonth}
      />

      {showMonths ? (
        <MonthStrip
          value={filters.month ?? currentMonthKey()}
          firstMonthKey={firstMonthKey}
          lastMonthKey={lastMonthKey}
          onChange={(month) =>
            setFilters((prev) => ({
              ...prev,
              month,
              from: undefined,
              to: undefined,
            }))
          }
        />
      ) : (
        <p className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-muted-foreground">
          Seleção por mês oculta enquanto um período específico (de/até) estiver aplicado.
        </p>
      )}

      {insights.error ? (
        <p className="text-sm text-danger" role="alert">
          {insights.error.message}
        </p>
      ) : null}

      <ExpenseCharts insights={insights.data} isLoading={insights.isLoading} />
    </div>
  )
}
