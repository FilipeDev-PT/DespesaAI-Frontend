import { expect, test } from '@playwright/test'

test.describe('login page smoke', () => {
  test('mostra formulário de login', async ({ page }) => {
    await page.goto('/login')

    await expect(page.getByTestId('login-form')).toBeVisible()
    await expect(page.getByTestId('login-email')).toBeVisible()
    await expect(page.getByTestId('login-password')).toBeVisible()
    await expect(page.getByTestId('login-submit')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Controle Financeiro' })).toBeVisible()
  })
})
