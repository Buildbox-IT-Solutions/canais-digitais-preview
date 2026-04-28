# Confirmação de E-mail

**Figma:** — (sem nodeId; derivado de [FEATURE-cadastro.md §6.4](../FEATURE-cadastro.md))
**Arquivo:** [`src/layouts/confirmacao-email.php`](../src/layouts/confirmacao-email.php)

Fluxo pós-cadastro. Duas telas principais (A: aguardando / B: sucesso) + dois estados de erro de token. Token ausente na URL → redirect server-side para `recupera-senha.php` (sem estado visual).

## Shell

Mesma shell minimal dos Blocos de cadastro — header com wordmark + footer de 3 links. Conteúdo centralizado `max-w-[480px]`, alinhamento `text-center`, stack vertical `gap-6`.

## Anatomia do card

1. **Ícone circular** 64px — fundo colorido por estado + ícone 32px branco.
2. **Título** — `font-display text-headline-md text-neutral-950`.
3. **Descrição** — 1–2 parágrafos `text-body-lg` / `text-body-md`.
4. **CTA principal** — full-width `h-12 rounded-full`, filled ou outlined por estado.
5. **Links secundários** — 1 ou 2, empilhados abaixo do CTA.

## Estados

| State key | Ícone / cor | Título | CTA | Links secundários |
|---|---|---|---|---|
| `waiting` | envelope em `#DBEAFE` / `primary-600` | Confirme seu e-mail | **Reenviar e-mail** (outlined, cooldown 60s) | "Errei o e-mail" → Bloco 1 · "Verificar depois" → Home |
| `success` | check em `#DCFCE7` / `#16A34A` + pulse | Tudo pronto! | **Completar meu perfil** (filled) → onboarding | "Explorar o portal agora" → Home |
| `expired` | relógio em `#FEF3C7` / `#92400E` | Link expirado | **Enviar novo link** (filled) | "Voltar para a página inicial" |
| `used` | info em `#DBEAFE` / `secondary-950` | Sua conta já está ativa | **Fazer login** (filled) → login-modal | — |

## Comportamento

- **Cooldown 60s em `waiting`:** ao clicar "Reenviar e-mail", o botão fica desabilitado por 60 segundos com um countdown. Lógica em `auth-modal.js` via `data-confirmacao-action="resend"` + `data-cooldown="60"`.
- **Pulse no ícone de sucesso:** uma batida discreta na primeira animação de entrada (`animate-[pulse_1.2s_ease-out_1]`) — comemoração sutil sem ser infantil.
- **Analytics:** `data-analytics-event="email_confirmado"` disparado no load da tela de sucesso.

## Cores de fundo de ícone (arbitrary values)

Usadas apenas como "badge" do ícone. Quando houver tokens semânticos de status, migrar:
- `#DCFCE7` — green-100 (success)
- `#DBEAFE` — blue-100 (info/neutral primary)
- `#FEF3C7` — amber-100 (warning)

## Decisões de design

- **"m***@empresa.com.br"** com masking parcial — evita vazar o e-mail completo em possíveis shoulder-surfs sem perder o sinal de "é o endereço certo".
- **Dois links discretos em `waiting`** (Errei o e-mail / Verificar depois) em escalas visuais diferentes: o primeiro é `text-label-lg` bold secondary-950 (ação clara), o segundo é `text-label-md neutral-500` (saída silenciosa). A hierarquia ensina o usuário a priorizar conferir o e-mail.
- **Sem progress indicator** — o fluxo já saiu do onboarding de 3 passos; voltar a mostrar `● ● ○` aqui sugeriria que há uma ação obrigatória imediata, o que não é o caso.
- **Estado `used` aponta para login-modal.php** — mesmo pattern do Bloco 1 "error-exists".
