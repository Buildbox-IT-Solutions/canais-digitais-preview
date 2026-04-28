# Podcast Card 2.0

**Figma:** [Podcast Card 2.0 — `2283:2779`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2283-2779)
**Arquivo:** [`src/components/podcast-card.php`](../src/components/podcast-card.php)

Variante do card composto pra conteúdo de áudio. Mesma anatomia do News/Video Card mas com 3 diferenças:

## O que muda vs News/Video Card

1. **Headline 1 step menor**: Large V vem com `text-headline-sm` (24px), não `headline-md` (28px) — reflete a densidade típica de listagens de podcast.
2. **Prop `Ratio`** (nova): aspect da imagem pode ser `16:9` (horizontal) ou `1:1` (quadrada — layout tipo "capa de álbum").
3. **Meta line combinada**: em vez do "Por Author Name" simples, é `99h 99m • Por Author Name` (tempo + separador bullet + autor).
4. **Play Button overlay**: idêntico ao Video Card — reusa [`play-button.md`](./play-button.md). Como está dentro do `<a>`, é `<div>` + `pointer-events-none`.

## Estrutura da meta line

```html
<div class="flex items-center gap-2 text-body-md font-body font-semibold text-neutral-900">
  <span class="flex items-center gap-1">
    <span>99h</span>
    <span>99m</span>
  </span>
  <span aria-hidden="true">•</span>
  <span>Por <a class="text-neutral-950 font-bold hover:underline">Author Name</a></span>
</div>
```

- `aria-hidden="true"` no bullet: screen readers ignoram (é pura decoração)
- Hours e minutes em spans separados facilita localização (99h em EN vira 99hr, etc)

## Sizes × Ratios (12 variants Figma)

| Size | Orient | Ratio | Headline | Implementado |
|---|---|---|---|---|
| **Large V** | Vertical | 16:9 | `text-headline-sm` (24px) | ✅ |
| Medium V | Vertical | 16:9 | `text-title-lg` (18px) | — |
| **Medium H** | Horizontal | 16:9 | `text-title-xl` (22px) | ✅ |
| Medium H | Horizontal | 1:1 | `text-title-lg` (18px) | — |
| **Small H** | Horizontal | 1:1 | `text-title-lg` (18px) | ✅ |
| **XSmall H** | Horizontal | 1:1 | `text-title-md` (16px) | ✅ |

> O Figma tem todos os 12, showcase mostra 4 representativas cobrindo 16:9 e 1:1.

## Layout para Ratio 1:1

Quando `Ratio=1:1`, a imagem vira quadrada (`aspect-square` em vez de `aspect-video`). Card horizontal com thumbnail quadrada + conteúdo ao lado ficou **justificado ao centro verticalmente** (`justify-center` no content wrapper) pra ficar bem alinhado com a imagem.

## Decisões de design

- **Categoria default = "Podcasts"** no showcase.
- **Play button idêntico ao Video Card** — ambos herdam o mesmo affordance de "tocar" conteúdo de mídia.
- **Headline 24px em Large V** é a decisão mais notável — intencionalmente menor que News/Video pra caber 3 linhas em espaços mais apertados (listagens densas de episódios).
- **XSmall H tem meta simplificada**: juntei `99h 99m` num único `<span>` (sem sub-spans) pra economizar espaço no layout de 104px de altura.
