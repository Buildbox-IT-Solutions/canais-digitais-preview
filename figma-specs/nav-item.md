# Nav Item

**Figma:** [`121:2360`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=121-2360)
**Arquivo:** [`src/components/nav-item.php`](../src/components/nav-item.php)

Item de navegação horizontal usado dentro do nav-list pill do Header. **4 variantes**: `state (Enabled|Hovered) × dropdown (false|true)`.

## Anatomia
- Container: `flex flex-col items-center` (com `bg-primary-100` quando hovered)
- Inner: `flex items-center min-h-8 pb-2 pt-3 px-3` (gap-1 + pl-3 pr-2 quando dropdown=on). `min-h-8` em Tailwind v4 = 32px.
- **Label**: `font-body font-bold text-label-lg` (14/20 Bold tracking 0.1)
  - Enabled: `text-primary-600`
  - Hovered: `text-secondary-950`
- **Chevron** (apenas dropdown):
  - Enabled: `arrow_drop_down` (size 20)
  - Hovered: `arrow_drop_up` (size 20)
- **Bottom line**: `flex flex-col h-1 px-3 w-full`
  - Hovered fill: `bg-secondary-950`
  - Enabled: transparent
- **Dropdown menu** (apenas Hovered+dropdown): absolute below, é um Dropdown Menu density -4

## Decisões de design
- **NÃO há variant Disabled nem Active** — apenas Hovered. Hovered atua como current/selected visualmente.
- **Hover muda o BG do container inteiro** para `bg-primary-100` (#d4dae0), não apenas a cor do texto.
- **Bottom line é `bg-secondary-950`** (Ultramarine) sólido h-1, NÃO `border-b-2`.
- Hovered+dropdown mostra o Dropdown Menu absolute below com submenu items.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
