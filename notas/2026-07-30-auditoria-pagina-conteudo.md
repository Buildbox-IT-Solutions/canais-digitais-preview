---
tipo: nota
data: 2026-07-30
validade: vencida
motivo: >-
  Auditoria da /conteudo ANTES da refatoração combinatória (PR #25, commit 8d9de5f). Descreve a árvore de componentes que a refatoração desfez.
---

# Auditoria — Página de Conteúdo (`/conteudo`)

**Fase:** 0.1 — Auditoria (read-only)
**Data:** 2026-07-30
**Rota:** `/conteudo` · **Tela:** `src/screens/conteudo/index.tsx` (447 linhas)

Nenhum arquivo de código foi alterado na produção deste documento — apenas leitura.

---

## 1. Árvore de componentes

**Rota** — `src/router.tsx:46`: `{ path: '/conteudo', element: <ConteudoScreen /> }` (import em `src/router.tsx:14`).

Componentes usados diretamente por `ConteudoScreen` (`src/screens/conteudo/index.tsx`):

| Componente | Arquivo | Uso |
|---|---|---|
| `HeaderDesktop` | `src/components/header-desktop/index.tsx` | linha 128 |
| `AdFrame` | `src/components/ad-frame/index.tsx` | linhas 132, 373, 400 (970×250 / 300×250 / 728×90) |
| `Categoria` | `src/components/categoria/index.tsx` | linha 141 |
| `Avatar` | `src/components/avatar/index.tsx` | linha 154 |
| `IconButton` | `src/components/icon-button/index.tsx` | linhas 182–189 (loop `SHARE_ICONS`) |
| `Thumbnail` | `src/components/thumbnail/index.tsx` | linha 196 (hero) |
| `Tag` | `src/components/tag/index.tsx` | linha 270 (loop `ARTICLE_TAGS`) |
| `WidgetEmAlta` | `src/components/widget-em-alta/index.tsx` | linha 279 |
| `Button` | `src/components/button/index.tsx` | linhas 303, 360 |
| `Icon` | `src/components/icon/index.tsx` | linhas 316–331 |
| `SectionTitle` | `src/components/section-title/index.tsx` | linha 381 |
| `NewsCard` | `src/components/news-card/index.tsx` | linha 384 (loop `VEJA_TAMBEM`) |
| `FooterDesktop` | `src/components/footer-desktop/index.tsx` | linha 403 |
| `IncentiveBanner` | `src/components/incentive-banner/index.tsx` | linha 408 |
| `IncentiveDownloadDialog` | `src/components/incentive-download-dialog/index.tsx` | linha 419 |
| `IncentiveNewsletterDialog` | `src/components/incentive-newsletter-dialog/index.tsx` | linha 425 |
| `Toast` | `src/components/toast/index.tsx` | linhas 436, 442 |

**Não existe player de mídia.** A única "mídia" do corpo é uma `<img>` estática dentro de `<figure className="aspect-video">` (linhas 237–248) — a classe sugere vídeo, mas é só uma foto. Confirmado por grep em `src/`: nenhum `<video>`, `<iframe>`, embed do YouTube/Vimeo ou componente `VideoPlayer`/`MediaPlayer` é usado por esta rota.

Sub-árvore de 2º nível relevante:
- `HeaderDesktop` importa `AccessInvite`, `BottomSheet`, `Button`, `DropdownMenu`, `HeaderInforma`, `Icon`, `LoginButton`, `MenuListItem`, `NavItem`, `SearchBar`, `SideMenu`. `SideMenu` importa `Button`, `Divider`, `Icon`, `IconButton` e o mock `MENU_ITEMS` (`src/mocks/articles.ts:284-296`).
- `IncentiveDownloadDialog`/`IncentiveNewsletterDialog` importam `BottomSheet`, `Icon`, `Modal`, `StatusRing`, `useMediaQuery`.
- `WidgetEmAlta` importa `Divider`. `NewsCard` importa `Thumbnail`, `Categoria`, `Byline`. `FooterDesktop` importa `Icon`.

---

## 2. Como os dados do post chegam hoje

**Não existe objeto de dados do post.** `ConteudoScreen` não recebe `props`, não usa `useParams()`, e não lê `id`/slug da URL — `useSearchParams` (linha 40) só lê `toast`, `preview` e, via `useLogado`, `logado`. Todo o corpo do artigo (título, autor, data, lead, parágrafos, headings, imagens, tags) está **hardcoded direto no JSX**. Só três pedaços vêm de mock (`src/mocks/articles.ts`): `EM_ALTA` (linha 24 → 279), `VEJA_TAMBEM` (linha 24 → 384) e `ARTICLE_TAGS` (linha 24 → 270), além do helper `picsumSrc`.

**Confirmação sistêmica:** todo link para um artigo no repositório (home, categoria, busca, dashboard, contato, anuncie, sobre, `category-column`, `destaque-section` etc. — 20+ ocorrências) aponta para `/conteudo` **sem parâmetro de id/slug**. `/conteudo` é hoje uma página estática única, não um template parametrizado — isso não é um problema isolado desta tela.

Hardcodes mais relevantes (arquivo:linha):
- `:141` — `<Categoria color="saffron" label="Food Service" href="/categoria" />` fixa.
- `:142-145` — título H1 hardcoded.
- `:146-149` — lead/resumo hardcoded.
- `:155` — avatar do autor com URL externa hardcoded (`https://i.pravatar.cc/80?img=12`), fora do padrão `picsumSrc`.
- `:166-170` — nome do autor "Redação Food Connection" hardcoded, `href="/categoria"` (não é página de autor).
- `:173` — **placeholder literal `dd/mm/aaaa 00h00`** nunca substituído.
- `:175` — "Atualizado há 22 horas" como string estática (não calculada).
- `:26-33` — `SHARE_ICONS`, cada item com `href="/categoria"` (:188) — nenhum link de compartilhamento real.
- `:197-198` — hero via `picsumSrc('conteudo-hero', 1408, 939)`, seed fixo.
- `:204-263` — **todo o corpo do artigo** (parágrafos, 3 H2, figura) é texto estático — não há estrutura de blocos por trás.
- `:279-282` — `WidgetEmAlta` recebe `EM_ALTA.map((title) => ({ title }))`; como `EM_ALTA` é só `string[]`, nenhum item tem `href` → linhas não navegam.
- `:294-300` — copy do banner de Newsletter hardcoded.
- `:320-340` — copy do card de download (estado logado) hardcoded, CTA "Baixar agora" com `href="#"` morto.
- `:352-357` — copy do material de download (estado deslogado) hardcoded, não vinculado a um objeto "material" do post.
- `:390` — cada card de "Veja também" recebe `href="/conteudo"` fixo em vez de `card.id`/slug — os 4 cards linkam para a mesma página.

---

## 3. Sidebar — Newsletter e "Baixar Material"

Sidebar = `<aside className="col-span-4 flex flex-col gap-10">` (`:277-375`), 4 blocos, só 1 é componente reutilizável:

1. **Widget "Em Alta"** — componente próprio (`src/components/widget-em-alta/index.tsx`), instanciado em `:279-282`. Compartilhado com `home`/`home-v2`.
2. **Banner Newsletter** — **markup inline na própria tela** (`:284-311`), não um componente. Existe `src/components/banner-newsletter/` no repo, mas **`ConteudoScreen` não o usa** — a versão na sidebar é uma reimplementação divergente. CTA: `logado ? '/dashboard-perfil-v4?tab=newsletter' : '/form-newsletter'`.
3. **Card "Baixar Material"** — também inline (`:313-369`), condicional em `logado`: estado "Tudo pronto!" com link morto (`href="#"`) ou card de conversão que abre `IncentiveDownloadDialog` (componente compartilhado, mas é o modal, não o card). Existem `src/components/download-item/` e `src/components/download-section/` no repo, não usados aqui.
4. **Ad 300×250** (`:372-374`).

Os 4 blocos ficam em `flex flex-col gap-10` dentro do `<aside className="col-span-4">`, ao lado do `<article className="col-span-7">`. Nenhum breakpoint altera essa disposição (ver seção 5).

---

## 4. Geração de id/slug para headings

**Não existe.** Os H2 do corpo (`:218-220`, `:227-229`, `:250-252`) são renderizados sem `id`, sem slug, sem wrapper de âncora. Não há TOC/sumário na árvore, nem função de slugify em `src/lib/`. **Para o TOC da Fase 5 funcionar, essa geração de id precisa ser criada do zero** — ver também a seção de headings da spec do Figma, que revela um sistema de **3 níveis** de intertítulo (não 2).

---

## 5. Mapa de responsividade

**Breakpoints do projeto:** Tailwind v4 default (`src/index.css` não define `--breakpoint-*` customizado) — `sm=640`, `md=768`, `lg=1024`, `xl=1280`, `2xl=1536`. O breakpoint de referência documentado no código é `lg` (1024px) (`src/components/header-desktop/index.tsx:22-24`).

| Viewport | Bucket Tailwind |
|---|---|
| 320, 375, 390, 768 | abaixo de `lg` (768 cruza `sm`/`md`, não `lg`) |
| 1024 | `lg` |
| 1280 | `xl` |
| 1440 | entre `xl` e `2xl` |

**Grid artigo + sidebar NÃO empilha em nenhum breakpoint.** `:137` — `grid grid-cols-11 gap-6` sem nenhum prefixo responsivo; `<article className="col-span-7">` (:138) e `<aside className="col-span-4">` (:277) idem. Em 320–1024px a proporção 7/11 e 4/11 se mantém, só encolhendo. Único ajuste responsivo do container é `px-4 → lg:px-6`. Isso diverge do padrão do resto do site (`home`, `archive`, `central`, `patrocinadores` usam `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, empilhando até `lg`).

**Overflow horizontal — dois vetores concretos:**
1. **`AdFrame` com largura fixa via `style` inline** (`src/components/ad-frame/index.tsx:10-24`, `shrink-0`, sem variante responsiva). Usos: `:132` (970px, sem padding/max-width ao redor) estoura em 320–768px, sem `overflow-x-hidden` em nenhum ancestral → **scroll horizontal na página inteira**; `:400` (728px) estoura em 320–390; `:373` (300px) dentro do `<aside>` cuja coluna encolhe livremente (`grid-cols-11` sem `min-width`) força vazamento também. Mesmo defeito existe em `home`, `home-v2`, `categoria`, `buscar`, `destaque-section`, mas agravado aqui pela ausência de empilhamento.
2. **Colunas `max-w-[392px]` dentro de coluna de grid que pode encolher a quase zero** — os 3 blocos da sidebar usam esse teto, mas a coluna-pai sem `min-width` deixa o `AdFrame` de 300px fixo (item 1) ditar a largura mínima, amplificando o overflow em vez do empilhamento esperado.

**Tipografia sem escala fluida** — todos os tamanhos em `src/index.css` (bloco `TYPOGRAPHY SCALE`) são `px` fixos, sem `clamp()`/`vw`. O H1 de 36px/44 não reduz em mobile.

**Header/menu — responsivo via JS (`useMediaQuery`), não só CSS** (`src/components/header-desktop/index.tsx:88`): hambúrguer abaixo de `lg`, `SideMenu` com `w-[280px] min-w-[240px] max-w-[280px]` (87,5% da tela em 320px, sem overflow por ser `fixed`).

**Footer empilha corretamente em `lg`** (`hidden lg:flex` vs `lg:hidden flex flex-col`) — ao contrário do grid do artigo.

**Modais de incentivo** trocam `Modal`↔`BottomSheet` via `useMediaQuery` no breakpoint `lg`. **`IncentiveBanner`** é CSS puro com corte em `sm` (640px), não `md`/`lg`.

**Avatar do autor** — só um `Avatar` único (`size-10`=40px) é renderizado; não existe avatar-stack em `/conteudo` hoje (a Fase 2 vai precisar criar isso).

**Embeds de vídeo/tabelas no corpo** — não existem, logo não há comportamento responsivo a mapear ainda.

**Áreas de toque abaixo de 44×44px:** `Categoria` sem padding (~16px de altura, usada em `:141` e via `NewsCard`); `Tag` (`px-2 py-1` + `text-title-sm` ≈ 28px); link do nome do autor (~20px). Em contraste, `IconButton size="large"` é `h-12 w-12` (48×48px) e atende o mínimo.

---

## 6. Riscos de compartilhamento

| Componente | Também usado em | Risco |
|---|---|---|
| `Icon` | 56 arquivos (quase toda a aplicação) | **Alto** |
| `Button` | 31 arquivos | **Alto** |
| `HeaderDesktop` | 16+ telas (direto) + wrapper `dashboard-header` | **Alto** |
| `FooterDesktop` | 15 telas de conteúdo público | **Alto** |
| `IconButton` | `SideMenu` → renderizado por `HeaderDesktop` em quase todo o site | **Alto (indireto)** |
| `Thumbnail`, `Categoria`, `NewsCard`, `SectionTitle` | 9–11 arquivos cada | Médio |
| `AdFrame` | `home`, `home-v2`, `categoria`, `buscar`, `destaque-section` | Médio |
| `WidgetEmAlta`, `IncentiveBanner`, `IncentiveDownloadDialog`, `IncentiveNewsletterDialog` | `home` | Médio, concentrado |
| `Avatar` | `contato` | Médio, concentrado |
| `Toast` | `dashboard-perfil-v3/v4`, `toaster` | Médio |
| `Tag` | nenhuma outra rota | **Zero** — ajustável livremente |

`src/mocks/articles.ts` é outro ponto de acoplamento: `EM_ALTA`, `VEJA_TAMBEM`, `ARTICLE_TAGS` e `picsumSrc` são exclusivos de `conteudo`, mas o arquivo inteiro é consumido por `home`, `home-v2`, `categoria`, `buscar`, `sobre`, `anuncie`, `side-menu` e várias seções. Qualquer refator estrutural desse arquivo (ex: introduzir o tipo `Post`) precisa manter compatibilidade com todos esses consumidores.

**Leitura de risco:** mudanças de estilo/comportamento em `HeaderDesktop`, `FooterDesktop`, `Icon`, `Button` afetam a maioria das rotas públicas — qualquer fix de responsividade/acessibilidade feito "para `/conteudo`" nesses arquivos precisa ser validado em `home`, `categoria`, `buscar`, `sobre`, `contato`, `anuncie`, `patrocinadores` etc. `WidgetEmAlta`, os 3 componentes de incentivo e `Avatar` têm raio de impacto menor (concentrado em `home`/`contato`). `Tag` é o único componente seguro para alterar sem checagem cruzada.
