# Dropdown Menu

**Figma:** [`1859:23264`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1859-23264)
**Arquivo:** [`src/components/dropdown-menu.php`](../src/components/dropdown-menu.php)

Menu suspenso Material 3. **3 variantes**: `density (0|-2|-4)`.

## Anatomia
- Container: `bg-neutral-50` (#e9eaec) `flex items-start py-2 rounded-sm shadow-elevation-2 w-[200px]`
- 12+ menu list items SEM leading/trailing/divider
- Item Selected: `bg-secondary-50` (#aae6ff)
- Hover items: `bg-black/8`

## Density
| density | item height |
|---|---|
| 0   | h-56 |
| -2  | h-48 |
| -4  | h-40 |

## Decisões de design
- **BG corrigido**: `bg-neutral-50` (#e9eaec = Cloud), NÃO `bg-white`. Sem border.
- **Selected color**: `bg-secondary-50` (#aae6ff = Arctic), NÃO bg-secondary-50 manual.
- **Sem icons** ou checkmark trailing — items são apenas labels.
- Versões anteriores (com icons + checkmark + dividers) eram inferências erradas.
- O componente é simples: lista vertical de menu items com 1 selected destacado.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
