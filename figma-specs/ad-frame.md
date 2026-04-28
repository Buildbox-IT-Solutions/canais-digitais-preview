# Ad Frame

**Figma:** [`30:5047`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=30-5047)
**Arquivo:** [`src/components/ad-frame.php`](../src/components/ad-frame.php)

Slots de publicidade. **7 variantes** (`device × type`):

| Variante | Dimensões |
|---|---|
| Desktop · 1224×245 | hero full-width responsive |
| Desktop · 970×250 | Billboard |
| Desktop · 970×90 | Super Leaderboard |
| Desktop · 728×90 | Leaderboard |
| Desktop · 300×600 | Half-page / Skyscraper |
| Desktop · 300×250 | Rectangle |
| Mobile · 360×142 | Mobile Banner |

## Anatomia
- Cada slot é apenas um placeholder com `border border-primary-100` (#d4dae0) `bg-neutral-50` + dimensões fixas
- Padding do container externo: `p-6` (desktop hero) ou `p-4` (sidebar)
- **NÃO tem rótulo "Publicidade"** no master — o slot real do tema fica só com a imagem do anúncio

## Decisões de design
- **REESCRITA**: tipos atualizados pra match com os 7 do Figma. Versão antiga listava 6 tamanhos genéricos (Mobile Square não existe; existe Mobile Banner 360×142).
- **Sem rótulo "Publicidade"** — eu havia adicionado por inferência (exigência legal BR), mas o master do Figma não tem.
- Border é `border-primary-100` (#d4dae0), NÃO `border-neutral-200`.
- Hero 1224×245 é responsivo (`flex-1` dentro de max-w-screen-xl), os outros são fixed.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
