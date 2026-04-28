# Button [1.1]

**Figma:** [Button [1.1] — `3185:47973`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3185-47973)
**Arquivo:** [`src/components/button.php`](../src/components/button.php)

Botão pill (`rounded-full`), Open Sans Bold. 81 variants do Figma colapsadas em **3 tipos × 3 tamanhos**, com `state` (hover/disabled) implementado por pseudo-classes CSS — não por variant separada.

| Tipo | Enabled | Hover | Disabled |
|---|---|---|---|
| **Filled** | `bg-primary-600` text-white | `bg-secondary-950` | `bg-neutral-200` |
| **Outlined** | border 1.5px `primary-600`, text `primary-600` | + `bg-neutral-50` | border+text `neutral-200` |
| **Ghost** | text `primary-600`, sem fundo | `bg-neutral-50` | text `neutral-200` |

| Size | h | gap | text | icon | no-icon | icon-left | icon-right |
|---|---|---|---|---|---|---|---|
| Large | 12 | 3 | `body-lg` | `size-6` | `px-6` | `pl-5 pr-6` | `pl-6 pr-5` |
| Medium | 10 | 2 | `body-lg` | `size-6` | `px-6` | `pl-4 pr-5` | `pl-5 pr-4` |
| Small | 8 | 2 | `title-sm` | `size-5` | `px-3` | `pl-3 pr-4` | `pl-4 pr-3` |

> O Figma compensa o peso visual do ícone reduzindo o padding daquele lado. As três sizes têm comportamentos diferentes — não dá pra usar um único `px-N` parametrizado. O Dev troca a classe de padding quando adiciona/remove ícone.

**Decisões de design:**
- Estados (hover/disabled) viram pseudo-classes (`hover:`, `disabled:`), não classes adicionais. O Dev passa só `[type] [size]` e o resto é automático.
- Border do Outlined usa `border-[1.5px]` (valor exato do Figma) — Tailwind não tem token nativo de 1.5px e o Figma é específico nessa medida. Único arbitrary value justificado.
- Ícones são SVGs inline no markup (currentColor), não font-icons — facilita troca de cor automática nos estados.
- A propriedade `Icon swap` do Figma (instance swap de 7 ícones diferentes) é resolvida no Dev side: o Dev troca o `<svg>` pela arte que precisar.
