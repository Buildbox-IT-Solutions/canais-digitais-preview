# Webstories + img-frame

**Figma Webstories:** [`202:2100`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=202-2100)
**Figma img-frame:**  [`202:4047`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=202-4047)
**Arquivo:** [`src/components/webstories.php`](../src/components/webstories.php)

Card vertical estilo "stories" para uso em carrosséis. 2 variantes: `Enabled|Hovered`.

## Anatomia
- **Dimensões**: 320 × 569 (aspect ≈ 9:16, exatamente `aspect-[320/569]`)
- `rounded-sm overflow-hidden`
- **Layers absolute** dentro do container:
  1. `<img>` de fundo full
  2. Conteúdo overlay flex-col justify-between:
     - **Categoria container** top: `p-5`, contém Categoria chip ON (bg-white text-mint)
     - **Headline container** bottom: padding `px-5 py-4` com:
       - **Enabled**: bg sólido `bg-primary-600/70`
       - **Hovered**: gradient `bg-gradient-to-b from-primary-600/0 via-primary-600/70 to-primary-600`
       - Headline `font-display font-bold text-title-md` (16/24 tracking 0.15) `text-white`
       - Lead (apenas Hovered) `font-body text-body-md` (14/20) `text-white`
- **Hovered**: imagem com `scale-110` (zoom in)

## Decisões de design
- **Width corrigida 180 → 320** (era muito pequena).
- **Gradient corrigido** de `from-primary-950/90 via-primary-950/30 to-transparent` (preto mais opaco) para `from-primary-600/0 via-primary-600/70 to-primary-600` (azul institucional).
- **Enabled tem bg sólido**, NÃO gradient. Apenas Hovered usa gradient.
- **Lead aparece SOMENTE no Hovered** — Enabled tem só headline.
- **Categoria** é um partial `categoria` com `chip=on` (pill branco com texto mint).
- O `img-frame` é o subcomponente da imagem com zoom — coberto pela classe `scale-110` no Hovered.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
