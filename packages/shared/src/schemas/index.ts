import { z } from 'zod'
import { Role } from '../enums/role'
import { CardType } from '../enums/card-type'
import { ExpenseCategory } from '../enums/expense-category'
import { PaymentType } from '../enums/payment-type'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  deviceId: z.string().uuid().optional(),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(8),
})

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  cpf: z.string().min(11).max(14),
  phone: z.string().min(8),
  street: z.string().min(1),
  number: z.string().min(1),
  complement: z.string().optional(),
  neighborhood: z.string().min(1),
  city: z.string().min(1),
  state: z.string().length(2),
  zipCode: z.string().min(8).max(9),
  role: z.nativeEnum(Role).default(Role.USER),
})

export const createCardSchema = z.object({
  name: z.string().min(1),
  number: z.string().min(4).optional().or(z.literal('')),
  bank: z.string().min(1),
  type: z.nativeEnum(CardType),
})

export const expenseDraftSchema = z.object({
  cardName: z.string().nullable(),
  amount: z.number().positive().nullable(),
  merchantName: z.string().nullable(),
  paymentType: z.nativeEnum(PaymentType).nullable(),
  installmentCount: z.number().int().positive().nullable(),
  category: z.nativeEnum(ExpenseCategory).nullable(),
  missingFields: z.array(z.string()),
  isComplete: z.boolean(),
  assistantMessage: z.string(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type CreateUserInput = z.infer<typeof createUserSchema>
export type CreateCardInput = z.infer<typeof createCardSchema>
export type ExpenseDraft = z.infer<typeof expenseDraftSchema>
