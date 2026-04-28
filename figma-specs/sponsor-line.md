# Sponsor Line + Sponsor Box + Sponsor Line (Widgets)

**Figma Sponsor Line:**   [`2676:8328`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2676-8328)
**Figma Sponsor Box:**    [`3862:28410`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3862-28410)
**Figma Widgets:**        [`2769:26021`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2769-26021)
**Arquivo:** [`src/components/sponsor-line.php`](../src/components/sponsor-line.php)
**Partial:** [`_partials/sponsor-line.php`](../src/components/_partials/sponsor-line.php)

Marcações de patrocínio. 3 versões com mesma anatomia interna:

## Sponsor Line (default)
- Container: `pt-3 gap-1 flex-col items-start w-[300px]`
- Linha 1: "Conteúdo Patrocinado" → `font-body font-semibold text-label-sm text-neutral-900` (Open Sans SemiBold 11/16 tracking 0.5)
- Linha 2: Company Name → `font-display font-bold text-title-md text-secondary-950` (Aleo Bold 16/24 tracking 0.15)
- 2 types: `Text` (mostra Company Name) | `Logo` (mostra brand image em slot 148/48)

## Sponsor Box
- Container: `bg-white p-2 rounded-sm w-[145px] flex flex-col gap-1 items-end justify-center`
- Logo variant: adiciona `h-[76px]`
- Mesmo conteúdo interno (texto Patrocinado + Company/Logo)
- Diferença: `items-end` (texto alinhado à direita) e dimensões fixas

## Partial
Criado o partial reutilizável `_partials/sponsor-line.php` (Text only) que é
usado pelos cards patrocinados (News/Video/Podcast Patrocinado). A versão
Logo e o Sponsor Box ficam apenas no showcase porque são menos reusáveis.

## Decisões de design
- "Conteúdo Patrocinado" texto é **`text-label-sm`** (11px) `text-neutral-900` (#3c4e69) — eu tinha antes como `text-label-sm uppercase tracking-wider text-neutral-700` (errado).
- Company Name é **Aleo Bold** title-md (`font-display`), NÃO um label de uppercase. É um Link Button que vai pra página do patrocinador.
- Sponsor Line (padrão) tem `pt-3` (espaçamento separador acima) — geralmente embutido dentro de um container que continua a partir desse padding.
- A versão Widgets (`2769:26021`) é apenas o `Sponsor Line` posicionado dentro de um widget — coberta pela versão default.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
