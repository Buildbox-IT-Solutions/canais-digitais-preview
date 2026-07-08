# Header

**Figma:** [Header — `181:4186`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=181-4186)
**Arquivo:** [`src/components/header.php`](../src/components/header.php)

Header do **Food Connection** (by Informa Markets). Props do Figma: `device (Desktop|Mobile) × size (Compact|Expanded) × searchOpened` = 6 variantes.

Três variantes implementadas no showcase:

1. **Compact Desktop** (h-80 logo container) — hamburger + logo + search bar 128w + botão "Anuncie"
2. **Expanded Desktop** — Header Informa bar (bg `neutral-950`, chevron-down dropdown) + main row com logo + social-list (5 icons: WhatsApp, LinkedIn, Facebook, YouTube, X/Twitter) + search 128w + CTA "Anuncie" + nav-list pill (`bg-neutral-50 rounded-full`) com as 11 editorias
3. **Mobile** (w-[440px] max) — hamburger + logo centralizado + search icon, h-72, divider abaixo

## Editorias reais (do Figma)
Eventos · Ingredientes · Indústria A&B · Proteína Animal · Food Service · Sorvetes · Tecnologia · Embalagens · ESG · Especialistas · E-books

Items "Eventos", "Indústria A&B" e "ESG" têm um `arrow_drop_down` chevron indicando submenu.

## Decisões de design
- Brand slot é "Food Connection" (h-64 max, max-w-185 expanded / max-w-162 compact). No WP real, substituir por `<img src="..." alt="Food Connection">`.
- Search bar compact usa `w-32` (128px) — NÃO é a versão full width. **Auto-expand no foco**: `focus-within:w-72` (288px) + `focus:border-secondary-950` no input, animados via `transition-[width] duration-300` (CSS puro, sem state em JS). É o equivalente da variant `Search Opened=On` do Figma disparada por interação.
- Social icons usam `text-primary-600` + `hover:bg-neutral-50` (ghost icon-button style em fundo branco). NÃO usam o partial `icon-button` porque precisam de brand icons específicos (WhatsApp, X) que não estão no enum do partial.
- Nav-list pill tem `bg-neutral-50` (#e9eaec) + `rounded-full` + `px-6`. Cada nav item tem `pt-3 pb-2` com `min-h-32` e text `label-lg` primary-600.
- Header Informa bar é MUITO mais simples do que eu tinha inferido: apenas uma linha com "informa" logo em dropdown button. NÃO tem links rápidos nem social icons (aqueles vivem no Header principal).
- Divider horizontal abaixo do Compact desktop e do Mobile — via partial `divider`.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 5.

---

## v2.0 — Botão "Entrar" (2026-04-12)

**Figma:** [Header v2 — `5754:7270`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=5754-7270) — inspecionado via MCP

**Mudança crítica vs. v1:** o bloco de **social icons foi removido** da main row. O v2 deixa só search + autenticação + Anuncie.

**Ordem final da main row (Expanded Desktop):**
```
[Logo · flex-none]  ———————  [search · | · Entrar · Anuncie · flex-1 justify-end]
```

**Mudanças do v1 → v2:**
| | v1 | v2 |
|---|---|---|
| Social icons | 5 ícones (WhatsApp, LinkedIn, Facebook, YouTube, X) entre logo e search | **Removidos** |
| Divider vertical | — | `w-px self-stretch bg-neutral-200` entre search e Entrar |
| Entrar | — | Outlined pill, ícone `account_circle` + texto |
| Anuncie | Filled pill | Filled pill (inalterado) |

**Anatomia do botão Entrar (5754:7563):**
- Borda: `border-[1.5px] border-primary-600` (#002244)
- Padding: `pl-4 pr-5 py-2` (16/20/8px — maior à direita para equilibrar com o ícone)
- Gap interno: `gap-2` (8px)
- Raio: `rounded-full`
- Ícone: `account_circle` Material, `size-6` (24px), `currentColor`
- Tipo: `font-body font-bold text-body-lg` (Open Sans Bold 16px) + `whitespace-nowrap`

**Right container (5754:7623 / 5754:7554):**
- `flex-1 items-center justify-end gap-3 px-3 py-6 self-stretch`
- `self-stretch` é essencial para o divider `h-full` funcionar — faz o container assumir a altura total da row (96px do logo container).

**Implementação:**
- Arquivo ativo: `_partials/header-desktop.php` (atualizado para v2).
- Backup do v1: `_partials/header-desktop-v1-backup.php`.
- Os layouts consumidores continuam chamando `get_template_part('components/_partials/header-desktop', ...)` — a substituição é transparente.

**Decisões de design:**
- Social icons movidos para o footer — tira ruído do header e foca a atenção no fluxo principal (buscar conteúdo, logar, virar anunciante).
- Outlined (não filled) para o Entrar — diferencia visualmente do CTA comercial "Anuncie" (filled), que é a ação de conversão principal. Login é utilitário, não deve roubar peso.
- `border-[1.5px]` e não `border` — bate com o padrão dos outros outlined do DS (`link-button`, botão Criar conta do login-modal).
- Ícone `account_circle` à esquerda — cue visual universal de "área do usuário". Simples de substituir por avatar quando logado, mantendo o mesmo container.

## v3.0 — Estado Logado (15/04/2026)

Sem nodeId Figma — estado derivado de `FEATURE-cadastro-etapa2.md` (§2.3).

### Props adicionadas
| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `userLoggedIn` | bool | `false` | Ativa o estado logado |
| `userName` | string | `''` | Nome completo do usuário |
| `userEmail` | string | `''` | E-mail (pode ser mascarado: `m***@empresa.com.br`) |
| `userInitials` | string | `'U'` | Iniciais para o avatar quando não há foto |
| `userAvatar` | string\|null | `null` | URL da foto; `null` = usar iniciais |

### Anatomia do estado logado
- **Avatar circular 32px** — iniciais em `bg-secondary-950 text-white` OU `<img class="rounded-full object-cover">`
- **Nome** — apenas primeiro nome, `text-body-lg font-semibold text-primary-600`
- **Chevron** — `rotate-180` quando aberto, `transition-transform duration-150`

### Dropdown (264px wide)
- Container: `bg-white rounded-lg shadow-lg border border-neutral-100`, `origin-top-right`
- Cabeçalho: avatar 40px + nome + e-mail + badge "Conta Informa" (`bg-secondary-50`)
- Item: "Minha Conta Informa" → `/src/layouts/dashboard-perfil.php`
- Divider: `bg-neutral-100 h-px mx-4`
- Item: "Sair" → `/` (`text-[#bf0413] hover:bg-[#FEF2F2]`)

### Motion
- Abre: `opacity-0 scale-95` → `opacity-100 scale-100`, 150ms ease-out, `origin-top-right`
- Fecha: inversa, 100ms ease-in (mesma classe de transição, CSS-only via state toggle)
- Escape ou clique fora fecha o menu

### JS
Lógica em `src/assets/js/components/cadastro-flow.js` (`init()` — bloco "User menu dropdown"). Também contém propagação de `?user=` em links internos e helper `render_session_toggle()` em `_session.php`.

## Transição Expanded → Compact (scroll)

**Figma:** Expanded Desktop `5754:7289` (200px) · Compact Desktop `5754:7271` (89px) · Expanded Mobile `5754:7343` (117px) · Compact Mobile `5754:7352` (73px).

Quando `window.scrollY > 8`, o header entra em modo Compact:

| Elemento | Expanded | Compact |
|---|---|---|
| Header Informa strip | visível (`max-h-[600px]`) | colapsado (`max-h-0`, `overflow-hidden`) |
| Hamburger (menu icon) | ausente (`w-0 opacity-0`) | visível à esquerda (`size-12`, icon `size-8`) |
| Logo container | `h-24 px-3 py-4` | `h-20 p-3` |
| Logo image (max) | `max-h-16 max-w-[185px]` | `max-h-14 max-w-[162px]` |
| Right row (search / login / Anuncie) | `py-6` | `py-6` (constante) |
| Nav-list pill | visível (`mt-4 max-h-20`) | colapsada (`mt-0 max-h-0 overflow-hidden`) |
| Wrapper branco | `pb-4` | `pb-0` |
| Bottom divider 1px | `opacity-0` | `opacity-100` (linha `bg-neutral-100`) |

Cada transição é `duration-300`. O scroll listener usa `requestAnimationFrame` para evitar layout thrash (mesma estratégia do `header-sticky.js` legado). Implementado pelo hook `useCompactOnScroll` em `src/components/header-desktop/index.tsx`.

> Mobile (Expanded/Compact) foi portado — ver `useMediaQuery`/`showHamburger` em `src/components/header-desktop/index.tsx`.

## v4.0 — Mobile com área logada (07/07/2026)

**Figma:** Header `5754:7270`, variantes `Device=Mobile` × `Logged=Off|On` (`5754:7343`, `7411:14803`, `5754:7352`, `7411:14814`).

O cluster direito mobile ganhou um **slot de conta** antes do ícone de busca: `[conta] [busca]` (antes: só busca).

- **Deslogado:** ícone `account_circle` (size-8 em botão circular size-12, mesmo padrão do hambúrguer/busca). Annotation do Figma: *"Abre bottom sheet com as opções de cadastro/login"*.
- **Logado:** avatar 40px (iniciais em `bg-primary-100 text-primary-600`, ou `<img>` se houver foto). Annotation: *"quando logado: Avatar / Abre bottom sheet"*.

Ambos abrem um **bottom sheet** (nunca navegam direto):
- Deslogado → `AccessInvite` (mesmo conteúdo do popover desktop).
- Logado → cabeçalho (avatar+nome+e-mail) + "Meu Perfil" (`/dashboard-perfil-v4`) + "Sair" (`/home`) — o **lar canônico do logout no mobile**.

Implementado por `AccessMenuMobile`/`UserMenuMobile` em `src/components/header-desktop/index.tsx` — componentes dedicados ao slot mobile, independentes do `AccessMenu`/`UserMenu` do cluster desktop (que seguem `hidden lg:flex`).

Annotation adicional (nó "container", cluster direito): *"Para acomodar o botão de login/cadastro foi retirado a barra de share/rede social"* — mesma remoção aplicada ao rodapé do side menu (ver `side-menu.md`).
