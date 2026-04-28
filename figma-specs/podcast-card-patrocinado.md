# Podcast Card 2.0 / Patrocinado

**Figma:** [`2359:15151`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2359-15151)
**Arquivo:** [`src/components/podcast-card-patrocinado.php`](../src/components/podcast-card-patrocinado.php)

Podcast Card patrocinado: BOX com border, estrutura idêntica ao News Card Patrocinado mas com PodcastImage (que tem play overlay) e Sponsor Line no lugar do podcast-meta.

## Anatomia
- **Container externo**: `bg-white border border-neutral-100 hover:border-secondary-950 rounded-sm overflow-hidden`
- **Padding interno**: `px-4 py-3 gap-2`
- **Categoria**: chip OFF (text mint inline)
- **Title**: Aleo Bold, sizes:
  - Large V 16:9: `text-headline-sm` (24/32)
  - Medium V 16:9 / H 16:9: `text-title-xl` (22/28)
  - Small H 1:1: `text-title-lg` (18/24)
- **Title color**: primary-600 → secondary-950 hover
- **Sponsor Line** no rodapé (substitui o podcast-meta)

## Diferenças vs Podcast Card 2.0
- Container border (não tinha)
- Sponsor Line em vez de podcast-meta (sem duração + autor)

## Composição via partials
- `_partials/thumbnail` (ratio video|square com play overlay)
- `_partials/categoria` (chip off mint)
- `_partials/sponsor-line`

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
