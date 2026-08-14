import { Role } from '@controle-financeiro/shared'
import { z } from 'zod'

export const userFormSchema = z.object({
  name: z.string().min(2, 'Informe o nome'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Senha com ao menos 8 caracteres').optional().or(z.literal('')),
  cpf: z.string().min(11, 'Informe o CPF'),
  phone: z.string().min(8, 'Informe o telefone'),
  street: z.string().min(2, 'Informe a rua'),
  number: z.string().min(1, 'Informe o número'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Informe o bairro'),
  city: z.string().min(2, 'Informe a cidade'),
  state: z.string().min(2, 'Informe o estado'),
  zipCode: z.string().min(8, 'Informe o CEP'),
  role: z.nativeEnum(Role),
})

export type UserFormValues = z.infer<typeof userFormSchema>
