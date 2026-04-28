# Tooltip

**Figma:** [`1859:19519`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1859-19519)
**Arquivo:** [`src/components/tooltip.php`](../src/components/tooltip.php)

Balão Material 3. 4 variantes: `side (Top|Right|Bottom|Left)`.

## Anatomia
- `bg-neutral-950` (#283857)
- `rounded-sm` (4px) — `--radii/component/xxs`
- `px-2 py-1` — `--padding/xs` × `--padding/xxs`
- Texto: `text-label-md` (12/16 SemiBold tracking 0.5), `text-white`
- **Arrow**: 11.5×5px CSS triangle na lateral oposta ao apontamento
  - Top: arrow no bottom apontando ↓
  - Bottom: arrow no top apontando ↑
  - Right: arrow no left apontando ←
  - Left: arrow no right apontando →

## Decisões de design
- Arrow tamanho corrigido: **8→5px height, 11.5px width**. As versões anteriores usavam `border-4` (8px) — o real é menor e mais sutil.
- CSS triangle via borders 0-side-width:
  - `border-l-[5.75px] border-r-[5.75px] border-t-[5px] border-l-transparent border-r-transparent border-t-neutral-950` (Top arrow)

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
