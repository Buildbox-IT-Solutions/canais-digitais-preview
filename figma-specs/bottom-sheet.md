# Bottom sheet

**Figma Sheet:**   [`3190:48964`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3190-48964)
**Figma Content:** [`3190:49404`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3190-49404)
**Arquivo:** [`src/components/bottom-sheet.php`](../src/components/bottom-sheet.php)

Bottom sheet Material 3. Do [M3 spec](https://m3.material.io/components/bottom-sheets/overview):

> "Bottom sheets are surfaces containing supplementary content, anchored to the bottom of the screen."

## Anatomia (do Figma)
- **Dimensões**: 412×480 (w × h)
- `rounded-t-2xl` (16px apenas nos cantos superiores)
- `bg-white`
- **Shadow**: Elevation/3 (umbra 0/1/3 30% + penumbra 0/4/8 15%) → `shadow-elevation-3`
- **Header container**: `p-4`, centraliza drag handle
- **Drag handle**: `bg-neutral-950` (#283857) `w-8 h-1 rounded-full` — opcional via `showDragHandle` prop
- **Content slot**: `h-[444px] w-full` — VAZIO no component master

## Props do Figma
- `modal` (bool): se true, adiciona Scrim atrás (bg `#050708` opacity 32%) e centraliza o sheet verticalmente (translate -50%)
- `showDragHandle` (bool): mostra/esconde o drag handle

## Decisões de design
- **Master é um wrapper vazio** — NÃO tem título, close button, content pré-definido ou action buttons. Aquela versão inicial que criei com "Filtrar por" + tags + buttons era uma suposição de uso, não o componente real.
- **Drag handle cor**: `bg-neutral-950` (#283857 = Carbon), NÃO `neutral-300` como eu tinha. É um drag handle escuro pra contrastar com o bg branco.
- **Shadow elevation-3**, NÃO elevation-4. O M3 spec usa elevation-3 pra sheets.
- **Scrim** no modal usa `bg-primary-950` (#050708) com `opacity-[.32]` cobrindo a viewport `inset-[-420px_-40px_0_-40px]`.
- O showcase mostra 4 variantes: default, sem drag handle, modal (com scrim), e um "exemplo de uso" com conteúdo preenchido pra demonstrar como o slot seria usado num filtro de editorias.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 5. Drag handle cor corrigida (neutral-300 → neutral-950), shadow corrigido (4 → 3), título/close/content/footer removidos (não existem no master), scrim modal adicionado.
