import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { CardForm } from '@/features/cards/components/CardForm'
import { useCard, useCreateCard, useUpdateCard } from '@/features/cards/hooks/use-cards'
import type { CardFormValues } from '@/features/cards/schemas'

export function CardFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const cardQuery = useCard(id)
  const createCard = useCreateCard()
  const updateCard = useUpdateCard(id ?? '')

  const onSubmit = (values: CardFormValues) => {
    if (isEdit && id) {
      updateCard.mutate(values, {
        onSuccess: () => navigate('/'),
      })
      return
    }
    createCard.mutate(values, {
      onSuccess: () => navigate('/'),
    })
  }

  if (isEdit && cardQuery.isLoading) {
    return <p className="text-sm text-muted-foreground">Carregando cartão...</p>
  }

  if (isEdit && cardQuery.error) {
    return (
      <p className="text-sm text-danger" role="alert">
        {cardQuery.error.message}
      </p>
    )
  }

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>{isEdit ? 'Editar cartão' : 'Novo cartão'}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardForm
          submitLabel={isEdit ? 'Salvar alterações' : 'Cadastrar'}
          isSubmitting={createCard.isPending || updateCard.isPending}
          errorMessage={createCard.error?.message || updateCard.error?.message}
          defaultValues={
            cardQuery.data
              ? {
                  name: cardQuery.data.name,
                  number: cardQuery.data.numberLast4,
                  bank: cardQuery.data.bank,
                  type: cardQuery.data.type,
                }
              : undefined
          }
          onSubmit={onSubmit}
        />
      </CardContent>
    </Card>
  )
}
