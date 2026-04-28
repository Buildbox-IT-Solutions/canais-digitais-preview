# Link Button

**Figma:** [Link Button — `662:11195`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=662-11195)
**Arquivo:** [`src/components/link-button.php`](../src/components/link-button.php)

CTA tipo link — só texto, sem fundo nem borda. 4 tamanhos × 3 estados. Hover acrescenta `underline` + cor mais clara; disabled remove o sublinhado.

| Size | font-family | classe |
|---|---|---|
| XLarge | Aleo (`font-display`) | `text-title-xl` (22/28) |
| Large | Aleo (`font-display`) | `text-title-lg` (18/24) |
| Medium | Aleo (`font-display`) | `text-title-md` (16/24) |
| Small | Open Sans (`font-body`) | `text-label-lg` (14/20) |

| State | text color | decoration |
|---|---|---|
| Enabled | `secondary-950` (#003CB2) | none |
| Hovered | `secondary-900` (#0051C9) | `underline` |
| Disabled | `primary-100` (#D4DAE0) | `no-underline` |

**Decisões de design:**
- Renderizado como `<a>` por padrão (é o uso canônico de "link button"). Para ações sem navegação, troca para `<button>` mantendo todas as classes.
- Apenas o Small muda de família (Aleo → Open Sans). É intencional do DS — Aleo é a serif editorial usada em CTAs grandes; Open Sans entra em UI menor.
- `font-bold` é aplicado explicitamente porque os tokens `text-title-*` definem só size/line-height/letter-spacing — peso é decisão do componente.
