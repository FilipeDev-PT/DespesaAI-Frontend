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
| `npm run build:pages` | `.env.pages` | API no Render + base do GitHub Pages |

`npm run dev` é alias de `dev:development`. Crie `.env.development` / `.env.qa` a partir de `.env.example` (esses arquivos não são commitados).

## GitHub Pages

Deploy automático em push para `main` via `.github/workflows/deploy-pages.yml`.

URL: https://filipedev-pt.github.io/DespesaAI-Frontend/

### Ativar no repositório

1. **Settings → Pages → Build and deployment → Source:** GitHub Actions
2. Faça push em `main` (ou rode o workflow manualmente em Actions)
3. No backend (Render), libere CORS para `https://filipedev-pt.github.io`

Preview local do build Pages:

```bash
npm run build:pages
npm run preview:pages
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev:development` | Dev + API local |
| `npm run dev:qa` | Dev + API produção |
| `npm run build` | Build |
| `npm run build:pages` | Build para GitHub Pages |
| `npm test` | Vitest unitários |
| `npm run test:e2e` | Playwright |

Veja `docs/tecnico.md`, `docs/uso.md`, `docs/testes.md`.
