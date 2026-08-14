import { EXPENSE_CATEGORY_LABELS, ExpenseCategory } from '@controle-financeiro/shared'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import type { ExpenseFilters } from '@/types/api'

type FiltersProps = {
  value: ExpenseFilters
  onChange: (next: ExpenseFilters) => void
}

export function Filters({ value, onChange }: FiltersProps) {
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
          value={value.from ?? ''}
          onChange={(e) => onChange({ ...value, from: e.target.value || undefined })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="to">Data final</Label>
        <Input
          id="to"
          type="date"
          value={value.to ?? ''}
          onChange={(e) => onChange({ ...value, to: e.target.value || undefined })}
        />
      </div>

      <div className="md:col-span-2 xl:col-span-4">
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
      </div>
    </div>
  )
}
