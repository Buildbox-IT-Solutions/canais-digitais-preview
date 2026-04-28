# Resumo Box

**Figma:** [`619:7291`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=619-7291)
**Arquivo:** [`src/components/resumo-box.php`](../src/components/resumo-box.php)

Box accordion (collapsible) com resumo gerado por IA. **4 variantes**: `state (Enabled|Hovered) × opened (false|true)`.

## Anatomia
Container: `bg-white border border-neutral-100 rounded-sm w-[758px] flex flex-col items-center justify-center`

### Header (sempre visível)
- `flex gap-2 items-center p-4 w-full`
- "Ver resumo" (closed) ou "Resumo" (opened) → `font-display font-bold text-title-lg text-primary-600` flex-1
- Chevron 24×24:
  - Closed: `keyboard_arrow_down` (chevron down)
  - Opened: `keyboard_arrow_up`

### Content (apenas Opened)
- `flex items-center justify-center pb-4 px-4 w-full`
- `<ul list-disc>` com items:
  - `font-body text-body-lg text-neutral-950` (16/24 tracking 0.5)
  - margin: `mb-3 ms-6` (24px left), último sem mb

### Footer (apenas Opened)
- `flex flex-col gap-4 items-center justify-center pb-4 px-4 w-full`
- Divider neutral-100
- "Resumo gerado por ferramenta de Inteligência Artificial" → `font-body font-semibold text-label-md text-neutral-950`

## Estados
| state | opened | border |
|---|---|---|
| Enabled | false/true | `border-neutral-100` |
| Hovered | false/true | **`border-neutral-900`** (#3c4e69) |

## Decisões de design
- **REESCRITA COMPLETA**. A versão antiga era um aside fixo com border-left primary-600 + bg-neutral-50 + bullet dots manuais. **Errado.**
- O real é um **accordion**: header clicável + content expansível. NÃO é um pull-quote nem aside.
- "Resumo" e "Ver resumo" alternam conforme `opened` (closed mostra "Ver resumo" como CTA).
- Footer com aviso "Resumo gerado por ferramenta de Inteligência Artificial" é parte essencial do componente — IA disclosure compliance.
- Hover apenas muda o border (não tem hover state forte).

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
