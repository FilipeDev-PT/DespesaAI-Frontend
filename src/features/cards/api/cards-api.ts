import { apiClient } from '@/lib/api-client'
import type { Card } from '@/types/api'
import type { CardFormValues } from '../schemas'

export async function listCards() {
  return apiClient<Card[]>('/cards')
}

export async function getCard(id: string) {
  return apiClient<Card>(`/cards/${id}`)
}

export async function createCard(values: CardFormValues) {
  return apiClient<Card>('/cards', {
    method: 'POST',
    body: values,
  })
}

export async function updateCard(id: string, values: CardFormValues) {
  return apiClient<Card>(`/cards/${id}`, {
    method: 'PATCH',
    body: values,
  })
}

export async function deleteCard(id: string) {
  return apiClient<void>(`/cards/${id}`, {
    method: 'DELETE',
  })
}
