# Dashboard de Perfil

**Figma:** — (sem nodeId; derivado de [FEATURE-cadastro.md §6.7](../FEATURE-cadastro.md))
**Arquivo:** [`src/layouts/dashboard-perfil.php`](../src/layouts/dashboard-perfil.php)

Área logada onde o usuário gerencia seus dados. Primeira página do portal que usa o header-desktop completo (é parte do portal, não do fluxo minimal de cadastro).

## Shell

- `header-desktop` completo no topo (com nav, search, social, CTA).
- `footer-desktop` no rodapé.
- **Page header** (bloco `bg-neutral-50`): avatar grande + nome + e-mail + barra `profile-progress`.
- **Corpo:** grid 2-col desktop `lg:grid-cols-[220px_1fr]` — sidebar nav sticky + main content. Em mobile vira uma barra horizontal de tabs.

## Seções (MVP)

### 1. Dados Básicos (6 campos)
| Campo | Tipo | Nota |
|---|---|---|
| Foto de perfil | upload | JPG/PNG máx 2 MB |
| Nome completo | text | min 2 palavras |
| E-mail | read-only | Badge "Conectado ao LinkedIn" + hint explicando |
| Telefone | tel | máscara +55 |
| Data de nascimento | date | maioridade 18+ |
| Gênero | select | Estatístico, opcional |

### 2. Dados Profissionais (3 campos)
Empresa (max 100) · Cargo (max 100) · Setor (searchable select)

### 3. Dados Fiscais e Localização (5 campos)
CPF/CNPJ (máscara + dígito verificador) · País → Estado → Cidade (cascata) · CEP (autopreenchimento API) · Endereço

### 4. Conta (MVP)
Apenas link "Excluir minha conta". Toggles de newsletter/marketing, histórico e favoritos ficam para Etapa 2.

## Modo de edição (row-level)

Cada linha alterna entre 3 visuais:

1. **Read:** label + valor + botão "Editar" ghost à direita. Quando vazio, mostra "Não informado" em `text-neutral-500 italic`.
2. **Edit:** input com borda `border-secondary-950` + botões "Cancelar" (ghost) e "Salvar" (filled) à direita.
3. **Read-only:** sem botão Editar; no lugar, um pill cinza "Conectado ao LinkedIn" (ou equivalente) informando por que o campo está travado.

**Helper function** `render_field_row()` encapsula os 3 visuais e aceita `editing` e `readOnly` como props.

## Barra de progresso

`profile-progress` no page header, com `filledFields` calculado server-side (8 de 14 no mock). Mapeamento das faixas de copy está no spec do próprio partial.

## Toast pós-save

Partial `toast` tipo `success` com mensagem **"Alterações salvas."**, auto-dismiss 4s. Aparece no canto inferior direito desktop. Disparado pelo JS após resposta 200 do endpoint de salvar campo.

Botão Salvar tem `data-analytics-event="perfil_campo_salvo"`.

## Modal de exclusão de conta

Abre via link "Excluir minha conta" da Seção 4. Estrutura:

- Ícone aviso em círculo `bg-[#FEE2E2]` / `text-[#bf0413]`.
- Título "Excluir sua conta?" (`text-headline-sm`).
- Texto explicando irreversibilidade.
- Input "Digite EXCLUIR para confirmar" (`autocomplete="off"`).
- Botões "Cancelar" (ghost) + "Sim, excluir minha conta" (filled red, disabled por padrão).

**Regra:** o botão destrutivo só habilita quando o valor do input for **exatamente "EXCLUIR"** (case-sensitive). Implementação em JS via `data-delete-confirm` no input.

Cor do botão: `bg-[#bf0413] hover:bg-[#99030F]` (arbitrary — sem token semântico de destrutivo no DS).

## Sidebar nav

4 links âncora para as seções. No desktop, `sticky top-6` + flex-col. No mobile, overflow-x com whitespace-nowrap nos links (comportamento de tabs horizontais).

Link ativo: `bg-neutral-50 text-primary-600` + semibold. Links inativos: `text-neutral-700 hover:bg-neutral-50`.

## A11y

- Sidebar com `aria-label="Seções do perfil"`.
- Cada seção tem `id` que bate com os links âncora.
- Modal de exclusão: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- Input de confirmação com `autocomplete="off"` para evitar preenchimento acidental.
- Botões Editar/Salvar/Cancelar são `<button type="button">` (não submits) — o comportamento é inline, sem form envolvendo o dashboard inteiro.

## Decisões de design

- **Edição linha-a-linha em vez de modo global.** Salvar todo o form de uma vez força o usuário a conferir campos que não tocou. Editar uma linha, salvar, ver o toast, e seguir — mais seguro e com feedback mais claro. É o mesmo pattern de Stripe, Linear e Notion.
- **"Foto de perfil" não usa `render_field_row`** — é uma row custom com o avatar + botão "Trocar foto" (upload tem comportamento distinto do input de texto).
- **Sidebar sticky + anchors em vez de tabs com reload.** Uma URL só; scroll preserva o contexto; o usuário vê o progresso descendo a página.
- **Toast preview + Modal preview numa seção "Spec de estados" abaixo** — para o dev/QA validar os visuais sem ter que disparar os handlers no preview (o JS ainda não existe).
- **Modal de exclusão usa cor `#bf0413` arbitrary** — mesmo red MD do DS, aplicado sem token. Ações destrutivas merecem tratamento distinto de erro comum; quando o DS ganhar `semantic-destructive`, migrar.
- **Gênero mostrado como "Não informado"** no mock para demonstrar o estado vazio — que não é erro, é opção legítima.
