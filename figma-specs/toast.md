# Toast

**Figma:** — (sem nodeId; derivado de [FEATURE-cadastro.md §4.2](../FEATURE-cadastro.md))
**Arquivo:** [`src/components/toast.php`](../src/components/toast.php)
**Partial:** [`src/components/_partials/toast.php`](../src/components/_partials/toast.php)

Notificação flutuante usada para feedback assíncrono (salvar perfil, senha redefinida, erros de submissão). Auto-dismiss de 4s controlado por `toast.js` — o partial renderiza só o card.

**Variantes (`type`):** `success` | `error` | `warning` | `info`.
Cada tipo define o ícone Material e a cor de destaque da borda-esquerda + ícone.

**Cores de destaque:**
- `success` → `#16A34A`
- `error` → `#bf0413` (red MD do DS — arbitrary value)
- `warning` → `#F59E0B`
- `info` → `secondary-950` (#003CB2)

**Posicionamento (via container JS, fora do partial):**
- Desktop `≥ md`: `fixed bottom-6 right-6` + pilha vertical de toasts.
- Mobile: `fixed bottom-0 inset-x-0 p-4`.

**Acessibilidade:**
- `role="alert"` + `aria-live="assertive"` para `error`/`warning`.
- `role="status"` + `aria-live="polite"` para `success`/`info`.
- Botão X com `aria-label="Fechar notificação"` e `data-toast-dismiss` para o JS.

**Decisões de design:**
- Card branco com borda neutra + border-left 4px colorida — formato clássico, sem competir com o conteúdo da página.
- `shadow-lg` para destacar da página sem virar modal.
- Sem ação primária embutida (CTAs em toast quebram a expectativa de auto-dismiss). Para fluxo com ação, usar alert inline.
