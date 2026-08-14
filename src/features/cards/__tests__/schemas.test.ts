import { describe, expect, it } from 'vitest'
import { CardType } from '@controle-financeiro/shared'
import { cardFormSchema } from '../schemas'

describe('cardFormSchema', () => {
  it('aceita cartão válido', () => {
    const result = cardFormSchema.safeParse({
      name: 'Nubank',
      number: '4111111111111111',
      bank: 'Nubank',
      type: CardType.CREDIT,
    })
    expect(result.success).toBe(true)
  })

  it('rejeita número com letras', () => {
    const result = cardFormSchema.safeParse({
      name: 'Nubank',
      number: 'abcd',
      bank: 'Nubank',
      type: CardType.CREDIT,
    })
    expect(result.success).toBe(false)
  })
})
