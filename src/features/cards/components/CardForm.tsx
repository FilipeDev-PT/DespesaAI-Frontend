import { CardType } from '@controle-financeiro/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { cardFormSchema, type CardFormValues } from '../schemas'

type CardFormProps = {
  defaultValues?: Partial<CardFormValues>
  submitLabel: string
  isSubmitting?: boolean
  errorMessage?: string
  onSubmit: (values: CardFormValues) => void
}

export function CardForm({
  defaultValues,
  submitLabel,
  isSubmitting,
  errorMessage,
  onSubmit,
}: CardFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CardFormValues>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      name: '',
      number: '',
      bank: '',
      type: CardType.CREDIT,
      ...defaultValues,
    },
  })

  const selectedType = watch('type')
  const isBoleto = selectedType === CardType.BOLETO

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name ?? '',
        number: defaultValues.number ?? '',
        bank: defaultValues.bank ?? '',
        type: defaultValues.type ?? CardType.CREDIT,
      })
    }
  }, [defaultValues, reset])

  useEffect(() => {
    if (isBoleto) {
      setValue('number', '')
    }
  }, [isBoleto, setValue])

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} data-testid="card-form">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" placeholder="Nubank principal" {...register('name')} />
        {errors.name ? <p className="text-sm text-danger">{errors.name.message}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bank">Banco</Label>
        <Input id="bank" placeholder="Nubank" {...register('bank')} />
        {errors.bank ? <p className="text-sm text-danger">{errors.bank.message}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Tipo</Label>
        <select
          id="type"
          className="flex h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm"
          {...register('type')}
        >
          <option value={CardType.CREDIT}>Crédito</option>
          <option value={CardType.DEBIT}>Débito</option>
          <option value={CardType.BOLETO}>Boleto</option>
        </select>
        {errors.type ? <p className="text-sm text-danger">{errors.type.message}</p> : null}
      </div>

      {!isBoleto ? (
        <div className="space-y-2">
          <Label htmlFor="number">Número</Label>
          <Input id="number" inputMode="numeric" placeholder="Somente dígitos (opcional)" {...register('number')} />
          {errors.number ? (
            <p className="text-sm text-danger">{errors.number.message}</p>
          ) : null}
        </div>
      ) : null}

      {errorMessage ? (
        <p className="text-sm text-danger" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : submitLabel}
      </Button>
    </form>
  )
}
