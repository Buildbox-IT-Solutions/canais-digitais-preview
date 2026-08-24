# Mapa do repositório — pré-requisito para a feature Favoritos

> Levantamento somente-leitura. Nenhum arquivo de código foi alterado, criado ou refatorado para produzir este documento. Todas as afirmações abaixo foram verificadas por leitura direta dos arquivos citados (caminho + linha).

---

## 1. NewsCard

**Componente confirmado:** `NewsCard` (não existe `ArticleCard`/`ContentCard`; busca ampla por "card" no repo só retorna `news-card`, `podcast-card`, `sponsor-card`, `video-card`, `webstory-card`, `access-method-card`).

- Componente: `src/components/news-card/index.tsx`
- Tipos: `src/components/news-card/types.ts`
- Stories: `src/components/news-card/news-card.stories.tsx`

### Props (`INewsCardProps`, `types.ts:7-22`)

```ts
title: string
image: string
href?: string
size?: 'large' | 'medium' | 'small'          // NewsCardSize, types.ts:4
orientation?: 'vertical' | 'horizontal'       // NewsCardOrientation, types.ts:5
categoria?: Pick<ICategoriaProps, 'label' | 'color' | 'href' | 'chip'>
lead?: string
author?: string
authorHref?: string
mediaOverlay?: ReactNode      // overlay injetado na Thumbnail (ex.: PlayButton do VideoCard)
mediaClassName?: string       // sobrescreve classes do wrapper de mídia no layout horizontal
className?: string
```

### Variantes de layout

A combinação `size × orientation` (`index.tsx:51`, `key = \`${size}-${orientation}\``) alimenta dois lookup maps:

- `HEADLINE` (classe tipográfica do título) — `index.tsx:13-20`
- `LEAD` (classe do lead; `null` desativa o parágrafo de apoio) — `index.tsx:22-29`
- `H_THUMB_WIDTH` (largura fixa da thumbnail no layout horizontal) — `index.tsx:31-35`

Ramificação estrutural por `orientation` em `index.tsx:88` (horizontal, flex-row) vs. `index.tsx:97` (vertical, flex-col, default).

### Áreas clicáveis dentro do card (além do clique principal)

Existem **3 links independentes**, todos `<a href>` (nenhum `<button>`/`onClick` no componente):

1. **Thumbnail** — se `href` existir, a imagem inteira vira link (`src/components/thumbnail/index.tsx:50-56`).
2. **Título** — `<a href={href}>{title}</a>` dentro do `<h3>` (`index.tsx:70-72`).
3. **Categoria** — se `categoria.href` existir, o chip de categoria é clicável e aponta para outro destino (página de categoria), via componente `Categoria` (`src/components/categoria/index.tsx:39-45`).
4. **Autor/byline** — se `authorHref` existir, o nome do autor é um link independente, via componente `Byline` (`src/components/byline/index.tsx:25-27`).

**Não há nenhum botão de favoritar/salvar/compartilhar nem `onClick` já presente no card.** Qualquer ícone de favoritar precisará ser adicionado do zero.

### Onde é usado (9 telas)

| Tela | Layout | Variante |
|---|---|---|
| `src/screens/home/index.tsx:197` | grid 3 colunas ("Fispal Tecnologia") | `medium` / `vertical` |
| `src/screens/home-v2/index.tsx:60,383,600` | hero + grid 3 col + destaque único | `large`/`medium` / `vertical` |
| `src/screens/anuncie/index.tsx:215` | `flex flex-wrap` ("Veja também") | `small` |
| `src/screens/categoria/index.tsx:60,73` | grid "2×2" (flex aninhado) | `small` / `vertical` |
| `src/screens/not-found/index.tsx:39` | grid 4 colunas | `small` / `vertical` |
| `src/screens/sobre/index.tsx:107` | `flex flex-wrap` | `small` |
| `src/screens/conteudo/index.tsx:341` | `flex flex-wrap` ("Veja também") | `small` / `vertical` |
| `src/screens/contato/index.tsx:136` | `flex flex-wrap` | `small` |
| `src/screens/buscar/index.tsx:100` | lista vertical (resultados de busca) | `large` / `horizontal` |

### Stories (8 variantes)

`LargeVertical`, `MediumVertical`, `SmallVertical`, `LargeHorizontal`, `MediumHorizontal` (sem lead), `SmallHorizontal` (sem lead/author), `SemCategoria`, `SoHeadline` — `news-card.stories.tsx:47-54`.

---

## 2. Aba "Últimas leituras"

- Tela: `src/screens/dashboard-perfil-v4/index.tsx`, função `UltimasPane` (linhas 242-373), heading "Últimas leituras" na linha 306.
- Existe também `src/screens/dashboard-perfil-v3/index.tsx` (linha 213) com a mesma seção, mas **sem** paginação, menu de ações ou undo — ver seção "Divergências" abaixo.

### Estrutura da lista

Sem componente de Lista dedicado nem virtualização — `.map` direto sobre array já paginado e filtrado localmente:

```ts
// dashboard-perfil-v4/index.tsx:257-267
const resolved = resolveReadHistory(READ_HISTORY)
const totalPages = Math.max(1, Math.ceil(resolved.length / PER_PAGE))
const page = Math.min(Math.max(1, pageRaw), totalPages)
const offset = (page - 1) * PER_PAGE
const slice = resolved.slice(offset, offset + PER_PAGE)

const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set())
const visibleSlice = slice.filter((item) => !hiddenIds.has(item.id))
```

Render dentro de `<ul className="flex flex-col">` (linhas 350-364).

### Componente do item

`src/components/read-list-item/index.tsx` — `ReadListItem`.

Props (`IReadListItemProps`, `src/components/read-list-item/types.ts:3-13`):

```ts
category: string
categoryColor: CategoriaColor
title: string
href: string
readAt: string
image?: string
isLast?: boolean
className?: string
onRemove?: () => void
```

Existe também `ReadListItemSkeleton` (`src/components/read-list-item/read-list-item-skeleton.tsx`) para o estado de carregamento.

### Paginação

Confirmado: **10 itens por página** — `const PER_PAGE = 10` (`dashboard-perfil-v4/index.tsx:47`).

Componente: `Pagination` (`src/components/pagination/index.tsx`), baseado em URL (`?page=N`, sem estado local):

```tsx
{totalPages > 1 ? (
  <Pagination current={page} total={totalPages} baseHref={`${BASE_HREF}?tab=ultimas`} />
) : null}
```

### Formato de data

`src/lib/formatar-data-leitura.ts`, função `formatarDataLeitura` (linhas 12-27), usando **date-fns** (`format`) + locale `ptBR`:

- `< 1 dia` → `"Lido hoje"`
- `1 dia` → `"Lido ontem"`
- `2-6 dias` → `"Lido há N dias"`
- `7-29 dias` → `"Lido há N semana(s)"`
- `≥ 30 dias` → `date-fns format`, padrão `'dd/MM'` (mesmo ano) ou `'dd/MM/yyyy'` (ano diferente)

Chamado em `read-list-item/index.tsx:63`.

### More button (menu de ações do item)

Componente: `ReadListItemMenu` (`src/components/read-list-item/read-list-item-menu.tsx:15`). Trigger é um `IconButton` com ícone `more-vert` (linhas 67-75); abre em `DropdownMenu` no desktop (≥1024px) e `BottomSheet` no mobile (linhas 77-93).

Itens do menu (cada um `MenuListItem`, linhas 42-63):

1. **"Compartilhar"** (linha 45, ícone `share`) — usa `navigator.share` com fallback para `navigator.clipboard.writeText` + toast "Link copiado.".
2. **"Salvar como favorito"** (linha 51, ícone `bookmark-border`) — **sem ação real hoje**, `onClick={() => setOpen(false)}` (linha 54) apenas fecha o menu. Comentário no código (linhas 12-13) confirma: reservado para a feature de Favoritos.
3. **"Remover de últimas leituras"** (linha 57, ícone `delete-outline`) — dispara `onRemove`.

> **Ponto direto para a feature Favoritos:** o item de menu "Salvar como favorito" já existe visualmente em `ReadListItemMenu`, só falta implementar o `onClick`.

---

## 3. Remoção com desfazer em Últimas leituras

### Atualização otimista

Não há API real nem contexto — é `useState<Set<string>>` local ao componente `UltimasPane`:

```ts
// dashboard-perfil-v4/index.tsx:266-284
const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set())
const visibleSlice = slice.filter((item) => !hiddenIds.has(item.id))

function handleRemove(id: string) {
    setHiddenIds((prev) => new Set(prev).add(id))
    toast.info('Removido de Últimas leituras.', {
        durationMs: 5000,
        action: {
            label: 'Desfazer',
            onClick: () => {
                setHiddenIds((prev) => {
                    const next = new Set(prev)
                    next.delete(id)
                    return next
                })
            },
        },
    })
}
```

Comentário do próprio código (linhas 264-265): *"Remoção otimista: só esconde localmente (sem refetch/reindexação da página) — reconcilia sozinha ao trocar de página, já que aí a screen inteira remonta."* Os dados vêm de `src/mocks/leituras.ts` (`READ_HISTORY`, array estático) resolvidos contra `ARTICLE_POOL` via `resolveReadHistory`.

### Toast de desfazer

API imperativa em `src/lib/toast-store.ts`:

```ts
const AUTO_DISMISS_MS = 4000   // linha 17
const LEAVE_MS = 200           // linha 18

function pushToast(type, message, options) {   // linhas 41-47
  const id = nextId++
  toasts = [...toasts, { id, type, message, action: options?.action, leaving: false }]
  emitChange()
  setTimeout(() => dismissToast(id), options?.durationMs ?? AUTO_DISMISS_MS)
  return id
}
```

No caso da remoção, `durationMs: 5000` sobrescreve o padrão de 4000ms — **5 segundos** de janela para desfazer.

Renderização: `Toaster` (`src/components/toaster/index.tsx`), montado uma única vez em `src/router.tsx:2,109`. O `ToasterSlot` (linhas 34-67) encapsula o clique da ação:

```tsx
action={t.action ? {
    label: t.action.label,
    onClick: () => {
        t.action?.onClick()
        dismissToast(t.id)
    },
} : undefined}
```

- **Clicar em "Desfazer"** → executa o `onClick` de `handleRemove` (remove o id do `Set hiddenIds`, item volta a aparecer) → chama `dismissToast(t.id)`, fechando o toast na hora.
- **Tempo expira sem clicar** → o `setTimeout` de `pushToast` chama `dismissToast(id)` sozinho após 5000ms (com 200ms de animação de saída); como o `onClick` nunca rodou, o id **permanece** no `Set hiddenIds` — remoção definitiva até a tela remontar (ex.: trocar de página).

---

## 4. Aba "Downloads" — item indisponível

- Tela: `DownloadsPane` em `dashboard-perfil-v4/index.tsx:539-607`.
- Item: `src/components/download-item/index.tsx`, recebe `disabled={d.disabled}` (dado mockado em `src/mocks/dashboard-perfil.ts:100-124`, com `disabled: true` em alguns itens).

Tratamento visual (`download-item/index.tsx`):

- Título deixa de ser link e vira `<p>` cinza (linhas 33-36): `text-neutral-600` em vez de `<a>`.
- Ícone usa tom "disabled": `<IconTile icon={icon} tone={disabled ? 'disabled' : 'neutral'} />` (linha 30) → `src/components/icon-tile/index.tsx:14`: `disabled: 'bg-neutral-50 text-neutral-200'`.
- Botão "Baixar" é substituído por um `<span aria-disabled="true">` não clicável (linhas 57-63), texto: **"Indisponível"**.

Não existe rótulo "Expirado" em nenhum lugar do fluxo de Downloads (essa palavra só aparece em fluxos de redefinição de senha/confirmação de e-mail, sem relação).

---

## 5. Aba "Favoritos" — desativada com selo "em breve"

- Trigger da aba: `src/components/dashboard-tabs-v4/index.tsx:19` (mesmo padrão em `dashboard-tabs-v3/index.tsx:18`).

```ts
const DEFAULT_TABS: DashboardTab[] = [
  { id: 'perfil', label: 'Meu Perfil' },
  { id: 'downloads', label: 'Downloads' },
  { id: 'newsletter', label: 'Newsletter' },
  { id: 'ultimas', label: 'Últimas leituras' },
  { id: 'favoritos', label: 'Favoritos', disabled: true, chip: 'Em breve' },
]
```

**Selo "em breve":** renderizado dentro do próprio botão desabilitado (linha 61): `{t.chip ? <Badge label={t.chip} tone="neutral" shape="pill" /> : null}` (componente `Badge`, `src/components/badge/index.tsx`).

**O que a aba renderiza hoje:** nada. `Favoritos` **não está** no `type Tab` da tela (`dashboard-perfil-v4/index.tsx:35`: `'perfil' | 'ultimas' | 'newsletter' | 'downloads'`) nem no array `TABS` (linha 38) — não existe nenhum "pane" de conteúdo para ela. Mesmo forçando `?tab=favoritos` na URL, a validação (linha 104: `TABS.includes(explicitTabParam as Tab)`) rejeita o valor e cai no fallback `'perfil'` (linha 106).

**É clicável?** Não — o próprio trigger é um `<button disabled aria-disabled="true">` sem `href` (linhas 49-63 de `dashboard-tabs-v4/index.tsx`), diferente das demais abas que são `<a href>` navegáveis (linhas 66-76). `cursor-not-allowed` e `text-neutral-400` aplicados via classe condicional (linhas 34, 37-41, 58).

> **Nota de contraste:** o fluxo mais antigo `src/screens/dashboard/index.tsx:237-249` tem uma `FavoritosSection` com componente `ComingSoon` ("Favoritos em breve") **navegável livremente** — um modelo diferente (página acessível com placeholder, em vez de aba com trigger desabilitado). Ver divergências abaixo.

---

## 6. Modal de baixar

Componente: **`IncentiveDownloadDialog`**

- `src/components/incentive-download-dialog/index.tsx`
- `src/components/incentive-download-dialog/types.ts`
- `src/components/incentive-download-dialog/incentive-download-dialog.stories.tsx`

Usa `Modal` (desktop) e `BottomSheet` (mobile) internamente — **não** usa o componente `Dialog` (ver divergências).

### Props (`IIncentiveDownloadDialogProps`, `types.ts:1-6`)

```ts
open: boolean
onCreateAccount: () => void
onLogin: () => void
onDismiss: () => void
```

### Gatilhos (2 telas, nenhuma outra no repo)

1. **`src/screens/home/index.tsx`** — CTA "Baixar agora" da `<DownloadSection>` (linhas 171-180): `onCtaClick={!logado ? () => setDownloadOpen(true) : undefined}` — só abre se o usuário **não estiver logado**; se logado, segue o `href` normalmente.
2. **`src/screens/conteudo/index.tsx`** — CTA do `PostDownloadBanner` no corpo do artigo (linhas 152-158, 460-481): `gated = !logado && download.requiresAuth`, `onCtaClick={gated ? onRequestAccess : undefined}`.

(Ambas as telas também têm um gatilho de preview/dev via querystring `?preview=download`, não é ação real de usuário.)

### Regra de frequência/cooldown para ESTE modal

**NÃO ENCONTRADO.** Comentário no próprio componente (`incentive-download-dialog/index.tsx:9-16`) confirma isso como decisão de design: *"Exceção aos incentivos passivos (Portal/Leitura): sempre modal/dialog próprio, nunca banner, sem cooldown/supressão/storage (...) Dispensa só pelo X (sem link 'Agora não')."* Não há `localStorage`/`sessionStorage` referenciado no componente; os handlers de dismiss/login/criar-conta só chamam `setDownloadOpen(false)` — nada é persistido.

### Cooldown existente no repo (não é deste modal)

Existe um sistema de cooldown, mas é para os modais **passivos** "Portal" (home) e "Leitura" (conteúdo) — `src/lib/incentive-storage.ts:1-23`:

```ts
const PASSIVE_SHOWN_KEY = 'cd_incentive_passive_shown'                       // sessionStorage
const PASSIVE_SUPPRESSED_UNTIL_KEY = 'cd_incentive_passive_suppressed_until' // localStorage
const SUPPRESS_DURATION_MS = 7 * 24 * 60 * 60 * 1000                         // 7 dias
```

**Essa regra é GLOBAL, não por gatilho:** as chaves de storage são constantes fixas e únicas no módulo — sem nenhum parâmetro por tela/gatilho. `suppressPassiveFor7Days()` é chamada tanto pelo dismiss/login/criar-conta do Portal (`home/index.tsx:80,86,92`) quanto pelos da Leitura (`conteudo/index.tsx:100,106,112`), gravando a **mesma** chave — ou seja, dispensar o modal Portal na Home suprime também o modal Leitura em Conteúdo por 7 dias, e vice-versa. Confirmado por leitura direta de `incentive-storage.ts`. **O modal de download está fora desse esquema** (nunca chama essas funções).

---

## 7. Componentes de base

### Dialog / Modal

- **`Modal`** (casca genérica) — `src/components/modal/index.tsx`, props em `types.ts` (`open`, `children`, `size: sm|md|lg|xl`, `padded`, `mobileFullScreen`, `closeHref`, `onClose`, `labelledById`, `ariaLabel`, `showClose`, `className`). Consumido direto por `login-v2`, `redefine-senha-v2`, `recupera-senha-v2`, `confirmacao-email-v2`, `cadastro-v2`, `_auth/terminal-modal.tsx`.
- **`Dialog`** (casca "de negócio" construída sobre `Modal`) — `src/components/dialog/index.tsx`, props em `types.ts` (`title`, `description`, `icon`, `eyebrow`, `primary`/`secondary: DialogAction`, `destructive`, `bottomLink`, etc.). Comentário no arquivo (linha 12) se autodeclara *"fonte da verdade dos dialogs"*. Consumido por `excluir-conta`, `gate-download`, `meus-dados`.
- **`BottomSheet`** — `src/components/bottom-sheet/index.tsx`. Consumido por `header-desktop`, `read-list-item-menu`, `incentive-newsletter-dialog`, `incentive-download-dialog`.
- **`Drawer`** — `src/components/drawer/index.tsx`. Consumido por `dashboard-perfil-v3`/`v4` (via `PerfilDrawer`).

### Toast

- **`Toast`** (view pura) — `src/components/toast/index.tsx`, props (`type: success|error|warning|info`, `message`, `action`, `id`, `onDismiss`, `className`).
- **`Toaster`** (container global que empilha via store) — `src/components/toaster/index.tsx`, montado uma única vez em `router.tsx:2,109`.
- API imperativa: `src/lib/toast-store.ts` (`toast.success/error/info/warning`).

### Paginação

- **`Pagination`** — `src/components/pagination/index.tsx`, props (`current`, `total`, `baseHref?`, `pageParam?`, `className?`). Baseado em URL, com truncamento de páginas. Consumido por `dashboard-perfil-v3` e `dashboard-perfil-v4`.

### Dropdown / more button

- **`DropdownMenu`** (shell do painel) — `src/components/dropdown-menu/index.tsx`, props (`children`, `tone: neutral|white`, `width`, `className`). Consumido por `header-desktop` (menu de usuário), `nav-item` (submenu), `read-list-item-menu` (kebab).
- **`MenuListItem`** (item de lista de menu) — `src/components/menu-list-item/index.tsx`, props (`label`, `href?`, `onClick?`, `density: default|compact`, `leading?`, `trailing?`, `className?`).
- **`ReadListItemMenu`** (o "more button" propriamente dito) — `src/components/read-list-item/read-list-item-menu.tsx`. Único lugar do repo com ícone `more-vert`. Composição: `IconButton` (trigger) + `DropdownMenu`/`BottomSheet` + `MenuListItem`.

### Icon button

- **`IconButton`** — `src/components/icon-button/index.tsx`, props (`icon`, `label`, `type: filled|outlined|ghost`, `size: large|medium|small`, `href?`, `disabled?`, `onClick?`, `ariaHasPopup?`, `ariaExpanded?`, `ariaControls?`, `className?`). Consumido por `conteudo` (compartilhamento), `side-menu` (fechar), `read-list-item-menu` (trigger do kebab).

---

## 8. Estado do usuário logado e portal atual

**Não existe** Context/Provider, hook (`useUser`/`useAuth`/`usePortal`/`useChannel`/`useSession`) nem store (zustand/redux/jotai/recoil) para usuário ou portal neste repositório. `package.json` não tem nenhuma lib de state management — só `react`, `react-dom`, `react-router`, `tailwind-merge`.

### Login

O único mecanismo é o hook `useLogado` (`src/lib/use-logado.ts:4-7`):

```ts
export function useLogado(): boolean {
    const [params] = useSearchParams()
    return params.get('logado') === 'true'
}
```

"Estar logado" é só um `boolean` derivado de `?logado=true` na URL — **não carrega nenhum dado de usuário**. Consumido em `src/screens/conteudo/index.tsx:57`.

### Dados de usuário — duplicados e desincronizados

Não há uma interface `User` única. Dois formatos paralelos, não relacionados:

- `src/screens/dashboard/index.tsx:28-45` — constantes locais `USER_NAME = 'Ana Souza'`, `USER_EMAIL = 'ana.souza@informa.com'`, objeto `CAMPOS` sem tipo nomeado.
- `src/mocks/dashboard-perfil.ts:3-39` (usado por `dashboard-perfil-v3`/`v4`) — interface `PerfilCampos`, usuário mockado **diferente**: `USER_NAME = 'Mariana Albuquerque'` (`dashboard-perfil-v4/index.tsx:43`).

Ou seja: duas telas de dashboard diferentes têm dois "usuários logados" completamente distintos e desincronizados, porque não há contexto/store compartilhado.

### Portal atual

**NÃO ENCONTRADO.** Nenhum contexto, hook, store ou tipo `Portal`/`Channel` existe. O próprio nome do canal é hard-coded e **inconsistente** entre telas:

- `src/components/header-desktop/index.tsx:144-147` e `src/screens/_emails/shell.tsx:22` → `"Food Connection"`.
- `src/screens/anuncie/index.tsx:33-40`, `sobre/index.tsx:46-74`, `contato/index.tsx:32-113` → `"Portal Saúde Business"`.

Duas marcas de portal diferentes convivem no código como strings literais, sem nenhuma variável que as unifique — reforça que não há modelagem de "portal atual".

### Consumo (exemplos reais)

- `conteudo/index.tsx:57,155,470` — `useLogado()` usado para exibir estado logado e para gating do download.
- `dashboard/index.tsx:33-34,71-72,98` — constantes locais direto no `DashboardHeader`.
- `dashboard-perfil-v4/index.tsx:139` — `campos = isCompleto ? PERFIL_CAMPOS_COMPLETO : PERFIL_CAMPOS`, usado direto em formulários.
- `gate-download/index.tsx:140` — o próprio protótipo "loga" navegando para `/conteudo?logado=true`.

### Observação lateral

Existe um único `useSyncExternalStore` real no repo: `src/dev/scenario-store.ts` (usado por `ScenarioBar`), mas é explicitamente **provisório de dev/preview** (comentário: "será substituído pelo Handoff Tour") para alternar cenários de UI via `?cenario=` — sem relação com autenticação ou portal.

---

## Divergências entre o que foi descrito na solicitação e o que foi encontrado

1. **"Atualização otimista"** — o termo sugere uma chamada de rede com rollback em caso de falha. Não existe rede no protótipo: é `useState<Set>` local que esconde o item imediatamente e nunca reverte sozinho por falha (não há como falhar) — só reverte se o usuário clicar em "Desfazer". O comportamento visual bate com o pedido, mas o mecanismo é puramente local/mock, não uma otimização de UX sobre uma race condition real.
2. **"Selo 'em breve'"** — a pergunta trata como um selo isolado; na prática é a prop `chip` do próprio objeto de definição da aba (`{ chip: 'Em breve' }`), renderizada via componente `Badge` genérico — não é um componente dedicado de "selo em breve", é reuso do `Badge` com tone/shape específicos.
3. **"Tratamento disabled" dos Downloads** — a pergunta pede "aparência disabled e rótulo", implicando um único ponto de tratamento. Na prática são **três** tratamentos independentes que precisam da mesma flag `disabled`: o título (troca `<a>` por `<p>`), o `IconTile` (prop `tone`) e o CTA (troca `<button>`/link por `<span aria-disabled>`). Não há um wrapper único que aplique "modo disabled" de uma vez.
4. **Modal de baixar / regra de cooldown** — a pergunta presume que a regra de frequência (se existir) pertence ao próprio modal de download. Na prática, o cooldown existente no repo **não pertence a esse modal** — ele é exclusivo dos modais passivos "Portal"/"Leitura", e o modal de download foi projetado explicitamente (comentário no código) para nunca ter cooldown algum.
5. **"Estado do usuário logado" (item 8)** — a pergunta presume a existência de "contexto, hook, store — o que existir", esperando encontrar ao menos um desses três. Na prática não existe nenhum: login é um boolean de query string, e não há um único objeto de usuário, e sim dois mocks de usuário diferentes e desincronizados entre as duas telas de dashboard.

## Pontos onde a mesma coisa está implementada de duas (ou três) formas diferentes

1. **Dialog/Modal (3 camadas convivendo):** `Modal` cru (fluxos de auth v2: login, cadastro, recuperação/redefinição de senha, confirmação de e-mail), `Dialog` (declarado "fonte da verdade" no próprio comentário: excluir-conta, gate-download, meus-dados), e um terceiro padrão híbrido Modal+BottomSheet com markup de botões reimplementado à mão (`IncentiveDownloadDialog`, `IncentiveNewsletterDialog`) — nenhum dos dois usa `Dialog`.
2. **Toast (2 padrões no mesmo arquivo):** API imperativa `toast.*` + `Toaster` global montado uma vez em `router.tsx` (usado por `dashboard-perfil-v4` e `read-list-item`) **convive** com instâncias manuais de `<Toast>` cru, disparadas por query param de URL (`?toast=download-started`, etc.), sem auto-dismiss nem pilha, em `home`, `conteudo`, `dashboard-perfil-v3` **e também** em `dashboard-perfil-v4` — a mesma tela (`dashboard-perfil-v4`) usa as duas abordagens lado a lado (store para a remoção de "Últimas leituras", `<Toast>` cru para "Alterações salvas.").
3. **Paginação:** o componente `Pagination` existe e é usado em `dashboard-perfil-v3`/`v4`, mas `src/screens/buscar/index.tsx:114-154` e `src/screens/categoria/index.tsx:125-165` reimplementam a mesma UI de paginação inteiramente à mão, com números de página, "anterior" e reticências **fixos/estáticos** (sem lógica real), em vez de usar o componente.
4. **Icon button:** o componente `IconButton` existe e é usado em 3 lugares, mas há pelo menos dois botões só-ícone reconstruídos manualmente com classes Tailwind: `src/screens/_auth/password-input.tsx:58-65` (mostrar/ocultar senha) e `src/screens/dashboard/index.tsx:316-322` ("Baixar novamente") — este último com classes **idênticas** ao que `IconButton type="ghost" size="medium"` gera.
5. **Aba/página "Favoritos" (2 modelos de "em breve"):** no fluxo novo (`dashboard-perfil-v3`/`v4`), Favoritos é uma aba com **trigger desabilitado** (impossível navegar até ela). No fluxo antigo (`src/screens/dashboard/index.tsx:237-249`), Favoritos é uma seção **navegável livremente** que renderiza um componente `ComingSoon` ("Favoritos em breve"). São duas soluções diferentes para o mesmo conceito de "recurso ainda não disponível", presentes ao mesmo tempo no repo.
6. **Dados de usuário logado (2 mocks desincronizados):** `dashboard/index.tsx` usa "Ana Souza" com um objeto `CAMPOS` sem tipo nomeado; `dashboard-perfil-v3`/`v4` usam "Mariana Albuquerque" via `PERFIL_CAMPOS` (interface `PerfilCampos` em `src/mocks/dashboard-perfil.ts`) — campos parcialmente diferentes entre os dois (um tem `senha`/`foto`, o outro tem `cep`/`endereco`/`numero`/`complemento`).
7. **Nome do portal/canal (2 marcas):** `"Food Connection"` (header, e-mails) vs. `"Portal Saúde Business"` (anuncie, sobre, contato) — strings hard-coded inconsistentes, sem nenhuma fonte central.
