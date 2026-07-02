# Handoff — Área Logada Nativa (Canais Digitais)

> Visão final da rodada de consolidação do protótipo React (branch `feature/layouts-e-index`).
> Para validação com a Micaelly e referência dos devs (implementação real em PHP/WP).
> O protótipo é a **fonte da verdade visual**; a implementação real é responsabilidade dos devs.

## Como navegar

- **`/`** — índice principal (CentralScreen): só a **versão enxuta (MVP)** + templates válidos, agrupada por fluxo.
- **`/archive`** — versões **obsoletas** (referência, **não implementar**). Nada foi apagado.
- Snapshot pré-consolidação: tag `snapshot/pre-area-logada-2026-07-02` (tudo resgatável).

---

## Índice enxuto (o que implementar)

### 1. Acesso & Autenticação
| Tela | Rota | Observações |
|------|------|-------------|
| Cadastro | `/cadastro` | Modal, 3 passos; Step 2 tem checklist de senha (LOG-04). Erro "e-mail já cadastrado" → CTA Entrar (LOG-05) |
| Confirmação de e-mail | `/confirmacao-email` | Modal padrão (proof 50/50). Estado `corrigir` troca o e-mail **sem refazer o cadastro** (EML-02/04) |
| Login | `/login` | Modal. **Sem login social** (LOG-01) |
| Recuperar senha | `/recupera-senha` | Modal; "Confira sua caixa" tem **Reenviar e-mail com contador** (PWD-04) + "Tentar novamente" (PWD-01) |
| Redefinir senha | `/redefine-senha` | Modal; **sem barra de força** (PWD-02); side cases sucesso/expirado/usado (PWD-05) |
| Gate de download | `/gate-download` | Cadastro acionado pelo clique em Download (DWN-01) |

**Acesso (header):** "Acessar" (ex-"Entrar") abre no hover/clique um menu **[Login | Cadastro]** em vez do modal direto (ACS-01/02).

### 2. Perfil & LGPD
| Tela | Rota | Observações |
|------|------|-------------|
| Perfil | `/dashboard-perfil-v4` | Abas MVP: **Meu Perfil** + **Downloads**. "Em breve": Últimas leituras, Favoritos, Newsletter. Seção LGPD (Baixar dados + Excluir conta) dentro do Perfil. **Alterar senha** no bloco do topo. Sem "Minha Conta", sem sessões, sem social (PRF-01..08) |
| Consentimentos (LGPD) | `/consentimentos` | |
| Baixar dados | `/meus-dados` | **Modal de ação direta** sobre o Perfil (ACC-02) |
| Excluir conta | `/excluir-conta` | **Modal de ação direta**: confirm (motivo + digite EXCLUIR + checkbox) → done (30 dias p/ cancelar) (ACC-01) |

### 3. Editorial (templates mantidos)
`/home` · `/categoria` · `/conteudo` (Post) · `/buscar` · `/menu`

### 4. Institucionais
`/sobre` · `/contato` · `/anuncie`

### 5. E-mails (templates transacionais — preview)
| Tela | Rota |
|------|------|
| Confirmação de e-mail | `/email-confirmacao` |
| Boas-vindas | `/email-boas-vindas` |
| Recuperação de senha | `/email-recuperacao-senha` |
| Exclusão de conta | `/email-exclusao-conta` |

> Fonte da verdade do HTML de envio: `docs/legacy-reference/emails/`. Os previews React genericizaram os claims de "conta global".

### 6. Sistema
`*` → 404 (NotFoundScreen)

---

## Mapa de fluxos (início → fim)

- **Cadastro:** Header "Acessar" → Cadastro (modal, 3 passos) → **Confirmação de e-mail**. Desvio: "Errei o e-mail" → corrige e volta pra confirmação. Erro: "e-mail já cadastrado" → orienta ir pro Login.
- **Login:** Header "Acessar" → Login (modal) → área logada. Erros no próprio modal.
- **Recuperação:** Login → "Esqueci minha senha" → Recuperar senha → "Confira sua caixa" (Reenviar c/ contador) → Redefinir senha → sucesso. Side case: link expirado.
- **Perfil:** área logada → Meu Perfil (dados + LGPD) / Downloads. Baixar dados e Excluir conta abrem **modais** sobre o Perfil.
- **Download:** clique em Download (deslogado) → Gate → cadastro.
- **Legais:** links "Termos"/"Privacidade" nos modais e e-mails → **placeholder `#`** até a Informa fornecer as URLs.

---

## Arquivo (`/archive`) — obsoletas, não implementar

- Auth full-page (substituídas pelos modais): `/login-full` · `/cadastro-full` · `/recupera-senha-full` · `/redefine-senha-full` · `/confirmacao-email-full`
- Home anterior: `/home-v2`
- Perfil (iterações anteriores): `/dashboard` · `/dashboard-perfil-v3`
- Institucionais/forms fora do MVP: `/patrocinadores` · `/patrocinador` · `/form-newsletter`

---

## Pendências

### Aguardando Informa
- **URLs de Termos de Uso e Política de Privacidade** (LGL-01/02/03) — hoje placeholder `#` nos modais e e-mails. A conversão dos PDFs em páginas públicas e a revisão jurídica são responsabilidade da Informa.

### Fora do escopo desta entrega (etapa futura)
- **Login social** (Google/LinkedIn) — removido dos modais.
- **Gerenciamento de sessões por dispositivo** — removido do Perfil.
- No Perfil, marcadas **"Em breve"**: Últimas leituras, Favoritos, Newsletter.
- **Personalização de copy por portal** (Micaelly ↔ marketing) — não bloqueia o protótipo.

### Backend (devs)
- Módulo **"Leitor"** no WP Admin (base de usuários por portal — cada portal tem a sua; o mesmo e-mail pode existir em portais diferentes).

---

## Rastreabilidade

Branch `feature/layouts-e-index` — 11 commits sobre `main`:

```
Fase 1  5fd17e5  separa versoes obsoletas em /archive (EST-01..04)
Fase 2  c85b8cf  modais auth em nomes limpos; indice por fluxo (EST-04)
        91c1abf  arquiva Patrocinadores/Patrocinador/Form Newsletter
Fase 3  310b841  remove login social; proof panel sem conta global (LOG-01/03)
        f7ff316  'Tentar novamente'; remove strength bar (PWD-01/02)
        689f2ef  reenviar-email com contador; AuthResendButton (PWD-04)
        1127d97  consolida Minha Conta em Meu Perfil (PRF-01..08)
        2d1a063  Excluir/Baixar como modais (ACC-01/02)
        c70d6f3  'Acessar' + hover-menu [Login|Cadastro] (ACS-01/02)
        ab16726  confirmacao-email layout padrao + corrigir e-mail (EML-04/02)
Fase 4  98b7d55  4 templates de e-mail no indice (MAIL-01)
```

**Verificação:** `pnpm build` verde em todas as fases.
