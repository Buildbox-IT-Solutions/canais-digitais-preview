# Banner Newsletter

**Figma:** [`1188:11621`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1188-11621)
**Arquivo:** [`src/components/banner-newsletter.php`](../src/components/banner-newsletter.php)

Banner de inscrição em newsletter. **4 variantes**: `device (Desktop|Mobile) × photo (false|true)`.

## Anatomia
- **Sem photo**: `bg-gradient-to-b from-primary-600 to-secondary-950` com decoração "Informa Orbit" no canto direito (omitida — SVG path complexo). Texto branco. Botão `bg-white text-primary-600` (inverso).
- **Com photo**: `bg-primary-100` (#d4dae0). Imagem 3:2 à esquerda (desktop) ou em cima (mobile). Texto `text-primary-600`. Botão `bg-primary-600 text-white` (normal).

## Dimensões
| Variante | Width | Height |
|---|---|---|
| Desktop sem photo | max-w-screen-xl | auto |
| Desktop com photo | max-w-screen-xl (com Image 3:2 left) | auto |
| Mobile sem photo | w-360 | h-570 |
| Mobile com photo | w-360 stacked | auto |

## Tipografia
- Title: Aleo Bold `text-display-sm` (36/44) desktop / `text-headline-sm` (24/32) mobile
- Description: Open Sans Regular `text-body-lg` (16/24)
- Button label: Open Sans Bold `text-body-lg`

## Decisões de design
- **REESCRITA COMPLETA**. Versão antiga era apenas 2 variantes (light/dark). Real é 4 variantes com gradient ou photo.
- **Gradient é from-primary-600 to-secondary-950**, NÃO bg-secondary-50.
- **Botão inverso** quando sem photo (white bg pra contraste com gradient escuro).
- **Imagem com photo** é 3:2 ratio, não retrato.
- Decoração "Informa Orbit" no canto omitida (precisa de SVG paths complexos do brand kit).

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
