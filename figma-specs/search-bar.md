# Search bar

**Figma:** [`1776:19053`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1776-19053)
**Arquivo:** [`src/components/search-bar.php`](../src/components/search-bar.php)

Campo de busca pill. Props do Figma: `state (Enabled|Hovered|Empty|Typing|Filled|Disabled) × extended (off|on) × trailingIcon` = 8 variantes.

## Anatomia
- **Width** default 250, **altura 40** (`h-10`)
- **rounded-full**
- **Leading search icon** (24px, sem chip) com `pl-3`
- **Trailing close icon** (16px em chip 32 `p-2`) APENAS quando `extended=on`
- **Placeholder** "Buscar" em `text-body-lg` (16/24), `text-neutral-900` (#3c4e69) quando enabled
- **Input preenchido**: `text-primary-600`

## Estados × Extended
| Estado | Extended | BG | Border | Trailing close |
|---|---|---|---|---|
| Enabled | off | white | neutral-100 | — |
| Hovered | off | neutral-50 | neutral-100 | — |
| Disabled | off | neutral-50 | neutral-100 | — |
| Empty | on | white | **secondary-950** | ✓ |
| Typing | on | white | **secondary-950** | ✓ |
| Filled | on | white | neutral-100 | ✓ |
| Hovered | on | neutral-50 | neutral-100 | ✓ |
| Disabled | on | neutral-50 | neutral-100 | — |

## Decisões de design
- **Altura 40 (`h-10`)** — eu tinha errado antes com `h-12` (48).
- **Leading icon não tem chip/padding** — é apenas o SVG inline com `pl-3` no container (diferente do Text field, que tem o icon em um chip 32×32).
- **Trailing só no extended** — a versão off (compact) não tem close button; ele só aparece quando o search está expandido (tipicamente clicando no icon-button search do header).
- **Placeholder text color**: `text-neutral-900` (#3c4e69) — é o slate médio, não o neutral-500 do text-field.
- **Typing state** tem input preenchido + caret pisca + close; visualmente idêntico a Filled mas com border `secondary-950` (focado).
- **Search do Header** usa a variante `Enabled/off` (128px width = `w-32`); search opened ou da search view full-screen usa `w-72` ou maior.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 5. Height corrigido de 48 → 40. Estados agora matching 1:1 com o Figma (8 combinações). Removida variante "full h-12" que não existe.
