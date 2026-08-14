# Documentação técnica — Frontend

## Arquitetura

Feature-based: `features/{auth,cards,dashboard,users}`. Server state com TanStack Query; client state (token) com Zustand. UI em `components/ui`. Pages finas em `pages/`.

## Auth

- Login/forgot/reset.
- Bootstrap tenta refresh com credentials.
- WebView: `window.__AUTH__` e `?embedded=1` esconde chrome.

## Dashboard

- `MonthStrip` com mês atual pré-selecionado.
- Filtros categoria, local, período.
- Período específico (`from`+`to`) esconde o seletor de meses (`shouldShowMonthStrip` em `features/dashboard/utils/filters.ts`).

## RBAC

Rota `/users` apenas `ADMIN` via `RequireAdmin`.
