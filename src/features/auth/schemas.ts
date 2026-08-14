import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email('Informe um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter ao menos 6 caracteres'),
})

export const forgotFormSchema = z.object({
  email: z.string().email('Informe um e-mail válido'),
})

export const resetFormSchema = z
  .object({
    token: z.string().min(1, 'Token obrigatório'),
    newPassword: z.string().min(8, 'A nova senha deve ter ao menos 8 caracteres'),
    confirmPassword: z.string().min(8, 'Confirme a nova senha'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export type LoginFormValues = z.infer<typeof loginFormSchema>
export type ForgotFormValues = z.infer<typeof forgotFormSchema>
export type ResetFormValues = z.infer<typeof resetFormSchema>
