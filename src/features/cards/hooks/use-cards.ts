import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import * as cardsApi from '../api/cards-api'
import type { CardFormValues } from '../schemas'

export function useCards() {
  return useQuery({
    queryKey: queryKeys.cards.all,
    queryFn: cardsApi.listCards,
  })
}

export function useCard(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.cards.detail(id ?? ''),
    queryFn: () => cardsApi.getCard(id!),
    enabled: Boolean(id),
  })
}

export function useCreateCard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: CardFormValues) => cardsApi.createCard(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.cards.all })
    },
  })
}

export function useUpdateCard(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: CardFormValues) => cardsApi.updateCard(id, values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.cards.all })
      await queryClient.invalidateQueries({ queryKey: queryKeys.cards.detail(id) })
    },
  })
}

export function useDeleteCard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => cardsApi.deleteCard(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.cards.all })
    },
  })
}
