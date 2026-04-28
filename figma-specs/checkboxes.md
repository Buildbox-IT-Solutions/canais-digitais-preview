# Checkboxes

**Figma:** [Checkboxes `1944:7508`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1944-7508)
**Arquivo:** [`src/components/checkboxes.php`](../src/components/checkboxes.php)

Checkbox Material 3 (M3 spec). 15 variantes: `type (Unselected|Selected|Indeterminate) × state (Enabled|Hovered|Focused|Pressed|Disabled)`.

## Anatomia
- **Container**: 18×18 (`size-[18px]`), `rounded-xs` (2px)
- **Border** (Unselected): `border-2 border-neutral-950` (#283857)
- **BG** (Selected/Indeterminate): `bg-secondary-950` (#003cb2)
- **BG Disabled+Selected/Indeterminate**: `bg-neutral-950` (#283857)
- **State-layer chip** (Hovered/Focused/Pressed): wrapper 42×42 com `rounded-full bg-black/8` (rgba(0,0,0,0.08))
- **Disabled**: `opacity-[.38]`
- **Pressed**: ripple effect (omitido — animação custom não disponível em PHP estático)
- **Check icon**: 24×24 SVG do Material Icons `check_small` posicionado absolute centralizado no container 18×18 (offset -3px)
- **Indeterminate icon**: 24×24 horizontal bar (`check_indeterminate_small`)

## Cores
- Border default: `neutral-950` (#283857)
- BG selected: `secondary-950` (#003cb2 = Ultramarine)
- BG selected disabled: `neutral-950`
- Check icon color: `white`
- State layer: `bg-black/8` (rgba(0,0,0,0.08))

## Decisões de design
- Tamanho do square corrigido: **20→18** (`size-[18px]`).
- State-layer chip de 42×42 (`p-3` em volta) é o que aumenta a área de toque sem aumentar o checkbox visualmente.
- BG selected é `secondary-950` (Ultramarine), NÃO `primary-600` como eu tinha antes.
- BG disabled-selected é `neutral-950` (Carbon), NÃO opacity-50 do filled.
- Pressed state mostra um ripple no Figma — aqui simplificado (sem animação).

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
