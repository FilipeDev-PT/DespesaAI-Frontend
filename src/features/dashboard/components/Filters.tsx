import { EXPENSE_CATEGORY_LABELS, ExpenseCategory } from '@controle-financeiro/shared'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import type { ExpenseFilters } from '@/types/api'
import {
  currentMonthKey,
  lastDayOfMonthKey,
  toMonthKey,
} from '../utils/filters'

type FiltersProps = {
  value: ExpenseFilters
  onChange: (next: ExpenseFilters) => void
  firstInstallmentDueMonth?: string | null
  lastInstallmentDueMonth?: string | null
}

export function Filters({
  value,
  onChange,
  firstInstallmentDueMonth,
  lastInstallmentDueMonth,
}: FiltersProps) {
  const firstKey = toMonthKey(firstInstallmentDueMonth)
  const lastKey = toMonthKey(lastInstallmentDueMonth)
  const maxDate = lastKey ? lastDayOfMonthKey(lastKey) : undefined
  const minDate = firstKey ? `${firstKey}-01` : undefined

  function applyUntilLastInstallment() {
    if (!lastKey) return
    const from = firstKey
      ? `${firstKey}-01`
      : `${currentMonthKey()}-01`
    onChange({
      ...value,
      month: undefined,
      from,
      to: lastDayOfMonthKey(lastKey),
    })
  }

  return (
    <div
      className="grid gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-2 xl:grid-cols-4"
      data-testid="dashboard-filters"
    >
      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <select
          id="category"
          className="flex h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm"
          value={value.category ?? ''}
          onChange={(e) =>
            onChange({ ...value, category: e.target.value || undefined })
          }
        >
          <option value="">Todas</option>
          {Object.values(ExpenseCategory).map((category) => (
            <option key={category} value={category}>
              {EXPENSE_CATEGORY_LABELS[category]}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="merchant">Estabelecimento</Label>
        <Input
          id="merchant"
          placeholder="Ex.: Mercado"
          value={value.merchant ?? ''}
          onChange={(e) =>
            onChange({ ...value, merchant: e.target.value || undefined })
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="from">Data inicial</Label>
        <Input
          id="from"
          type="date"
          min={minDate}
          max={maxDate}
          value={value.from ?? ''}
          onChange={(e) => onChange({ ...value, from: e.target.value || undefined })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="to">Data final</Label>
        <Input
          id="to"
          type="date"
          min={minDate}
          max={maxDate}
          value={value.to ?? ''}
          onChange={(e) => onChange({ ...value, to: e.target.value || undefined })}
        />
      </div>

      <div className="flex flex-wrap gap-2 md:col-span-2 xl:col-span-4">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            onChange({
              cardId: value.cardId,
              month: value.month,
              category: undefined,
              merchant: undefined,
              from: undefined,
              to: undefined,
            })
          }
        >
          Limpar filtros
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={!lastKey}
          data-testid="filter-until-last-installment"
          onClick={applyUntilLastInstallment}
        >
          Até a última parcela
        </Button>
      </div>
    </div>
  )
}
