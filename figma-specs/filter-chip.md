# Filter chip

**Figma:** [Filter chip — `1859:18460`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1859-18460)
**Arquivo:** [`src/components/filter-chip.php`](../src/components/filter-chip.php)

Material 3 Filter Chip. Pill `h-8` rounded-full com 4 props (Configuration × State × Selected × Trailing icon = 48 variants). Implementado como `<button>` com `aria-pressed` controlando o estado selected.

| Configuração | padLeft | padRight | Classes |
|---|---|---|---|
| Label only, no trailing | 16 | 16 | `pl-4 pr-4 aria-pressed:pl-2` |
| Label only, with trailing | 16 | 8 | `pl-4 pr-2 aria-pressed:pl-2` |
| Label & leading, no trailing | 8 | 16 | `pl-2 pr-4` |
| Label & leading, with trailing | 8 | 8 | `px-2` |

> Regra Material 3 (igual ao Button [1.1]): se tem ícone de um lado, reduz o padding daquele lado de 16 pra 8. Nas variants "Label only", o `aria-pressed:pl-2` garante que o chip morfa automaticamente quando selected — porque o checkmark que aparece age como um leading icon.

| State (não selected) | bg | border |
|---|---|---|
| Default | white | `border-neutral-100` |
| Hover / Active / Focus | `bg-neutral-50` | mesma border |
| Disabled | white | `border-neutral-100` + `opacity-50` |

| Selected | bg | border | text |
|---|---|---|---|
| Sempre | `bg-secondary-50` (#AAE6FF) | `border-transparent` | `text-primary-600` |

**Decisões de design:**
- **`aria-pressed` é a source of truth.** Tailwind v4 permite reagir via `aria-pressed:` (root) e `group-aria-pressed:` (descendentes). Sem variants separadas no markup.
- **Checkmark M3**: quando selected, o leading icon vira ✓. Implementado com 2 SVGs onde um esconde via `group-aria-pressed:hidden` e o outro aparece via `hidden group-aria-pressed:inline`.
- **Estados do Figma → CSS**:
  - `Hovered` → `:hover`
  - `Focused` → `:focus-visible` (com outline secondary-500)
  - `Pressed` → `:active`
  - `Dragged` → não implementado (fora do escopo de chip web)
  - `Disabled` → `:disabled` com `opacity-50`
- **Trailing icon** é independente da seleção — mostra sempre quando presente no markup. Tipicamente um chevron pra dropdown ou um X pra remover.
- O ícone leading e o checkmark usam `size-[18px]` (arbitrary value, sem token equivalente).
