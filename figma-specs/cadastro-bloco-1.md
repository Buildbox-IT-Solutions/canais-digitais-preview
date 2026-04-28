# Cadastro — Bloco 1 (E-mail)

**Figma:** — (sem nodeId; derivado de [FEATURE-cadastro.md §6.2](../FEATURE-cadastro.md))
**Arquivo:** [`src/layouts/cadastro-bloco-1.php`](../src/layouts/cadastro-bloco-1.php)

Primeiro dos 3 passos do cadastro. Captura o e-mail e bifurca: novo → Bloco 2; existente → convida a logar. Layout full-page sem nav completo.

## Shell do layout

- **Header minimal:** border-bottom + wordmark "Food Connection" (`font-display font-bold text-headline-sm text-primary-600`). Sem social, sem nav, sem search, sem CTA de anunciar.
- **Footer minimal:** © + 3 links (Termos, Privacidade, Contato).
- **Conteúdo:** card centralizado `max-w-[480px]` vertical stack `gap-8`.

## Anatomia do card

1. **Progress indicator** — 3 bolinhas (10px) conectadas por linhas finas. Ativa = `bg-secondary-950`. Label "Passo 1 de 3 — E-mail".
2. **Header** — `h1` "Qual é o seu e-mail?" (`text-headline-md`) + subtítulo "Recomendamos o uso do seu e-mail corporativo." (`text-body-lg text-neutral-700`).
3. **Input** — segue padrão do `form-field` (h-10, rounded-sm, border-neutral-100). `autofocus` + `autocomplete="email"`. Placeholder `seu@empresa.com.br`.
4. **Helper/erro** — abaixo do input quando há erro. Ícone info-circle + texto `#bf0413` + link secundário quando aplicável.
5. **Submit** — "Continuar" + seta direita, filled full-width `h-12 rounded-full`.
6. **Footer inline** — "Já tem conta? Entrar" → abre login-modal.

## Estados

| State key | Mensagem |
|---|---|
| `default` | — |
| `error-empty` | "Informe seu e-mail." |
| `error-invalid` | "Digite um e-mail válido." |
| `error-exists` | "Este e-mail já possui uma conta." + link "Fazer login com este e-mail" (vai para `login-modal.php` pré-preenchendo o e-mail) |

## Validação

- **Quando:** apenas em `blur` ou `submit`. Nunca durante a digitação.
- **Enter no input** = submit do form.
- **API de existência do e-mail:** resposta define default→Bloco 2 ou error-exists.
- `aria-invalid="true"` + `aria-describedby` ligando input ao helper; helper com `role="alert"`.

## A11y

- Progress indicator com `role="progressbar"` + `aria-valuenow="1"` `aria-valuemax="3"` + `aria-label`.
- Bolinhas decorativas marcadas `aria-hidden="true"` (a semântica vive no label).
- `autofocus` no input cumpre o requisito de "foco automático ao montar".

## Decisões de design

- **Progress como 3 dots + label textual** em vez de 3 chips numerados — visualmente mais leve e segue a convenção discreta do tipo "step indicator" usado em onboardings modernos; o rótulo "Passo X de 3" carrega a informação explícita.
- **Sem shadow/border no card central** — a página tem fundo branco e o card é o próprio conteúdo. Diferencial visual fica no header/footer dividers, não em card flutuante.
- **Gallery de estados no mesmo arquivo** — seguindo o padrão do `login-modal.php`, o layout empilha os estados de erro abaixo do preview principal para servir como fonte de verdade visual dos 3 cenários.
- **Link "error-exists" aponta para login-modal.php** — integração real vai precisar pré-preencher o campo e-mail ao abrir o modal (responsabilidade do `form-cadastro.js`/`auth-modal.js`, fora deste layout).
