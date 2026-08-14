import { describe, expect, it } from 'vitest'
import { forgotFormSchema, loginFormSchema, resetFormSchema } from '../schemas'

describe('auth schemas', () => {
  it('aceita login válido', () => {
    const result = loginFormSchema.safeParse({
      email: 'admin@controle.local',
      password: 'Admin123!',
    })
    expect(result.success).toBe(true)
  })

  it('rejeita e-mail inválido no login', () => {
    const result = loginFormSchema.safeParse({
      email: 'invalido',
      password: 'Admin123!',
    })
    expect(result.success).toBe(false)
  })

  it('valida forgot password', () => {
    expect(forgotFormSchema.safeParse({ email: 'a@b.com' }).success).toBe(true)
    expect(forgotFormSchema.safeParse({ email: 'x' }).success).toBe(false)
  })

  it('exige senhas iguais no reset', () => {
    const mismatch = resetFormSchema.safeParse({
      token: 'abc',
      newPassword: 'senha1234',
      confirmPassword: 'outra1234',
    })
    expect(mismatch.success).toBe(false)

    const match = resetFormSchema.safeParse({
      token: 'abc',
      newPassword: 'senha1234',
      confirmPassword: 'senha1234',
    })
    expect(match.success).toBe(true)
  })
})
