# Author Summary

**Figma:** [`791:8418`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=791-8418)
**Arquivo:** [`src/components/author-summary.php`](../src/components/author-summary.php)

Card resumido do autor (usado em listas e carrosséis). 4 variantes: `device (Desktop|Mobile) × opened (false|true) × about × social`.

## Anatomia
Container `bg-white border border-primary-100 rounded-sm`:
- Desktop: `max-w-704 min-w-496 w-704`
- Mobile: `max-w-408 min-w-288 w-343`

### Header
- `flex items-start justify-between w-full`
- Avatar **squared** rounded-sm (`size-80` desktop / `size-72` mobile) com `p-4`
- Container nome/role flex-1:
  - Linha "Por" + "Author Name":
    - "Por" → `font-display font-bold text-title-lg` (desktop) ou `text-title-md` (mobile) `text-neutral-700` (#6c7f9e)
    - Author Name → mesmo size mas `text-secondary-950` (Link Button)
  - Role description → `text-body-md` (desktop) ou `text-body-sm` (mobile) `text-neutral-900`

### About (toggle "Ver mais")
- `flex flex-col items-start pb-4 px-4 w-full`
- `<button>` com paragrafo body-md text-neutral-900
- Closed: truncated com "..." + "Ver mais" Bold
- Opened: texto completo + "Ver menos" Bold

### Social
- Divider neutral-100
- `flex gap-4 items-center justify-end px-4 py-2`
- "Siga nas Redes" → `font-body font-bold text-label-md text-neutral-700` uppercase
- 3 icon buttons size-8 (Linkedin, Twitter, Instagram) text-primary-600

## Decisões de design
- **Avatar é SQUARED** rounded-sm (size 80 desktop / 72 mobile), NÃO circular.
- **Author Name é text-secondary-950** (Link Button color), "Por" é text-neutral-700.
- **Background é primary-100** (#d4dae0) — mas o border do card é primary-100 também.
- **Footer NÃO é "Ver todos os artigos"** como eu tinha antes — é "Siga nas Redes" + 3 social icons.
- O componente é a unidade reusável usada também pelo Authors Carousel.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
