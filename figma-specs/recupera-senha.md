# Recupera Senha + Redefine Senha

**Figma:** — (sem nodeId; derivado de [FEATURE-cadastro.md §6.6](../FEATURE-cadastro.md))
**Arquivos:**
- [`src/layouts/recupera-senha.php`](../src/layouts/recupera-senha.php) — Tela A (solicitar link)
- [`src/layouts/redefine-senha.php`](../src/layouts/redefine-senha.php) — Tela B (redefinir via link)

Fluxo de esqueci minha senha. Duas telas separadas porque vivem em URLs distintas e têm contextos de segurança diferentes.

## Tela A — `recupera-senha.php`

Shell minimal com botão "← Voltar" no topo. Ícone cadeado 48px (`bg-[#DBEAFE]` / `text-primary-600`) + título + subtítulo + input de e-mail + botão filled.

**Estados:**

| Key | Descrição |
|---|---|
| `default` | Form com input de e-mail (`autofocus`). |
| `submitted` | Bloco de status verde (role="status") com mensagem **genérica** — nunca confirma se o e-mail existe. |

**Regra de segurança (§6.6):** a resposta pós-envio é sempre a mesma — "Se este e-mail estiver cadastrado, você receberá um link em instantes." — independente de o e-mail existir ou não. Evita enumeration attack.

## Tela B — `redefine-senha.php`

URL: `/redefine-senha?token=[token]`. Token ausente → redirect server-side para `recupera-senha.php` (sem estado visual).

Ícone cadeado desbloqueado 48px + título + 2 campos de senha (com `password-strength` no primeiro) + submit.

**Estados:**

| Key | Visual | CTA |
|---|---|---|
| `valid` | Form completo com ícone cadeado primário. | "Redefinir senha" |
| `loading` | Form disabled + spinner. | "Redefinindo..." |
| `expired` | Ícone relógio amber, título "Link expirado", desc "válido por 1 hora". | "Solicitar novo link" → Tela A |
| `used` | Ícone check verde, título "Este link já foi usado". | "Fazer login" → login-modal |

**Pós-sucesso:** backend dispara toast `"Senha redefinida com sucesso."` + redirect para login. Implementação em `auth-modal.js`/`toast.js` (§7).

## Shell compartilhada

Mesma estrutura dos outros layouts da feature — header com wordmark "Food Connection" (sem nav/search/CTA), footer com © + 3 links. Cards centralizados `max-w-[480px]`.

## A11y

- Tela A: input com `autofocus`, `autocomplete="email"`.
- Tela B: inputs de senha com `autocomplete="new-password"`, toggle olho com `aria-label`, `aria-describedby` ligando ao password-strength.
- Bloco de sucesso (Tela A) com `role="status"`.
- Bloco de erro terminal (Tela B expired/used) tem toda a informação como texto — não depende de cor/ícone.
- Toast pós-sucesso (backend) — `role="status"` via partial `toast`.

## Decisões de design

- **Reuso do ícone cadeado** em ambas as telas com variação sutil (fechado → desbloqueado) — dá continuidade visual ao fluxo sem exigir novos assets.
- **Estados terminais (`expired`/`used`) substituem o form em vez de aparecerem como alert inline** — não faz sentido mostrar campos que o usuário não pode preencher. O CTA único leva direto ao próximo passo correto.
- **Dois arquivos separados** (recupera + redefine) em vez de um layout único com query param — cada um tem responsabilidade de página real e URL distinta no WordPress.
- **Link "Voltar" só na Tela A** — na Tela B o usuário chegou via e-mail, voltar não faz sentido (não há tela anterior coerente).
