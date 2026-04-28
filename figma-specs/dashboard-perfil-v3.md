# Dashboard Perfil v3

**Figma section:** [Dashboard Profile — 6155:31441](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=6155-31441)

Modelo: 6 abas no topo, conteúdo abaixo. Abre por padrão em "Visão geral".

## Frames

| # | Tab | NodeId | Notas |
|---|---|---|---|
| 1 | Visão geral | `6045:5987` | Hero mint-light + 2 stats + Últimas leituras (5 itens) |
| 2 | Perfil | `5968:40093` | Lista de Profile Box (4 cards) |
| 2b | Perfil + Drawer aberto | `6038:4181` | Drawer 560px direita com 3 variações (Dados pessoais / Profissionais / Fiscais) |
| 3 | Newsletter | `5968:40665` | Summary + 12 Newsletter items (toggle) |
| 4 | Downloads | `6105:4835` | 8 Download items + Pagination |
| 5 | Favoritos | — | Tab desabilitada (chip "Em breve") — sem pane |
| 6 | Conta | `6123:29181` | Método de acesso (3 cards) + Sessões (3 rows) + Privacidade & LGPD (3 rows) |

## Welcome banner (compartilhado entre todas as abas)

- Avatar 120px (rounded-full) com fallback iniciais "MA" sobre `#d4dae0`
- Camera/Pencil icon-button 32px overlay no canto inferior-direito (bg `primary-600` filled)
- Gap 40px entre avatar e textos
- Título "Olá, Mariana!" — Aleo Bold 28/36 (`text-headline-md`)
- Bloco "Seu e-mail" (Open Sans Bold 12/16, `text-neutral-700`) + email (Open Sans Bold 14/20, `text-primary-600`)
- Texto multiportais (Open Sans Regular 12/16, `text-neutral-700`)
- Botão "Sair" à direita: pill ghost, ícone `logout` 20px + label "Sair" Bold 14/20

## Tabs

- Container horizontal, `border-bottom` `#d6d8dd` no rodapé
- Tab ativo: `border-bottom` 2px `primary-600`, label Bold `#024`
- Tab inativo: label SemiBold `#3c4e69` (`text-neutral-700`)
- Tab disabled (Favoritos): label SemiBold `#99a3b5` (`text-neutral-400`) + chip "Em breve" (bg `#d6d8dd`, text `#3c4e69`, font-size 11)
- Padding célula: `pb-2 pt-3 px-5`

## Visão geral pane

- Hero (804px) + stats column (flex-1, 260px) — gap 16px
- Hero card: bg `#c9fced` (mint-light), rounded-lg, padding `pl-8 pr-12 py-8`
  - Gauge SVG 140px (ring 8px mint dark + 64% number Aleo Bold 28/36)
  - Título "Receba conteúdos mais relevantes para você" (Aleo Bold 24/32)
  - Texto rich (Bold + Regular)
  - Botão "Completar perfil" pill primary-600 com `arrow_forward`
- Stats: 2 cards stacked, border `#d4dae0`, rounded-lg
  - Icon-tile 40px bg `#e9eaec` (rounded-sm) + ícone 24px primary-600
  - Número Aleo Bold 36/44
  - Label SemiBold 14/20 `text-neutral-700`
- Spacer 16px
- Recent section: título "Últimas leituras" (Aleo Bold 22/28) + 5 itens (chip categoria 12 + título 18/24 + meta + chevron)

## Perfil pane

- Headline "Perfil" + subtítulo "X% completo — Y campos restantes"
- Lista de Profile Box (gap 16px), cada card border `#d6d8dd` rounded-lg:
  - Variante padrão: 3 colunas
    - icon-tile (`#e9eaec` rounded-sm + ícone 24) + título 16 Aleo Bold + descrição 14
    - Preview de campos (linhas 14 Open Sans, `#283857`)
    - Botão "Atualizar" (outlined pill primary-600 com ícone `edit`)
  - Variante "incompleta": chip "Complete seu Perfil" (mint-light bg, `#00786e` text, ícone star) no topo
  - Variante "vazia": preview em `#8391a9` (placeholder) + label "Preencher"

## Drawer (Perfil)

- 560px de largura, fixo à direita, scrim `#050708/32%`
- Top: título Aleo Bold 28/36 + close icon-button 40px
- Form: padding `px-8 py-6`, gap 24px entre campos
- Bottom: gap, items-center, justify-end, padding `px-8 py-5`
  - "Cancelar" ghost (Open Sans Bold 16/24 `#024`)
  - "Salvar" filled primary-600 (estado disabled inicialmente bg `#c2c7cf`)

3 drawers:
- `dados-pessoais` — Nome completo, E-mail corporativo, Telefone, Data nascimento, Gênero
- `dados-profissionais` — Empresa, Cargo, Setor
- `dados-fiscais` — CPF/CNPJ, País, Estado, Cidade, CEP, Endereço

## Newsletter pane

- Headline "Newsletter" + "Escolha o que deseja receber. Suas alterações são salvas automaticamente."
- Summary "X newsletters ativas de Y opções disponíveis" + link buttons "Marcar todas" / "Desmarcar todas"
- Grid 12 items: cada Newsletter item = toggle + título + descrição (+ chip opcional)

## Downloads pane

- Headline "Meus downloads" + "Baixe novamente qualquer material a qualquer momento."
- 8 Download items (105–129px), title + tipo/data + botão Baixar
- Pagination no rodapé

## Conta pane

- Headline "Minha Conta" + "Gerenciamento de acesso, sessões e dados da sua Conta Informa."
- Seção "Método de acesso" — 3 cards lado a lado (E-mail e senha [Atual chip], LinkedIn, Google)
- Seção "Sessões ativas" — 3 Session Items
- Seção "Privacidade & LGPD" — 3 General Items (Solicitar dados, Histórico de alterações, Excluir conta)
