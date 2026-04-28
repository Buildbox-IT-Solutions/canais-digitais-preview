# Play Button 2.0

**Figma:** [Play Button 2.0 — `2279:19957`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2279-19957)
**Arquivo:** [`src/components/play-button.php`](../src/components/play-button.php)

Pill circular branca com ícone Play ou Pause centralizado. Usado como overlay de reprodução em thumbnails de vídeo e podcast.

## Sizes

| Size | Container | Padding | Icon container | Tailwind |
|---|---|---|---|---|
| XLarge | 72×72 | 16px | 40×40 | `size-18 p-4` + `size-10` icon |
| Large | 64×64 | 16px | 32×32 | `size-16 p-4` + `size-8` icon |
| Medium | 48×48 | 12px | 24×24 | `size-12 p-3` + `size-6` icon |
| Small | 40×40 | 8px | 24×24 | `size-10 p-2` + `size-6` icon |

> Nota: Medium e Small têm o **mesmo ícone** (24×24) mas container diferente (48 vs 40) e padding diferente (12 vs 8). No Small o ícone chega mais perto das bordas.

## Estados (diferente do Button [1.1])

**Hover no Play Button muda só a COR DO ÍCONE** — o background permanece branco. Isso é oposto ao Button [1.1] onde o bg muda.

| State | bg | ícone |
|---|---|---|
| Enabled | `bg-white` | `text-primary-600` (#002244) |
| Hovered | `bg-white` | `text-secondary-950` (#003CB2) |
| Disabled | `bg-neutral-200` (#C2C7CF) | `text-white` |

Implementado com:
```
bg-white text-primary-600
hover:text-secondary-950
disabled:bg-neutral-200 disabled:text-white disabled:cursor-not-allowed
```

O SVG usa `fill="currentColor"` pra herdar a cor do button automaticamente.

## Ícones (Material style, inline)

```
Play  → <path d="M8 5v14l11-7L8 5z"/>
Pause → <path d="M6 5h4v14H6zM14 5h4v14h-4z"/>
```

Ambos em `viewBox="0 0 24 24"`. Material icons estão opticamente centralizadas nesse viewBox — **não precisa de `translate-x-0.5`** pro Play (o triângulo já vem com compensação óptica na path).

## Uso em cards (overlay sobre imagem)

Quando o Play Button é usado DENTRO de um `<a>` clicável (caso do Video Card e Podcast Card), ele **não pode ser um `<button>`** — nesting de elementos interativos é HTML inválido. Trocar por um `<div>` com as mesmas classes visuais:

```html
<a href="/video/..." class="relative block ...">
  <img ...>
  <div class="absolute top-3 left-3 inline-flex items-center justify-center rounded-full bg-white text-primary-600 size-10 p-2 pointer-events-none">
    <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
  </div>
</a>
```

Pontos:
- `<div>` em vez de `<button>` (não interativo, só visual)
- `pointer-events-none` pra garantir que cliques passem direto pro `<a>` pai
- Sem `hover:` / `disabled:` classes (o hover do card é tratado no `<a>` pai via `group-hover:`)
- Posicionamento `absolute top-3 left-3` pro Medium/Large/Small size-10 e `absolute top-2 left-2` pro XSmall size-8

Quando o Dev integrar no WP real, usar:
```php
<?php get_template_part('components/play-button', null, ['size' => 'small', 'as' => 'div']) ?>
```

com a partial aceitando `as` pra decidir entre `<button>` e `<div>`.

## Decisões de design

- **`bg-white` fixo** — diferente dos outros Buttons que trocam bg no hover. A metáfora aqui é "media control overlaid on image" — o branco contrasta com qualquer imagem atrás.
- **Hover muda só o ícone** — sinal discreto de interação sem mudar o peso visual do botão sobre a mídia.
- **`currentColor` no SVG** — padrão usado em todos os buttons do projeto, permite o controle via `text-*`.
- **Sem `translate-x-0.5`** — Material icons já vêm balanceadas. Se alguma variant parecer off-center, o problema é na path do SVG, não na classe CSS.
