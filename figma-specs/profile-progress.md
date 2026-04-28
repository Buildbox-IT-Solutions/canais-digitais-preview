# Profile Progress

**Figma:** — (sem nodeId; derivado de [FEATURE-cadastro.md §4.4 e §6.7](../FEATURE-cadastro.md))
**Arquivo:** [`src/components/profile-progress.php`](../src/components/profile-progress.php)
**Partial:** [`src/components/_partials/profile-progress.php`](../src/components/_partials/profile-progress.php)

Barra de progresso gamificada exibida no cabeçalho do `dashboard-perfil.php`. Mostra percentual preenchido + contador `X de Y` + frase motivacional que muda por faixa.

**Anatomia:**
```
┌─ "Perfil 43% completo" ─────── "6 de 14 campos" ─┐
├───── barra (h-2, neutral-100 bg / secondary-950 fill) ─────┤
└─ "Bom progresso! Adicione seus dados profissionais." ──────┘
```

**Faixas de copy (§6.7):**
| % | Texto |
|---|---|
| 0–30 | Seu perfil está começando. Complete para desbloquear recomendações. |
| 31–60 | Bom progresso! Adicione seus dados profissionais. |
| 61–89 | Quase lá! Faltam poucos campos. |
| 90–100 | Perfil completo! Você recebe o melhor do portal. |

**Props:**
- `filledFields` (int) — número de campos preenchidos.
- `totalFields` (int, default `14`) — total considerado para cálculo de %.

**Tokens:**
- Trilha: `bg-neutral-100` — mesma cor de borda de input, mantém peso visual leve.
- Preenchimento: `bg-secondary-950` (#003CB2) — reforça identidade da marca em um elemento positivo de engajamento.
- `rounded-full` tanto na trilha quanto no preenchimento.
- Transição: `transition-[width] duration-500` para animar mudanças quando o usuário salva um campo.

**A11y:**
- `role="progressbar"` + `aria-valuemin/max/now` no invólucro da barra.
- `aria-label="Progresso do preenchimento do perfil"`.

**Decisões de design:**
- Uma única cor de preenchimento em todas as faixas — a gamificação é feita pelo **texto**, não pela cor. Evita código verde/amarelo/vermelho que sugere status de erro.
- Clamp de `filledFields` no partial (`min`/`max`) — robustez contra chamadas com valores inválidos sem precisar de validação no call site.
