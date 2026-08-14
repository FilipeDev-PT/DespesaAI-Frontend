import { useParams } from 'react-router-dom'
import { DashboardPanel } from '@/features/dashboard/components/DashboardPanel'
import { useCard } from '@/features/cards/hooks/use-cards'

export function CardDashboardPage() {
  const { id } = useParams()
  const cardQuery = useCard(id)

  if (!id) {
    return <p className="text-sm text-danger">Cartão não informado.</p>
  }

  const title = cardQuery.data
    ? `Dashboard — ${cardQuery.data.name}`
    : 'Dashboard do cartão'

  return <DashboardPanel cardId={id} title={title} />
}
