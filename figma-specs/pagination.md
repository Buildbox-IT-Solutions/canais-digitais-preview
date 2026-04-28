# Pagination + page-item

**Figma Pagination:** [`4541:15460`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=4541-15460)
**Figma page-item:**  [`1510:22852`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1510-22852)
**Arquivo:** [`src/components/pagination.php`](../src/components/pagination.php)

Paginação com 2 layouts radicalmente diferentes via prop `device`:

## Desktop
`flex items-center justify-center p-4`:
1. Icon Button **prev** ghost (size-24 icon, p-2 → 40×40)
2. Sequência de page-items: 1 (selected) · 2 · 3 · 4 · ... · 99
3. Icon Button **next** ghost

## Mobile
`flex items-center justify-center gap-6 p-4 w-[320px]`:
1. Icon Button **prev** com ícone MAIOR (size-32 — `size-8`)
2. Texto "{page} de {total}":
   - `1` → `text-primary-600 font-bold`
   - `de` → `text-neutral-700` (#6c7f9e) `font-semibold`
   - `99` → `text-neutral-700 font-semibold`
3. Icon Button **next** size-32

## page-item (4 estados)
- **40×40** (`size-10`), `rounded-full`, `p-2`
- **Selected**: `border border-primary-600 text-primary-600 font-bold`
- **Default**: `text-neutral-900` (#3c4e69) `font-bold`
- **Hover**: `bg-neutral-50`
- **Disabled**: `text-neutral-300 cursor-not-allowed`
- Tipografia: `text-label-lg` (14/20 Open Sans Bold tracking 0.1)

## Decisões de design
- **Mobile não tem números individuais** — só o "1 de 99". Era assim que eu tinha errado antes (mostrei numbers + chevrons no mobile).
- **page-item selected** usa `border` (não `bg-primary-600` filled) — minha versão antiga tinha o background preenchido.
- Default text color é `neutral-900` (slate), não `primary-600` como eu tinha antes.
- Mobile prev/next icons são MAIORES (size-32 = `size-8`), os do desktop são size-24 (`size-6`).

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
