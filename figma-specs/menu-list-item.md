# Menu list item + Building Blocks

**Figma:**
- [`1859:23314`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1859-23314) — density default (h-56)
- [`1859:23355`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1859-23355) — density -2 (h-48)
- [`1859:23396`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1859-23396) — density -4 (h-40)
- [`973:10741`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=973-10741) — 973 default (h-56, w-244)

**Arquivo:** [`src/components/menu-list-item.php`](../src/components/menu-list-item.php)

Menu list item Material 3. **Variantes**: `state (Enabled|Hovered|Selected|Disabled|Menu Title) × density × leading/trailing/supporting bools`.

## Anatomia
Container: `flex gap-3 items-center px-3 py-2`
Heights por density:
- Default: `h-14` (56)
- -2: `h-12` (48)
- -4: `h-10` (40)

## Estados
| Estado | BG |
|---|---|
| Enabled | transparent |
| Hovered | **`bg-black/8`** (rgba(0,0,0,0.08)) |
| Selected | **`bg-secondary-50`** (#aae6ff = Arctic) |
| Disabled | `opacity-40` |
| Menu Title | transparent (texto Aleo Bold em vez de Open Sans) |

## Tipografia
- **Label** padrão: `font-body font-semibold text-label-lg` (14/20 SemiBold tracking 0.1) `text-primary-600`
- **Menu Title**: `font-display font-bold text-title-md` (16/24 tracking 0.15) `text-neutral-700` (#6c7f9e)
- **Supporting text** (opcional): `text-body-sm text-neutral-700`

## Diferenças vs versão antiga
- **Hovered não é `bg-neutral-50`** — é `bg-black/8` (overlay translúcido).
- **Selected não é `bg-neutral-50`** — é `bg-secondary-50` (#aae6ff).
- **Label é Open Sans SemiBold**, não Bold.
- Label color é `text-primary-600`, NÃO `text-neutral-950`.
- Densidades são 56/48/40 (não 14/12/10 como eu tinha — confundi unidades).

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
