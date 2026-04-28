# FEATURE-cadastro-etapa2.md — Cadastro e Perfil: Etapa 2
## Canais Digitais 2.0 / WP Theme

> Leia este arquivo junto com `CLAUDE.md`, `DESIGN.md` e `FEATURE-cadastro.md`.
> Este documento estende a Etapa 1 — não a substitui.

**Responsável:** Micaelly Caetano
**Status:** Em especificação
**Última atualização:** 15/04/2026

---

## Escopo desta etapa

| Item | Descrição |
|---|---|
| 2.1 | Preferências de comunicação (toggles no Dashboard) |
| 2.2 | Histórico de downloads no perfil |
| 2.3 | Redesenho de UX e Copy — Conta Informa (conta global) |
| 2.4 | Cenários de sessão e edge cases não cobertos na Etapa 1 |

**Continua em stand by:** favoritar notícias, gated content editorial, histórico de leitura, troca de e-mail.

---

## 2.1 Preferências de Comunicação

### Localização
Nova seção no `dashboard-perfil.php`, após "Dados Fiscais e Localização".
Nome da seção: **"Comunicações"**.

### Campos

| Toggle | Label | Padrão | Comportamento |
|---|---|---|---|
| Newsletter | "Receber newsletter segmentada por setor" | Desligado | Auto-save ao clicar |
| Marketing | "Receber comunicações e novidades da Informa Markets" | Desligado | Auto-save ao clicar |

**Regra de padrão:** sempre iniciar desligado, independente do que foi escolhido no cadastro. O estado real virá da API — neste protótipo, sempre off.

**Auto-save ao clicar:**
```
Usuário clica no toggle
→ Toggle muda visualmente (imediato, otimista)
→ Toast de sucesso: "Preferência salva."
→ Se erro (simulado): toggle reverte + toast de erro "Não foi possível salvar. Tente novamente."
```

### Partial necessário
`_partials/form-toggle.php` — criar conforme spec em `component-new-specs.md §2`.

### Conformidade LGPD
- Os dois toggles são consentimentos distintos — registrar separadamente
- O opt-in de marketing (toggle 2) é explicitamente opcional
- Texto auxiliar abaixo de cada toggle:
  - Newsletter: "Você pode cancelar a qualquer momento nas suas preferências."
  - Marketing: "Ao ativar, você concorda em receber ofertas e novidades por e-mail."

---

## 2.2 Histórico de Downloads

### Localização
Nova seção no `dashboard-perfil.php`, após a seção "Comunicações".
Nome da seção: **"Meus Downloads"**.

### Dados por item

| Campo | Descrição |
|---|---|
| Título | Nome do material |
| Tipo | E-book · Whitepaper · Relatório · Guia |
| Portal de origem | Em qual dos 11 portais foi baixado (ex: "Food Connection") |
| Data | Data do download (formato: "12 abr. 2026") |
| Ação | Botão "Baixar novamente" |

### Limite e paginação
- Exibir os **10 downloads mais recentes** por padrão
- Paginação simples: botões de página numéricos + setas (mesmo padrão do `pagination.php` existente)
- Cada página: 10 itens

### Material removido do portal
Exibir a linha normalmente, mas com:
- Título em `text-neutral-400` (cinza claro)
- Badge: "Material não disponível" — `text-label-sm`, `bg-neutral-50`, `text-neutral-500`
- Botão "Baixar novamente" substituído por texto "Indisponível" — desabilitado, sem cursor pointer

### Estado vazio (sem downloads)
```
[ícone download — neutral-200, 48px]
"Você ainda não baixou nenhum material."
"Explore nossa Biblioteca e faça o download de e-books e whitepapers gratuitos."
[btn outlined "Ver Biblioteca"] → /src/layouts/form-download.php
```

### Dados de mock para o protótipo

```php
$downloads = [
  ['title' => '10 Tendências em Food Service para 2026',
   'type' => 'E-book', 'portal' => 'Food Connection',
   'date' => '12 abr. 2026', 'available' => true],

  ['title' => 'Guia de Embalagens Sustentáveis',
   'type' => 'Guia', 'portal' => 'Food Connection',
   'date' => '03 mar. 2026', 'available' => true],

  ['title' => 'Relatório Setorial: Proteína Animal 2025',
   'type' => 'Relatório', 'portal' => 'Food Connection',
   'date' => '18 fev. 2026', 'available' => false], // material removido

  ['title' => 'Whitepaper: IA na Indústria de Alimentos',
   'type' => 'Whitepaper', 'portal' => 'Food Connection',
   'date' => '05 jan. 2026', 'available' => true],
];
```

---

## 2.3 Redesenho de UX e Copy — Conta Informa

### Conceito central
"Uma conta gratuita para acessar todos os portais Informa Markets."

**Nome do produto:** Conta Informa
**Tagline:** "Uma conta. Todos os portais. É grátis."

### Lista dos portais (a confirmar — usar esta lista por ora)

```
Food Connection · Canal Energia · Aquaculture Brasil
Inovação em Pauta · Cosmetiquim · AgroPages
Animal Business Brasil · Ingredientes Online
InfoAdubo · Borracha Atual · PlastiForum
```

> ⚠️ Confirmar nomes exatos e logos com o time antes de ir para produção.
> Para o protótipo, usar os nomes em texto — logos a adicionar quando disponíveis.

### Onde comunicar e o que mostrar

---

#### A. Bloco 1 do Cadastro (`cadastro-bloco-1.php`)

**Adicionar acima do campo de e-mail:**

```
[grade de logos dos portais — 11 ícones pequenos, em linha]
"Uma conta. Todos os portais. É grátis."
```

Layout da grade (mock sem logos reais):
```php
$portais = [
  'Food Connection', 'Canal Energia', 'Aquaculture Brasil',
  'Inovação em Pauta', 'Cosmetiquim', 'AgroPages',
  'Animal Business', 'Ingredientes Online', 'InfoAdubo',
  'Borracha Atual', 'PlastiForum',
];
// Renderizar como chips pill (bg-neutral-50, text-label-sm, rounded-full)
// Dispostos em flex-wrap, centralizados
// Quando os logos estiverem disponíveis, substituir por <img>
```

---

#### B. Modal de Login (`login-modal.php`)

**Adicionar abaixo do título "Entrar", antes do subtítulo:**

```
[chips dos portais — versão compacta, 6 chips + "e mais X"]
```

Versão compacta: mostrar os primeiros 6 portais como chips pequenos + pill "e mais 5" clicável (sem ação no protótipo).

---

#### C. Dashboard de Perfil (`dashboard-perfil.php`)

**Badge no cabeçalho** (equivalente ao "Conta Globo Desde 2026" da referência):

```
[avatar] [Nome do usuário]        [badge "Conta Informa · Desde abr. 2026"]
         [e-mail]
```

Badge:
```
bg-secondary-50 · text-secondary-950 · text-label-sm · rounded-full
padding: px-3 py-1
ícone: account_circle 14px à esquerda
```

---

#### D. E-mails transacionais

**Email de boas-vindas (`email-boasvindas.html`):**
- Substituir o bloco de benefícios atual pela grade dos portais
- Tagline no footer do e-mail: "Uma conta. Todos os portais. É grátis."
- Título: "Boas-vindas à sua Conta Informa"

**Email de confirmação (`email-confirmacao.html`):**
- Adicionar abaixo do botão de confirmação:
  "Com sua Conta Informa, você acessa Food Connection, Canal Energia e mais 9 portais."

**Email de recuperação de senha (`email-recuperacao-senha.html`):**
- Sem alteração de conteúdo — apenas manter identidade "Conta Informa" no header

**Email de exclusão (`email-exclusao-conta.html`):**
- Sem alteração de conteúdo

---

#### E. UX Writing — alterações de copy

| Elemento | Copy atual | Copy novo |
|---|---|---|
| Título do Bloco 1 | "Qual é o seu e-mail?" | "Qual é o seu e-mail?" *(manter)* |
| Subtítulo do Bloco 1 | "Recomendamos o uso do seu e-mail corporativo." | "Crie sua Conta Informa e acesse todos os portais gratuitamente." |
| Subtítulo do Bloco 2 | "Crie uma senha" | "Crie uma senha para sua Conta Informa" |
| Texto do Bloco 3 | "Essas informações personalizam sua experiência no portal." | "Essas informações personalizam sua experiência em todos os portais Informa." |
| Título do Dashboard | "Meu Perfil" | "Minha Conta Informa" |
| Link "Entrar" no header | "Entrar" | "Entrar" *(manter — é o ponto de entrada, não o nome da conta)* |
| Texto de boas-vindas (email) | — | "Boas-vindas à sua Conta Informa" |
| Tagline dos emails | — | "Uma conta. Todos os portais. É grátis." |

---

### SSO entre portais (comportamento no protótipo)
O leitor **precisa logar novamente** ao trocar de portal — não há SSO automático nesta fase. Comunicar isso de forma transparente:

No dashboard, na seção de cabeçalho da Conta Informa:
```
"Sua conta é válida em todos os portais Informa.
 Ao acessar outro portal, faça login com o mesmo e-mail e senha."
```
Fonte: `text-body-sm`, cor: `text-neutral-600`.

---

## 2.4 Cenários de Sessão e Edge Cases

### 2.4.1 Sessão expirada mid-session (token de 30 dias)

**Trigger no protótipo:** estado `session-expired` no navegador de estados do `login-modal.php`.

**Comportamento simulado:**
```
Estado 'session-expired' do login-modal:
→ Badge de contexto: "Sua sessão expirou. Entre novamente para continuar."
→ Subtítulo diferenciado (já implementado)
→ Após login (submit): redirecionar para /src/layouts/form-download.php?user=logged
  (simula retorno ao ponto de origem com download disponível)
```

**Copy do alerta:**
```
Tipo: warning
Ícone: clock
Texto: "Sua sessão expirou após 30 dias de inatividade.
        Entre novamente para continuar."
```

**Para o dev (backend):**
- Refresh token silencioso enquanto o usuário estiver ativo
- Ao expirar: interceptar próxima requisição autenticada → disparar estado `session-expired` no modal

---

### 2.4.2 E-mail não confirmado — link expirado (após 24h)

**Novo sub-estado:** `confirmacao-email.php?state=link-expired`

**O que renderizar:**
```
[ícone alert-circle — vermelho, 48px]
"Seu link expirou"
"O link de confirmação é válido por 24 horas.
 Solicite um novo para ativar sua conta."

[btn filled "Enviar novo link"] → /src/layouts/confirmacao-email.php?state=waiting
[link] "Voltar para o login" → /src/layouts/login-modal.php
```

**Adicionar ao `$allowedStates` do `confirmacao-email.php`:**
```php
$allowedStates = ['waiting', 'success', 'link-expired'];
```

**Adicionar ao navegador de estados:** chip "Link expirado" apontando para `?state=link-expired`.

**Copy do estado `error-unverified` no login-modal** (quando o link ainda está válido):
```
Tipo: warning
Texto: "Seu e-mail ainda não foi confirmado."
Link inline: "Reenviar e-mail de confirmação"
```

**Diferença de copy para link expirado** (estado `link-expired` em `confirmacao-email.php`):
```
"Seu link expirou. Solicite um novo para ativar sua conta."
```

---

### 2.4.3 Vinculação de contas (LinkedIn + cadastro manual)

**Quando acontece:** usuário faz login com LinkedIn usando um e-mail já cadastrado manualmente.

**Comportamento:** unificação silenciosa de IDs (backend) + **toast de feedback visual**.

**Toast:**
```
Tipo: success
Texto: "Conta vinculada ao LinkedIn com sucesso."
Auto-dismiss: 4s
```

**Simular no protótipo:**
No navegador de estados do `login-modal.php`, adicionar estado `linkedin-merge`:
- Exibir o modal no estado default
- Após "submit" (clique no botão Entrar no estado linkedin-merge):
  → Redirecionar para `/` com `?toast=linkedin-merge` na URL
  → A home.php detecta o param e exibe o toast

Ou mais simples: adicionar ao `login-modal.php` um estado que simula o pós-login com o toast já visível.

---

### 2.4.4 Exclusão de conta com histórico de downloads

**Decisão:** histórico retido pelo prazo LGPD — não apagado imediatamente.

**Atualizar o modal de confirmação de exclusão no `dashboard-perfil.php`:**

```
Título: "Excluir sua Conta Informa?"

Texto:
"Esta ação encerrará seu acesso a todos os portais Informa.
 Seus dados pessoais serão removidos em até [X] dias úteis,
 conforme a Lei Geral de Proteção de Dados (LGPD).

 Seu histórico de downloads será mantido pelo prazo mínimo
 exigido por lei e não será utilizado para novas comunicações."

[campo: digitar "EXCLUIR" para confirmar]
[btn ghost "Cancelar"]
[btn filled cor erro "Sim, excluir minha conta"]
```

**Atualizar também o `email-exclusao-conta.html`** para refletir que:
- O histórico de downloads fica retido pelo prazo LGPD
- O acesso a **todos** os portais Informa é encerrado imediatamente

---

## Partials novos necessários nesta etapa

| Partial | Arquivo | Status |
|---|---|---|
| Toggle (switch on/off) | `_partials/form-toggle.php` | Criar |

Todos os outros partials desta etapa reutilizam o que já existe.

---

## Layouts a modificar nesta etapa

| Arquivo | Modificações |
|---|---|
| `dashboard-perfil.php` | + Seção "Comunicações" (2 toggles) · + Seção "Meus Downloads" · Badge "Conta Informa" no header · Modal de exclusão atualizado |
| `login-modal.php` | + Chips de portais no cabeçalho · + Estado `linkedin-merge` |
| `cadastro-bloco-1.php` | + Grade de portais · Copy atualizado |
| `cadastro-bloco-2.php` | + Copy atualizado |
| `onboarding.php` | + Copy atualizado |
| `confirmacao-email.php` | + Estado `link-expired` · + Chip no navegador de estados |
| `form-download.php` | Sem alteração nesta etapa |

---

## E-mails a modificar

| Arquivo | Modificações |
|---|---|
| `email-boasvindas.html` | Grade de portais · Título "Conta Informa" · Tagline |
| `email-confirmacao.html` | Linha sobre portais após o botão |
| `email-recuperacao-senha.html` | Identidade "Conta Informa" no header |
| `email-exclusao-conta.html` | Texto sobre histórico retido · Menção a todos os portais |

---

## Sequência de implementação sugerida

```
1. Criar partial form-toggle.php + showcase
2. Atualizar dashboard-perfil.php:
   a. Badge "Conta Informa" no header
   b. Seção "Comunicações" com os 2 toggles
   c. Seção "Meus Downloads" com mock de 4 itens + estado vazio
   d. Modal de exclusão atualizado (texto LGPD + histórico)
3. Atualizar login-modal.php:
   a. Chips de portais (versão compacta, 6 + "e mais 5")
   b. Estado linkedin-merge no navegador
4. Atualizar cadastro-bloco-1.php:
   a. Grade de portais (chips pill)
   b. Copy do subtítulo
5. Atualizar cadastro-bloco-2.php e onboarding.php — copy
6. Atualizar confirmacao-email.php:
   a. Estado link-expired
   b. Chip no navegador de estados
7. Atualizar e-mails transacionais (4 arquivos)
8. Rebuild Tailwind
9. Smoke test
```

---

## Checklist de implementação

### Partial novo
- [ ] `form-toggle.php` (showcase + partial + figma-spec)

### Dashboard
- [ ] Badge "Conta Informa · Desde [mês ano]" no header
- [ ] Seção "Comunicações": 2 toggles com auto-save simulado
- [ ] Seção "Meus Downloads": 4 itens mock + 1 indisponível + paginação
- [ ] Estado vazio de downloads
- [ ] Modal de exclusão com texto LGPD atualizado

### Fluxo de autenticação
- [ ] Chips de portais no login-modal (6 + "e mais 5")
- [ ] Estado `linkedin-merge` no navegador de estados do login-modal
- [ ] Grade de portais no cadastro-bloco-1
- [ ] Copy atualizado: bloco-1, bloco-2, onboarding
- [ ] Estado `link-expired` no confirmacao-email
- [ ] Copy do alerta de sessão expirada (2.4.1)

### E-mails
- [ ] email-boasvindas.html — grade de portais + "Conta Informa"
- [ ] email-confirmacao.html — linha sobre portais
- [ ] email-recuperacao-senha.html — header "Conta Informa"
- [ ] email-exclusao-conta.html — histórico retido + todos os portais

---

*Feature: Cadastro e Perfil de Usuário — Etapa 2 | Projeto: Canais Digitais 2.0 / WP Theme*
*Responsável: Micaelly Caetano | 15/04/2026*
