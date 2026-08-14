export enum ExpenseCategory {
  ALIMENTACAO = 'ALIMENTACAO',
  LAZER = 'LAZER',
  CONTAS_FIXAS = 'CONTAS_FIXAS',
  INVESTIMENTO = 'INVESTIMENTO',
  TRANSPORTE = 'TRANSPORTE',
  SAUDE = 'SAUDE',
  EDUCACAO = 'EDUCACAO',
  OUTROS = 'OUTROS',
}

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  [ExpenseCategory.ALIMENTACAO]: 'Alimentação',
  [ExpenseCategory.LAZER]: 'Lazer',
  [ExpenseCategory.CONTAS_FIXAS]: 'Contas fixas',
  [ExpenseCategory.INVESTIMENTO]: 'Investimento',
  [ExpenseCategory.TRANSPORTE]: 'Transporte',
  [ExpenseCategory.SAUDE]: 'Saúde',
  [ExpenseCategory.EDUCACAO]: 'Educação',
  [ExpenseCategory.OUTROS]: 'Outros',
}
