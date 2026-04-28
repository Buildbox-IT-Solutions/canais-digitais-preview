# Video Card 2.0

**Figma:** [Video Card 2.0 — `1678:20955`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1678-20955)
**Arquivo:** [`src/components/video-card.php`](../src/components/video-card.php)

Idêntico ao News Card + overlay de **Play Button** no canto superior esquerdo da imagem.

## Anatomia

Igual ao News Card, mas o wrapper da imagem vira `relative` e ganha um `<div>` absoluto com o play button:

```html
<a class="relative block aspect-video ...">
  <img class="w-full h-full object-cover">
  <div class="absolute top-3 left-3 size-10 rounded-full bg-white flex items-center justify-center">
    <svg class="size-6 text-primary-600 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7L8 5z"/>
    </svg>
  </div>
</a>
```

## Play Button overlay

Reusa o **Play Button 2.0** — ver [`play-button.md`](./play-button.md) pra o markup canônico e os 24 variants completos.

Como o Play fica dentro de um `<a>` clicável (thumbnail), é renderizado como `<div>` em vez de `<button>` (nesting inválido), com `pointer-events-none` pra deixar o clique passar pro `<a>` pai.

Tamanho por card:
- Large/Medium/Small → `size-10 p-2`, ícone `size-6`, offset `top-3 left-3`
- XSmall → `size-8 p-1`, ícone `size-5`, offset `top-2 left-2`

Nada de `translate-x-0.5`: a path do Material `play_arrow_filled` já vem opticamente compensada.

No WP real:
```php
<?php get_template_part('components/play-button', null, ['size' => 'small', 'as' => 'div']) ?>
```

## Sizes × Orientations (14 variants Figma)

Video Card tem **1 size extra** vs News Card: `XSmall` (só horizontal).

| Size | Orient | Headline | Lead | Implementado |
|---|---|---|---|---|
| **Large V** | Vertical | 28px (headline-md) | 16px (body-lg) | ✅ |
| Medium V | Vertical | 22px (title-xl) | 14px (body-md) | — |
| Small V | Vertical | 18px (title-lg) | 14px (body-md) | — |
| Large H | Horizontal | 28px (headline-md) | 14px (body-md) | — |
| **Medium H** | Horizontal | 22px (title-xl) | 14px (body-md) | ✅ |
| Small H | Horizontal | 18px (title-lg) | — | — |
| **XSmall H** | Horizontal | 16px (title-md) | — | ✅ |

## Decisões de design

- **Play button inline** como SVG simples (triangle) — evita dependência de componente ainda não implementado. Estrutura match com o que o Figma mostra (40×40 bg-white com ícone primary-600 centrado).
- **Categoria default = "Vídeos"** no showcase (temático), mas o Dev troca pela categoria real.
- **Image zoom on hover** (`group-hover:scale-105`) é um sinal de "clique pra ver" universal em thumbnails de vídeo — combinado com o play button estático, reforça o affordance.
- **XSmall usa `leading-tight`** no headline pra empacotar 16px em 96px de altura total do card.
