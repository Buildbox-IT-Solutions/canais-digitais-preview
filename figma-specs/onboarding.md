# Onboarding — Bloco 3 (Dados complementares)

**Figma:** — (sem nodeId; derivado de [FEATURE-cadastro.md §6.5](../FEATURE-cadastro.md))
**Arquivo:** [`src/layouts/onboarding.php`](../src/layouts/onboarding.php)

Terceiro e último passo do cadastro. **Todos os campos são opcionais** — o usuário pode pular com "Fazer isso depois". Também é acionado como tela isolada quando Social Login retorna perfil sem dados profissionais.

## Shell

Mesma shell minimal dos Blocos 1 e 2 (header wordmark + footer de 3 links). Card central `max-w-[560px]` (um pouco mais largo que os Blocos anteriores porque Empresa e Cargo ficam em grid 2-col no desktop).

## Anatomia

1. **Progress 3/3** — todas as 3 bolinhas preenchidas, linhas conectoras em `bg-secondary-950`. Label "Passo 3 de 3 — Dados complementares".
2. **Header** — "Conte um pouco sobre você" + subtítulo "Essas informações personalizam sua experiência no portal."
3. **Badge LinkedIn** (condicional) — bloco `bg-[#E0F2FE] border-[#BAE6FD]` com ícone azul do LinkedIn informando pré-preenchimento.
4. **Campos:**
   - Nome completo — text, `autocomplete="name"`, max 120 chars.
   - Telefone — tel, `autocomplete="tel"`, máscara `+55 (00) 00000-0000` (aplicada por `form-cadastro.js` via `data-mask="phone"`).
   - Empresa + Cargo — grid `md:grid-cols-2`, ambos max 100 chars.
   - Setor — combobox com busca (`role="combobox" aria-haspopup="listbox"`). O dropdown real fica em `form-cadastro.js`.
5. **Ações:**
   - Submit filled "Salvar e continuar".
   - Link-button ghost "Fazer isso depois" → Home sem salvar, com analytics `onboarding_pulado`.

## Estados

| State key | Descrição |
|---|---|
| `default` | Cadastro padrão — campos vazios. |
| `linkedin-prefilled` | Social Login sem dados completos — Nome, Empresa, Cargo vêm populados (editáveis); badge informativo no topo. |
| `loading` | Submit em andamento — `<fieldset disabled>` + spinner + label "Salvando...". |

## Comportamento

- **Validação opcional:** Nome com pelo menos 2 palavras *se preenchido*; campos vazios são aceitos.
- **"Fazer isso depois":** vai direto para Home logado sem salvar. Nenhum dado do form é enviado.
- **Social Login:** o backend detecta quais campos vieram do LinkedIn e envia via props iniciais. Badge aparece apenas quando pelo menos um campo foi pré-preenchido.

## A11y

- Progress com `role="progressbar"` + `aria-valuenow="3"`.
- `fieldset disabled` bloqueia form no loading.
- Setor com `role="combobox"` + `aria-expanded` + `aria-haspopup="listbox"` — o dropdown real precisa gerenciar `aria-activedescendant` e roving tabindex (fora do escopo deste layout).
- Máscara de telefone aplicada pelo JS; placeholder mostra o formato esperado.

## Decisões de design

- **Card mais largo (`max-w-[560px]`)** — caber Empresa + Cargo em duas colunas no desktop sem sacrificar respiração. Em mobile volta ao stack vertical.
- **Skip é link, não botão ghost** — para sinalizar visualmente que é uma "saída", não uma ação de mesmo peso que o submit. Mesma altura (`h-12`) para manter o rodapé equilibrado.
- **Badge LinkedIn em vez de checkmarks nos campos** — um aviso único no topo é menos invasivo que pintar cada campo pré-preenchido; o usuário entende que tudo é editável.
- **`form-select` atual renderizado como combobox** — o partial existente mostra o disparador mas não tem busca. A implementação real de busca vem em `form-cadastro.js`.
