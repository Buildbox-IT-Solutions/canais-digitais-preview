# Podcast Image

**Figma:** [`2279:20059`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2279-20059)
**Arquivo:** [`src/components/podcast-image.php`](../src/components/podcast-image.php)

Capa de podcast standalone (fora de card). 10 variantes: `size × ratio × state`.

## Sizes & Ratios
| size | ratio | dimensões |
|---|---|---|
| Large | 16:9 | 600 × 337.5 |
| Medium | 16:9 | 392 × 220.5 |
| Medium | 1:1 | 160 × 160 |
| Small | 1:1 | 128 × 128 |
| XSmall | 1:1 | 104 × 104 |

## States
- **Enabled**: imagem direto, SEM play overlay
- **Hovered**: imagem + Play overlay centralizado

## Play overlay sizes (apenas Hovered)
| podcast image | play size | padding | icon |
|---|---|---|---|
| Large 16:9 | XLarge | p-4 | size-10 (40) |
| Medium 16:9 | Large | p-4 | size-8 (32) |
| Medium 1:1 | Small | p-2 | size-6 (24) |
| Small 1:1 | Small | p-2 | size-6 |
| XSmall 1:1 | Small | p-2 | size-6 |

## Decisões de design
- **Play button bg semi-transparente**: `bg-white/80` (rgba(255,255,255,0.8)), NÃO `bg-white` sólido. Por isso o showcase usa SVG inline em vez do partial `play-button` (que usa bg-white sólido). Se for criada uma versão `as=overlay` no partial play-button, pode-se migrar.
- **Enabled NÃO tem play** — eu tinha antes (com overlay sempre visível). Errado.
- **Sizes 1:1 (Medium/Small/XSmall)** são quadrados literais (`size-[160px]`/`size-[128px]`/`size-[104px]`).
- **Sizes corrigidos**: a versão antiga tinha "XL 480, Large 240, Medium 160, Small 96" — todos errados. Real é por size+ratio (ver tabela acima).
- Sem caption ou legenda externa — o componente é apenas a imagem (com ou sem play).

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
