import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { useResetPassword } from '../hooks/use-auth'
import { resetFormSchema, type ResetFormValues } from '../schemas'

type ResetFormProps = {
  defaultToken?: string
}

export function ResetForm({ defaultToken = '' }: ResetFormProps) {
  const reset = useResetPassword()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: {
      token: defaultToken,
      newPassword: '',
      confirmPassword: '',
    },
  })

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values) => reset.mutate(values))}
      data-testid="reset-form"
    >
      <div className="space-y-2">
        <Label htmlFor="token">Token</Label>
        <Input id="token" data-testid="reset-token" {...register('token')} />
        {errors.token ? (
          <p className="text-sm text-danger">{errors.token.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">Nova senha</Label>
        <Input
          id="newPassword"
          type="password"
          data-testid="reset-password"
          {...register('newPassword')}
        />
        {errors.newPassword ? (
          <p className="text-sm text-danger">{errors.newPassword.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar senha</Label>
        <Input
          id="confirmPassword"
          type="password"
          data-testid="reset-confirm"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword ? (
          <p className="text-sm text-danger">{errors.confirmPassword.message}</p>
        ) : null}
      </div>

      {reset.error ? (
        <p className="text-sm text-danger" role="alert">
          {reset.error.message}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={reset.isPending}>
        {reset.isPending ? 'Salvando...' : 'Redefinir senha'}
      </Button>

      <p className="text-center text-sm">
        <Link to="/login" className="text-primary hover:underline">
          Voltar ao login
        </Link>
      </p>
    </form>
  )
}
