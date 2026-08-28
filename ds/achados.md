# Achados — pendências encontradas durante a documentação

> Registro de problemas de código, classificação ou origem incerta encontrados ao longo da documentação dos componentes. Nenhum item aqui é executado nesta rodada — são anotações para tratamento futuro, conforme regra invariante 1 do briefing.

## Código morto

- ✅ resolvido em 2026-08-24 — **`card`** (`src/components/card/`) removido. O achado de
  2026-08-15 ("sem nenhuma referência no repo") estava errado — `newsletter-card` importava
  `Card`/`CardHeader`/`CardContent`/`CardTitle`/`CardDescription`/`CardFooter`, e ele é usado
  pela `dashboard-perfil-v4`, que está viva. Mas o wrapper não sustentava o próprio peso: dos
  seis subcomponentes, `CardContent` não contribuía nenhuma classe (só `px-6`, que o consumidor
  já declarava), e `gap`, `padding-y`, sombra e alinhamento do rodapé vinham todos
  sobrescritos. A casca e a tipografia foram inlinadas no `newsletter-card`. Verificado por
  render server-side dos 3 estados antes/depois: estrutura de tags e texto idênticos, e as
  únicas classes que saíram foram `gap-0`/`py-0`/`shadow-none` (existiam só para cancelar o
  `Card`) e `[.border-b]:pb-6`/`[.border-t]:pt-6` (variantes que nunca casavam neste
  consumidor). Nenhuma classe adicionada.
- **`Loading Button [1.0]` (Figma `71:6026`) não será implementado como componente —
  2026-08-28.** O spec (`figma-specs/loading-button.md`) descreve um componente separado:
  pill filled **sem texto**, só spinner, que substitui o botão original enquanto a ação
  corre. Virou o estado `loading` do próprio `Button [1.1]`, no padrão do shadcn — spinner
  inline à esquerda, label preservado. Motivo: trocar um elemento por outro no meio da
  interação é exatamente o que fazia a espera parecer improvisada, e sem o texto a largura
  pula no clique. O que o spec exigia de acessibilidade (`disabled` + `aria-busy`, "o botão
  NÃO pode receber novo clique enquanto carrega") foi mantido, e agora é o componente que
  garante, não quem chama. **Consequência para o Figma:** o `71:6026` fica sem contrapartida
  em código, e o `Button [1.1]` precisa ganhar uma property `Loading` — hoje o pending em
  outlined/ghost existe no código e não existe no Figma.
- **`subscribe-button` nasceu sem node no Figma — 2026-08-28.** Composto sobre o
  `Button [1.1]`, estende o eixo `type` com o eixo `status` (idle | pending |
  subscribed). Substituiu três montagens à mão que existiam em duplicata no
  `newsletter-card` e no `banner-newsletter`. Precisa ser desenhado e nomeado no Figma
  para que o back-end tenha referência visual — em especial o selo `subscribed`, que
  **não é um botão** (é `role="status"`, sem ação) mas ocupa a mesma caixa que o botão
  que substitui.
- **`incentive-newsletter-dialog` arquivado em 2026-08-28** — decisão do cliente: o
  deslogado que clica em "Assine agora" vai direto ao formulário público, sem modal
  nenhum no caminho. O incentivo de login passou a ser a barra de rodapé da
  `/form-newsletter` (`IncentiveBanner`, ver o cabeçalho daquela tela). O componente
  fica no repo sem consumidor de produto — só alcançável por `?preview=newsletter` em
  `/home` e `/conteudo`, e é isso que ele é agora: variante arquivada, não caminho
  vivo. Não remover sem decisão explícita; o `incentive-download-dialog` irmão continua
  em uso (download e favoritar).
- **Órfãos criados em 2026-08-24** pela remoção de `home-v2`, `patrocinadores`, `patrocinador`,
  `dashboard` e `gate-download`: `src/components/coming-soon/`, `src/components/dashboard-header/`,
  `src/components/sponsor-card/` e `src/mocks/sponsors.ts` ficaram sem nenhum consumidor.
  Não removidos — não estavam no escopo aprovado. `src/components/session-row/` passou a ter um
  único consumidor (`dashboard-perfil-v3`), que é uma tela arquivada.

## Origem não confirmada

- **`image`** (`src/components/image/`) — 2026-08-15: sem nenhuma referência no repo fora da própria pasta. Origem não confirmada, investigar antes de decidir (manter, remover ou é um base ainda não adotado).
- **`loading`** (`src/components/loading/`) — 2026-08-15: sem nenhuma referência no repo fora da própria pasta. Origem não confirmada, investigar antes de decidir.

## Classificação a revisar

- **`footer-desktop`** — 2026-08-15: classificado como "base" pela regra mecânica do inventário da Fase 0 (só depende de `icon`), mas na prática funciona como chrome de página (seção estrutural repetida em toda tela), não como átomo reutilizável. Revisar a classificação.

## Divergências código × comportamento correto

> Itens aqui significam que a documentação descreve o comportamento CORRETO, e o código atual diverge. Ao implementar em PHP, siga a documentação, não o React. O React será corrigido.

- **`login-button`** (`src/components/login-button/index.tsx:50`) — 2026-08-17: `aria-expanded="false"` é hardcoded e nunca reflete o estado real do menu (usado por `UserMenu` dentro de `header-desktop`). Documentar o comportamento correto (atributo reflete o estado do dropdown); código diverge. *(Fora do escopo da rodada de correção de 2026-08-17 — não corrigido.)*
- **`nav-item`** (`src/components/nav-item/index.tsx:50,58`) — 2026-08-17: o dropdown do item de navegação só abre via `group-hover` em CSS puro — sem `group-focus-within`, sem `aria-haspopup`/`aria-expanded` no link trigger. Inacessível via teclado. Documentar o comportamento correto (abertura por foco + teclado, atributos ARIA no trigger); código diverge.
- **`header-informa`** (`src/components/header-informa/index.tsx:46`) — 2026-08-17: `aria-expanded={opened}` está no `<div>` wrapper (`containerRef`), não no `<button>` trigger que controla a expansão. Documentar o atributo no elemento interativo correto; código diverge.
- ✅ resolvido em 2026-08-17 — **`dashboard-tabs`** (antes `dashboard-tabs-v3`/`dashboard-tabs-v4`) — usava `role="tablist"`/`role="tab"`/`aria-selected` em `<a href>` de navegação real entre páginas, sem `role="tabpanel"` correspondente em nenhum lugar do repo e sem roving `tabindex` (padrão APG de tabs). Trocado por `<nav aria-label="Seções da conta">` + `aria-current="page"` no item ativo, seguindo o padrão de navegação (GitHub/Gmail). Aplicado só na canônica; a v3 arquivada manteve o ARIA de tabs como estava.

## Duplicação de componentes (família)

- **`table-of-contents` / `table-of-contents-margin` / `table-of-contents-icon`** (`src/components/table-of-contents*/`) — 2026-08-17: três componentes para o mesmo propósito, originados de um teste comparativo A/B/C. Comentário no próprio código confirma que apenas `table-of-contents-icon` seguiu para produção ("Única versão de TOC apresentada ao PO"); os outros dois estão arquivados mas continuam no catálogo ativo de `src/components/`, acessíveis só via querystring de `/archive`. Canônico: `table-of-contents-icon`. Não documentar os outros dois como componentes ativos — risco de os 11 portais implementarem uma versão descontinuada. *(Ainda não renomeados/arquivados no código nesta rodada — só o achado. A regra invariante 7 do briefing já cobre a consequência para a documentação: só `table-of-contents-icon` entra em `docs/componentes/`.)*
- ✅ resolvido em 2026-08-17 — **`dashboard-tabs-v3` / `dashboard-tabs-v4`** (`src/components/dashboard-tabs-v3/`, `src/components/dashboard-tabs-v4/`) — JSX e `types.ts` eram quase idênticos linha a linha; única diferença real de comportamento era `overflow-x-auto`/`shrink-0 whitespace-nowrap` em v4. **Canônico definido: `dashboard-tabs`** (renomeado de v4 — componente, types, stories e o consumidor `dashboard-perfil-v4` atualizados). **v3 arquivada** — cabeçalho `ARQUIVADO` adicionado em `src/components/dashboard-tabs-v3/index.tsx`; segue funcional, único consumidor é a tela já arquivada `/dashboard-perfil-v3`.

## Violações de token

- ✅ resolvido em 2026-08-17 — **Tom "danger" sem token dedicado** — `dialog`, `icon-tile`, `status-ring`, `session-row`, `general-item` usavam classes Tailwind genéricas (`text-red-*`/`bg-red-*`). Resolvido com escala completa `--color-danger-{50..950}` em `src/index.css` (não um token único — os usos reais precisavam de fundo claro+texto escuro em `icon-tile` e de dois tons para hover em `dialog`/`general-item`). `--color-warning`/`--color-success` adicionados como tokens únicos (sem esse problema nos usos atuais).
- ✅ resolvido em 2026-08-17 — **`password-strength`** (`src/components/password-strength/index.tsx`) — 6 cores hex hardcoded (`#DC2626`, `#F59E0B`, `#16A34A`) substituídas por `--color-danger-600`/`--color-warning`/`--color-success`. *(O valor de altura arbitrário `min-h-[1rem]` na linha 65 não fazia parte do escopo de tokens de cor e não foi tocado — segue como achado de espaçamento aberto.)*
- ✅ resolvido em 2026-08-17 — **`toast`** (`src/components/toast/index.tsx`) — 4 cores hex hardcoded para accent de sucesso/erro/alerta substituídas pelos mesmos tokens. O erro usava `#bf0413`, um vermelho diferente de `red-600` em todo o resto do código (sem uso duplicado, sem justificativa de contraste registrada) — alinhado a `--color-danger-600` por decisão do Pedro. *(`max-w-[420px]` arbitrário na mesma linha não fazia parte do escopo e não foi tocado.)*
- ✅ resolvido em 2026-08-17 — **`drawer`** (`src/components/drawer/index.tsx:45`) — `bg-[#050708]/30` trocado por `bg-primary-950/30` (o hex duplicava esse token à mão).
- **`google-logo` / `social-button`** (`src/components/google-logo/index.tsx`, `src/components/social-button/index.tsx:22`) — cores de marca de terceiros (Google/LinkedIn) hardcoded em hex. ✅ registrado em 2026-08-17 como exceção intencional em comentário no `@theme` de `src/index.css` ("Cores de marca de terceiros... não são tokens de produto e não devem variar entre portais"). Não são tokens — permanecem hardcoded por decisão, não por pendência.
- **Novo achado, encontrado durante a correção (2026-08-17):** `password-checklist` (`src/components/password-checklist/index.tsx:41`) tem o mesmo hex `#16A34A` de sucesso que foi corrigido em `password-strength`/`toast`, mas não estava na lista de componentes do pedido desta rodada — não foi alterado. Mesma correção (`text-success`) se aplica quando for feita uma próxima rodada.

## Ícones — divergência de família/estilo

> Rodada de 2026-08-19: todas as pendências abaixo foram resolvidas na mesma sessão (auditoria → decisões do Pedro → migração completa). Histórico das etapas mantido porque documenta o racional de cada decisão — útil se algum ícone precisar de ajuste fino depois.

- ✅ resolvido em 2026-08-19 — **migração completa para Material Symbols Outlined real**: `src/components/icon/` não depende mais do pacote clássico `@material-icons/svg` (removido do `package.json`). `src/components/icon/material-icons.ts` foi apagado; `src/components/icon/paths.ts` agora é a única fonte, com os 54 ícones Material do projeto como paths estáticos baixados de `fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/<nome>/<default|fill1>/24px.svg` — essa URL já entrega exatamente Weight 400/Grade 0/Optical size 24 (a config pedida pelo Pedro), variando só o eixo Fill. `src/components/icon/index.tsx` foi simplificado: sem mais distinção "pacote vs exceção", um único lookup com viewBox fixo (`0 -960 960 960` para Material, `0 0 24 24` só para os brand icons de terceiros). Isso resolve de vez a mistura `baseline`/`outline` que causava a sensação de "ícones mais finos que outros" — todo ícone agora vem da mesma família, no mesmo eixo.
- ✅ resolvido em 2026-08-19 — **eixo FILL como sinal de estado**: `favorite` (Fill 1, sólido) e `favorite-border` (Fill 0, contorno) são o único par de estado confirmado no código (alterna conforme o item está favoritado — `dashboard-perfil-v4/index.tsx`, `Toggle`). Todo o resto do catálogo usa Fill 0 sempre, incluindo `delete`/`delete-outline` — que **não** é um par de estado (contextos de uso diferentes, não alternam no mesmo botão), então os dois ficam com o mesmo path Fill 0 agora. Efeito colateral a observar: `delete` perdeu o peso visual sólido que tinha antes (usado em `status-ring` "danger", `dialog` "danger", `general-item`) — se isso incomodar visualmente, é uma troca de uma linha (`delete` para Fill 1) em `paths.ts`.
- ✅ resolvido em 2026-08-19 — **hand-drawn paths substituídos pelo glifo oficial**: `description`, `account-circle` e `book` (antes desenhados à mão, divergentes do pacote clássico) agora usam o path real do Material Symbols Outlined, mesma config. `phone` e `lock` (sem nenhum call site) foram **removidos** — código morto, não fazia sentido mantê-los "por precaução" depois de decidir corrigir todo o resto.
- ✅ resolvido em 2026-08-19 — **nomenclatura das chaves alinhada ao nome oficial do Material Icons/Symbols**: `plus`→`add`, `arrow-left`→`arrow-back`, `chevron-down`→`expand-more`, `chevron-up`→`keyboard-arrow-up`, `location`→`location-on`, `business-center`→`work`, `pdf`→`picture-as-pdf`, `doc`→`docs` (achado por *significado*, não pelo nome literal do glifo antigo — ver nota de processo abaixo), `desktop`→`desktop-windows`. `arrow-right` (duplicata) consolidada em `arrow-forward`. Tipos `ButtonIcon`, `ProfileBoxIcon`, `DownloadItemIcon`/`DownloadIconType` atualizados.
- ✅ resolvido em 2026-08-19 — **drift de tamanho** (`close`, `chevron-left`/`chevron-right`, `arrow-drop-down`): causa raiz identificada pelo Pedro — vários desses eram botões só-ícone reimplementados à mão em vez de usar `IconButton`, cada um com um tamanho levemente diferente. 13 botões de fechar/limpar busca (`drawer`, `incentive-banner`, `buscar`, `search-bar`, `toast`, `incentive-newsletter-dialog`, `incentive-download-dialog`, `login-v2`, `redefine-senha-v2`, `recupera-senha-v2`, `confirmacao-email-v2`, `cadastro-v2`, `modal`) e as setas de paginação/carrossel (`categoria`, `buscar`, `home-v2`) agora usam `<IconButton>` de verdade, com `size`/`type` da escala do DS — `categoria`/`buscar` ganharam também o `disabled` real na seta "anterior" (antes só parecia desabilitada via classe CSS, sem o atributo). `home-v2` perdeu a customização visual de hover invertido do carrossel (outlined→preenchido no hover) ao virar `IconButton type="outlined"` — troca aceita explicitamente pelo Pedro. `arrow-drop-down`, que é sempre decorativo (nunca um botão isolado — fica dentro de texto/select/avatar), foi unificado em `size-4` nos 4 arquivos que usavam `size-5` (`header-desktop`, `login-button`, `nav-item`).
- **Nota de processo, válida a partir de 2026-08-19**: ao resolver uma exceção de ícone (nome sem correspondente exato, ou path divergente), a busca é feita na biblioteca Material Symbols Outlined (fonts.google.com/icons, Weight 400/Grade 0/Optical size 24) **por significado**, não por transcrição mecânica do nome antigo — cada caso decidido individualmente. `docs` (em vez de forçar o nome `description`) e `desktop-windows` (em vez de manter `desktop` sem correspondente) foram os primeiros exemplos.
- ✅ resolvido em 2026-08-19 — **`figma-specs/icons.md` atualizado**: família corrigida para Material Symbols Outlined (Weight 400/Grade 0/Optical size 24/Fill 0, `favorite` em Fill 1), tabela reescrita com os ícones reais do código (nome/identificador oficial/uso) e viewBox correto (`0 -960 960 960`).
- ✅ resolvido em 2026-08-19 — **`notifications` e `shield` removidos** (`src/components/icon/paths.ts`): mesmo tratamento de `phone`/`lock` — sem nenhum call site no código, encontrados ao revisar o spec atualizado acima, confirmados código morto e removidos.
- **Ainda em aberto, fora do escopo desta rodada**: nenhum `docs/componentes/icon.md` nem `icon.stories.tsx` existem (achado que já aparecia antes desta rodada, ver "Sem arquivo de stories" abaixo) — documentar o componente `icon` do zero fica pra uma rodada de documentação separada.

## Consistência estrutural

- ✅ resolvido em 2026-08-24 — **`?toast=download-started` prometia download que não
  acontecia**. A correção não foi trocar a copy: os dois caminhos de autenticação passaram a
  TERMINAR no material, em vez de devolver o usuário à página para procurar o mesmo botão
  que o trouxe até ali. Confirmação de e-mail e login agora fecham no mesmo painel "Tudo
  pronto! / Seu material está pronto para baixar", com "Baixar agora" (âncora com `download`)
  e "Explorar o portal". O parâmetro de toast saiu do fluxo de download; `intent=newsletter`
  segue inalterado. Decisão do Pedro: sem download automático no retorno.
- ✅ resolvido em 2026-08-24 — **confirmação de download por toast removida**. O navegador já
  confirma download sozinho (barra e badge próprios); duplicar isso em toast obrigava o código
  a detectar a conclusão, o que no navegador só a File System Access API entrega — Chrome/Edge
  apenas, e forçando o diálogo "onde salvar?" para todo mundo, inclusive quem tinha download
  silencioso. O custo não se pagava. O download voltou a ser âncora nativa (`href` +
  `download`, sem handler) e `lib/baixar-material` foi removido.
- **Título do `newsletter-card` não é heading** — 2026-08-24: o título do card renderiza
  `<div>`, não `<h2>`/`<h3>`. Herdado do `CardTitle` do shadcn, que também era `<div>`, e
  preservado no inline para manter a saída idêntica. Um leitor de tela não encontra os cards
  de newsletter pela navegação por headings. 🔴 A CONFIRMAR — qual nível de heading cabe
  dentro da aba Newsletter da `dashboard-perfil-v4`?
- **Sem cabeçalho Figma no topo do arquivo** — 2026-08-17: `loading`, `access-invite`, `bottom-sheet`, `byline`, `coming-soon`, `dashboard-header`, `dialog`, `footer-desktop`, `icon-tile`, `skeleton`, `thumbnail`, `toast`, `toaster`, `icon` não têm a linha `Figma:` no cabeçalho padrão (alguns não têm cabeçalho nenhum). Sem isso, a doc não tem proveniência rastreável até o node do Figma. (Excluídos desta lista: `switch`, `table-of-contents*`, `google-logo`, que documentam explicitamente a ausência de spec no Figma como decisão intencional.)
- **Sem arquivo de stories** — 2026-08-17: `access-method-card`, `coming-soon`, `dashboard-header`, `dashboard-tabs-v3`, `form-disclaimer`, `form-field`, `form-select`, `icon`, `orbit`, `password-strength`, `session-row`, `social-button`, `sponsor-card` não têm `*.stories.tsx`, violando a exigência do CLAUDE.md de uma story por variante visual.

## Destaque único (super-highlight da home) — decisões derivadas, não desenhadas

> 2026-08-23 — componente `destaque-unico` implementado a partir do handoff do Figma
> (node `6782:5439`, frame "📋 Handoff — Destaque Home"; card em `6775:18688`, Opção B —
> "Card Lado a Lado"). A Opção A (hero full bleed) está OCULTA no arquivo do Figma e
> não foi implementada. Os itens abaixo são decisões que o Figma **não** responde —
> precisam de validação de design antes de virar `docs/componentes/destaque-unico.md`.

- 🔴 **A CONFIRMAR — layout mobile.** O Figma só tem o frame desktop (Option B, 1920).
  A implementação empilha imagem em cima / texto embaixo (mesma direção de todo card do
  sistema, e da própria `DestaqueSection` mobile). **Não há frame mobile para conferir
  ordem, paddings ou se o card mantém a moldura.** Consequência no back-end: sem essa
  regra, os 11 portais divergem no mobile.
- 🔴 **A CONFIRMAR — escala do título no mobile.** Desktop usa `Headline/Large/Emphasized`
  (Aleo Bold 32/40 → `text-headline-lg`), literal do Figma. No mobile o código desce um
  degrau para `text-headline-sm` (24/32) — 32px em 360px de largura quebra a manchete em
  5-6 linhas e consome a dobra inteira. É um token real do DS, mas a escolha do degrau
  é derivada, não desenhada.
- 🔴 **A CONFIRMAR — card sem patrocinador (RN05).** O Figma desenha o card só no estado
  COM `SponsorLine` ancorada no rodapé. Sem patrocinador, `justify-between` deixaria ~190px
  de vazio embaixo da coluna de texto (a altura é ditada pela imagem 50%, aspect 3:2) — o
  código centraliza o bloco de texto nesse caso. Alternativa não avaliada: encolher o card.
- 🔴 **A CONFIRMAR — estado vazio (já listado como pergunta em aberto no próprio handoff).**
  "Quando nenhum conteúdo estiver selecionado no admin, a seção some silenciosamente ou
  exibe um fallback?" O protótipo assume **sumir** (RN02), consistente com o toggle off.
- 🔴 **A CONFIRMAR — imagem (idem, pergunta do handoff).** "O editorial cadastra uma imagem
  específica para o destaque ou reutiliza o thumbnail do artigo?" O protótipo reutiliza o
  `seed` do artigo, servindo em 1224×816 (aspect 3:2, a proporção do Figma).
- ✅ resolvido em 2026-08-23 — **clamps de texto: 3 linhas no título, 4 no lead**
  (decisão do Pedro na revisão). A primeira versão usava as alturas literais do Figma
  (título 2 linhas / lead 3), mas essas são as alturas do CONTEÚDO DE EXEMPLO, não um
  limite editorial. O primeiro ajuste foi 4/4; medido, 4/4 não caberia — **3/4 é o par
  máximo que mantém a proporção 3:2 ditando a altura do card em toda a faixa desktop.**
  A conta:

  ```
  altura da foto = (min(largura da janela, 1280) − 48 de página − 2 de borda) / 2 / 1,5
  custo do texto = 64 (p-8) + 16 (categoria) + 16 (2× gap-2)
                   + 40 × linhas do título (headline-lg 32/40)
                   + 24 × linhas do lead   (body-lg 16/24)
                   [+ 24 (gap-6) + 56 (SponsorLine), quando há patrocinador]
  ```

  | janela | altura da foto | orçamento de texto | par máximo |
  |---|---|---|---|
  | 1024 (entrada do `lg:`) | 325px | 229px | **3+4** (216px) |
  | 1280+ (largura do Figma) | 410px | 314px | 5+4 |
  | 1024, com patrocinador | 325px | 149px | 2+2 |
  | 1280+, com patrocinador | 410px | 234px | 3+4 |

  O pior caso é 1024px, não 1280: a foto encolhe com a janela e o texto não. 4+3 (232px)
  erra por 3px ali — não dá pra salvar arredondando.

  ✅ fechado em 2026-08-24 — **a variante patrocinada ganhou par próprio: 2+3**
  (decisão do Pedro). Vale inverter a leitura da conta: em vez de "que par cabe nesta
  largura", **que largura mínima cada par exige** — é a forma que serve pra reimplementar.

  | par (título+lead) | custo | largura mínima sem sponsor | com sponsor |
  |---|---|---|---|
  | 2+2 | 128px | 722px | 962px |
  | **2+3** | 152px | 794px | **1034px** |
  | 3+3 | 168px | 842px | 1082px |
  | **3+4** | 216px | **986px** | 1226px |

  Fórmula: `largura mínima = 3 × (custo das linhas + 96 fixo [+ 80 sponsor]) + 50`. A
  diferença entre as duas colunas é sempre 240px (= 3 × 80). Sem patrocinador toda a
  escala até 3+4 cabe abaixo de 1024 — a restrição só morde quando a SponsorLine entra.

  Por isso os dois pares: **3+4 sem patrocinador** (pede 986px, cabe desde a entrada do
  `lg:`) e **2+3 com** (pede 1034px). O 2+3 estoura só de 1024 a 1034px, e por 3px —
  orçamento de 149px contra 152 pedidos. Duas alternativas descartadas, e o motivo:
  **2+2** caberia em qualquer largura, mas compra 10px de faixa ao custo de uma linha de
  lead, e faz o card patrocinado mostrar bem menos texto que o normal sem razão visível.
  **Clamp responsivo** (2+3 abaixo de `xl:`, 3+4 acima) é o que a conta pediria, e é
  justamente o que não se quer com 11 portais reimplementando em PHP: um clamp que troca
  de valor no breakpoint é uma regra a mais pra divergir entre eles. Par fixo é mais
  seguro de reproduzir que ótimo.

  **Isso é regra só de desktop.** Abaixo de `lg:` o card empilha, não há split, a foto
  mantém 3:2 e o texto flui embaixo — nenhum clamp aperta nada. Quando o 2+3 estoura
  (1024–1034px) a foto cresce além do 3:2 e o `object-cover` recorta: perde proporção,
  não distorce nem quebra layout.

  Consequência estrutural (independente do par escolhido): quando o texto fica mais alto
  que a imagem, a foto precisa esticar até a altura do card, senão sobra faixa branca
  embaixo dela e o "mídia sangra até a borda" quebra — `lg:grow` na Thumbnail dentro de
  um painel `flex flex-col`. **Não** use `flex-1` (zera a base e colapsa o painel) nem
  `h-full` (altura percentual não resolve contra flex item esticado — testado, não
  funciona). No caso normal, com texto curto, a proporção 3:2 continua sendo quem dita a
  altura do card.
- ✅ resolvido em 2026-08-23 — **não existe versão com a foto à esquerda.** A foto fica
  sempre à direita no destaque único (decisão do Pedro), e não há story do lado
  invertido. Para o back-end: **não é uma opção de admin.**
  ✅ fechado em 2026-08-24 — a prop `inverse` **saiu do contrato do `NewsCard`**
  (decisão do Pedro). Ela era lida só dentro do branch `boxed`, e o destaque único é o
  único consumidor de `boxed` no repo (os cards "boxed" de `CategoryColumn` e da home
  têm markup próprio, não usam a prop) — então a remoção não virou a ordem de nenhum
  card existente. No split, `lg:order-1` no texto e `lg:order-2` na mídia agora são
  fixos, e o raio dos cantos da mídia virou constante. **Para o back-end: a ordem
  texto→mídia do split não é parametrizável; não existe flag nem variante pra inverter.**
- **Favoritar** — o card recebeu o mesmo `Toggle` de favoritar dos demais cards da home
  ("a notícia tem as mesmas características de qualquer outra"), seguindo o precedente
  dos cards "boxed"/"patrocinado" (toggle irmão do `<a>` da `Thumbnail`). O Figma do
  handoff não mostra o toggle — **não** é uma divergência, é uma feature transversal
  posterior ao frame.
- ✅ resolvido em 2026-08-23 — **virou variante do `NewsCard`** (decisão do Pedro na
  revisão). A primeira versão era um componente com markup próprio; o handoff diz
  "✓ Reutiliza News Card 2.0 existente" e o eixo do component set no Figma
  (`1709:7090`) é Size × Orientation × State, então o card entrou como
  **`size="xlarge"` + `orientation="horizontal"` + `boxed` + `sponsor`** (mais o
  `inverse`, que existiu até 2026-08-24 — ver o item da foto à esquerda acima).
  Os três novos booleanos usam vocabulário que JÁ existe no arquivo do Figma —
  "News Card 2.0 / Boxed", "News Card 2.0 / Patrocinado", "Video Card 2.0 / Inverse" —
  em vez de nomes inventados. `DestaqueUnico` ficou como invólucro de seção (container
  + regras de negócio documentadas), sem markup de card. `leadClassName` foi adicionado
  como escape hatch simétrico ao `titleClassName` que já existia.
  **Consequência para o back-end:** `CategoryColumn` (card "boxed") e `DestaqueSection`
  (card "patrocinado") continuam com markup à mão fazendo a mesma coisa — agora dá pra
  convergir os dois nessa variante numa próxima rodada. Não foi feito aqui (fora do
  escopo, mexe em outras telas).

## Button — tone inverse formalizado no Figma

- ✅ resolvido em 2026-08-27 — **`tone="inverse"`** (`src/components/button/index.tsx`)
  deixou de ser extensão só dev-side: o componente Figma `Button [1.1]` (node
  `3185:47973`) ganhou uma property `Tone` (`Default` | `Inverse`), com 81 variants
  novas espelhando as cores já documentadas em `figma-specs/button.md` (branco/
  `primary-600` no filled, borda+texto brancos no outlined/ghost, opacidade `/40` nos
  estados disabled). Total do component set passou de 81 para 162 variants.
  `figma-specs/button.md` atualizado para remover a nota de que o Figma não tinha essa
  variante.
- Achado durante a formalização: nos 27 variants com ícone à direita (`Left Icon=Off,
  Right Icon=On`) sob `Tone=Inverse`, o vetor do ícone ficou com a cor antiga do tone
  default — só o texto tinha sido recolorido no primeiro passo. Corrigido para casar
  com a cor do texto em cada estado; verificado nos 108 variants com ícone (54 default
  + 54 inverse) sem mais divergências.

## Tooltip do toggle de favoritar recortado por `overflow-hidden`

- ✅ resolvido em 2026-08-23 **só no `NewsCard`** — card com moldura que usa
  `overflow-hidden` no `<article>` pra recortar a imagem nos cantos arredondados
  recorta TAMBÉM o balão do tooltip do toggle de favoritar, que é posicionado fora
  dos limites da mídia (aparece cortado na borda do card). No `NewsCard boxed` o
  `overflow-hidden` foi removido do `<article>` e o raio passou a ser aplicado canto
  a canto na própria `Thumbnail` — que já tem o `overflow-hidden` dela pro zoom da
  imagem —, com classes por canto (`rounded-tl-lg`/`rounded-br-lg`…) em vez de
  `rounded-t`/`rounded-r`, que colidiriam entre si no `twMerge`.
- 🔴 **EM ABERTO — mesmo bug, mesmos dois cards, não corrigidos:**
  `src/components/category-column/index.tsx:130` (card "boxed", `rounded-sm
  overflow-hidden`) e `src/components/destaque-section/index.tsx:100` (card
  "patrocinado" do mobile, `rounded-sm overflow-hidden`). Ambos têm `Toggle` com
  tooltip dentro do container recortado. Não tocados nesta rodada por estarem fora do
  escopo do destaque único (mexem em outras telas) — a correção é a mesma três linhas
  aplicada no `NewsCard`. Se esses dois convergirem para `NewsCard boxed` (item
  acima), o bug some junto.
