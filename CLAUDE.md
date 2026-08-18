# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

Este repositório é um **Design as Code (DaC)** — reprodução fiel do Figma em React + Tailwind, produzida como **fonte da verdade visual**. Não há lógica de negócio, integrações com API, autenticação ou banco de dados. Todo o conteúdo dinâmico é mockado.

### Contexto de produto

Determina decisões de documentação e não está visível no código:

- O produto final é implementado em **WordPress/PHP**. O back-end **reimplementa** os componentes; não reusa o React. Este repo é referência de comportamento, não código de produção.
- **11 portais** consomem os mesmos componentes. Divergência entre eles é o risco central de todo o sistema.
- **Mobile está sempre em escopo.** Layout mobile ausente é recuperável; regra mobile ausente (ordenação, IDs de anúncio, comportamento de colapso) é falta de primeira ordem, com consequência no back-end.
- Quem aprova as entregas não acompanha as discussões de design — todo entregável precisa ser autoexplicativo.
- **Arquitetura de entrega** (ex.: como um ícone chega no HTML: sprite, inline, font) é decisão de quem implementa, não de documentação. A doc declara o resultado exigido e o racional; não prescreve o mecanismo.

### Preferência de revisão

**Entregável de revisão é tela renderizada, não arquivo markdown.** Ao concluir uma tarefa de documentação, entregue a URL para abrir no navegador. Revisão de densidade e hierarquia de informação acontece olhando, não lendo diff.

## Node e package manager

A versão do Node exigida está em `.nvmrc` (`v22.14.0`). Use [nvm](https://github.com/nvm-sh/nvm) para gerenciar versões:

```bash
nvm install   # instala a versão do .nvmrc
nvm use       # ativa a versão do .nvmrc
```

O package manager é **pnpm**. Não usar `npm` ou `yarn`. Para instalar o pnpm:

```bash
npm install -g pnpm
```

## Commands

```bash
pnpm start          # Vite + Storybook em paralelo (recomendado)
pnpm dev            # Apenas Vite (localhost:5173)
pnpm storybook:dev  # Apenas Storybook (localhost:6006)
pnpm build          # TypeScript check + Vite build
pnpm preview        # Preview da build
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
docs/             # Documentação de handoff (código → back-end)
  componentes/    # Uma página .md por componente documentado
figma-specs/      # Specs e inventário por componente (Figma → código)
```

### Roteamento

Todas as rotas ficam em `src/router.tsx`. A `CentralScreen` (`/`) é a central de navegação do protótipo, com links para todas as outras telas agrupadas por contexto. A home editorial fica em `/home`. Rotas não mapeadas caem em `NotFoundScreen` (`*`).

Ao criar uma nova tela:
1. Criar `src/screens/<nome>/index.tsx`
2. Adicionar a rota em `src/router.tsx`
3. Adicionar o link em `src/screens/central/index.tsx` no grupo apropriado

### Mocks

Nunca faça fetch real. Dados ficam em `src/mocks/` separados por contexto e importados diretamente nos componentes/screens.

### Componentes

- `src/components/<nome>/index.tsx` — implementação com export nomeado
- `src/components/<nome>/types.ts` — interface de props (`I<Nome>Props`)
- `src/components/<nome>/<nome>.stories.tsx` — stories cobrindo todas as variantes visuais
- Props de `className` opcionais passam por `twMerge`

Todo componente **deve ter um arquivo de stories** com uma story por variante visual (tamanho, cor, estado). Use `tags: ['autodocs']` e `parameters.layout: 'centered'` como padrão.

```bash
pnpm storybook:dev    # Storybook em http://localhost:6006
pnpm storybook:build  # Build estático
```

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

## Migração do legado

A pasta `legacy/` contém o código PHP original do projeto. **Antes de construir qualquer componente ou tela, consultar `TODO.md` na raiz** para ver o que ainda precisa ser migrado e evitar retrabalho, essa pasta é read only não faça alterações no código a não ser removê-lo

Fluxo ao migrar um item:
1. Consultar `TODO.md` e escolher o próximo item
2. Usar o equivalente PHP em `legacy/` como referência visual
3. Implementar em React seguindo as convenções desta codebase
4. Marcar como `[x]` no `TODO.md`
5. Apagar o arquivo correspondente em `legacy/`

Correspondências de estrutura:
- `legacy/src/components/_partials/<nome>.php` → `src/components/<nome>/index.tsx`
- `legacy/src/layouts/<nome>.php` → `src/screens/<nome>/index.tsx`

O objetivo é que `legacy/` desapareça completamente ao final da migração.

---

## Documentação de componentes

Duas estruturas de documentação coexistem e têm direções opostas. Não confundir:

| Pasta | Direção | Consumidor |
|---|---|---|
| `figma-specs/` | Figma → código (**entrada**) | quem implementa neste repo |
| `docs/` | código → handoff (**saída**) | time de back-end WordPress |

### Arquivos de referência

| Arquivo | Conteúdo |
|---|---|
| `docs/_contexto-docs.md` | Decisões tomadas, escopo aprovado e passos até a entrega |
| `docs/_briefing-docs.md` | Regras invariantes e fases de execução |
| `docs/_template-componente.md` | Template de 8 seções das páginas de componente |
| `docs/_achados.md` | Pendências e divergências encontradas ao documentar |
| `docs/componentes/<nome>.md` | Página de cada componente documentado |

Ler `_contexto-docs.md` e `_briefing-docs.md` antes de qualquer tarefa de documentação.

### Regras que não podem ser quebradas

1. **Não documentar PHP.** A seção "HTML alvo" documenta a saída renderizada esperada — tags, hierarquia, classes. Como o WordPress produz isso é decisão do back-end.
2. **Não inventar conhecimento de design.** O código dá props, variantes, estados, classes e tokens. Não dá: quando *não* usar o componente, regras de conteúdo, intenção por trás de um breakpoint. O que não for derivável do código vira `🔴 A CONFIRMAR — [pergunta específica]`, nunca uma versão plausível.
3. **Não modificar código de componente** em tarefa de documentação. Achados vão para `docs/_achados.md`.
4. **Quando o código divergir do comportamento correto** (acessibilidade, semântica, foco), documentar o **correto** e registrar a divergência em `_achados.md`. Nunca documentar comportamento sabidamente incorreto só porque está implementado.
5. **Seção vazia é seção apagada.** Cabeçalho órfão ensina o time a ignorar a doc.

### Regras de componente já estabelecidas

- **`categoria`** dentro de um card com link envolvente: usar **sem `href`** — renderiza `<span>` e não gera âncora aninhada. Com `href`, o `<a>` deve ser irmão dos outros links, nunca filho.
- **`icon`**: a fonte canônica é **Material Symbols** (`fonts.google.com/icons`). Nenhum ícone entra por outra origem. Nome no repo = nome na lib.

---

## Storybook e rota `/ds`

Os dois permanecem, com papéis distintos. Não duplicar conteúdo entre eles.

| | Storybook | `/ds` |
|---|---|---|
| **Consumidor** | design (uso interno) | back-end e revisão de doc |
| **Mostra** | variantes visuais isoladas | doc renderizada + preview ao vivo |
| **Fonte** | `<nome>.stories.tsx` | `docs/componentes/<nome>.md` |
| **Responde** | "como fica esta variante?" | "o que preciso saber para reimplementar?" |

Stories continuam obrigatórias para todo componente (uma por variante visual). A `/ds` **não** substitui isso — ela lê o markdown e monta o componente real, sem reimplementar catálogo de variantes.

Regra de destino: comportamento, contrato de saída e regra de uso vão para o `.md`. Demonstração visual de variante vai para a story.



| Arquivo | Conteúdo |
|---------|---------|
| `figma-specs/_inventario.md` | Mapa completo — todos os componentes, nodeIds, status |
| `figma-specs/_behaviors.md` | Especificação de estados e interações (hover, expanded, etc.) |
| `figma-specs/_auditoria.md` | Auditoria visual do projeto legado |
| `figma-specs/<componente>.md` | Spec detalhada de cada componente |

Figma: `https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0`