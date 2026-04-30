# CLAUDE.md — Canais Digitais 2.0 / WP Theme

> Leia este arquivo antes de qualquer ação.

---

## Projeto

Reprodução fiel do Figma em PHP + Tailwind v4, produzida pelo Product Designer como **fonte da verdade visual**. Os componentes são entregues ao time de Devs para integração no tema WordPress real. Este projeto não é o tema em produção.

> Para decisões de Design, personalidade visual, regras de negócio e tokens — consulte o **[DESIGN.md](./DESIGN.md)** na raiz do projeto antes de implementar qualquer componente ou layout.

---

## Ambiente

**Servidor local** — rodar sempre antes de trabalhar:
```bash
cd C:\wptheme
C:\xampp\php\php.exe -S localhost:8000 router.php
```
> `C:\wptheme` é uma junction para `C:\Pedro\Informa\Canais Digitais\Redesign\WP Theme` (necessária por causa dos espaços no path).

**Tailwind rebuild** — rodar após qualquer alteração de classes:
```bash
./tools/tailwindcss.exe -i src/styles/input.css -o src/docs/output.css
```

**Preview:**
- Componentes: `http://localhost:8000/src/docs/index.html`
- Layouts: `http://localhost:8000/src/docs/layouts.html`
- Layouts standalone: `http://localhost:8000/src/layouts/<nome>.php`

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Templates | PHP (WordPress-like) |
| Estilização | Tailwind CSS v4 — tokens em `src/tokens/tokens.css` via `@theme` |
| Servidor local | PHP built-in + `router.php` |
| Design | Figma via MCP |

> Tailwind v4 não usa `tailwind.config.js`. Tokens vivem em `src/tokens/tokens.css`.

---

## Estrutura de pastas

```
/src
  /components
    /_partials    ← átomos parametrizados (uma instância, aceita $args)
    *.php         ← showcases (galeria de todas as variantes — não incluir em layouts)
  /tokens
    tokens.css    ← fonte da verdade de design tokens
  /layouts        ← páginas completas (PHP nativo, includes reais)
  /styles
    input.css     ← entrypoint Tailwind
  /docs           ← preview HTML + output.css
/figma-specs      ← specs e inventário por componente
```

---

## Arquitetura: Showcases vs Partials

| | Showcase (`/src/components/*.php`) | Partial (`/src/components/_partials/*.php`) |
|---|---|---|
| **O que é** | Galeria de todas as variantes | Uma instância parametrizada |
| **Usado em** | Preview/documentação | Layouts e componentes compostos |
| **Como incluir** | Nunca incluir em layouts | `get_template_part('components/_partials/nome', null, $args)` |

**Regra crítica:** layouts e componentes compostos usam sempre `_partials/` via `get_template_part`. Nunca copiar markup inline de um showcase.

---

## Comportamento do router.php

| Rota | Comportamento |
|------|--------------|
| `/src/components/**` | Texto plano — showcase.js resolve PHP client-side |
| `/src/layouts/**` | PHP nativo — includes e get_template_part executam de verdade |
| `/src/layouts/**?raw` | Texto plano — para o layouts.js processar |
| demais | Estático |

---

## Regras de implementação

**Antes de qualquer código:**
1. Inspecionar o frame no Figma via MCP
2. Verificar se os tokens necessários existem em `src/tokens/tokens.css`
3. Verificar se já existe partial ou showcase equivalente em `/src/components`
4. Consultar `figma-specs/_inventario.md` para o nodeId

**Tokens — nunca usar valores hardcoded:**
- Cores: `--color-{primary|secondary|neutral}-{50..950}`
- Fontes: `--font-display` (Aleo) / `--font-body` (Open Sans)
- Tipografia: 17 escalas MD3 (`--text-display-lg` → `--text-label-sm`)
- Espaçamento: base 4px (padrão Tailwind v4)
- Radius: escala padrão Tailwind v4 — valores do DS: 2px→`rounded-xs`, 4px→`rounded-sm`, 8px→`rounded-lg`, 16px→`rounded-2xl` (rounded-md NÃO faz parte do DS)
- Sombras: escala nativa Tailwind (`shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`)

**Padrão de cabeçalho de cada componente:**
```php
<?php
/**
 * Componente: Nome
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/...?node-id=XXX
 * Variantes: variante-a | variante-b | variante-c
 * Tokens usados: token-1, token-2
 */
?>
```

---

## Regras de economia de contexto

- Não explique o que vai fazer — apenas faça
- Não repita código completo no chat — referencie pelo caminho do arquivo
- Leia arquivos do disco em vez de pedir para o usuário colar
- Consulte o Figma via MCP uma vez por componente — extraia tudo e salve em `figma-specs/`
- Sessões com foco único — um objetivo por sessão
- Pergunte apenas se houver bloqueio real

---

## O que NÃO fazer

- ❌ Valores hardcoded de cor, fonte ou espaçamento
- ❌ CSS fora do Tailwind (`<style>` avulso, `.css` separado)
- ❌ Implementar sem inspecionar o Figma primeiro
- ❌ Criar componente sem documentar no showcase e em `figma-specs/`
- ❌ Copiar markup de showcase dentro de layout ou partial
- ❌ Reescrever inline algo que já existe como partial

---

## Fluxo para novas features (PRD)

1. Ler o PRD completo
2. Inspecionar Figma via MCP para os frames mencionados
3. Mapear componentes existentes reutilizáveis
4. Listar componentes novos necessários
5. Confirmar plano antes de codificar
6. Implementar: tokens → partials → layouts
7. Documentar tudo

---

## Estado atual

**Partials:** avatar, badge, tag, divider, image, thumbnail, play-button, categoria, byline, podcast-meta, sponsor-line, link-button, button, icon-button, icon-tile, section-title, nav-item, header-desktop, footer-desktop, form-field, form-select, form-checkbox, form-disclaimer, form-toggle, orbit, search-bar, toast, password-strength, profile-progress, completion-card, stat-card, session-row, proof-panel, proof-panel-minimal, auth-shell, cadastro-stepper, social-button, dashboard-header, coming-soon, dashboard-welcome, dashboard-tabs-v3, drawer, profile-box, recent-news-item, newsletter-item, download-item, access-method-card, general-item, pagination

**Showcases (52):** cobertura completa do inventário — ver `figma-specs/_inventario.md`

**Layouts concluídos:**

_Editorial / públicos:_
- ✅ `home.php` (NodeId: 973:6474)
- ✅ `categoria.php` (NodeId: 5433:16684)
- ✅ `conteudo.php` (NodeId: 4179:32002)
- ✅ `menu.php` (NodeId: 986:21416)
- ✅ `buscar.php` (NodeId: 1785:17716)

_Institucionais:_
- ✅ `contato.php` (NodeId: 4935:30241)
- ✅ `sobre.php` (NodeId: 4951:50343)
- ✅ `anuncie.php` (NodeId: 4941:49088)

_Forms / utilitários:_
- ✅ `404.php`
- ✅ `form-newsletter.php`
- ✅ `form-download.php`

_Auth v3.0:_
- ✅ `login.php` (NodeId: 6268:18394) — split 560 + proof-panel-minimal
- ✅ `cadastro.php` (NodeId: 6269:18460 / 6271:18788 / 6271:19008) — single-file 3 steps via `?step=`
- ✅ `recupera-senha.php` — solicitar link
- ✅ `redefine-senha.php` — definir nova senha + estados de token
- ✅ `confirmacao-email.php` — aguardando / sucesso / link expirado

_Dashboard / área logada:_
- ✅ `dashboard.php` — hub legado com 7 sub-seções via `?section=`
- ✅ `dashboard-perfil-v3.php` (NodeId: 6155:31441) — modelo tabbed canônico (6 abas + drawer)

_LGPD account flows:_
- ✅ `meus-dados.php` — portabilidade (Art. 18 V)
- ✅ `consentimentos.php` — log auditável (Art. 18 II)
- ✅ `excluir-conta.php` — direito ao esquecimento (Art. 18 IX), confirmação em modal

**Bug conhecido:** play-button no showcase renderiza fragmento PHP no preview client-side. Funciona corretamente nos layouts via PHP nativo.

**Migrações de DS concluídas (2026-04-10):**
- Shadows: MD3 `shadow-elevation-{1..5}` → Tailwind nativo (`shadow-sm/md/lg/xl`). Tokens removidos de `tokens.css`.
- Container: `max-w-[1224px]` → `max-w-screen-xl` (1280px). Padding de página: `px-4 lg:px-6`.
- Border radius: `rounded-md` (6px) removido do DS. Valores em uso: `rounded-xs/sm/lg/2xl/full`.

**Header v2.0 (2026-04-12):**
- `_partials/header-desktop.php` atualizado para v2 — adicionado divider vertical + botão "Entrar" (Outlined pill com ícone `account_circle`) entre search-bar e "Anuncie". NodeId `5754:7270`.
- Backup do v1 em `_partials/header-desktop-v1-backup.php`.
- Todos os layouts que chamam o partial pegam a nova versão automaticamente.

**Navegação entre layouts (2026-04-12):**
Todos os `href="#"` de destino identificável substituídos por rotas reais em:
header-desktop, footer-desktop, home, categoria, conteudo, buscar, menu, form-download.
Mantidos como `#`: "Assine agora" (newsletter), "Company Name" (sponsor externo),
social icons, links legais (Termos, Privacidade, Acessibilidade), strip Informa PLC.

**Dashboard Perfil v3 — modelo tabbed (2026-04-27):**
- `dashboard-perfil-v3.php` (NodeId `6155:31441`) — 6 tabs (Visão geral / Perfil / Newsletter / Downloads / Favoritos *desabilitada* / Conta).
- v1 (`dashboard-perfil.php`) e v2 (`dashboard-perfil-v2.php`) preservados intactos.
- Rotas: `?tab=geral|perfil|newsletter|downloads|conta`, `?drawer=dados-pessoais|dados-profissionais|dados-fiscais` (só na aba perfil), `?state=saved` → toast.
- Novos partials criados: `dashboard-welcome`, `dashboard-tabs-v3`, `drawer` (560px right slide-in com scrim), `profile-box` (3 colunas + variante incomplete), `recent-news-item`, `newsletter-item`, `download-item`, `access-method-card`, `general-item`, `pagination`.
- Token novo: `--color-mint-light` (#C9FCED) → `bg-mint-light` (chip "Complete seu Perfil" + hero card mint da Visão Geral).
- Spec completo: `figma-specs/dashboard-perfil-v3.md`.

**LGPD account flows (2026-04-29):**
- `meus-dados.php` — portabilidade (LGPD Art. 18 V). Form de escopo + formato
  (JSON/CSV) + histórico de solicitações com status pills. Estados: `?state=default|requested`.
- `consentimentos.php` — log auditável (Art. 18 II). Archive editorial agrupado
  por ano (display-md Aleo como âncora), eventos em grid date+content, filtros por
  tipo. Sem timeline-com-dots (decisão anti-AI-slop). Estados:
  `?filter=all|termos|privacidade|newsletters|comunicacoes|cookies`.
- `excluir-conta.php` — direito ao esquecimento (Art. 18 IX). Multi-step:
  intro (educação + alternativas) → confirm (digitar EXCLUIR + checkbox) →
  sent (e-mail enviado) → marked (countdown 30 dias com cancelamento) → cancel.
  Tom respeitoso/transparente, não punitivo. Botão destrutivo em red-600.
- Linkados no dashboard-perfil-v3 aba Conta, bloco "Privacidade & LGPD".

**Auth auxiliary screens v3.0 (2026-04-29):**
- `recupera-senha.php`, `confirmacao-email.php`, `redefine-senha.php` migrados para
  o sistema canônico (split 560 + proof-panel-minimal + animate-fade-up-sm).
  v1 preservadas em `*-v1-backup.php`.
- Status colors agora via tokens nativos Tailwind: `green-50/600` (success),
  `amber-50/700` (warning/expired), `red-50/600` (erro de input — já em DESIGN.md),
  `secondary-500/10` + `secondary-950` (info/waiting), `primary-100/600` (used/neutro).
- Variante nova no `proof-panel-minimal`: `welcome` ("Bem-vindo aos Canais Digitais.")
  usada nos estados de sucesso (confirmacao success / redefine success).
- Estados consolidados: confirmacao tinha `expired` + `link-expired` duplicados;
  agora apenas `link-expired` (amber/warning, não vermelho — não é erro do usuário).
- Navegação interna corrigida: removidas todas as referências a `login-modal.php`,
  `onboarding.php`, `cadastro-bloco-1.php` (todos backups).
- BAN /impeccable removido: `border-l-4` no callout de sucesso eliminado em recupera.

**Login + Cadastro v3.0 (2026-04-29):**
- `login.php` reescrito (NodeId `6268:18394`) — split 560px + proof panel minimal,
  social buttons (LinkedIn + Google), e-mail/senha + esqueci-senha. Estados de erro:
  `?error=empty|wrong|not-found|locked`. v1 preservado em `login-v1-backup.php`.
- `cadastro.php` reescrito como single-file multi-step (`?step=1|2|3`), substitui
  `cadastro-bloco-1.php`, `cadastro-bloco-2.php` e `onboarding.php` (todos em `*-backup.php`).
  - Step 1 (`6269:18460`): e-mail + Avançar. Erros: `empty|invalido|existente`.
  - Step 2 (`6271:18788`): senha + confirmar + termos/marketing. Erros: `fraca|mismatch|termos`.
  - Step 3 (`6271:19008`): nome/telefone/empresa/cargo/setor. Erros: `campos`.
  - Step 3 → `confirmacao-email.php`. E-mail propaga via `?email=...`.
- Novos partials: `proof-panel-minimal` (gradient navy→ultramarine + headline+sub),
  `cadastro-stepper` (3 dots: done/active/pending), `social-button` (LinkedIn/Google).
- Animações novas em tokens.css: `animate-fade-up` (480ms) + `animate-fade-up-sm` (360ms),
  com `cubic-bezier(0.05, 0.7, 0.1, 1)` (emphasized-decelerate MD3).

**Header v3.0 — Estado logado (2026-04-15):**
- `_partials/header-desktop.php` estendido para v3 — renderização condicional por `$userLoggedIn`.
  Props novas: `userLoggedIn`, `userName`, `userEmail`, `userInitials`, `userAvatar`.
  Quando logado: avatar + primeiro nome + dropdown ("Minha Conta Informa" / "Sair").
- `_session.php` criado em `src/layouts/` como helper de simulação. Lê `$_GET['user']`
  e exporta `$headerArgs` (passar para `get_template_part` do header) + função
  `render_session_toggle()` para o seletor Anônimo/Logado.
- Propagação de `?user=` em todos os links internos (exceto login/cadastro/recupera/
  confirmacao/onboarding) via `cadastro-flow.js`.
- `form-download.php`: estado auto-detecta `?user=logged` → `logged-direct-download`.
- Layouts com seletor de sessão: home, categoria, conteudo, buscar, form-download.
- Layouts com interactions.js carregado: home, categoria, conteudo, buscar, form-download,
  404, sobre, contato, anuncie.

---

## Links

| Recurso | Link |
|---------|------|
| Figma | https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0 |
| Inventário | `figma-specs/_inventario.md` |
| Tokens preview | `http://localhost:8000/src/docs/tokens.html` |
| Tipografia | `http://localhost:8000/src/docs/typography.html` |
| Iconografia | `http://localhost:8000/src/docs/icons.html` |
