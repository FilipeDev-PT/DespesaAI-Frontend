import { CardType } from '@controle-financeiro/shared'
import { CreditCard, LayoutDashboard, Pencil, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import { useCards, useDeleteCard } from '../hooks/use-cards'

const typeLabels: Record<CardType, string> = {
  [CardType.CREDIT]: 'Crédito',
  [CardType.DEBIT]: 'Débito',
  [CardType.BOLETO]: 'Boleto',
}

const linkButtonClass =
  'inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors'
const linkPrimary = 'bg-primary text-primary-foreground hover:bg-primary-hover'
const linkOutline =
  'border border-border bg-transparent text-foreground hover:bg-muted'
const linkSecondary =
  'bg-secondary text-secondary-foreground hover:bg-secondary-hover h-8 px-3 text-xs'

export function CardList() {
  const { data, isLoading, error } = useCards()
  const remove = useDeleteCard()

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Carregando cartões...</p>
  }

  if (error) {
    return (
      <p className="text-sm text-danger" role="alert">
        {error.message}
      </p>
    )
  }

  if (!data?.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-start gap-4 py-10">
          <p className="text-muted-foreground">Nenhum cartão cadastrado ainda.</p>
          <Link to="/cards/new" className={cn(linkButtonClass, linkPrimary)}>
            <Plus className="size-4" />
            Cadastrar cartão
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {data.length} cartão{data.length === 1 ? '' : 'ões'}
        </p>
        <div className="flex flex-wrap gap-2">
          <Link to="/dashboard" className={cn(linkButtonClass, linkOutline)} data-testid="link-global-dashboard">
            <LayoutDashboard className="size-4" />
            Dashboard geral
          </Link>
          <Link to="/cards/new" className={cn(linkButtonClass, linkPrimary)}>
            <Plus className="size-4" />
            Novo cartão
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.map((card) => (
          <Card key={card.id} data-testid={`card-item-${card.id}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="size-5 text-primary" />
                {card.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <dl className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <dt className="text-muted-foreground">Banco</dt>
                  <dd>{card.bank}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Tipo</dt>
                  <dd>{typeLabels[card.type]}</dd>
                </div>
                {card.numberLast4 ? (
                  <div>
                    <dt className="text-muted-foreground">Final</dt>
                    <dd>•••• {card.numberLast4}</dd>
                  </div>
                ) : null}
              </dl>
              <div className="flex flex-wrap gap-2">
                <Link
                  to={`/cards/${card.id}/dashboard`}
                  className={cn(linkButtonClass, linkSecondary)}
                >
                  Dashboard
                </Link>
                <Link
                  to={`/cards/${card.id}/edit`}
                  className={cn(linkButtonClass, linkOutline, 'h-8 px-3 text-xs')}
                >
                  <Pencil className="size-3.5" />
                  Editar
                </Link>
                <Button
                  size="sm"
                  variant="danger"
                  disabled={remove.isPending}
                  onClick={() => {
                    if (window.confirm(`Excluir o cartão ${card.name}?`)) {
                      remove.mutate(card.id)
                    }
                  }}
                >
                  <Trash2 className="size-3.5" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
