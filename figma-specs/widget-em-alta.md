# Widget / Em Alta + Widget Item / Number

**Figma Widget:** [`3492:42255`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3492-42255)
**Figma Item:**   [`2769:26529`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2769-26529)
**Arquivo:** [`src/components/widget-em-alta.php`](../src/components/widget-em-alta.php)

Widget de sidebar com top-N artigos numerados. **2 variantes**: `device (Desktop|Mobile)`.

## Anatomia
- Container: `bg-neutral-50` (#e9eaec) `border border-neutral-100 rounded-lg pb-4`
- `min-w-392 w-392` (desktop) / `min-w-344 w-344` (mobile)
- **Top header**: title "Widget Title" Aleo Bold 22/28 (text-title-xl) text-primary-600 com `p-6` (desktop) / `p-5` (mobile)
- **Items** Widget Item / Number:
  - Padding: `gap-4 py-2 px-6` (desktop) / `px-4` (mobile)
  - Numero gigante: Aleo Bold 36/44 (`text-display-sm`) desktop / 28/36 (`text-headline-md`) mobile, `text-neutral-900` (#3c4e69)
  - Title: Aleo Bold 18/24 (`text-title-lg`) desktop / 16/24 tracking 0.15 (`text-title-md`) mobile, `text-primary-600`
  - Divider entre items (não no último)
- Sem categoria nos items
- 5 items default

## Decisões de design
- **BG corrigido**: `bg-neutral-50` (#e9eaec), NÃO `bg-white`. Sem partial section-title.
- **Numero color é `text-neutral-900`** (slate), NÃO `text-primary-600` ou `text-neutral-400`.
- **Sem categoria** nos items — só numero + título.
- Width fixo 392 (desktop) / 344 (mobile).
- `rounded-lg` (8px), NÃO `rounded-md`.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
