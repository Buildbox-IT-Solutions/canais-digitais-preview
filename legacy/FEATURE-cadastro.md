# FEATURE-cadastro.md — Cadastro e Perfil de Usuário
## Canais Digitais 2.0 / WP Theme

> Leia este arquivo junto com `CLAUDE.md` e `DESIGN.md` antes de qualquer implementação.
> Este documento substitui todos os arquivos de spec gerados em sessão externa.

**Responsável:** Micaelly Caetano
**Status:** Em implementação
**Última atualização:** 12/04/2026

---

## 1. Objetivo da feature

Converter usuários anônimos em uma base identificada.

**O que muda de imediato (MVP):** o usuário logado baixa materiais da Biblioteca de Download sem precisar preencher o formulário toda vez. O login substitui o formulário. Se os cookies forem limpos, basta logar — não preencher o form novamente.

**O que fica para Etapa 2:** favoritar notícias, histórico de leitura, preferências e personalização, gated content editorial.

---

## 2. Impacto no projeto existente

### Layout modificado
| Arquivo | Modificação |
|---|---|
| `src/layouts/form-download.php` | Detectar usuário logado → pular form → ir direto para o download |

### Layouts novos a criar
| Arquivo | Descrição |
|---|---|
| `src/layouts/login-modal.php` | Modal de login (overlay sobre qualquer página) |
| `src/layouts/cadastro-bloco-1.php` | Bloco 1 — captura de e-mail |
| `src/layouts/cadastro-bloco-2.php` | Bloco 2 — senha + termos de uso |
| `src/layouts/confirmacao-email.php` | Tela de espera pós-cadastro + tela de sucesso pós-confirmação |
| `src/layouts/onboarding.php` | Bloco 3 — dados complementares |
| `src/layouts/recupera-senha.php` | Esqueci minha senha |
| `src/layouts/redefine-senha.php` | Redefinição via link do e-mail |
| `src/layouts/dashboard-perfil.php` | Área logada — dados do usuário |

---

## 3. Partials reutilizáveis — já existem

Estes partials estão implementados e validados contra o Figma. Usar diretamente via `get_template_part()`.

| Partial | Caminho | Uso na feature |
|---|---|---|
| `button` | `_partials/button.php` | CTAs de todos os fluxos |
| `loading-button` | `_partials/loading-button.php` | Estados de loading em submits |
| `link-button` | `_partials/link-button.php` | Links como "Esqueci minha senha", "Criar conta" |
| `form-field` | `_partials/form-field.php` | Inputs de e-mail, senha, nome, telefone etc. |
| `form-select` | `_partials/form-select.php` | Dropdown de Setor, País, Estado, Cidade |
| `form-checkbox` | `_partials/form-checkbox.php` | Checkbox de Termos e opt-in de Marketing |
| `form-disclaimer` | `_partials/form-disclaimer.php` | Texto legal de LGPD |
| `avatar` | `_partials/avatar.php` | Foto de perfil no Dashboard |
| `bottom-sheet` | `_partials/bottom-sheet.php` | Base do modal de login no mobile |
| `icon-button` | `_partials/icon-button.php` | Botão X de fechar modal, toggle de senha |
| `divider` | `_partials/divider.php` | Separador "ou" entre social e e-mail/senha |

---

## 4. Partials novos a criar

Estes componentes não existem no DS atual. Cada um precisa de showcase + partial + spec em `figma-specs/`.

### 4.1 `form-toggle` — Switch on/off
**Usado em:** Dashboard de Perfil — Etapa 2 (não é prioridade do MVP)
**Figma:** a ser inspecionado quando necessário

### 4.2 `toast` — Notificação flutuante
**Usado em:** feedback de salvar perfil, senha redefinida
**Props:** `type` (success | error | warning | info), `message`
**Posição:** canto inferior direito desktop / bottom full-width mobile
**Auto-dismiss:** 4 segundos

### 4.3 `password-strength` — Indicador de força de senha
**Usado em:** Bloco 2 do cadastro + tela de redefinição de senha
**Props:** embutido no `form-field` via parâmetro `$strengthMeter = true`
**Níveis:** Fraca / Média / Forte (lógica JS inline)

### 4.4 `profile-progress` — Barra de progresso gamificada
**Usado em:** Dashboard de Perfil — cabeçalho
**Props:** `$filledFields` (int), `$totalFields = 14`
**Lógica:** 4 faixas de texto dinâmico por % de preenchimento

---

## 5. Tokens — referência correta para esta feature

O projeto usa **Tailwind v4 com classes geradas a partir de `src/tokens/tokens.css`**.
Nunca usar CSS custom properties diretamente nos templates. Usar sempre as classes Tailwind.

### Cores relevantes para o fluxo de autenticação
| Decisão | Classe Tailwind | Hex |
|---|---|---|
| Fundo botão primário | `bg-primary-600` | #002244 |
| Fundo botão hover | `bg-secondary-950` | #003CB2 |
| Texto sobre fundo escuro | `text-white` | #FFFFFF |
| Borda input default | `border-neutral-100` | #D6D8DD |
| Borda input focus | `border-secondary-950` | #003CB2 |
| Borda input error | `border-[#bf0413]` | #BF0413 |
| Texto label | `text-neutral-950` | #283857 |
| Texto placeholder | `text-neutral-500` | #8391A9 |
| Texto erro | `text-[#bf0413]` | #BF0413 |
| Overlay modal | `bg-primary-950/[.32]` | #050708 32% |
| Checkbox selecionado | `bg-secondary-950` | #003CB2 |
| Fundo input disabled | `bg-neutral-50` | #E9EAEC |

> **Nota:** `#bf0413` é o Material Design red usado no DS — não tem token nomeado. Usar arbitrary value do Tailwind.

### Border radius confirmado
| Contexto | Classe | Valor |
|---|---|---|
| Inputs, selects | `rounded-sm` | 4px |
| Modal, cards, sheets | `rounded-lg` | 8px |
| Botões primários | `rounded-full` | 9999px |
| Bottom sheet (cantos superiores) | `rounded-t-2xl` | 16px |
| Avatar | `rounded-full` | 9999px |

### Tipografia relevante
| Contexto | Classe de tamanho | Família |
|---|---|---|
| Título da tela ("Entrar") | `text-headline-md` (28px) | `font-display` (Aleo) |
| Subtítulo | `text-body-lg` (16px) | `font-body` (Open Sans) |
| Label de campo | `text-label-lg` (14px) | `font-body` semibold |
| Texto digitado no input | `text-body-lg` (16px) | `font-body` |
| Helper/erro de campo | `text-label-md` (12px) | `font-body` |
| Texto de botão large | `text-body-lg` (16px) bold | `font-body` |

### Tamanho do Text Field
**Altura: `h-10` (40px)** — validado contra Figma. Não usar `h-12`.

---

## 6. Fluxos implementados — detalhamento

### 6.1 Login (Modal)

**Trigger:** clique em "Entrar" no header | ou redirect do `form-download.php` para usuário não logado

**Apresentação:**
- Desktop `≥ md`: overlay `bg-primary-950/[.32]` + card 480px centralizado, `rounded-lg`, `shadow-lg`
- Mobile `< md`: bottom sheet (`rounded-t-2xl`, desliza de baixo)

**Estrutura do modal:**
```
[X fechar — icon-button]
Título: "Entrar"              ← font-display, text-headline-md
Subtítulo                     ← font-body, text-body-lg, text-neutral-600

[Alert inline — condicional]

[btn Social LinkedIn]         ← outlined, full-width, rounded-lg
[btn Social Google]           ← outlined, full-width, rounded-lg

[divider "ou"]

[form-field — E-mail]
[form-field — Senha + toggle olho]

[link-button "Esqueci minha senha"]    ← alinhado à direita

[button Filled large "Entrar"]         ← full-width, rounded-full

Não tem conta? [link-button "Criar conta"]
```

**Botões Social Login:**
- Igual peso — LinkedIn e Google empilhados verticalmente, mesma altura e estilo
- Estilo: outlined (`border border-neutral-200`), fundo branco, `rounded-lg`
- Ícones via CDN `cdn.jsdelivr.net` — 20×20px
- LinkedIn: `border-[1.5px]` + filter CSS para cor `#0A66C2`
- Google: ícone multicolor nativo

**JavaScript:**
```javascript
// Fechar modal
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal() })
overlay.addEventListener('click', closeModal)

// Focus trap dentro do modal
// Retornar foco ao elemento que abriu após fechar
```

**7 estados obrigatórios:**

| Estado | Comportamento |
|---|---|
| Default | Estado inicial — form limpo |
| Loading | Spinner inline no botão, formulário bloqueado |
| Erro: credenciais inválidas | Alert error genérico — NUNCA indicar qual campo |
| Erro: conta não verificada | Alert warning + link "Reenviar e-mail de confirmação" |
| Bloqueio (5 tentativas) | Form desabilitado + countdown 15min em tempo real |
| Sessão expirada | Subtítulo diferenciado + alert warning |
| Redirect pós-download | Badge de contexto: "Faça login para baixar este material" |

**UX Writing:**
| Situação | Texto |
|---|---|
| Credenciais inválidas | "E-mail ou senha incorretos. Verifique os dados e tente novamente." |
| Conta não verificada | "Seu e-mail ainda não foi confirmado. [Reenviar e-mail de confirmação]" |
| Bloqueio | "Muitas tentativas. Tente novamente em [MM:SS]." |
| Sessão expirada | "Sua sessão expirou. Entre novamente para continuar." |

---

### 6.2 Cadastro — Bloco 1 (E-mail)

**Apresentação:** Full Page, sem nav completo. Apenas logo + conteúdo + CTA.
Desktop e mobile: formulário centralizado, `max-w-[480px]`.

**Indicador de progresso:** 3 steps — ● ○ ○

**Comportamento:**
```
Foco automático no input ao montar
→ Validação apenas ao clicar "Continuar" ou blur (não durante digitação)
→ API verifica se e-mail existe:
   Novo:      avançar para Bloco 2
   Existente: alert warning + link "Fazer login com este e-mail"
              (preencher e-mail no modal de login automaticamente)
Enter no input = clicar "Continuar"
```

**UX Writing:**
| Campo/Situação | Texto |
|---|---|
| Título | "Qual é o seu e-mail?" |
| Subtítulo | "Recomendamos o uso do seu e-mail corporativo." |
| Placeholder | "seu@empresa.com.br" |
| Campo vazio | "Informe seu e-mail." |
| Formato inválido | "Digite um e-mail válido." |
| E-mail já cadastrado | "Este e-mail já possui uma conta." + link "Fazer login com este e-mail" |

---

### 6.3 Cadastro — Bloco 2 (Senha + Termos)

**Indicador de progresso:** ● ● ○

**Botão "Voltar":** ghost com ícone seta — retorna ao Bloco 1 preservando e-mail.

**Campos:**
- Senha (com toggle visibilidade + `password-strength`)
- Confirmar senha (com toggle visibilidade)
- Checkbox Termos (obrigatório para habilitar o botão)
- Checkbox Marketing (opcional, desmarcado por padrão)

**Lógica do botão "Criar minha conta":** habilitado apenas quando senha válida + confirmação confere + checkbox Termos marcado.

**Força de senha:**
| Nível | Regra | Cor Tailwind |
|---|---|---|
| Fraca | Apenas letras OU apenas números | `text-[#DC2626]` / barra vermelha |
| Média | Letras + números, menos de 12 chars | `text-[#F59E0B]` / barra amarela |
| Forte | Letras + números, 12+ chars | `text-[#16A34A]` / barra verde |

**Consentimento LGPD — HTML obrigatório:**
```php
<!-- Termos — obrigatório -->
<label><?php get_template_part('components/_partials/form-checkbox', null, [
  'id' => 'terms',
  'required' => true,
  'label' => 'Li e aceito os <a href="/termos" target="_blank">Termos de Uso</a> e a <a href="/privacidade" target="_blank">Política de Privacidade</a>',
]); ?></label>

<!-- Marketing — opcional -->
<label><?php get_template_part('components/_partials/form-checkbox', null, [
  'id' => 'marketing',
  'required' => false,
  'label' => 'Quero receber comunicações e novidades da Informa Markets',
]); ?></label>
```

**Ao submeter com sucesso:**
- Conta criada
- E-mail de confirmação enviado em background (não bloqueia o fluxo)
- Avançar para `confirmacao-email.php`

**UX Writing:**
| Campo/Situação | Texto |
|---|---|
| Título | "Crie uma senha" |
| Senha inválida | "A senha deve ter no mínimo 8 caracteres com letras e números." |
| Confirmação não confere | "As senhas não coincidem." |
| Loading | "Criando conta..." |

---

### 6.4 Confirmação de E-mail

**Tela A — Aguardando (pós-Bloco 2):**
```
[ícone envelope 48px — primary-600]
"Confirme seu e-mail"
"Enviamos um link para m***@empresa.com.br."
[btn outlined "Reenviar e-mail"] — cooldown 60s após clique
[link "Errei o e-mail"] → volta Bloco 1
[link discreto "Verificar depois"] → Home
```

**Tela B — Sucesso (via link do e-mail):**
```
[ícone check animado 48px — verde #16A34A]
"Tudo pronto!"
"Sua conta está ativa."
[btn filled "Completar meu perfil"] → onboarding.php
[link "Explorar o portal agora"] → Home
```

**Estados de erro do link:**
```
Expirado (> 24h): "Link expirado." + btn "Enviar novo link"
Já utilizado:     "Sua conta já está ativa." + btn "Fazer login"
Token ausente:    Redirecionar para recupera-senha.php
```

---

### 6.5 Onboarding — Bloco 3

**Indicador de progresso:** ● ● ●

**Trigger alternativo:** Social Login sem dados profissionais.

**Campos (todos opcionais):**

| Campo | Partial | Regra |
|---|---|---|
| Nome Completo | `form-field` | Mín. 2 palavras se preenchido |
| Telefone | `form-field` | Máscara `+55 (00) 00000-0000` |
| Empresa | `form-field` | Máx. 100 chars |
| Cargo | `form-field` | Máx. 100 chars |
| Setor | `form-select` com busca | Taxonomia Informa Markets |

**Botão "Fazer isso depois":** sem salvar, vai para Home logado.

**Pré-preenchimento via LinkedIn:** Nome, Empresa, Cargo chegam preenchidos — editáveis.

**UX Writing:**
| Elemento | Texto |
|---|---|
| Título | "Conte um pouco sobre você" |
| Subtítulo | "Essas informações personalizam sua experiência no portal." |
| CTA | "Salvar e continuar" |
| Skip | "Fazer isso depois" |

---

### 6.6 Recuperação de Senha

**Tela A — Solicitar link:**
```
Full page. Logo + botão "← Voltar"
[ícone cadeado 48px]
"Esqueceu a senha?"
"Informe seu e-mail e enviaremos um link para criar uma nova senha."
[form-field — E-mail]
[btn "Enviar link de recuperação"]
```

Pós-envio: mensagem genérica "Se este e-mail estiver cadastrado, você receberá um link em instantes."
(Nunca confirmar se o e-mail existe — segurança.)

**Tela B — Redefinir (`/redefine-senha?token=[token]`):**
```
[ícone cadeado desbloqueado 48px]
"Crie uma nova senha"
[form-field — Nova senha + password-strength]
[form-field — Confirmar senha]
[btn "Redefinir senha"]
```

**Estados do token:**
| Situação | Comportamento |
|---|---|
| Válido | Exibir formulário normalmente |
| Expirado (> 1h) | "Link expirado." + btn "Solicitar novo link" → Tela A |
| Já utilizado | "Este link já foi usado." + btn "Fazer login" |
| Ausente na URL | Redirecionar para Tela A |

Pós-redefinição: toast "Senha redefinida com sucesso." + redirect para login.

---

### 6.7 Dashboard de Perfil (MVP)

**Layout:** novo `src/layouts/dashboard-perfil.php`
**Nav lateral desktop / tabs mobile** — mesmo padrão dos outros layouts.

**Seções (MVP):**

**Seção 1 — Dados Básicos** (6 campos dos 14)
| Campo | Partial | Regra |
|---|---|---|
| Foto de perfil | `avatar` + upload | JPG/PNG máx 2MB |
| Nome Completo | `form-field` | Mín. 2 palavras |
| E-mail | `form-field` | Read-only se Social Login |
| Telefone | `form-field` | Máscara +55 |
| Data de Nascimento | `form-field` type=date | Maioridade 18+ |
| Gênero | `form-select` | Estatístico |

**Seção 2 — Dados Profissionais** (3 campos)
| Campo | Partial |
|---|---|
| Empresa | `form-field` máx 100 chars |
| Cargo | `form-field` máx 100 chars |
| Setor | `form-select` com busca |

**Seção 3 — Dados Fiscais e Localização** (5 campos)
| Campo | Partial | Regra |
|---|---|---|
| CPF / CNPJ | `form-field` | Máscara automática + dígito verificador |
| País → Estado → Cidade | `form-select` ×3 | Cascata obrigatória |
| CEP | `form-field` | Autopreenchimento via API |
| Endereço | `form-field` | Preenchido pela API de CEP |

**Seção 4 — Conta** (MVP — sem toggles de preferência)
- Link "Excluir minha conta" → modal de confirmação

**Fora do MVP (Etapa 2):**
- Toggles de newsletter e marketing
- Histórico de leitura
- Favoritos

**Barra de progresso (cabeçalho):**

```php
<?php get_template_part('components/_partials/profile-progress', null, [
  'filledFields' => $filledCount,
  'totalFields'  => 14,
]); ?>
```

| Faixa | Texto |
|---|---|
| 0–30% | "Seu perfil está começando. Complete para desbloquear recomendações." |
| 31–60% | "Bom progresso! Adicione seus dados profissionais." |
| 61–89% | "Quase lá! Faltam poucos campos." |
| 90–100% | "Perfil completo! Você recebe o melhor do portal." |

**Modo de edição:**
- Campos exibidos em leitura por padrão
- Clique no campo ou botão "Editar" → modo edição
- Botões "Salvar" e "Cancelar" aparecem
- Salvar → toast de sucesso

**Modal de exclusão de conta:**
```
"Excluir sua conta?"
"Esta ação não pode ser desfeita."
[input — digitar "EXCLUIR" para confirmar]
[btn ghost "Cancelar"]
[btn filled cor erro "Sim, excluir minha conta"]
  → habilitado apenas quando input = "EXCLUIR" exato
```

---

### 6.8 Integração com form-download.php

**Modificação no `src/layouts/form-download.php` existente:**

```php
<?php
// No topo do layout, antes de renderizar o form:
$userLoggedIn = is_user_logged_in(); // WordPress function
$userProfile  = $userLoggedIn ? wp_get_current_user() : null;

if ($userLoggedIn && userHasRequiredFields($userProfile)) {
    // Usuário logado com dados suficientes → ir direto para o download
    renderDirectDownload($downloadUrl, $userProfile);
} else if ($userLoggedIn) {
    // Logado mas sem dados completos → completar perfil primeiro
    renderProfileCompletionPrompt();
} else {
    // Anônimo → mostrar botão de login em vez do form completo
    renderLoginPrompt($downloadTitle, $currentUrl);
}
?>
```

**Estado "Anônimo — prompt de login":**
```
[ícone download]
"Para baixar [título do material], faça login ou crie sua conta."
[btn filled "Fazer login"] → abre modal de login
[btn outlined "Criar conta"] → cadastro-bloco-1.php
Pequeno: "ou preencha o formulário abaixo"  ← manter form original como fallback
```

**Após login bem-sucedido:** redirect de volta para a URL do material com download automático.

---

## 7. Comportamentos JavaScript — adições ao projeto

Adicionar em `src/assets/js/components/`:

### `auth-modal.js`
```javascript
// Abrir modal de login
// Fechar via X, overlay, ESC
// Focus trap
// Retorno de foco ao elemento que abriu
// Countdown de bloqueio (15min)
// Reenvio de e-mail com cooldown (60s)
```

### `password-strength.js`
```javascript
// Avaliar força em tempo real
// Fraca / Média / Forte
// Atualizar barra e label
```

### `form-cadastro.js`
```javascript
// Verificação de e-mail duplicado (Bloco 1)
// Habilitação condicional do botão submit (Bloco 2)
// Máscara de telefone e CPF/CNPJ
// CEP autopreenchimento
// Cascata País → Estado → Cidade
```

### `toast.js`
```javascript
// Exibir / dispensar notificações flutuantes
// Auto-dismiss 4s
// Empilhamento
```

---

## 8. Tagueamento — eventos Analytics

Adicionar `data-analytics-event` nos elementos interativos:

| Evento | Trigger |
|---|---|
| `login_iniciado` | Abertura do modal |
| `login_concluido` | Autenticação bem-sucedida |
| `login_erro` | Tentativa com falha |
| `cadastro_bloco1_iniciado` | Montagem do Bloco 1 |
| `cadastro_bloco2_iniciado` | Avanço para Bloco 2 |
| `cadastro_concluido` | Conta criada com sucesso |
| `email_confirmado` | Clique no link de confirmação |
| `onboarding_concluido` | Bloco 3 salvo |
| `onboarding_pulado` | "Fazer isso depois" |
| `recuperacao_senha_iniciada` | Clique em "Esqueci minha senha" |
| `perfil_campo_salvo` | Salvar qualquer campo do perfil |
| `download_sem_login` | Usuário anônimo tentou baixar material |
| `download_pos_login` | Download executado após login |

---

## 9. Sequência de implementação sugerida

```
1. Partials novos: toast, password-strength, profile-progress
2. login-modal.php  ← base de tudo, mais reutilizado
3. cadastro-bloco-1.php
4. cadastro-bloco-2.php
5. confirmacao-email.php
6. onboarding.php
7. recupera-senha.php + redefine-senha.php
8. dashboard-perfil.php
9. Modificar form-download.php
10. E-mails transacionais (4 templates)
```

---

## 10. E-mails transacionais

4 templates HTML standalone — não são layouts PHP.
Salvar em `src/emails/` (pasta nova).

| Arquivo | Trigger | Link válido |
|---|---|---|
| `email-confirmacao.html` | Pós-Bloco 2 | 24h |
| `email-boasvindas.html` | Pós-confirmação | sem expiração |
| `email-recuperacao-senha.html` | Solicitar reset | 1h |
| `email-exclusao-conta.html` | Solicitar exclusão | [X] dias |

**Diretrizes de layout dos e-mails:**
- Largura máxima: 600px (compatível com Gmail, Outlook, Apple Mail)
- Fonte inline: `'Open Sans', Arial, sans-serif` (sem Google Fonts — não carrega em e-mail)
- CTA: `display: table` para compatibilidade Outlook
- Todo CTA tem fallback de link em texto simples abaixo
- Header: `background: #002244`, logo branco centralizado
- Footer obrigatório: Política de Privacidade | Termos | Descadastrar + endereço empresa
- E-mail de exclusão: **sem** link de descadastro (contexto legal/transacional)

---

## 11. Acessibilidade — mínimo obrigatório

```
Modal:        role="dialog", aria-modal="true", aria-labelledby=[id do título]
Overlay:      aria-hidden="true"
Focus trap:   Tab/Shift+Tab ficam dentro do modal
Fechar ESC:   document.addEventListener('keydown')
Inputs:       <label for=[id]> associado, aria-describedby=[id]-helper
Erros:        aria-invalid="true" + role="alert" no helper de erro
Progress bar: role="progressbar", aria-valuenow, aria-valuemin, aria-valuemax
Countdown:    aria-live="polite"
```

---

## 12. Checklist de implementação

### Partials novos
- [ ] `toast.php` + showcase
- [ ] `password-strength.php` + showcase
- [ ] `profile-progress.php` + showcase

### Layouts de autenticação
- [ ] `login-modal.php` — 7 estados
- [ ] `cadastro-bloco-1.php`
- [ ] `cadastro-bloco-2.php`
- [ ] `confirmacao-email.php` (Tela A + Tela B)
- [ ] `onboarding.php`
- [ ] `recupera-senha.php`
- [ ] `redefine-senha.php`

### Dashboard
- [ ] `dashboard-perfil.php`
- [ ] Seção 1: dados básicos + upload de foto
- [ ] Seção 2: dados profissionais
- [ ] Seção 3: fiscal + localização + CEP auto
- [ ] Seção 4: exclusão de conta
- [ ] Barra de progresso

### Integração existente
- [ ] `form-download.php` — lógica de usuário logado

### JavaScript
- [ ] `auth-modal.js`
- [ ] `password-strength.js`
- [ ] `form-cadastro.js`
- [ ] `toast.js`

### E-mails
- [ ] `email-confirmacao.html`
- [ ] `email-boasvindas.html`
- [ ] `email-recuperacao-senha.html`
- [ ] `email-exclusao-conta.html`

---

*Feature: Cadastro e Perfil de Usuário | Projeto: Canais Digitais 2.0 / WP Theme*
*Responsável: Micaelly Caetano | 12/04/2026*
