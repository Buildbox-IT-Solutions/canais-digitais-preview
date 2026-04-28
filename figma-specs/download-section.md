# Download Section

**Figma:** [`1135:18229`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1135-18229)
**Arquivo:** [`src/components/download-section.php`](../src/components/download-section.php)

Hero CTA full-width pra download de material. **6 variantes**: `device (Desktop|Mobile) × position (Left|Right|Up|Center|Down)`.

## Anatomia
Container full bleed (w-1920 desktop / w-360 mobile) com:
1. **Background image** absolute fill
2. **Gradient overlay** sutil (`bg-black/20`)
3. **Container glassmorphism** central com:
   - `bg-white/80 rounded-sm gap-6 p-8` (desktop) / `gap-4 p-6` (mobile)
   - Width: w-600 (desktop left/right) / max-w-808 flex-1 (desktop center) / flex-1 max-w-704 (mobile)
   - Conteúdo interno:
     - **Categoria chip** "Download" → `bg-white px-2 py-1 rounded-sm` text-primary-600 label-md
     - **Título** → `font-display font-bold` text-primary-600
       - Desktop: `text-display-sm` (36/44)
       - Mobile: `text-headline-sm` (24/32)
     - **Description** → `font-body text-body-lg` text-primary-600
     - **Button filled primary-600** com download icon + label "Baixar agora"

## Position prop (desktop)
- `Left`: container glass alinhado à esquerda
- `Right`: alinhado à direita
- `Center`: centralizado, max-w-808 (mais largo)

## Position prop (mobile)
- `Up`: container glass no topo
- `Center`: centralizado verticalmente
- `Down`: no rodapé

## Decisões de design
- **REESCRITA COMPLETA**. A versão antiga era um Section Title + grid de 3 cards de download separados. Real é um único hero glassmorphism com CTA.
- **Glassmorphism**: container `bg-white/80` (semi-transparente) sobre imagem de fundo escura. Padrão moderno de hero.
- **Botão usa ícone download** customizado (não está no enum do partial icon-button). Usado inline.
- Title sizes: display-sm desktop (36px) é grande pra ser hero impact.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
