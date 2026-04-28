# Authors Carousel

**Figma Desktop:** [`3454:13759`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3454-13759)
**Figma Mobile:**  [`3467:39282`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3467-39282)
**Arquivo:** [`src/components/authors-carousel.php`](../src/components/authors-carousel.php)

Carrossel horizontal de **Author Summary cards**. Diferente do que eu tinha antes (grid de avatares simples). Variantes desktop: 6 (state × steps). Mobile: 3.

## Anatomia
- Container `w-704 flex items-center relative`
- **cards-list** `flex gap-4 items-start max-w-704 overflow-x-auto`:
  - Cada card é um `Author Summary` (size 496×~280)
  - 3+ cards lado a lado com scroll horizontal
- **Nav overlay absolute** (left/right):
  - Gradient white `from-white to-transparent w-12`
  - Icon Button **bg-primary-600** + text-white com `navigate_before/next` size-32 (size-8)
  - Visível apenas no Hovered (no Figma)

## Steps & state
- `state (Enabled|Hovered)` × `steps (0|1|2)` = 6 variantes
- Steps controla qual card está visível: 0 (início), 1 (meio), 2 (fim)
- No início, só nav-next aparece; no fim, só nav-before; no meio, ambos.

## Decisões de design
- **REESCRITA COMPLETA**. A versão antiga era um grid de avatares circulares simples — completamente errada.
- O real é um carrossel de Author Summary cards (full bio + social).
- Cada card tem o mesmo conteúdo do Author Summary standalone.
- Nav buttons são `bg-primary-600` (sólido), não `text-primary-600` (ghost).
- Section title acima é só pra mostrar o contexto no showcase — o componente master não tem.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
