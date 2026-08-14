import { CardList } from '@/features/cards/components/CardList'

export function CardsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Meus cartões</h1>
        <p className="text-sm text-muted-foreground">
          Cadastre cartões e acompanhe os dashboards de gastos.
        </p>
      </div>
      <CardList />
    </div>
  )
}
