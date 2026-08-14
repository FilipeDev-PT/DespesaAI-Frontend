import { Role } from '@controle-financeiro/shared'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import type { AuthUser } from '@/types/api'
import { useCreateUser, useDeleteUser, useUpdateUser, useUsers } from '../hooks/use-users'
import type { UserFormValues } from '../schemas'
import { UserForm } from './UserForm'

export function UsersManager() {
  const { data, isLoading, error } = useUsers()
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()
  const [editing, setEditing] = useState<AuthUser | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Carregando usuários...</p>
  }

  if (error) {
    return (
      <p className="text-sm text-danger" role="alert">
        {error.message}
      </p>
    )
  }

  const onCreate = (values: UserFormValues) => {
    createUser.mutate(values, {
      onSuccess: () => setShowCreate(false),
    })
  }

  const onUpdate = (values: UserFormValues) => {
    if (!editing) return
    updateUser.mutate(
      { id: editing.id, values },
      { onSuccess: () => setEditing(null) },
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Usuários</h1>
          <p className="text-sm text-muted-foreground">Gestão administrativa de contas.</p>
        </div>
        <Button type="button" onClick={() => setShowCreate((v) => !v)}>
          {showCreate ? 'Fechar' : 'Novo usuário'}
        </Button>
      </div>

      {showCreate ? (
        <Card>
          <CardHeader>
            <CardTitle>Cadastrar usuário</CardTitle>
          </CardHeader>
          <CardContent>
            <UserForm
              submitLabel="Criar"
              isSubmitting={createUser.isPending}
              errorMessage={createUser.error?.message}
              onSubmit={onCreate}
              onCancel={() => setShowCreate(false)}
            />
          </CardContent>
        </Card>
      ) : null}

      {editing ? (
        <Card>
          <CardHeader>
            <CardTitle>Editar {editing.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <UserForm
              submitLabel="Salvar"
              requirePassword={false}
              isSubmitting={updateUser.isPending}
              errorMessage={updateUser.error?.message}
              defaultValues={{
                name: editing.name,
                email: editing.email,
                password: '',
                cpf: editing.cpf ?? '',
                phone: editing.phone ?? '',
                street: editing.street ?? '',
                number: editing.number ?? '',
                complement: editing.complement ?? '',
                neighborhood: editing.neighborhood ?? '',
                city: editing.city ?? '',
                state: editing.state ?? '',
                zipCode: editing.zipCode ?? '',
                role: editing.role,
              }}
              onSubmit={onUpdate}
              onCancel={() => setEditing(null)}
            />
          </CardContent>
        </Card>
      ) : null}

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Nome</th>
              <th className="px-4 py-3 font-medium">E-mail</th>
              <th className="px-4 py-3 font-medium">Perfil</th>
              <th className="px-4 py-3 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((user) => (
              <tr key={user.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role === Role.ADMIN ? 'Admin' : 'Usuário'}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setEditing(user)}>
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      disabled={deleteUser.isPending}
                      onClick={() => {
                        if (window.confirm(`Excluir ${user.name}?`)) {
                          deleteUser.mutate(user.id)
                        }
                      }}
                    >
                      Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
