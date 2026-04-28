# Widget / Podcast + Widget Item / Podcast

**Figma Widget:** [`3074:48896`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3074-48896)
**Figma Item:**   [`2769:24490`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2769-24490)
**Arquivo:** [`src/components/widget-podcast.php`](../src/components/widget-podcast.php)

Widget de podcasts. **2 variantes** Widget + 8 variantes Widget Item Podcast (device × patrocinado × state).

## Anatomia do Widget
- Container: `bg-neutral-50` (#e9eaec) `border border-neutral-100 rounded-lg pb-2`
- `w-496` (desktop) / `w-` mobile (sem fixed)
- **Top**: title "Podcasts" Aleo Bold 22/28 text-primary-600 com `p-6`
- **List** com 2 tipos de items:
  - **Patrocinado** (1 primeiro): sub-card `bg-white border-neutral-100 rounded-lg` dentro do widget, com PodcastImage 104 + (categoria + título) + Divider + Sponsor Line inline
  - **Não-patrocinado** (4 demais): `flex gap-4 items-center px-6 py-3`, com PodcastImage 104 + (categoria + título)
- **Footer**:
  - `flex flex-col items-start py-2 px-6 w-full` Divider neutral-100
  - `flex flex-col items-start p-2` Button ghost "Todos os episódios" + arrow_forward icon

## Widget Item Podcast (anatomia interna)
- PodcastImage 104×104 (XSmall 1:1) à esquerda
- Container content: gap-2 px-4
- Categoria: `text-mint text-label-md SemiBold` (chip OFF)
- Título: Aleo Bold 16/24 tracking 0.15 (`text-title-md`) text-primary-600 line-clamp-3

## Decisões de design
- **BG corrigido** `bg-neutral-50`, NÃO `bg-white`. Border + rounded-lg.
- **Width corrigido 360 → 496** (desktop) — muito mais largo.
- **PodcastImage size 104** (não 72) — itens maiores e mais legíveis.
- **Primeiro item é Patrocinado** num sub-card branco com Sponsor Line interno.
- **Footer é botão ghost com arrow_forward**, NÃO link button.
- Title é text-title-md (16px), NÃO text-title-sm (14px).

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
