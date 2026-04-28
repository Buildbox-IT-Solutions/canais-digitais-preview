# Login Modal

**Figma:** — (sem nodeId; derivado de [FEATURE-cadastro.md §6.1](../FEATURE-cadastro.md))
**Arquivo:** [`src/layouts/login-modal.php`](../src/layouts/login-modal.php)

Modal de autenticação que abre sobre qualquer página (trigger: "Entrar" no header ou redirect do `form-download.php` para usuário anônimo). Tem **7 estados obrigatórios**.

## Apresentação

- **Desktop `≥ md`** — card `max-w-[480px] rounded-lg shadow-lg p-6 md:p-8` centralizado sobre overlay `bg-primary-950/[.32]`.
- **Mobile `< md`** — vira bottom sheet (`rounded-t-2xl`, desliza de baixo). Quando a integração real for feita, o wrapper externo troca para o partial `bottom-sheet` nesse breakpoint; a estrutura interna é a mesma.

## Anatomia (ordem vertical)

1. Botão X (absolute, top-right) — `icon-button` ghost close, `data-login-action="close"`.
2. *Badge contextual* (apenas em `post-download`) — pill `bg-secondary-50` com ícone download.
3. Título "Entrar" — `font-display text-headline-md text-neutral-950`.
4. Subtítulo — `font-body text-body-lg text-neutral-700` (muda em `session-expired`).
5. *Alert inline* (condicional) — border-left colorida, ícone + texto, links inline com `data-login-action`.
6. Social login — LinkedIn + Google, outlined, `h-12 rounded-lg`, ícones SVG inline.
7. Divider "ou" — linha horizontal + label central.
8. Input e-mail — `h-10 rounded-sm border-neutral-100`, `focus-within:border-secondary-950`.
9. Input senha — mesmo padrão + botão olho embutido (`data-login-action="toggle-password"`).
10. "Esqueci minha senha" — `link-button` size `sm`, alinhado à direita.
11. Botão "Entrar" — filled, full-width, `h-12 rounded-full`, spinner inline em `loading`.
12. Rodapé "Não tem conta? Criar conta" — link para `cadastro-bloco-1.php`.

## 7 estados

| State key | O que muda |
|---|---|
| `default` | Form limpo, sem alerts. |
| `loading` | Botão submit vira "Entrando..." com spinner; `<fieldset disabled>` bloqueia todos os inputs. |
| `error-credentials` | Alert error genérico — **nunca** indicar qual campo. |
| `error-unverified` | Alert warning + botão "Reenviar e-mail de confirmação" (`data-login-action="resend-confirmation"`, cooldown 60s controlado pelo JS). |
| `locked` | Alert error com countdown `[MM:SS]` em `aria-live="polite"`; form + submit desabilitados. |
| `session-expired` | Subtítulo trocado para "Sua sessão expirou..." + warning. |
| `post-download` | Badge azul "Faça login para baixar este material" acima do título. |

## Cores de alert

- **Error** — `bg-[#FEF2F2] border-[#bf0413] text-[#bf0413]` + ícone cross-circle.
- **Warning** — `bg-[#FFFBEB] border-[#F59E0B] text-[#92400E]` + ícone triangle.

Arbitrary values porque o DS ainda não tem tokens de status. Quando tiver, migrar.

## Acessibilidade

- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` apontando para o `<h2>`.
- Overlay `aria-hidden` (decoração).
- Focus trap — implementação em `auth-modal.js` (§7).
- `ESC` fecha o modal — implementação em `auth-modal.js`.
- Countdown de bloqueio com `aria-live="polite"`.
- `autocomplete="email"` / `autocomplete="current-password"` nos inputs.

## JavaScript futuro

Todo o comportamento interativo (abrir/fechar, focus trap, toggle password, countdown, reenvio com cooldown) será implementado em `src/assets/js/components/auth-modal.js` conforme §7 da FEATURE. O layout atual é markup-only com `data-login-action` como âncora para os handlers.

## Decisões de design

- **Social buttons com SVG inline** em vez de CDN (diferente do que a §6.1 sugere) — evita dependência externa no preview/standalone e mantém o arquivo auto-contido. O LinkedIn usa borda `border-[1.5px]` + ícone colorido oficial; Google usa borda padrão + ícone multicolor.
- **Senha com toggle olho inline** — `form-field` atual não suporta slot à direita; introduzir esse pattern como prop do partial é uma mudança maior que fica fora do escopo desta feature. O bloco inline segue os tokens do `form-field` à risca (h-10, rounded-sm, border-neutral-100, text-body-lg).
- **Fieldset disabled para bloqueio** — uma única flag HTML desabilita todo o form em `loading` e `locked`, sem percorrer inputs no JS.
- **Estados empilhados no layout** — o arquivo renderiza o estado default sobre um mock de página dimmed + abaixo uma galeria dos 7 estados. Serve ao papel de "fonte da verdade visual" do projeto para o time de devs e QA.
