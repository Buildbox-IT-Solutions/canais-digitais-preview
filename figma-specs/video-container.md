# Video Container

**Figma:** [`872:7575`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=872-7575)
**Arquivo:** [`src/components/video-container.php`](../src/components/video-container.php)

Player de vídeo embedado. Componente único, sem variantes.

## Anatomia
- **Dimensões**: 704 × 396 (≈ 16:9), `rounded-sm`, `overflow-hidden`
- **Background**: imagem (no tema real, substituir por `<iframe>` ou `<video>`)
- **Play Button XLarge centralizado**: estilo INVERTIDO em relação ao partial padrão
  - `bg-primary-600` + `text-white` (NÃO `bg-white` + `text-primary-600` como o partial)
  - `p-4` + `size-10` icon
- **Video Time pill** absolute bottom-right:
  - `bg-primary-600/80` (#024 com 80% opacity)
  - `px-2 py-1 rounded-sm`
  - "99:99:99" → `text-white text-label-md` (12/16 SemiBold tracking 0.5)

## Decisões de design
- **Play button INVERTIDO**: bg primary-600 sólido + texto branco. Diferente de todos os outros lugares onde o play é branco com texto azul. Provavelmente porque o video container é sempre sobre uma imagem grande/escura, e o azul sólido tem mais contraste que o branco semi-transparente.
- **Video Time pill** é específico desse componente — não existe em VideoImage nem em cards.
- Removi o `<figcaption>` que eu tinha adicionado — não existe no master.
- **NÃO usa partial play-button** — bg invertido não é coberto pelo partial atual.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
