import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { useLogin } from '../hooks/use-auth'
import { loginFormSchema, type LoginFormValues } from '../schemas'

export function LoginForm() {
  const login = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  })

  return (
    <form
      data-testid="login-form"
      className="space-y-4"
      onSubmit={handleSubmit((values) => login.mutate(values))}
    >
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          data-testid="login-email"
          placeholder="voce@email.com"
          {...register('email')}
        />
        {errors.email ? (
          <p className="text-sm text-danger">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          data-testid="login-password"
          {...register('password')}
        />
        {errors.password ? (
          <p className="text-sm text-danger">{errors.password.message}</p>
        ) : null}
      </div>

      {login.error ? (
        <p className="text-sm text-danger" role="alert">
          {login.error.message || 'Falha ao entrar. Verifique suas credenciais.'}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={login.isPending} data-testid="login-submit">
        {login.isPending ? 'Entrando...' : 'Entrar'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        <Link to="/forgot-password" className="text-primary hover:underline">
          Esqueci minha senha
        </Link>
      </p>
    </form>
  )
}
