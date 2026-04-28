# Section Title / Style 1 (+ Building Block Style 1)

**Figma Section Title:** [`552:9108`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=552-9108)
**Figma Building Block:** [`550:9155`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=550-9155)
**Arquivo:** [`src/components/section-title-style-1.php`](../src/components/section-title-style-1.php)

Título de seção com grafism decorativo: 3 bullets circulares + linha horizontal. Aleo Bold 28px (`text-headline-md`), max-w-screen-xl (1280px), padding-top 40 (`pt-10`).

Este arquivo cobre **dois component sets** do Figma que compartilham a mesma anatomia visual:
- **Section Title / Style 1** — 2 states × 9 colors = 18 variants
- **Building Block (Style 1)** — 3 boolean props (Uppercase, Logo, Sponsor) = 5 variants

## Cores (9)

| Color | Token class | Hex |
|---|---|---|
| Indigo | `text-primary-600` | `#002244` |
| Ultramarine | `text-secondary-950` | `#003CB2` |
| Sky | `text-secondary-500` | `#28B4FF` |
| Lavander | `text-lavander` | `#9423FC` |
| Coral | `text-coral` | `#FF547C` |
| Saffron | `text-saffron` | `#B05223` |
| Mint Dark | `text-mint` | `#00786E` |
| Carbon | `text-neutral-950` | `#283857` |
| White | `text-white` | `#FFFFFF` (requer bg escuro) |

## Building Block variants

| Variant | Como afeta o markup |
|---|---|
| **Uppercase=On** | Adiciona `uppercase` no `<h2>` |
| **Logo=On** | Brand slot (180×48) **substitui** o `<h2>` |
| **Sponsor=On** | Mantém o `<h2>` + adiciona "Patrocínio" label + brand slot à direita, tudo num `<div class="flex items-center gap-4">` |

## Bullets (descoberta do Figma)

Os 3 bullets do grafism **não são idênticos**: o primeiro tem opacity 100%, os dois seguintes têm **opacity 40%**. Isso cria uma hierarquia visual subtle (marcador principal + decoração) que eu inicialmente tinha perdido. Implementado via `bg-current opacity-40` nos 2º e 3º.

Todos os bullets são **círculos** (`rounded-full`) de 5×5px, não quadrados.

## Hover state

O Figma **não declara efeito visual** entre Enabled e Hovered — as duas variants têm properties idênticas (mesma cor, sem text-decoration, sem effects, sem opacity change). A diferença é só uma prototype interaction (`reactions: 1` no Enabled).

Para manter affordance de link e não inventar efeitos, implementei `hover:opacity-75 transition-opacity` no `<a>` root. Subtle, universal, compatível com qualquer cor, funciona em touch devices (onde hover pode não existir).

**Se o Dev quiser outro efeito** (underline, color shift, arrow icon revelado), é livre pra mudar — esse é só um default neutro.

## Brand slot

O Building Block usa um `.Brand / Slot` no Figma — placeholder 180×48 com `fill/stroke #8A38F5` (a cor Figma-editor-only que marca slots). No código, virou:

```html
<div class="inline-flex items-center justify-center w-[180px] h-12 rounded-sm border-2 border-current">
  <span class="inline-flex items-center justify-center max-h-10 max-w-[164px] font-body font-bold text-label-lg">LOGO</span>
</div>
```

**Dimensões:**
- **Slot externo**: 180×48 (container com border 2px da cor atual)
- **Área útil do logo**: `max-h-10` (40px) × `max-w-[164px]` — dá ~4px de respiro em cima/baixo (2px border + 2px slack do flex center) e 8px de respiro nas laterais

**Dev side** — substituir o `<span>` placeholder pelo logo real:

```html
<img src="logo-marca.svg" alt="Marca X" class="max-h-10 max-w-[164px] object-contain">
```

- `max-h-10` garante a altura máxima de 40px dentro do slot de 48px
- `max-w-[164px]` respeita a área útil horizontal
- `object-contain` evita distorção se a proporção do logo não bater

O `border-current` faz o placeholder herdar a cor do Section Title automaticamente.

## Estrutura canônica

```html
<a href="..." class="group block text-{cor} w-full pt-10 px-4 no-underline hover:opacity-75 transition-opacity">
  <div class="max-w-screen-xl mx-auto space-y-2">
    <div class="flex items-center gap-1 h-1.5">
      <div class="flex items-center gap-1">
        <span class="block size-[5px] rounded-full bg-current"></span>
        <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
        <span class="block size-[5px] rounded-full bg-current opacity-40"></span>
      </div>
      <div class="flex-1 h-px bg-current"></div>
    </div>
    <!-- Título | Brand slot | Título + Sponsor — depende da variant -->
  </div>
</a>
```
