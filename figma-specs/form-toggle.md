# Form Toggle

**Figma:** Canais Digitais 2.0 (spec derivada de `FEATURE-cadastro-etapa2.md §2.1`)
**Arquivo (showcase):** [`src/components/form-toggle.php`](../src/components/form-toggle.php)
**Arquivo (partial):** [`src/components/_partials/form-toggle.php`](../src/components/_partials/form-toggle.php)

Switch on/off estilo iOS/Material, usado em preferências com auto-save. Variantes: `state (Off|On) × availability (Default|Disabled) = 4`.

## Anatomia
- **Track**: 44×24 (`w-11 h-6`), `rounded-full`
  - Off: `bg-neutral-200`
  - On: `bg-secondary-950` (#003CB2 Ultramarine)
  - Disabled: `bg-neutral-100`
  - Transição: `transition-colors duration-200`
- **Thumb**: 20×20 (`size-5`), `rounded-full`, `bg-white`, `shadow-sm`
  - Posição off: `translate-x-0` (2px esquerda)
  - Posição on: `translate-x-5` (22px esquerda)
  - Transição: `transition-transform duration-200`
- **Label**: `font-body text-body-lg text-neutral-950`
- **Hint** (opcional): `font-body text-label-md text-neutral-500 mt-0.5`
- **Gap**: `gap-3` entre track e bloco de texto
- **Disabled**: `opacity-60` + `cursor-not-allowed` no `<label>`

## Markup
- `<input type="checkbox" class="sr-only peer">` esconde o nativo e controla o estado.
- Track muda de cor via `peer-checked:bg-secondary-950` e `peer-disabled:bg-neutral-100`.
- Thumb NÃO é alcançável por `peer-checked` (está aninhado no mesmo parent do track, não irmão do input) — a classe `translate-x-5` é sincronizada via JS (`cadastro-flow.js`).

## Props (`$args`)
| Prop | Tipo | Default | Obrig. |
|---|---|---|---|
| `id` | string | — | ✅ |
| `label` | string | — | ✅ |
| `hint` | string\|null | `null` | — |
| `checked` | bool | `false` | — |
| `disabled` | bool | `false` | — |

## Comportamento (auto-save)
1. Usuário clica → toggle muda visualmente (otimista).
2. JS escuta `change` no input, adiciona/remove `translate-x-5` no thumb.
3. Toast de sucesso: "Preferência salva." (via `showToast('success', ...)`).
4. Em caso de erro (simulado): reverter estado + toast de erro.

## Analytics
`data-analytics-event="preferencia_toggle"` no input.

## Decisões de design
- Cor ON é `secondary-950` (Ultramarine), **não** `primary-600`. Alinhado com checkboxes do DS.
- `shadow-sm` no thumb (Tailwind nativo), não token MD3 removido.
- Tamanho do track (44×24) e thumb (20×20) derivados da convenção Material 3 Switch, adaptados ao token de spacing base 4.
