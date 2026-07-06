# Cenários inexistentes — mapa

> Inventário dos estados/telas que ainda **não existem** no protótipo, para virar backlog.
> Criado em **2026-07-06**. Foco atual: **área logada** (`dashboard-perfil-v4`).

**Status legend:** ⬜ a fazer · 🔄 em progresso · ✅ feito · ❌ N/A

---

## 💡 Descoberta que amarra o foco atual

Hoje o `?state=empty` do [`dashboard-perfil-v4`](../src/screens/dashboard-perfil-v4/index.tsx) só afeta a aba **Últimas leituras** — Downloads, Newsletter e Perfil ignoram. Ou seja, "conta recém-criada" **não é holística**. Os dois cenários pedidos (Downloads vazio + Perfil 100%) são casos de um modelo maior: a área logada deveria variar por **persona/estado global**.

### Personas da área logada

| Persona | Perfil | Downloads | Últimas | Newsletter |
|---|---|---|---|---|
| **Novo** (recém-criado) | parcial (~44%) | vazio | vazio | nenhuma ativa (0/6) |
| **Parcial** (default de hoje) | ~44% | 24 itens | populada | 2 de 6 |
| **Engajado / completo** | **100%** | populada | populada | todas (6/6) |

**Trigger (decidido):** reusa `?state=` — `?state=empty` esvazia **Downloads + Últimas** (novo usuário; Perfil segue parcial); `?state=completo` → **Perfil 100%**. `?state=saved` (toast) segue ortogonal. O `?persona=` do #5 fica para quando as demais abas (Newsletter etc.) entrarem.

---

## Cenários — foco atual (área logada)

### 1. Downloads — empty (novo usuário) ✅
- **Onde/gatilho:** aba Downloads do `dashboard-perfil-v4`, `?tab=downloads&state=empty`.
- **O que mostra:** card vazio "Você ainda não baixou nenhum material" + subtexto + CTA "Explorar conteúdos" → `/home`, sem lista nem paginação.
- **Reaproveita:** o mesmo padrão de empty do `UltimasPane` — card `bg-neutral-50` + ícone `download` em círculo + título + texto + botão.

### 2. Perfil — 100% completo ✅
- **Onde/gatilho:** aba Perfil, `?tab=perfil&state=completo`.
- **Abordagem (supressão):** o estado completo é o perfil **sem o andaime de completude** — some o banner `ProfileMetrics`, as badges "Complete seu Perfil" e o subtítulo "% completo / N restantes"; `ProfileBox` sem `incomplete`/`placeholder`; a box Demográficos mostra valores reais. Sem mensagem/CTA nova (a tela ganhará funcionalidades na evolução do produto).
- **Reaproveita:** `ProfileMetrics`/`ProfileBox` (só recebem props diferentes) + novo mock `PERFIL_CAMPOS_COMPLETO`.

### 3. Perfil — 0% / recém-criado — ❌ N/A
- **Descartado:** o cadastro exige preencher boa parte dos dados, então um perfil recém-criado **nunca fica em 0%**. A persona "Novo" mantém o perfil **parcial** (~44%), não vazio.

### 4. Newsletter — nenhuma ativa (0/6) e todas ativas (6/6) ⬜
- **Onde:** aba Newsletter (`?tab=newsletter`).
- **O que muda:** contador "0 newsletters ativas de 6" (nudge para ativar) e "6 de 6".
- **Reaproveitar:** `NewsletterPane` + mock `NEWSLETTERS` (hoje fixo em 2/6). Amarrar aos `checked` por persona.

### 5. Empty/estado holístico ⬜
- **O quê:** fazer o estado de persona valer para **todas** as abas ao mesmo tempo (Perfil + Downloads + Últimas + Newsletter), em vez do `isEmpty` solto que hoje só chega no `UltimasPane`.
- **Onde:** orquestração no topo do `DashboardPerfilV4Screen` (derivar de `?persona=` e propagar para cada Pane).

---

## Fora do foco atual (registrado p/ depois)

Descoberta/conteúdo:
- **6.** Busca — sem resultados ("Nenhum resultado para '…'") · `/buscar` ⬜
- **7.** Categoria — vazia (editoria sem artigos) · `/categoria` ⬜
- **8.** Newsletter (form) — sucesso/confirmação após assinar · `/form-newsletter` ⬜
- **9.** Conteúdo bloqueado/paywall para não-logado · `/conteudo` ⬜

Sistêmicos:
- **10.** Página de erro genérica (500) — só existe 404 ⬜
- **11.** Loading / skeleton de listas (home, categoria, busca) ⬜
- **12.** Toast de erro (só existe o de sucesso "Alterações salvas") ⬜

> **Auth & e-mails** (login, cadastro, recuperar/redefinir senha, confirmação de e-mail, gate-download, excluir-conta) estão **bem cobertos** — `empty/invalid/locked/existente/sent/expired/used/throttle` etc. já existem via `?error=`/`?state=` + `AuthDevNav`.

---

## Convenções ao construir

- Seguir a versão viva: **`dashboard-perfil-v4`** (o `-v3` é predecessor arquivado).
- Estados via **query param** (padrão do projeto: `?tab=`, `?state=`, `?error=`, `?page=`), sem estado de servidor.
- Dados mockados em `src/mocks/dashboard-perfil.ts`; reaproveitar componentes existentes, sem novos padrões.
