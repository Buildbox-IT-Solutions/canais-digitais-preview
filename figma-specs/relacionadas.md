# Relacionadas

**Figma:** [`3104:53873`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3104-53873)
**Arquivo:** [`src/components/relacionadas.php`](../src/components/relacionadas.php)

Bloco "Relacionado" — lista de Link Buttons textuais com ícone "+" antes de cada item. **NÃO é uma lista de news cards thumbnails.**

## Anatomia
Container `flex flex-col items-start rounded-sm w-[702px]`:

1. **Top header** `flex pb-2 pt-4`:
   - Inner `flex flex-col gap-2 items-start`:
     - `bg-primary-600 h-0.5` (bar grossa primary-600)
     - "Relacionado" → `font-display font-bold text-title-md text-primary-600`
   - `flex-1 h-px bg-neutral-100` (divider à direita do título)

2. **List** `flex flex-col gap-2 py-2`:
   - Cada item: `flex gap-2 items-start`
     - `<svg add 24>` text-secondary-950 (ícone "+" plus)
     - Link Button text-secondary-950 Aleo Bold:
       - Desktop: `text-title-lg` (18/24)
       - Mobile: `text-title-md` (16/24 tracking 0.15)

3. **Bottom divider** `flex pb-4 pt-2`:
   - `flex-1 h-px bg-neutral-100`

## Decisões de design
- **REESCRITA COMPLETA**. A versão antiga usava partials `section-title` + `thumbnail` + `categoria` — TODOS errados. O componente real é uma lista textual simples sem thumbnails.
- Bar primary-600 sólida (`h-0.5`) acima do título "Relacionado" — não é o grafism de bullets do section-title.
- Items são links com ícone "+" plus à esquerda, NÃO cards com imagem.
- A divider continua à direita do título "Relacionado" pra preencher a linha.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
