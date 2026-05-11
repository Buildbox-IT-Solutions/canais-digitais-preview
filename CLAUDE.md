# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

Este repositório é um **Design as Code (DaC)** — reprodução fiel do Figma em React + Tailwind, produzida como **fonte da verdade visual**. Não há lógica de negócio, integrações com API, autenticação ou banco de dados. Todo o conteúdo dinâmico é mockado.

## Commands

```bash
pnpm dev        # Dev server (Vite)
pnpm build      # TypeScript check + Vite build
pnpm preview    # Preview da build
```

## Architecture

### Stack
- **React 19** + **TypeScript** via Vite + SWC
- **Tailwind CSS v4** — tokens de design em `src/index.css` via `@theme`
- **React Router v7** para roteamento
- **tailwind-merge** para composição de classes
- SVGs importados como componentes React via `vite-plugin-svgr`
- Path alias `~/` → `src/`

### Estrutura de pastas

```
src/
  screens/        # Uma pasta por tela (index.tsx por screen)
  components/     # Átomos e compostos reutilizáveis (index.tsx + types.ts)
  mocks/          # Dados mockados separados por contexto (articles.ts, authors.ts…)
  assets/
    icons/        # SVGs importados como componentes React
    images/
  router.tsx      # Definição de todas as rotas
  index.css       # Tema global (@theme) e import do Tailwind
docs/             # Documentações geradas e mantidas
figma-specs/      # Specs e inventário por componente
```

### Roteamento

Todas as rotas ficam em `src/router.tsx`. A `HomeScreen` (`/`) é a central de navegação com links para todas as outras telas. Rotas não mapeadas redirecionam para `/`.

Ao criar uma nova tela:
1. Criar `src/screens/<nome>/index.tsx`
2. Adicionar a rota em `src/router.tsx`
3. Adicionar o link na `HomeScreen`

### Mocks

Nunca faça fetch real. Dados ficam em `src/mocks/` separados por contexto e importados diretamente nos componentes/screens.

### Componentes

- `src/components/<nome>/index.tsx` — implementação com export nomeado
- `src/components/<nome>/types.ts` — interface de props (`I<Nome>Props`)
- Props de `className` opcionais passam por `twMerge`

---

## Design Tokens

Os tokens vivem em `src/index.css` dentro do bloco `@theme`. **Nunca usar valores hardcoded** de cor, fonte, espaçamento ou radius.

### Cores
```
--color-primary-{50..950}
--color-secondary-{50..950}
--color-neutral-{50..950}
```

### Tipografia
- `--font-display` — Aleo (Display/Headline/Title)
- `--font-body` — Open Sans (Body/Label)
- Escala MD3: `--text-display-lg` → `--text-label-sm` (17 níveis)

### Container e padding de página
- Largura máxima: `max-w-screen-xl` (1280px)
- Padding padrão: `px-4 lg:px-6`

### Border radius — valores do DS
| Valor | Classe |
|-------|--------|
| 2px | `rounded-xs` |
| 4px | `rounded-sm` |
| 8px | `rounded-lg` |
| 16px | `rounded-2xl` |
| 50% | `rounded-full` |

> `rounded-md` (6px) **não faz parte do DS** — não usar.

### Shadows
Escala nativa Tailwind: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`.

### State layers e overlays (MD3)
- Hover/press: `bg-black/8`
- Scrim/overlay: `bg-black/20`

---

## Regras de implementação

**Antes de qualquer componente:**
1. Consultar a spec em `figma-specs/<componente>.md`
2. Verificar se os tokens necessários existem em `src/index.css`
3. Consultar `figma-specs/_inventario.md` para nodeId e status

**Cabeçalho padrão de cada componente:**
```tsx
/**
 * Componente: Nome
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/...?node-id=XXX
 * Variantes: variante-a | variante-b
 * Tokens: --color-primary-500, --text-body-md
 */
```

**O que NÃO fazer:**
- Valores hardcoded de cor, fonte ou espaçamento
- `<style>` avulso ou CSS fora do Tailwind
- Implementar sem consultar a spec do Figma primeiro
- `rounded-md` (fora do DS)

---

## Figma Specs

| Arquivo | Conteúdo |
|---------|---------|
| `figma-specs/_inventario.md` | Mapa completo — todos os componentes, nodeIds, status |
| `figma-specs/_behaviors.md` | Especificação de estados e interações (hover, expanded, etc.) |
| `figma-specs/_auditoria.md` | Auditoria visual do projeto legado |
| `figma-specs/<componente>.md` | Spec detalhada de cada componente |

Figma: `https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0`
