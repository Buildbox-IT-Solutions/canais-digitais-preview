# Password Strength

**Figma:** — (sem nodeId; derivado de [FEATURE-cadastro.md §4.3 e §6.3](../FEATURE-cadastro.md))
**Arquivo:** [`src/components/password-strength.php`](../src/components/password-strength.php)
**Partial:** [`src/components/_partials/password-strength.php`](../src/components/_partials/password-strength.php)

Indicador de força de senha em tempo real. 3 segmentos de barra horizontal + label textual ("Fraca" / "Média" / "Forte"). Usado no Bloco 2 do cadastro e na redefinição de senha.

**Níveis (regra de validação):**
| Nível | Regra | Cor |
|---|---|---|
| `empty` | campo vazio | `bg-neutral-100` / sem label |
| `weak` | só letras OU só números | `#DC2626` |
| `medium` | letras + números, < 12 chars | `#F59E0B` |
| `strong` | letras + números, 12+ chars | `#16A34A` |

**Anatomia:**
- 3 divs `h-1 rounded-full flex-1` lado a lado com `gap-1`.
- Cada segmento pintado conforme `fills` do nível (1/2/3 segmentos preenchidos).
- Label `text-label-md` abaixo, com `min-h-[1rem]` para evitar shift de layout quando vazio.

**A11y:**
- `role="progressbar"` com `aria-valuemin="0" aria-valuemax="3" aria-valuenow="[0–3]"`.
- `aria-live="polite"` para o label ser anunciado a cada mudança.
- `aria-controls="[inputId]"` aponta para o `<input>` de senha.

**JS:**
- `password-strength.js` (ver FEATURE-cadastro.md §7) escuta `input` no campo alvo e atualiza `data-level` no elemento raiz. O PHP apenas renderiza o estado inicial.

**Decisões de design:**
- 3 níveis (não 4/5) — as regras do spec são binárias o suficiente para caber em 3 faixas; mais níveis geram incerteza sem ganho real.
- Cores em arbitrary value porque o DS atual não tem tokens semânticos de status (success/warning/error). Assim que existirem, migrar.
- Medidor fica fora do `form-field` como partial independente; o Bloco 2 compõe `form-field` + `password-strength` via `$strengthMeter = true` (lógica na integração do layout).
