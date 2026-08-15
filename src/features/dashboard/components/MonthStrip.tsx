import { cn } from '@/lib/utils'
import { buildMonthOptions } from '../utils/filters'

type MonthStripProps = {
  value: string
  onChange: (month: string) => void
  firstMonthKey?: string | null
  lastMonthKey?: string | null
}

export function MonthStrip({
  value,
  onChange,
  firstMonthKey,
  lastMonthKey,
}: MonthStripProps) {
  const months = buildMonthOptions({ firstMonthKey, lastMonthKey })

  return (
    <div
      className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12"
      data-testid="month-strip"
      role="listbox"
      aria-label="Seleção de mês"
    >
      {months.map((month) => {
        const selected = month.key === value
        return (
          <button
            key={month.key}
            type="button"
            role="option"
            aria-selected={selected}
            data-testid={`month-${month.key}`}
            onClick={() => onChange(month.key)}
            className={cn(
              'rounded-lg border px-2 py-3 text-center text-xs font-medium capitalize transition-colors',
              selected
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-surface text-foreground hover:bg-muted',
            )}
          >
            {month.label}
          </button>
        )
      })}
    </div>
  )
}
