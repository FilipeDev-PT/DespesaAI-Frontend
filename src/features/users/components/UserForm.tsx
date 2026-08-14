import { Role } from '@controle-financeiro/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { userFormSchema, type UserFormValues } from '../schemas'

type UserFormProps = {
  submitLabel: string
  isSubmitting?: boolean
  errorMessage?: string
  defaultValues?: Partial<UserFormValues>
  requirePassword?: boolean
  onSubmit: (values: UserFormValues) => void
  onCancel?: () => void
}

export function UserForm({
  submitLabel,
  isSubmitting,
  errorMessage,
  defaultValues,
  requirePassword = true,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(
      requirePassword
        ? userFormSchema.superRefine((data, ctx) => {
            if (!data.password || data.password.length < 8) {
              ctx.addIssue({
                code: 'custom',
                message: 'Senha com ao menos 8 caracteres',
                path: ['password'],
              })
            }
          })
        : userFormSchema,
    ),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      cpf: '',
      phone: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      role: Role.USER,
      ...defaultValues,
    },
  })

  return (
    <form className="grid gap-3 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
      {(
        [
          ['name', 'Nome'],
          ['email', 'E-mail'],
          ['password', requirePassword ? 'Senha' : 'Nova senha (opcional)'],
          ['cpf', 'CPF'],
          ['phone', 'Telefone'],
          ['street', 'Rua'],
          ['number', 'Número'],
          ['complement', 'Complemento'],
          ['neighborhood', 'Bairro'],
          ['city', 'Cidade'],
          ['state', 'Estado'],
          ['zipCode', 'CEP'],
        ] as const
      ).map(([field, label]) => (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>{label}</Label>
          <Input
            id={field}
            type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
            {...register(field)}
          />
          {errors[field] ? (
            <p className="text-sm text-danger">{errors[field]?.message}</p>
          ) : null}
        </div>
      ))}

      <div className="space-y-2">
        <Label htmlFor="role">Perfil</Label>
        <select
          id="role"
          className="flex h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm"
          {...register('role')}
        >
          <option value={Role.USER}>Usuário</option>
          <option value={Role.ADMIN}>Administrador</option>
        </select>
      </div>

      {errorMessage ? (
        <p className="md:col-span-2 text-sm text-danger" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="md:col-span-2 flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : submitLabel}
        </Button>
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        ) : null}
      </div>
    </form>
  )
}
