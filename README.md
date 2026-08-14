# Controle Financeiro — Frontend

Painel web React + Vite + TypeScript.

## Setup

```bash
npm install
npm run dev
```

URL: `http://localhost:5173`.

## Ambientes

| Comando | Arquivo | Backend |
|---------|---------|---------|
| `npm run dev:development` | `.env.development` | `http://localhost:3000` |
| `npm run dev:qa` | `.env.qa` | URL de produção (placeholder) |

`npm run dev` é alias de `dev:development`. Crie `.env.development` / `.env.qa` a partir de `.env.example` (esses arquivos não são commitados).

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev:development` | Dev + API local |
| `npm run dev:qa` | Dev + API produção |
| `npm run build` | Build |
| `npm test` | Vitest unitários |
| `npm run test:e2e` | Playwright |

Veja `docs/tecnico.md`, `docs/uso.md`, `docs/testes.md`.
