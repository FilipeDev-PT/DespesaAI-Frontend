import { EXPENSE_CATEGORY_LABELS, type ExpenseCategory } from '@controle-financeiro/shared'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'
import type { ExpenseInsights } from '@/types/api'

const COLORS = ['#0f766e', '#115e59', '#334155', '#0ea5e9', '#64748b', '#14b8a6', '#1e293b', '#0891b2']

type ExpenseChartsProps = {
  insights?: ExpenseInsights
  isLoading?: boolean
}

function categoryLabel(category: string) {
  return (
    EXPENSE_CATEGORY_LABELS[category as ExpenseCategory] ?? category
  )
}

export function ExpenseCharts({ insights, isLoading }: ExpenseChartsProps) {
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Carregando gráficos...</p>
  }

  const byCategory = (insights?.byCategory ?? []).map((item) => {
    const row = item as {
      category: string
      total?: number
      value?: number
      count?: number
    }
    return {
      name: categoryLabel(String(row.category)),
      total: Number(row.total ?? row.value ?? 0),
      count: Number(row.count ?? 0),
    }
  })

  const total = Number(insights?.total ?? 0)
  const count = insights?.count ?? 0

  return (
    <div className="space-y-4" data-testid="expense-charts">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total no período</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight text-primary">
              {formatCurrency(total)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{count} parcelas no período</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Categorias</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">{byCategory.length}</p>
            <p className="mt-1 text-sm text-muted-foreground">com gastos no filtro</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Por categoria (pizza)</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            {byCategory.length ? (
              <ResponsiveContainer width="100%" height={288}>
                <PieChart>
                  <Pie data={byCategory} dataKey="total" nameKey="name" outerRadius={90} label>
                    {byCategory.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground">Sem dados para o período.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Por categoria (barras)</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            {byCategory.length ? (
              <ResponsiveContainer width="100%" height={288}>
                <BarChart data={byCategory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="total" fill="#0f766e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground">Sem dados para o período.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
