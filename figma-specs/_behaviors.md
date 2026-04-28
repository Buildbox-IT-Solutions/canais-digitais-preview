# Behaviors — Especificação de Interações

> Extraído do Figma via MCP em 2026-04-10.
> Cada comportamento mapeia estados visuais do Figma → lógica JS.

---

## 1. Header Informa

| Propriedade | Valor |
|---|---|
| Trigger | Click no botão `[data-component="header-informa"]` |
| Estado inicial | `Closed` — apenas bar com logo "informa" + chevron ▼ |
| Estado resultante | `Opened` — painel legal Informa PLC expande abaixo |
| Reverter | Click no mesmo botão, Esc, click fora |
| Animação | Slide vertical (`max-height` transition 300ms ease) |
| Acessibilidade | `aria-expanded`, `aria-controls` |
| Figma | 110:3575 (4 variants: Closed/Opened × Desktop/Mobile) |
| Status | ✅ |

---

## 2. Search Bar

| Propriedade | Valor |
|---|---|
| Trigger | Focus/click no input `[data-component="search-bar"]` |
| Estado inicial | Compact (250px), placeholder "Buscar" |
| Estado resultante | Extended — border secondary-950, botão clear (×) visível |
| Reverter | Esc, click fora (blur), click no botão clear |
| Animação | Border color transition 200ms |
| Acessibilidade | `aria-expanded` no container |
| Figma | 1776:19053 (8 variants) |
| Status | ✅ |

---

## 3. Dropdown Menu

| Propriedade | Valor |
|---|---|
| Trigger | Hover ou click no `[data-trigger="dropdown"]` (nav-item) |
| Estado inicial | Menu oculto (`opacity-0 pointer-events-none`) |
| Estado resultante | Menu visível (`opacity-100 pointer-events-auto`) |
| Reverter | Mouse leave, click fora, Esc |
| Animação | Fade (`opacity` transition 150ms ease) |
| Acessibilidade | `aria-expanded`, `aria-haspopup="true"` no trigger |
| Figma | 1859:23264 (3 variants) |
| Status | ✅ |

---

## 4. Side Menu

| Propriedade | Valor |
|---|---|
| Trigger | Click no `[data-trigger="side-menu"]` |
| Estado inicial | Menu oculto fora da viewport esquerda |
| Estado resultante | Menu desliza da esquerda (w-280), overlay escuro |
| Reverter | Click no ×, Esc, click no overlay |
| Animação | `transform: translateX(-100%)` → `translateX(0)` 300ms ease |
| Acessibilidade | `aria-hidden`, focus trap, `role="dialog"` |
| Figma | 986:9198 (4 variants) |
| Status | ✅ |

---

## 5. Resumo Box

| Propriedade | Valor |
|---|---|
| Trigger | Click no `[data-trigger="resumo-toggle"]` (header button) |
| Estado inicial | Collapsed — "Ver resumo" + chevron ▼ |
| Estado resultante | Expanded — conteúdo visível, chevron ▲, título "Resumo" |
| Reverter | Click no header novamente |
| Animação | `max-height` + `opacity` transition 300ms ease |
| Acessibilidade | `aria-expanded`, `aria-controls` |
| Figma | 619:7291 (4 variants) |
| Status | ✅ |

---

## 6. Bottom Sheet

| Propriedade | Valor |
|---|---|
| Trigger | Click no `[data-trigger="bottom-sheet"]` |
| Estado inicial | Sheet oculto abaixo da viewport |
| Estado resultante | Sheet desliza de baixo, overlay escuro (opacity 32%) |
| Reverter | Click no overlay, Esc, botão fechar, swipe down |
| Animação | `transform: translateY(100%)` → `translateY(0)` 300ms ease |
| Acessibilidade | `aria-hidden`, focus trap, `role="dialog"` |
| Figma | 3190:48964 (2 variants) |
| Status | ✅ |

---

## 7. Authors Carousel

| Propriedade | Valor |
|---|---|
| Trigger | Click nos botões prev/next `[data-action="carousel-prev/next"]` |
| Estado inicial | Primeiro card visível, botões ocultos |
| Estado resultante | Cards navegam horizontalmente via scroll |
| Reverter | N/A (navegação contínua) |
| Animação | `scrollLeft` smooth, botões `opacity-0` → `opacity-100` no hover |
| Acessibilidade | `aria-label="Anterior"` / `"Próximo"`, `aria-roledescription="carousel"` |
| Figma | 3454:13759 (6 variants) |
| Status | ✅ |

---

## 8. Header Author (bio toggle)

| Propriedade | Valor |
|---|---|
| Trigger | Click no `[data-trigger="bio-toggle"]` ("ver mais") |
| Estado inicial | Bio truncada — `max-h-[60px] overflow-hidden` |
| Estado resultante | Bio expandida — sem max-h, "ver menos" |
| Reverter | Click "ver menos" |
| Animação | `max-height` transition 300ms ease, label swap |
| Acessibilidade | `aria-expanded` no botão |
| Figma | 850:5000 (4 variants) |
| Status | ✅ |

---

## 9. Author Summary (bio toggle)

| Propriedade | Valor |
|---|---|
| Trigger | Click no `[data-trigger="bio-toggle"]` ("ver mais") |
| Estado inicial | Bio truncada — `max-h-[60px] overflow-hidden` |
| Estado resultante | Bio expandida — sem max-h, "ver menos" |
| Reverter | Click "ver menos" |
| Animação | `max-height` transition 300ms ease, label swap |
| Acessibilidade | `aria-expanded` no botão |
| Figma | 791:8418 (4 variants) |
| Status | ✅ |
