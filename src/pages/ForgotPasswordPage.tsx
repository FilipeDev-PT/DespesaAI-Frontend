import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { ForgotForm } from '@/features/auth/components/ForgotForm'

export function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Esqueci minha senha</CardTitle>
          <CardDescription>
            Informe seu e-mail para receber o link de redefinição.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotForm />
        </CardContent>
      </Card>
    </div>
  )
}
