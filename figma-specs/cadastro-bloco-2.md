# Cadastro — Bloco 2 (Senha + Termos)

**Figma:** — (sem nodeId; derivado de [FEATURE-cadastro.md §6.3](../FEATURE-cadastro.md))
**Arquivo:** [`src/layouts/cadastro-bloco-2.php`](../src/layouts/cadastro-bloco-2.php)

Segundo passo do cadastro. Mesma shell minimal do Bloco 1. Captura senha + confirmação + consent LGPD; habilita o submit apenas quando **senha válida + confirmação confere + Termos marcado**.

## Anatomia do card

1. **Voltar** — link ghost com seta esquerda, volta para `cadastro-bloco-1.php` preservando o e-mail.
2. **Progress 2/3** — duas bolinhas preenchidas + linhas conectoras; primeira linha também em `bg-secondary-950` para reforçar o avanço.
3. **Header** — "Crie uma senha" + subtítulo citando o e-mail já capturado (`maria.silva@empresa.com.br` no mock).
4. **Input senha** — h-10 rounded-sm, toggle olho embutido (reusa o pattern do login-modal), `autocomplete="new-password"`.
5. **Password strength** — partial `password-strength` abaixo do input, ligado por `aria-describedby`.
6. **Input confirmar senha** — mesmo padrão, sem strength meter.
7. **Checkboxes** — Termos (required) + Marketing (opcional). Visual custom com `.sr-only` no input real + span pintado ao estado `checked`.
8. **Submit** — "Criar minha conta" filled full-width, `disabled` por padrão. Spinner inline no estado loading.

## Estados

| State key | Descrição |
|---|---|
| `default` | Campos vazios, submit disabled. |
| `filled-strong` | Senha forte + confirmação OK + Termos marcado → submit habilitado. |
| `error-weak` | "A senha deve ter no mínimo 8 caracteres com letras e números." |
| `error-mismatch` | "As senhas não coincidem." |
| `loading` | "Criando conta..." + spinner + fieldset disabled. |

## Regras de validação (§6.3)

- **Senha:**
  - Fraca = só letras ou só números.
  - Média = letras + números, < 12 chars.
  - Forte = letras + números, 12+ chars.
- **Confirmação:** precisa ser byte-a-byte igual à senha.
- **Termos:** `required` + `aria-required="true"`.

## Checkboxes — HTML

Seguindo a §6.3, o input real fica `.sr-only` e a visualização é um `<span>` estilizado. Isso permite customizar borda/fundo sem depender de `accent-color` (que não existe no tokens.css).

Cor quando selecionado: `border-secondary-950 bg-secondary-950` com check em `text-white`.

A seta vermelha `*` no label de Termos marca visualmente a obrigatoriedade; screen readers recebem via `aria-required="true"` no input.

## A11y

- Input senha com `aria-describedby="[id]-strength [id]-error"`.
- Erros com `role="alert"` + `aria-invalid="true"`.
- `<fieldset disabled>` no estado `loading` desabilita todos os inputs numa passada.
- Toggle olho com `aria-label="Mostrar senha"` (o JS troca para "Esconder senha" quando a senha é revelada).

## JS futuro (§7)

- `form-cadastro.js` — habilita/desabilita submit em tempo real a partir das 3 condições (senha válida, confirmação confere, Termos marcado).
- `password-strength.js` — avalia a força em tempo real e atualiza o `data-level` do partial `password-strength`.
- `auth-modal.js` — reusa o handler `data-login-action="toggle-password"` para os dois inputs.

## Decisões de design

- **Partial `password-strength` integrado via `aria-describedby`** em vez de `$strengthMeter = true` sugerido pela §4.3. O pattern desacoplado é mais sincero com a estrutura real e permite reuso fora do `form-field`.
- **Checkbox visual custom** porque o `form-checkbox` atual não suporta `id`/`required`/`checked`. A §6.3 mostra o pattern de uso que o partial ainda não atende; evoluir o partial é fora de escopo deste layout.
- **Pós-submit:** o spec fala "conta criada → e-mail em background → avançar para confirmacao-email.php". O controle desse redirect é no backend; o layout só marca loading.
