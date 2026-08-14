import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { useForgotPassword } from '../hooks/use-auth'
import { forgotFormSchema, type ForgotFormValues } from '../schemas'

export function ForgotForm() {
  const forgot = useForgotPassword()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotFormSchema),
    defaultValues: { email: '' },
  })

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values) => forgot.mutate(values))}
      data-testid="forgot-form"
    >
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="voce@email.com"
          data-testid="forgot-email"
          {...register('email')}
        />
        {errors.email ? (
          <p className="text-sm text-danger">{errors.email.message}</p>
        ) : null}
      </div>

      {forgot.isSuccess ? (
        <p className="rounded-lg bg-muted p-3 text-sm text-foreground">
          Se o e-mail existir, enviaremos instruções para redefinir a senha.
        </p>
      ) : null}

      {forgot.error ? (
        <p className="text-sm text-danger" role="alert">
          {forgot.error.message}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={forgot.isPending}>
        {forgot.isPending ? 'Enviando...' : 'Enviar link'}
      </Button>

      <p className="text-center text-sm">
        <Link to="/login" className="text-primary hover:underline">
          Voltar ao login
        </Link>
      </p>
    </form>
  )
}
