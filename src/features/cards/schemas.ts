import { CardType } from '@controle-financeiro/shared'
import { z } from 'zod'

export const cardFormSchema = z.object({
  name: z.string().min(2, 'Informe o nome do cartão'),
  number: z
    .string()
    .min(4, 'Informe o número do cartão')
    .regex(/^\d+$/, 'Use apenas dígitos'),
  bank: z.string().min(2, 'Informe o banco'),
  type: z.nativeEnum(CardType),
})

export type CardFormValues = z.infer<typeof cardFormSchema>
