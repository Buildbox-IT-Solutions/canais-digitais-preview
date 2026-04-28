# Banner Download

**Figma:** [`925:11171`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=925-11171)
**Arquivo:** [`src/components/banner-download.php`](../src/components/banner-download.php)

Banner CTA pra download de material. **4 variantes**: `orientation (Horizontal|Vertical) × photo (false|true)`.

## Anatomia
Mesma estrutura do Banner Newsletter mas com botão "Acessar material" + download icon:

| Variante | BG | Width | Height |
|---|---|---|---|
| Vertical sem photo | gradient `from-primary-600 to-secondary-950` | w-300 | h-478 |
| Vertical com photo | `bg-primary-100` (#d4dae0) | w-300 | auto (Image 4:3 top) |
| Horizontal sem photo | gradient | w-704 | auto (com Informa Orbit decor) |
| Horizontal com photo | `bg-primary-100` | w-704 | auto (com Image 1:1 left) |

## Tipografia
- Vertical title: Aleo Bold `text-title-xl` (22/28)
- Horizontal sem photo title: Aleo Bold `text-headline-lg` (32/40)
- Horizontal com photo title: Aleo Bold `text-headline-md` (28/36)
- Description: `text-body-lg`
- Button label: "Acessar material" + download icon

## Decisões de design
- **REESCRITA COMPLETA**. Versão antiga era apenas um banner horizontal com thumb 3:4. Real são 4 variantes (V/H × photo).
- **Botão "Acessar material"** (não "Baixar PDF") com download icon. Botão inverso (bg-white text-primary-600) quando sem photo, normal (bg-primary-600 text-white) quando com photo.
- **Imagem é quadrada (1:1)** no horizontal com photo, e 4:3 no vertical com photo.
- **Width fixos**: 300 (vertical) ou 704 (horizontal).
- Decoração "Informa Orbit" omitida (SVG complexo).

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
