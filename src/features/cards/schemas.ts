import { CardType } from '@controle-financeiro/shared'
import { z } from 'zod'

export const cardFormSchema = z.object({
  name: z.string().min(2, 'Informe o nome do cartão'),
  number: z
    .string()
    .refine((value) => value === '' || /^\d+$/.test(value), 'Use apenas dígitos')
    .refine((value) => value === '' || value.length >= 4, 'Informe ao menos 4 dígitos'),
  bank: z.string().min(2, 'Informe o banco'),
  type: z.nativeEnum(CardType),
})

export type CardFormValues = z.infer<typeof cardFormSchema>
