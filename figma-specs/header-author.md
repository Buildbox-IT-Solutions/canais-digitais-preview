# Header Author

**Figma:** [`850:5000`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=850-5000)
**Arquivo:** [`src/components/header-author.php`](../src/components/header-author.php)

Cabeçalho da página de autor (NÃO um cabeçalho de artigo). 4 variantes: `device (Desktop|Mobile) × verMais (false|true)`.

## Anatomia desktop
- `bg-primary-100` (#d4dae0) full width
- Inner `max-w-screen-xl flex items-start`:
  - **Avatar squared** 152×152 `rounded-sm` (NÃO circular!) com `py-6 px-4`
  - **Coluna nome/bio** flex-1:
    - "Author Name" → `font-display font-bold text-title-xl` (22/28) `text-primary-600`
    - "Role description" → `font-body text-body-md text-neutral-900`
    - Bio com `<button>` toggle "Ver mais"/"Ver menos" Bold no fim
  - **Coluna social** self-stretch:
    - "Siga nas Redes" → `font-body font-bold text-label-md text-neutral-700` uppercase
    - 3 icon buttons size-10 (Instagram, Twitter, Linkedin) em primary-600

## Anatomia mobile
- `bg-primary-100` w-375
- Header row com avatar squared 72×72 + nome (title-md tracking 0.15) + role (body-sm)
- Bio inline truncated com "Ver mais"
- Footer divider + social row horizontal: "Siga nas Redes" + 3 icon buttons size-8

## Decisões de design
- **Avatar é SQUARED** (rounded-sm), NÃO circular. A versão anterior usava partial avatar circular.
- **Background é primary-100** (#d4dae0) — cinza claro institucional, NÃO bg-white.
- "Author Name" é text-primary-600 (NÃO secondary-950 como o Author Summary do Author Carousel).
- Bio com toggle "Ver mais"/"Ver menos" — componente clicável que expande.
- Right column social usa "Siga nas Redes" como label, não share/bookmark icons como eu tinha antes.

## Diferenças vs versão antiga
- Era um Header de artigo com avatar circular + share/bookmark icons. Real é um Header de PÁGINA DE AUTOR com avatar squared grande, bio toggleável e social column.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
