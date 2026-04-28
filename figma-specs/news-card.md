# News Card 2.0

**Figma:** [News Card 2.0 — `1709:7090`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1709-7090)
**Arquivo:** [`src/components/news-card.php`](../src/components/news-card.php)

Card de notícia — **card composto** que reusa Image (16:9), Categoria (style Mint Chip=Off), e Link Button como sub-elementos.

## Anatomia

```
<article> (group, flex)
  ├ <a> media → <img> com aspect-video rounded-sm
  └ content (flex-col gap-2)
     ├ Categoria (text-body-sm font-semibold text-mint)
     ├ headline <h3> (Aleo Bold, cor text-primary-600, group-hover:underline)
     ├ lead <p> (Open Sans Regular, text-neutral-900)
     └ author <p> "Por [Author Name]" (Link Button inline)
```

## Sizes × Orientations

| Size | Orient | Card W | Headline | Lead | Implementado |
|---|---|---|---|---|---|
| **Large** | V | 600 | `text-headline-md` (28px) | `text-body-lg` (16px) | ✅ |
| Medium | V | 392 | `text-title-xl` (22px) | `text-body-md` (14px) | ✅ |
| Small | V | 288 | `text-title-lg` (18px) | `text-body-md` (14px) | — |
| **Large** | H | 912 | `text-title-xl` (22px) | `text-body-md` (14px) | ✅ |
| Medium | H | 600 | `text-title-lg` (18px) | — | — |
| **Small** | H | 392 | `text-title-md` (16px) | — | ✅ |

> No showcase implementei **4 variants representativas** (Large V, Medium V, Large H, Small H). As outras seguem o mesmo padrão, Dev ajusta size + orientation.

## Cores fixas

| Elemento | Token | Hex |
|---|---|---|
| headline | `text-primary-600` | `#002244` |
| lead | `text-neutral-900` | `#3C4E69` |
| "Por" label | `text-neutral-900` | `#3C4E69` |
| Author link | `text-neutral-950` | `#283857` |
| Categoria default | `text-mint` | `#00786E` |

## Boolean props (Figma)

O Figma tem 4 booleans: `Image`, `Lead`, `Author`, `Categoria`. No código, Dev **remove o elemento inteiro** quando a prop é false — não há placeholder escondido. Markup enxuto.

## Decisões de design

- **Hover no headline** (`group-hover:underline`) + **image zoom sutil** (`group-hover:scale-105 transition-transform duration-500`). O Figma não declara efeito visual claro — ambos são interpretações idiomáticas de web (underline = link, zoom = engagement signal).
- **Horizontal card usa `shrink-0`** na imagem pra evitar que ela esmague quando o texto é longo. Content area usa `flex-1 min-w-0` pra permitir wrap.
- **`<h3>` com `<a>` dentro** (não o inverso) — o título é estruturalmente um heading, o link é só um wrapper. Mantém a hierarquia semântica.
- **Categoria é cor fixa por uso** — no Figma a prop `Style` (7 cores) existe mas aqui mostro só Mint como default. O Dev troca `text-mint` pela cor da editoria real (ver `categoria.md`).
