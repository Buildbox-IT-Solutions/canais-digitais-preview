# Video Image 2.0

**Figma 2.0:**    [`2790:25832`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2790-25832)
**Figma legacy:** [`1678:21003`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1678-21003)
**Arquivo:** [`src/components/video-image.php`](../src/components/video-image.php)

Capa 16:9 de vídeo standalone. 8 variantes: `size (Large|Medium|Small|XSmall) × state (Enabled|Hovered)`.

## Sizes (16:9)
| size | dimensões |
|---|---|
| Large | 600 × 337.5 |
| Medium | 392 × 220.5 |
| Small | 288 × 162 |
| XSmall | 160 × 90 |

## States
- **Enabled**: imagem direto, sem play
- **Hovered**: imagem + Play overlay centralizado (NÃO no canto)

## Play overlay sizes (Hovered)
| size video | play size | padding | icon |
|---|---|---|---|
| Large | XLarge | p-4 | size-10 |
| Medium | Large | p-4 | size-8 |
| Small | Medium | p-3 | size-6 |
| XSmall | Small | p-2 | size-6 |

## Decisões de design
- **Play overlay é CENTRALIZADO** (não no canto superior esquerdo como a versão antiga). O canto é onde fica nos cards (que usam `_partials/thumbnail` com play=small absolute).
- **Play button bg `bg-white/80`** semi-transparente, inline (não partial) pelos mesmos motivos do Podcast Image.
- **Enabled NÃO tem play** — só Hovered.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
