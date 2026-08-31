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

## Icon Button — Tone formalizado no Figma e implementado no código

- ✅ resolvido em 2026-08-28 — o component set `Icon Button [1.2]` (`71:6001`) ganhou a
  mesma property `Tone` (`Default` | `Inverse`) do `Button [1.2]` (`3185:47973`), com as
  27 variants novas usando exatamente a mesma paleta (branco/`primary-600` no filled,
  borda+ícone brancos no outlined/ghost, opacidade `/40` nos estados disabled). Total do
  component set passou de 27 para 54 variants. No mesmo dia, `tone="inverse"` foi
  implementado em `IconButton` (`src/components/icon-button/index.tsx`, `types.ts`),
  espelhando a estrutura já usada no `Button` (`TYPE_CLASSES` por tone, prop opcional
  default `'default'`). `figma-specs/icon-button.md` atualizado com a tabela de cores.
  **Diferente do achado do Button**: ali o código já tinha `tone="inverse"` e o Figma
  estava atrasado; aqui foi o oposto — o Figma ganhou `Tone` primeiro, código
  implementado em seguida, na mesma sessão.

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

## Toggle — rótulo, `type` e `ToggleGroup` existem no código e não no Figma

- 🔴 **EM ABERTO — 2026-08-30.** O `Toggle [1.0]` (`7952:127473`) ganhou três extensões
  dev-side, todas sem contrapartida no Figma. Mesmo formato do achado do `Button` acima
  (`tone="inverse"` nasceu no código e foi formalizado depois, com as cores seguidas 1:1) —
  a diferença é que ali o padrão já existia descrito ad hoc em outros specs, e aqui não
  existia nada. Base de interação: shadcn/ui Toggle e ToggleGroup. Tabelas completas de
  cor, geometria e HTML alvo em [`figma-specs/toggle.md`](../figma-specs/toggle.md).
  1. ✅ **Rótulo visível — RESOLVIDO em 2026-08-30**, no mesmo dia, como component set
     SEPARADO `Toggle Label [1.0]` (`8463:129460`, 144 variants: Selected × State × Size ×
     Type × Icon). Não virou property do `Toggle [1.0]`: isso o levaria de 144 a 288 variants, e
     dois sets de 144 e 72 são navegáveis onde um de 288 não é. Tem property de texto
     `Label` (tipo TEXT), então o rótulo troca por instância sem detach. **Sem `Surface`**
     — não há caso de produto para pílula com texto sobre fotografia, e incluir dobraria
     para 144 sem consumidor. O texto abaixo descreve o estado ANTERIOR à resolução:
     O component set inteiro é só-ícone.
     Sem medida no Figma para uma pílula com texto, a geometria é **importada** do
     `Button [1.1]` (altura, padding, gap, tipografia, via as constantes `BUTTON_*` que
     aquele componente exporta) em vez de redigitada — assim um ajuste de padding lá não
     abre divergência aqui. Para o Figma: falta uma property `Label` no `7952:127473`, e
     uma decisão sobre se a pílula do Button é mesmo a geometria certa.
  2. ✅ **`type` (`ghost | outlined | filled`) — RESOLVIDO em 2026-08-30**, no mesmo dia.
     O set do Figma era inteiro `ghost`; ganhou a property `Type` e passou de 48 para
     **144 variants** (as 48 originais viraram `Type=Ghost`, que é o que sempre foram).
     `outlined` e `filled` seguem o **toggle** do MD3, não o botão: o não-selecionado do
     `filled` é um contêiner neutro (`neutral-50`), porque aqui `filled` quer dizer
     "contêiner que se preenche ao ligar", e não "ação principal" como no `Button`. As
     duas exceções visuais (contorno neutro que não muda ao ligar, ligado em ultramarine)
     entraram junto. Tabela completa em `figma-specs/toggle.md`.
  3. **`ToggleGroup`** (`src/components/toggle-group/`) — composição de `Toggle`s, não
     componente novo. `selection` (`single | multiple`), `allowDeselect`, `role="group"`.
     Não vira controle segmentado (cantos grudados, como no shadcn) porque a geometria
     deste DS é pílula e cortar o raio das pontas internas exigiria um raio fora da tabela
     do DS. Se o Figma quiser segmentado, é um raio novo a aprovar.
- **A regra do preenchimento é a decisão que mais precisa de confirmação.** O `on` ganha
  fundo sempre que o estado não estiver legível de outra forma — e ele só está legível de
  outra forma em UM caso: `ghost` só-ícone com `iconOn` ≠ `iconOff`, que é exatamente o set
  do Figma (contorno → preenchido). Consequência visível: `type="ghost"` **não** preenche
  no formato só-ícone e **preenche** com rótulo. Foi assim para não mudar um pixel dos
  cinco call sites de favoritar já revisados, e porque um toggle de texto `ghost` sem fundo
  teria o estado invisível. 🔴 A CONFIRMAR: o Figma aceita a mesma `type` com dois
  comportamentos de fundo, ou prefere um nome separado para o toggle com rótulo?
- **`favorito-toggle` também nasceu sem node no Figma — 2026-08-30.** Instância pronta do
  `Toggle` com os textos e ícones de favoritar fixados. Existe porque os mesmos seis props
  (`iconOn`, `iconOff`, `labelOn`, `labelOff`, `tooltipOn`, `tooltipOff`) estavam repetidos
  palavra por palavra em cinco call sites — NewsCard (dois), VideoCard, CategoryColumn,
  DestaqueSection e a tela de conteúdo. Copiado seis vezes, o aria-label diverge no primeiro
  ajuste, e divergência entre portais é o risco central deste sistema. **Para o back-end:**
  isto não é um componente a reimplementar, é a instrução de que esses seis textos têm uma
  fonte só.

## Toggle com rótulo — `labelOn`/`labelOff` proibidos pelo tipo

- ✅ resolvido em 2026-08-30, na própria extensão — no formato com rótulo visível o
  componente **não emite `aria-label` nenhum**, e o tipo TypeScript torna `labelOn`/
  `labelOff` inescrevíveis ali (`never`). Um `aria-label` divergente do texto na tela quebra
  o WCAG 2.5.3 (Label in Name): quem dita "clicar em Favoritar" por voz não alcançaria o
  botão. O estado continua em `aria-pressed`, nunca no nome acessível — por isso o rótulo do
  `FavoritoToggle` é estável ("Favoritar" nos dois estados) em vez de virar "Favoritado".
- Pelo mesmo mecanismo, o formato só-ícone agora exige `labelOn`/`labelOff` **pelo tipo**,
  em vez de depender de auditoria posterior: um toggle só-ícone sem nome acessível deixou de
  ser escrevível.

## Toggle — duas exceções visuais que o separam do Button

- ✅ aplicado em 2026-08-30, a pedido do design. Sem elas o `Toggle` preenchido era
  visualmente indistinguível de um `Button [1.1]` filled, e o outlined fazia o estado
  DESLIGADO pedir a atenção da tela — o estado que menos merece.
  1. **`outlined` tem contorno neutro que não muda ao ligar:** `border border-neutral-100`
     nos dois estados. O que muda é o miolo (`bg-primary-100` + text `secondary-950`).
     Antes era `border-[1.5px] border-primary-600` → `border-secondary-950`.
  2. **`filled` ligado é ultramarine (`secondary-950`), não `primary-600`.** Hover do
     ligado aprofunda pra `primary-600`. Antes era o inverso, que é exatamente o
     `Button [1.1]` filled em repouso e seu hover.
- **A largura virou `border` (1px), não `border-[1.5px]`.** 1.5px é a medida exata do
  `Button [1.1]` no Figma e está justificada em `figma-specs/button.md` ("único arbitrary
  value justificado"). O `Toggle` outlined **não existe no Figma** — não havia medida a
  honrar, e usar 1.5px era herdar por analogia com um componente diferente. 1px +
  `neutral-100` é o que todo controle interativo com contorno deste DS já usa: `form-field`,
  `form-select` e `search-bar` são os três literalmente `border border-neutral-100`.
- **O `filled` ON em `secondary-950` não é uma escolha nova, é convergência.** O `Switch`
  marcado (`has-[:checked]:bg-secondary-950`) e os checkboxes já ligam em ultramarine, e
  `figma-specs/form-toggle.md` registra a regra por escrito: "Cor ON é `secondary-950`
  (Ultramarine), **não** `primary-600`. Alinhado com checkboxes do DS." O `Toggle` era o
  único controle de estado do repo fora dessa regra.
- 🔴 **A CONFIRMAR — contraste do contorno neutro (WCAG 1.4.11, non-text contrast).**
  `neutral-100` (#D6D8DD) sobre branco dá ≈ **1.4:1**, contra os 3:1 exigidos para o limite
  de um componente de UI ativo. Isto **não é regressão do Toggle**: é a mesma medida que
  `form-field`, `form-select` e `search-bar` já usam, então a pergunta é do DS inteiro, não
  deste componente — trocar só aqui criaria a divergência que o pedido queria evitar. Dois
  atenuantes reais: o rótulo/ícone dentro do controle é `primary-600` (alto contraste), e o
  contorno não é o único indicador de que ali há um controle. Se o DS decidir subir, o
  primeiro neutro que passa de 3:1 sobre branco é `neutral-500` (#8391A9, ≈ 3.5:1) —
  `neutral-300` (≈ 2.2:1) e `neutral-400` (≈ 2.8:1) ainda não passam.
- 🔴 **A CONFIRMAR — no estado ON, `outlined` e `ghost` ficaram visualmente iguais.** É
  consequência direta e previsível de "o contorno permanece o mesmo": o neutro
  `neutral-100` (#D6D8DD) contra o fundo do ON `primary-100` (#D4DAE0) dá **1.01:1** — o
  contorno some dentro do próprio preenchimento. Como as duas aparências passam a ter
  `bg-primary-100` + text `secondary-950`, o `outlined` ligado é indistinguível do `ghost`
  ligado; a diferença entre elas só existe no estado OFF. Pode ser aceitável (estados
  selecionados convergirem é comum em toggle), mas é uma variante a menos na prática e
  precisa ser uma decisão consciente, não um efeito colateral. Se tiver que ser
  distinguível, a alternativa mais barata é o ON não usar `primary-100` — subir o contorno
  pra `neutral-200` resolve pouco (1.21:1 contra o mesmo fundo) e quebraria o "permanece o
  mesmo" que foi pedido.


## Toggle — o que o Figma revelou ao ser atualizado (2026-08-30)

Três achados que só apareceram ao abrir o arquivo para criar a property `Type`. Os dois
primeiros são divergências reais; o terceiro é uma limitação da ferramenta que virou
decisão de modelagem.

- 🔴 **O anel de foco é 1px no Figma e 2px no código.** O arquivo desenha `State=Focused`
  como stroke de **1px** `strokeAlign: OUTSIDE`; o código usa `ring-2`. A spec
  `figma-specs/toggle.md` afirmava "2px" — estava errada, e foi corrigida a partir da
  leitura do nó, não do contrário. **A CONFIRMAR:** qual das duas é a medida certa. Um
  anel de 1px é frágil como indicador de foco (WCAG 2.4.11/2.4.13 pedem no mínimo 2px de
  espessura para o indicador), o que sugere que o Figma é que deve subir para 2px — mas
  isso muda 48 variants e é decisão de design.
- 🔴 **`Type=Filled` + `State=Disabled` deixa o ícone invisível.** O código faz
  `disabled:bg-neutral-200 disabled:text-white`, herdado do `Button [1.1]` filled. Num
  botão o rótulo ainda tem alguma forma; num toggle só-ícone o resultado é um disco cinza
  liso — o ícone some por completo (branco #FFFFFF sobre `neutral-200` #C2C7CF ≈ 1.6:1).
  Visível nas 6 variants `Filled/Default/Disabled` da página. Controle desabilitado é
  isento de contraste pela norma, mas "sem ícone nenhum" não comunica o que o controle é.
  Vale trocar o ícone do filled disabled para `neutral-50` ou manter o contêiner e apagar
  só parcialmente — decisão de design, não aplicada.
- ℹ️ **Como o anel de foco foi modelado no `Type=Outlined`.** Um nó do Figma tem UM stroke,
  com UM alinhamento, e no outlined ele já está ocupado pela borda neutra (INSIDE) — não
  há onde colocar o anel (OUTSIDE). A primeira tentativa, `DROP_SHADOW` com `spread: 1`,
  **não desenha nada**: sem `fill`, a sombra do Figma não tem geometria de onde ser
  projetada (o nó chega a crescer de 40×40 para 42×42, mas nenhum pixel é pintado —
  verificado lendo os pixels do PNG). A solução foi um retângulo filho `focus ring`
  posicionado em absoluto, 1px maior de cada lado, que é a modelagem fiel do CSS: o
  `box-shadow` fica FORA da caixa da borda e os dois coexistem. **Para o back-end isso não
  muda nada** — continua sendo `border` + `ring` no mesmo elemento; é detalhe de como o
  Figma representa.
- **Fora do escopo desta rodada, ainda em aberto no Figma:** a property `Label` (rótulo
  visível) e `iconPosition`. O set continua só-ícone. Somar `Label` levaria as 144 a 288
  variants e exige nó de texto por variant — foi adiado deliberadamente, não esquecido.


## Toggle — 36 das 144 variants do set só-ícone são visualmente idênticas (2026-08-30)

- 🔴 **EM ABERTO — achado do design ao revisar o set, confirmado por comparação
  programática** (impressão digital de cada variant por tamanho, fill, stroke, cor de
  ícone e ícone usado): das 144 variants, só **117 aparências distintas**. 18 pares
  renderizam exatamente igual entre `Type` diferentes — todos `Ghost` ↔ `Filled`:
  - `Filled/Default/Off/Enabled` é idêntica a `Ghost/Default/Off/**Hovered**` (3 sizes).
    Colisão entre TYPE e STATE, não só entre types: o repouso do filled desligado é o
    mesmo `neutral-50` do hover do ghost.
  - Em `Surface=OnMedia`, `Filled` difere de `Ghost` em apenas **9 das 24** variants. As
    15 restantes são idênticas porque o repouso do filled sobre foto reusa o mesmo branco
    80%. O racional está documentado em `figma-specs/toggle.md` ("sobre foto não existe
    contêiner neutro que se distinga do scrim"), mas numa grade de variants isso lê como
    enchimento — e funcionalmente é: o designer escolhe `Filled`, sobre foto, e nada muda.
- **Encaminhamento proposto, não aplicado** (é decisão de design): dar ao
  `Filled/OnMedia/Off` um contêiner próprio usando `bg-black/20` — que o CLAUDE.md já
  lista como o token de scrim/overlay do DS — com ícone branco. Aí `Filled` passa a
  existir de verdade sobre foto, e as 15 colisões viram 0. Muda código E Figma juntos.
- A colisão `Filled/Default/Off/Enabled` × `Ghost/Default/Off/Hovered` é mais espinhosa:
  são estados diferentes de types diferentes, e as duas cores vêm da mesma decisão MD3
  (contêiner neutro = `neutral-50`). Pode ser aceitável — hover é transitório, ninguém vê
  os dois lado a lado no produto — mas na folha de variants confunde.


## Button [1.2] — letter-spacing do Size=Small diverge do token do código

- 🔴 **EM ABERTO — 2026-08-30.** Achado ao ler as medidas do `Button [1.2]` (`3185:47973`)
  para construir o `Toggle Label [1.0]`. No Figma, o texto das variants `Size=Small` usa
  **`letter-spacing: 0.25px`**; o token do código é `--text-title-sm--letter-spacing:
  0.10px` (`src/index.css`). Tamanho (14px) e line-height (20px) batem — só o tracking
  não.
- **0.10 é o valor do MD3** (Title Small e Label Large, ambos 14sp / lh 20 / tracking
  0.1), então a suspeita é que o Figma é que está fora, não o código.
- **O `Toggle Label [1.0]` foi construído com 0.10**, seguindo o código. Ou seja: o Small
  do Toggle com rótulo e o Small do Button têm tracking diferente hoje, e essa diferença
  nasceu desta decisão — deliberada, não descuido. Vale unificar assim que o valor certo
  for confirmado; se for 0.25, são 2 lugares para mudar (token do código + as 6 variants
  Small do Toggle Label).

## Biblioteca exclusiva — achados (2026-08-30)

Levantados ao construir `/biblioteca-exclusiva` a partir do layout do Figma
(`8261:11151`, 12 anotações) e ao extrair o acervo real de
`https://www.foodconnection.com.br/materiais-de-download/` (3 primeiras páginas,
30 materiais). Nenhum é executado nesta rodada.

### Decisões tomadas na revisão do layout (Pedro, 2026-08-30)

- **Banner de bloqueio removido.** A fase 1 tinha um banner "Faltam N campos…" no topo
  da aba. O Figma não o desenha e a anotação move o bloqueio para o card (cadeado no
  badge de tipo) + modal de incentivo ao clicar em "Baixar". O banner saiu; o componente
  `library-gate-banner` não chegou a existir nesta versão.
- **Grade paginada mantida.** Selecionar uma categoria continua substituindo Destaque +
  seções por uma grade cronológica de 20 por página, com contador. O Figma só desenhou o
  estado inicial da aba, e a anotação do filtro ("filtram os conteúdos abaixo") não
  conflita com isso.
- **Terceira seção proposta: "Mais acessados do portal".** O Figma tem 3 seções, todas
  com "Título da Seção" de placeholder. As duas primeiras vieram do briefing (Novos
  materiais, Para o seu setor); a terceira foi proposta pelo dev e **espera confirmação**.
  Ela é suprimida quando "Para o seu setor" cai no fallback (c), que já se chama "Mais
  acessados do portal" — nesse caso a aba tem 2 seções, não 3.

### Taxonomia — 80% do acervo sem categoria editorial na fonte

- 🔴 **EM ABERTO — dado para a discussão com o tech lead.** **24 dos 30 materiais (80%)**
  tiveram a categoria INFERIDA pelo tema do título, porque a URL deles não carrega
  categoria editorial nenhuma. Só 6 vivem sob um caminho editorial
  (`/proteina-animal/`, `/ingredientes/`, `/sustentabilidade/`). Os outros 24 vivem sob
  `/materiais-de-download/` (o container do acervo) ou `/eventos/<feira>/` (hub de
  feira). O cabeçalho da própria página de material confirma: exibe "Materiais de
  Download" no lugar da categoria. **Na fonte, o container virou a categoria.** Cada item
  inferido está comentado em `src/mocks/biblioteca.ts`; o balanço é impresso no console
  em DEV (`src/dev/biblioteca-extracao-log.ts`).
- 🔴 **EM ABERTO** — dois itens sob `/materiais-de-download/` **não são material de
  download**, são artigos editoriais ("Proteína de inseto…", "Ozempic, 6×1 e custo da mão
  de obra…"): texto corrido, sem arquivo associado. O container mistura artigo e
  material. Se a Biblioteca espelhar o container, ela lista artigo como se fosse
  material baixável.

### `[Pesquisa]` — quarto tipo que o contrato não tem

- 🔴 **EM ABERTO** — o título "O poder da IA no mercado de alimentos e bebidas… **[Pesquisa]**"
  traz um sufixo de tipo que **não existe em `MaterialType`** (`'ebook' | 'whitepaper' |
  'infografico'`). Mapeado para `'whitepaper'` — o mais próximo dos três — e comentado no
  mock. **Decisão pendente: `MaterialType` ganha `'pesquisa'`, ou a redação passa a usar
  `[Whitepaper]`?**
- Nas 3 páginas extraídas **não apareceu nenhum `[Infográfico]` nem `[Whitepaper]`**. Os
  dois tipos existem no contrato e estão implementados (badge, cor), mas não têm caso
  real no protótipo — só stories.

### `subsetor` não existe no modelo de perfil

- 🔴 **EM ABERTO** — a cadeia de fallback de "Para o seu setor" depende de um `subsetor`
  declarado no perfil, e **esse campo não existe**. `PerfilCampos`
  (`src/mocks/dashboard-perfil.ts`) só tem `setor`, cujos valores (`OPCOES_SETOR`: Agro,
  Alimentos & Bebidas, Embalagens, Saúde, Logística, Varejo, Tecnologia, Outro) são
  **setores macro incompatíveis com a taxonomia editorial do portal** — "Proteína animal",
  o exemplo do próprio briefing, não está nessa lista. O campo foi declarado em
  `PerfilBiblioteca` (`src/mocks/biblioteca.ts`), e **não** adicionado a `PerfilCampos`,
  de propósito: a aba Perfil calcula completude com `Object.keys(PERFIL_CAMPOS).length`,
  então um campo novo lá mudaria a matemática de uma tela fora do escopo. **Decisão
  pendente: `subsetor` é campo novo do cadastro (com a taxonomia editorial como domínio),
  ou `setor` é que precisa mudar de domínio?**

### Três campos do `Material` que a fonte não tem

- `requerCadastroCompleto`, `disponivel` e `baixado` **são simulados**. A anotação diz
  "ALGUNS materiais são bloqueados", então o gate é por material — mas **nada na fonte
  diz quais**. Hoje: 15 de 30 bloqueados, 3 indisponíveis, 5 baixados, escolhidos à mão.
  🔴 **Decisão pendente: o que torna um material "bloqueado"?** (tipo? patrocinador?
  campo no CMS?) É a regra que o back-end precisa implementar e que ninguém definiu.

### Capa 16:9 — a fonte não tem 16:9

- 🔴 **EM ABERTO** — o LibCard especifica capa 16:9 (`aspect-[160/90]` no Figma). Das 26
  capas com dimensão na URL, **apenas 1 é 16:9** (1024×576). A maioria é banner largo: 14
  em 1024×423 (**2,42:1**), 6 em 1024×546, 5 em 1024×532. Forçar 16:9 com `object-cover`
  recorta ~26% da altura das 2,42:1 — e essas são artes promocionais **com texto**, então
  o recorte corta palavras. O card implementa 16:9 como desenhado; a proporção precisa ser
  revisitada com as capas reais na mão.

### `arquivoUrl` não é extraível da fonte

- Nenhuma das 30 páginas de material expõe link direto pro arquivo — o download fica atrás
  de formulário. `arquivoUrl` aponta pra **página pública do material**, não pro arquivo, e
  está comentado como tal no mock. **Para o back-end: a URL do arquivo é dado que só existe
  do lado de dentro.**

### `CategoriaColor` tem 7 cores para 8 categorias — e nenhum tom neutro

- 🔴 **EM ABERTO** — o portal tem 8 categorias editoriais e `CategoriaColor`
  (`src/components/categoria/types.ts`) oferece 7. `Embalagens` e `Indústria A&B`
  compartilham `primary-600`. Nenhuma cor nova foi inventada fora do DS.
- 🔴 O LibCard "Indisponível" precisa da categoria em **neutro** (`#6C7F9E`), e
  `CategoriaColor` não tem tom neutro — o card sobrescreve por `className`. Ou o
  `Categoria` ganha um tom `neutral`, ou o esmaecimento vira responsabilidade do
  consumidor de forma documentada.

### Divergências entre o Figma e o que foi implementado

- **Card como `<button>`.** No Figma o LibCard aberto é um botão contendo outros quatro
  controles (Baixar, abrir post, compartilhar, favoritar). Botão dentro de botão é HTML
  inválido e o clique conflita. Implementado como `<article>` com o título sendo o link do
  post e os controles como irmãos. **Documentado o correto, não o desenhado** (regra 4 do
  CLAUDE.md).
- **Glifo do favoritar.** O Figma usa `bookmark` no ActionBar; o DS usa `favorite`
  (coração) em todos os 5 pontos de favoritar do repo, e a anotação diz "Favorita e abre
  toast. Semelhante a Últimas leituras" — ou seja, é a mesma feature. Implementado com o
  `FavoritoToggle` canônico. **Trocar o glifo só aqui é que seria a divergência.**
- **Abertura do card.** O component set tem `Hovered + Opened=On`, mas não
  `Enabled + Opened=On` — o que sugere abertura por hover. Implementado assim (mais foco
  de teclado, por acessibilidade). 🔴 **O comportamento em touch não foi desenhado**: sem
  hover, o card fica sempre fechado e o lead/ActionBar ficam inalcançáveis no mobile.
  Precisa de decisão (tap abre? o card aberto vira bottom sheet?).
- **O Destaque não tem ação de baixar.** O Figma desenha só badge + categoria + manchete
  + lead + imagem; o card inteiro leva ao post. Uma primeira versão desta implementação
  acrescentou um botão "Baixar" abaixo do card — removido, era invenção. O cadeado no
  badge continua aparecendo ali: informa o estado do material, não oferece ação.
- **Na grade filtrada o card não abre.** A expansão de 236→519px empurraria a linha
  inteira e o SidePanel não cabe numa coluna de grade. O Figma não desenha a grade.
- **`Link Button` "ver todos" no cabeçalho de seção** existe no Figma mas está `hidden`.
  Não foi renderizado. O caminho para o acervo completo de uma categoria é a FilterBar.

### `DashboardTabs` passou a misturar duas formas de navegação

- A aba "Biblioteca exclusiva" é a única com `href` absoluto (`/biblioteca-exclusiva`): é
  uma **rota**, enquanto as outras cinco são `?tab=` de `/dashboard-perfil-v4`. **Para o
  back-end a barra deixou de ser uniforme**; vale decidir se as outras cinco também viram
  rotas numa próxima rodada.
- O mock do Figma mostra as abas "Visão geral · Perfil · Newsletter · Downloads ·
  Favoritos · Biblioteca exclusiva" — conjunto do `dashboard-tabs-v3`, que está
  **arquivado**. O canônico (`dashboard-tabs`) é "Meu Perfil · Downloads · Newsletter ·
  Últimas leituras · Favoritos". Tratado como instância desatualizada no mock, não como
  pedido de mudança. **Confirmar.**

### `favoritos-store` não é renderizável no servidor

- `useFavorito`/`useFavoritos` chamam `useSyncExternalStore` sem `getServerSnapshot`, o
  que faz `renderToString` estourar em qualquer tela que monte um `NewsCard`. Não é bug
  em produção (o app é client-only), mas impede smoke test de render. Uma linha resolve
  (o `biblioteca-gate-store` já faz isso com `latchNoServidor`). Não corrigido aqui por
  estar fora do escopo e mexer em store compartilhada.

### Normalização de título disclosada

- A regra é preservar o título íntegro, e ela foi seguida — com **uma** exceção declarada:
  espaço em branco nas bordas é aparado. O título "Ozempic, 6×1 e custo da mão de obra…"
  vem da fonte com espaço final (artefato do HTML). Sufixos entre colchetes, acentuação,
  pontuação, o `6×1` com sinal de multiplicação e a caixa **não** foram tocados.

### Revisão do layout — 2026-08-30 (segunda rodada)

Sete correções pedidas pelo Pedro comparando a implementação com o Figma. As três
primeiras **desfazem regras do briefing da fase 1** e ficam registradas por isso.

- **Seções perderam o texto de apoio.** O briefing (regra 4) pedia um subtítulo
  explicando a origem da recomendação ("Baseado em Proteína animal, que você indicou no
  perfil"); o Figma só tem o título. O subtítulo saiu do contrato de `SecaoBiblioteca`.
  🔴 **Consequência: a origem da recomendação deixou de ser explicada ao leitor.** As
  três origens (subsetor / histórico de 90 dias / popularidade) continuam distinguíveis
  em código (`Recomendacao.origem`) e só o elo (c) muda o título da seção — do lado de
  fora, (a) e (b) agora são indistinguíveis. Se isso importar, o lugar natural é um
  texto de apoio ou um tooltip no título.
- **Selo "Baixado" removido.** O briefing (regra 4) pedia o selo em qualquer seção; o
  Figma não o desenha. `material.baixado` continua no mock e **sem consumidor visual** —
  🔴 decidir se volta em outro formato ou se o campo sai do contrato.
- **Detalhes abrem no CLIQUE, não no hover.** O nome da variante do Figma
  (`Hovered, Opened=On`) tinha levado a implementar abertura por hover. Agora o card
  fechado é um `<button>` com `aria-expanded`. Resolve de quebra o achado anterior sobre
  o comportamento em touch: clique funciona nos dois. **O título deixou de ser link** —
  duas ações concorrentes no mesmo alvo produziam o clique errado; ir para o post é a
  ação do `open_in_new` na ActionBar, como a anotação já dizia.
- **Barra de rolagem horizontal na página.** O trilho e a FilterBar sangravam até a borda
  da viewport com `-mx-4 px-4`, o que empurrava o conteúdo para fora do container e dava
  scroll no DOCUMENTO, não no trilho. A sangria saiu; o wrapper do carrossel ganhou
  `overflow-hidden` + `min-w-0`. **Para o back-end: a rolagem tem de ser do trilho, nunca
  da página** — é o erro fácil de reintroduzir ao reimplementar.
- **Categoria sem acervo não vira filtro** (`categoriasComAcervo()`). `Embalagens` saiu
  da barra. 🔴 **Consequência: o estado vazio da grade não é mais alcançável pela
  interface** — só por link direto de uma categoria que ficou sem conteúdo depois de
  compartilhada. Ele continua implementado e é o cenário `acervo-vazio`.
- **Clicar no filtro ativo desliga.** Antes o filtro ativo era inerte e só o "Todos"
  voltava ao acervo. Agora desligar acende o "Todos" e some com o `?tema=` da URL.
- **Grade filtrada em 4 colunas** (`grid-cols-4` explícito, 2 no tablet, 1 no mobile).
  Estava em `auto-fill minmax(236px,1fr)` brigando com o `w-[236px]` que o card declarava
  internamente — daí o desalinhamento. **O card não declara mais largura própria**: quem
  dá é o consumidor (o `<li>` do trilho, a célula da grade). Na grade o card aberto ocupa
  **duas colunas**, então o painel abre dentro da própria grade, sem modal.

### Filter chip — um controle de filtro, não dois (2026-08-30)

- ✅ **resolvido.** A primeira versão da FilterBar da Biblioteca montava os filtros com
  `Toggle` de rótulo. Estava errado: filtrar conteúdo por categoria já tinha controle
  desenhado — o **`Filter chip`** do MD3 (Figma `1859:18460`) —, aplicado na barra "Refine
  sua busca" da tela de Busca. O Pedro corrigiu o Figma (`8458:115949` agora instancia
  `Filter chip`) e a implementação seguiu.
- Criado `src/components/filter-chip/`, fiel ao component set: `Configuration` (Label only
  | Label & leading icon) × `Selected` × `Show trailing icon`, mais hover/foco/disabled em
  CSS. Selecionar empilha **três** sinais, todos do Figma — check de 20px à esquerda, a
  borda some e entra fundo `secondary-50`, e o texto vira `primary-600` —, e o padding
  muda de `px-4` para `pl-2 pr-4` para o check não empurrar o rótulo.
- **A tela de Busca foi convergida para o mesmo componente.** O markup à mão que vivia lá
  (`src/screens/buscar/index.tsx`) era a razão de o chip não estar "disponível" na hora de
  construir a Biblioteca — chip sem componente é chip que vai ser reinventado. Os chips da
  busca abrem menu (trailing `expand-more`), então recebem `ariaHasPopup="menu"` em vez de
  `aria-pressed`: disparador de menu não é botão de dois estados.
- 🔴 **Para o back-end e para a próxima rodada de doc:** o `Toggle [1.0]` com rótulo
  continua existindo e é legítimo — o que ele NÃO é, é chip de filtro. A regra: filtro de
  conteúdo → `FilterChip`; ligar/desligar uma preferência → `Toggle`.

### Barra de rolagem do trilho ficava visível

- ✅ **resolvido.** A correção anterior tirou a barra de rolagem do DOCUMENTO, mas a do
  próprio trilho continuava desenhada — em macOS configurado para "sempre mostrar
  scrollbar", uma faixa cinza atravessava a seção inteira e lia como erro de layout. O
  trilho e a FilterBar passaram a usar `.scrollbar-hide`, utilitário que **já existia** em
  `src/index.css` e que a `especialistas-section` (o outro carrossel do repo) já usava. A
  rolagem continua inteira: arrasto, roda horizontal, teclado e as setas.

### O card cortado do trilho não pode ser resto de divisão (2026-08-30)

- ✅ **resolvido.** O trilho precisa terminar com um card visivelmente cortado — é o corte
  que diz "role para o lado". Com o card em largura fixa (os 236px do Figma) esse corte
  virava **sobra da divisão**: num container de 1232px sobravam **192px do quinto card,
  81% dele**, o que não lê como corte e sim como card estreito demais.
- A conta foi invertida: **a espiada é fixa e a largura do card sai dela.**

      card = (100% − espiada − colunas × gap) / colunas

  Implementado com custom properties no `<ul>` do `LibCarousel` (`--lib-card`,
  `--lib-gap`, `--lib-peek`, `--lib-cols`), que os `<li>` consomem — o card aberto é
  `2 × card + gap`. Degraus: 1 coluna → 2 (`sm`) → 3 (`lg`) → 4 (`xl`); espiada 64px até
  o `lg` e 56px no `xl`. Resultado: a espiada fica entre **20% e 27% do card de 360px a
  1920px**, em vez de variar com o resto da divisão.
- 🔴 **Para o back-end: 236px NÃO é a largura do card.** É o valor que a fórmula devolvia
  na largura de container do Figma. Reimplementar o trilho com largura fixa reintroduz o
  bug em qualquer container que não seja exatamente aquele. Pela mesma razão o card
  aberto dá 564px no container cheio, e não os 519px do component set: é a mesma
  proporção (dois cards + gap) sobre a largura derivada.
- A grade filtrada não usa a fórmula: lá não há espiada (nada a rolar), as colunas são
  `grid-cols-4` e o card preenche a célula. O `LibCard` aberto cai no fallback de 236px
  para a coluna da capa (`var(--lib-card, 236px)`), já que a variável só existe no trilho.

### Expansão do card na grade filtrada não pode mudar tamanho (2026-08-30)

> ⤷ **Superado no mesmo dia** pela entrada "Uma expansão só, para baixo, nos dois
> contextos" no fim deste arquivo: o Figma foi atualizado e a prop `layout` deixou de
> existir. O registro fica porque o diagnóstico (mudar o tamanho reflui a linha) segue
> válido e é o motivo de a solução final ser a que é.

- ✅ **resolvido.** Na grade, o card aberto ocupava `col-span-2`. Consequência: a cada
  clique a linha inteira se reorganizava e o card saía de baixo do cursor.
- O `LibCard` ganhou a prop **`layout`**, e a diferença não é estética:
  - **`trilho`** — a fila rola de lado, o card pode crescer de lado. Aberto vira card +
    painel lado a lado; o `<li>` passa de um card para dois cards + gap.
  - **`grade`** — a célula tem largura fixa. O card **não muda de tamanho**: o painel
    empilha embaixo e só a altura cresce.
- **Referência do Pedro: MEC Livros** (`meclivros.mec.gov.br`), que resolve exatamente
  assim — o mesmo componente com duas expansões por contexto. No carrossel,
  `.gallery-item { width:232px } .gallery-item.expanded { max-width:560px }`; na grade de
  resultados, `.search-results-grid .gallery-item { width:100%!important;
  height:fit-content }` — travado na largura da célula, só cresce para baixo.
- Detalhe que faz a expansão não deslocar nada: a moldura do aberto (`p-3` + borda)
  comprimiria o conteúdo e empurraria a capa. Em vez de dar padding a todo card fechado
  (o que mudaria o espaçamento da grade e desalinharia a primeira coluna do título da
  seção), **o card aberto cresce para FORA** — `-mx-3 -mt-3` + `w-[calc(100%+1.5rem)]`.
  A calha da grade é `gap-6` (24px), então a borda cai exatamente no meio dela, em espaço
  vazio. **Para o back-end: a medida da sangria e a da calha são a mesma coisa** — mudar
  o `gap` da grade sem mudar a sangria faz a moldura invadir o card vizinho.
- A `<ul>` da grade ganhou `items-start`, senão o card aberto esticaria os vizinhos da
  mesma linha até a altura dele.

### `--lib-card` com `100%` dava largura diferente em cada nível (2026-08-30)

- ✅ **resolvido.** A fórmula da largura do card estava como
  `--lib-card: calc((100% − espiada − colunas × gap) / colunas)`. Custom property é
  substituída como **texto**, não como valor já resolvido — então cada elemento que lia
  `--lib-card` resolvia a porcentagem contra o **próprio pai**:
  - no `<li>` do trilho o pai é a `<ul>` (1232px) → 270px, correto;
  - na coluna da capa dentro do card ABERTO o pai é o card (540px de conteúdo) →
    `(540 − 56 − 96) / 4 = 97px`. A capa encolhia para um terço e o título quebrava em
    três linhas num filete.
- Corrigido trocando `100%` por **`100cqw`** e declarando `container-type: inline-size`
  (utilitário `@container`) no wrapper do trilho. `cqw` resolve contra o container
  declarado, não contra o pai imediato, então `--lib-card` passou a ser um comprimento
  absoluto que qualquer descendente lê com o mesmo valor.
- 🔴 **Para o back-end, é a armadilha central desta fórmula:** ela precisa de um
  ancestral de referência FIXO. Escrita com `%`, ela devolve resultados diferentes em
  cada nível de aninhamento e o erro só aparece no estado aberto — o estado que ninguém
  testa primeiro.

### Uma expansão só, para baixo, nos dois contextos (2026-08-30)

- O Figma do `LibCard` foi atualizado pelo Pedro: o eixo `Opened` virou **`Expanded`**, e
  o expandido (`State=Hovered, Expanded=On`, node `8296:91808`) passou a ser
  **262×411, em COLUNA, `bg-white`** — o card fechado (236px) mais 12px de padding de cada
  lado, com o SidePanel **abaixo**. Não é mais o split de 519px lado a lado.
- Consequência: **a prop `layout` (`trilho` | `grade`) foi removida.** Trilho e grade
  filtrada usam a mesma interação, que é a que o Figma agora desenha — e é também a que a
  correção anterior já tinha construído para a grade. O `<li>` do trilho parou de crescer
  ao abrir; quem cresce é só a altura.
- A sangria (`-mx-3 -mt-3` + 24px de largura) vale nos dois: a calha é 24px tanto no
  trilho (`--lib-gap`) quanto na grade (`gap-6`), então a moldura cai no meio dela.
- 🔴 **Para o back-end, o acoplamento a não quebrar: a sangria e a calha são a mesma
  medida.** Mudar o `gap` sem mudar a sangria faz a moldura invadir o card vizinho.
- O `<ul>` do trilho ganhou `items-start`, senão o stretch do flex esticaria todos os
  cards fechados até a altura do expandido.

### Hover do card não estava implementado (2026-08-30)

- ✅ **resolvido.** O component set tem `State=Hovered, Expanded=Off` (node `8424:11813`)
  com o **título em ultramarine** (`secondary-950`), e isso tinha se perdido quando a
  abertura passou de hover para clique. O card fechado voltou a ter hover; clicar
  continua sendo o que expande.
- No expandido o título **volta para `primary-600`**, como o Figma desenha: ali a moldura
  já destaca o card, e manter o azul de hover competiria com ela. Material indisponível
  não tem hover — não é clicável.

### Ordem da ActionBar (2026-08-30)

- O Figma ganhou um `action-group` (`flex-[1_0_0] justify-end`) envolvendo os três ícones:
  "Baixar" fica à esquerda e abrir/compartilhar/favoritar vão para a **direita**, separados
  dele. Sem isso os quatro controles ficam agrupados à esquerda e o download perde a
  hierarquia de ação principal.
- O lead do expandido é `line-clamp-4` — a altura que o Figma reserva (411px menos card,
  paddings e ActionBar).

### Grupos de hover aninhados sem nome (2026-08-30)

- ✅ **resolvido.** Passar o mouse em UM card acendia o título de TODOS. Causa: dois
  `group` anônimos aninhados — o `LibCarousel` usa um para revelar as setas, e o `LibCard`
  passou a usar outro para o hover do título. `group-hover:` casa com **qualquer**
  ancestral que tenha a classe `group`, então o hover no trilho satisfazia a condição para
  todos os cards de uma vez.
- Corrigido com grupos NOMEADOS: `group/trilho` (setas) e `group/card` (título), com
  `group-hover/trilho:` e `group-hover/card:`. Verificado que não sobrou nenhum `group`
  anônimo na árvore da Biblioteca.
- 🔴 **Regra geral para o repo:** componente que expõe `group` e pode ser aninhado em
  outro deve nomear o grupo. Grupo anônimo só é seguro em componente-folha. Vale conferir
  os outros usos de `group` no repo (`NewsCard`, `CategoryColumn`, `DestaqueSection` têm
  `group` para o hover do título) antes de aninhá-los em algo que também use `group`.

### Tooltips da ActionBar eram cortados pelo container (2026-08-30)

- ✅ **resolvido.** O balão do `Tooltip` é `absolute` dentro do gatilho, então **qualquer
  ancestral com `overflow` o corta**. A ActionBar é a última linha do card expandido, e o
  card vive dentro do trilho (`overflow-x-auto` no `<ul>` + `overflow-hidden` no wrapper):
  com o default `side="bottom"`, o balão saía pela borda inferior e aparecia cortado.
- Os três controles de ícone passaram a `side="top"` — o balão cai sobre o lead, dentro
  dos limites do card, e sobrevive no trilho e na grade. "Baixar" **não** ganhou tooltip:
  já tem rótulo visível, e balão repetindo a palavra que está na tela não informa nada
  (mesmo racional do `showLabel` no `FavoritoToggle`).
- Para isso o `Toggle` ganhou a prop **`tooltipSide`** (repassada pelo `FavoritoToggle`),
  com default `'bottom'` — nenhum dos outros cinco pontos de favoritar do repo muda. O
  lado tem de ser escolhido por quem conhece o container, não pelo Toggle.
- 🔴 **Limitação conhecida, não corrigida:** o balão continua preso ao fluxo (sem portal),
  então um tooltip largo no ícone mais à direita do ÚLTIMO card visível do trilho ainda
  pode encostar na borda do wrapper. A correção de fundo é renderizar o balão em portal —
  vale quando o `Tooltip` for revisto, porque afeta todos os consumidores, não só este.

### Título do card expandido virou link para o post (2026-08-30) — REVERTIDO

> ⤷ **Revertido no mesmo dia.** Ver "Título do card não é link, e por quê" no fim deste
> arquivo. O registro fica porque a razão da reversão só se entende sabendo o que foi
> tentado.


- O Figma ganhou `State=Hovered, Expanded=On` com o **título em ultramarine**
  (node `8458:116227`): no card expandido o título é link para o post.
- Isso obrigou a **separar os alvos de clique no expandido**, porque `<a>` dentro de
  `<button>` é HTML inválido e o clique conflita: ali a **capa** é o botão que fecha
  (`aria-expanded` + `aria-label` "Recolher detalhes de…") e o **título** é um `<a>`
  irmão. Fechado, os dois voltam a ser um botão só — o card inteiro expande.
- **Para o back-end: o alvo do clique MUDA entre os dois estados.** Fechado, o card
  inteiro expande; expandido, a capa recolhe e o título navega. Verificado que nenhum
  `<a>` fica dentro de `<button>` em nenhum dos três estados.
- Tooltip do `open_in_new` passou de "Abrir post" para **"Abrir"**. O `aria-label` do
  botão continua "Abrir o post": o balão é reforço curto, o nome acessível precisa ser
  autoexplicativo fora de contexto.

### Distância entre o título da seção e o trilho (2026-08-30)

- ✅ **resolvido.** A seção declarava `gap-4` (16px) e o espaço visível era 28px: o
  `LibCarousel` reserva `py-3` (12px) para a sangria do card expandido, e esses 12px
  somavam ao gap. O wrapper do trilho ganhou `-mt-3`, que cancela a reserva **para fora**.
  Agora o gap declarado pelo consumidor é o gap visto. 🔴 **Para o back-end: a reserva de
  12px é interna ao trilho e não deve entrar na conta do espaçamento da seção.**

### Seção "Biblioteca exclusiva" na home (2026-08-30)

- Criada `src/components/biblioteca-section/` a partir do node `8424:112623`. Anotação:
  *"Proposta para substituição do banner de 'Material para Download'. 1. Uma seção
  mostrando os 12 'Materiais de download' mais recentes. Objetivo: mostrar valor para o
  leitor na home e incentivar ainda mais o cadastro. (Semelhante a 'Reportagens especiais'
  do CE)"*.
- Entrou como **proposta, não como substituição consumada**: vive atrás do eixo
  `?biblioteca=secao` da ScenarioBar, com o `DownloadSection` atual como **default**. Sem
  os dois disponíveis na mesma tela não dá para comparar, e trocar direto apagaria o
  banner antes da decisão. 🔴 **Decisão pendente: a seção substitui o banner, ou os dois
  convivem?**
- Param próprio (`biblioteca`), não `cenario` — este último já é do destaque único, e dois
  eixos não dividem parâmetro.
- Reusa `LibCarousel` + `LibCard` **sem variante nova**; a diferença é só o painel com
  gradiente (`secondary-500` → `secondary-50`, ambos a 40%). **Para o back-end: é a mesma
  seção da aba logada, não uma cópia com regras próprias.**
- 🔴 **A CONFIRMAR — o gate na home.** A seção renderiza os cards **sem cadeado**: o
  visitante pode nem estar logado, e o bloqueio depende de saber o estado do cadastro, que
  é dado da área logada. A conversão fica para a chegada na aba. Falta decidir se, para
  quem JÁ está logado com cadastro incompleto, o cadeado deve aparecer na home.

### Título do card não é link, e por quê (2026-08-30)

- ✅ **decidido, depois de tentar o contrário.** Uma versão intermediária tornou o título
  do card expandido um link para o post (node `8458:116227`, título em ultramarine).
  Revertido pelo Pedro: **com o título clicável, a área que sobra para FECHAR o card
  encolhe para a capa**, e quem só queria recolher acerta o post sem querer.
- A regra que sobrou: **o card é UM alvo de clique nos dois estados** — fechado expande,
  expandido recolhe —, e o hover leva o título a ultramarine nas duas situações. Quem abre
  o post é o `open_in_new` da ActionBar, que existe exatamente para isso.
- 🔴 **Para o back-end: a frequência das ações é o critério.** Recolher acontece toda vez
  que alguém abre um card por curiosidade; abrir o post é a exceção. A ação frequente fica
  com a área grande.

### Seção da home ALTERNA com o banner de download (2026-08-30, revisto em 31/08)

- A anotação do Figma propõe a `BibliotecaSection` como **substituição** do
  `DownloadSection`. Uma versão intermediária renderizou os dois ao mesmo tempo; corrigido
  em 2026-08-31 — eles **alternam** por eixo da ScenarioBar (`?biblioteca=secao`), com o
  banner atual como default.
- O motivo de não conviverem: **ocupam o mesmo lugar da página e falam da mesma coisa**
  (baixar material). Juntos, a home ganha duas chamadas de download em sequência e some a
  possibilidade de comparar — que é exatamente o que precisa acontecer antes da decisão.
- 🔴 **Segue pendente:** aprovada a proposta, o `DownloadSection` sai da home de vez?

### Trilho era recortado antes da borda do painel (2026-08-30)

- ✅ **resolvido.** Dentro da `BibliotecaSection` o trilho terminava no padding do painel,
  não na borda dele: sobrava uma faixa de fundo azul à direita e o corte lia como acidente
  de layout, não como convite a rolar.
- O trilho recebeu margem negativa à direita **do tamanho exato do padding do painel**
  (`-mr-6 lg:-mr-10` contra `px-6 lg:px-10`), então o card cortado encosta na borda. À
  esquerda o padding fica: é ele que alinha o primeiro card ao título.
- 🔴 **Para o back-end, o acoplamento:** a sangria e o padding do painel são a mesma
  medida, e são responsivos. Mudar um sem o outro faz o trilho vazar para fora do box ou
  voltar a parar antes dele.

### Material indisponível não é novidade (2026-08-30)

- ✅ **resolvido.** A vitrine da home e a seção "Novidades para você" listavam material
  com `disponivel: false` — anunciar como recente algo que não dá para baixar é a pior
  forma de gastar a atenção do leitor. `materiaisMaisRecentes()` passou a filtrar por
  `disponivel`.
- Os dois materiais marcados como indisponíveis foram movidos para **categorias que não
  aparecem entre os 12 mais recentes** (Sorvetes e ESG), a pedido do Pedro. Assim o estado
  "Indisponível" do `LibCard` continua alcançável — filtrando por aquelas categorias — sem
  nunca aparecer onde contradiz o próprio rótulo da seção. Nenhum dos dois está em
  `MAIS_ACESSADOS_IDS`, e cada uma das duas categorias mantém pelo menos um material
  disponível ao lado.
- 🔴 **Para o back-end: é uma regra, não um arranjo do mock.** "Mais recentes" exclui
  indisponíveis. Se o CMS despublicar um material que está no topo da lista, ele tem de
  sair da vitrine, não ficar cinza nela.

### "Novos materiais" virou "Novidades para você" (2026-08-30)

- Renomeada a primeira seção da aba. O `id` da seção acompanhou (`novos-materiais` →
  `novidades`); ele não aparece em URL, só no `data-handoff` e nas chaves de render.

### Sangria do trilho: margem negativa não alarga elemento com largura travada (2026-08-30)

> ⤷ Vale para o trilho da seção da home (o wrapper do carrossel). A sangria da MOLDURA DO
> CARD, descrita mais abaixo, foi removida em 31/08 — ver "Moldura do card expandido
> quebrava nas pontas do carrossel".


- ✅ **resolvido em duas tentativas.** O trilho da seção da home continuava sendo cortado
  antes da borda do painel mesmo depois de receber `-mr-6 lg:-mr-10`. Causa: o wrapper do
  `LibCarousel` é `w-full`, e **margem negativa só alarga elemento de largura `auto`** —
  com a largura travada em 100% ela apenas permite sobreposição, sem esticar nada.
- Correção: margem negativa **mais** largura explícita —
  `w-[calc(100%+var(--spacing)*6)]` / `lg:w-[calc(100%+var(--spacing)*10)]`, casando com
  o `px-6 lg:px-10` do painel.
- 🔴 **Para o back-end:** as três medidas (padding do painel, margem negativa e largura
  extra do trilho) são a MESMA e são responsivas. Mudar uma sem as outras faz o trilho
  vazar para fora do box ou voltar a parar antes dele.

### Imagens do protótipo dependiam de serviço externo (2026-08-31)

- 🔴 **Incidente.** `picsum.photos` saiu do ar (HTTP 503, depois timeout) e **toda imagem
  do protótipo sumiu ao mesmo tempo**, inclusive no ambiente publicado. Quem abrisse o
  link de revisão naquele dia veria uma home sem imagem nenhuma e concluiria que a
  aplicação tinha quebrado. Um protótipo cuja revisão visual depende de terceiro estar de
  pé não é revisável.
- ✅ **resolvido.** As imagens passaram a ser arquivos locais em `public/mock/`: 8
  fotografias editoriais REAIS do próprio Food Connection, recortadas em 5 proporções
  (wide, video, photo, square, portrait) = 40 arquivos, 1,8 MB. Ganho de brinde: as
  imagens agora são do assunto certo — indústria de alimentos — em vez de paisagens
  aleatórias. **Elas não correspondem às manchetes mockadas**; são exemplo visual.
- A troca foi de UMA função. `picsumSrc(seed, w, h)` já era o ponto único por onde os ~56
  usos passavam; só mudou de onde a imagem vem. `seed` continua escolhendo a foto de forma
  determinística (djb2), então a home não embaralha entre recarregamentos e as capturas de
  revisão seguem comparáveis; `w`/`h` agora só escolhem a proporção.
- ⚠️ **Armadilha encontrada no caminho:** `picsumSrc` é chamada na INICIALIZAÇÃO do próprio
  `articles.ts` (`VIDEOS_SECTION` monta `image:` no nível de módulo). Constante declarada
  perto da função fica na zona morta temporal nesse instante e estoura em runtime — o
  primeiro rascunho quebrou assim. `MOCK_COUNT` está no topo do arquivo por isso, e os
  helpers são `function` (hasteadas), não `const`.
- **Stories de contraste:** `MOCK_FOTO_CLARA` e `MOCK_FOTO_ESCURA` são constantes
  nomeadas, escolhidas por brilho medido (195 e 65 numa escala de 0–255), não por assunto.
  As stories que testam `surface="onMedia"` do Toggle/ToggleGroup/NewsCard usam elas, não
  `picsumSrc` — "uma foto qualquer" não testa contraste. 🔴 **Se as imagens de
  `public/mock/` forem regeradas, remeça o brilho e reaponte essas duas constantes**,
  senão a story continua passando enquanto deixa de testar o que diz testar.

### Destaque da Biblioteca perdeu o carrossel (2026-08-31)

- O Figma pede 3 itens em slide automático ("Destaque com os 3 itens mais recentes" +
  "Slide carrossel automático", node `8424:109762`). Estava implementado assim e foi
  **simplificado por decisão do Pedro**: virou o material mais recente, um só, sem slide.
- 🔴 **Para o back-end: essa anotação do Figma está VENCIDA.** Quem reimplementar lendo só
  o arquivo de design vai construir um carrossel que não existe mais.
- Saíram junto com o slide o timer de 6s, o estado de índice, os dots, a pausa por
  hover/foco, o respeito a `prefers-reduced-motion` e o `aria-live` — nada disso tem razão
  de existir sem o movimento que os justificava. `materiaisEmDestaque()` virou
  `materialEmDestaque()` e devolve `Material | null`; a tela não renderiza o destaque se o
  acervo inteiro estiver indisponível.

### Moldura do card expandido quebrava nas pontas do carrossel (2026-08-31)

- 🔴 **Bug.** A moldura do card expandido (`p-3` + borda) cresce 12px PARA FORA
  (`-mx-3` + 24px de largura) para a capa não se mover ao abrir. Numa grade a calha de
  24px já dá esse espaço. **Num carrossel, não** — e foi o que quebrou:
  - **No começo:** `scrollLeft` não vai a negativo, então 12px à esquerda do primeiro item
    são inalcançáveis. A moldura aparecia recortada e desalinhada do título da seção.
  - **No fim:** depois do último item não existe nada além do fim do conteúdo, e margem
    negativa ainda REDUZ a contribuição ao `scrollWidth`. A moldura era cortada na borda
    do painel.
- ⚠️ **Uma primeira tentativa fez a moldura crescer para DENTRO** (sem margem negativa).
  Parou o recorte, mas a capa do card aberto ficou 24px mais estreita e 13px à direita —
  medido: título em 120, capa em 133 — desalinhada dos vizinhos e do título. Trocar um
  defeito por outro; revertido no mesmo dia.
- ✅ **resolvido reservando o espaço no SCROLLER**, que é quem controla origem e fim:
  `px-3` no `<ul>` (padding entra no `scrollWidth` e não reduz a área visível no meio da
  rolagem, então a espiada do próximo card fica intacta), `-ml-3` mais 12px de largura
  extra para devolver o padding esquerdo para fora e manter a primeira capa alinhada ao
  título, e **`scroll-px-3`**.
- 🔴 **O `scroll-px-3` é a parte não óbvia e obrigatória.** Sem ele o scroll-snap alinha o
  `snap-start` do primeiro item à borda do scrollport e COME o padding: o navegador entra
  com `scrollLeft: 12` e a primeira capa volta a desalinhar. Foi exatamente esse o sintoma
  que sobreviveu à primeira correção. **Padding num scroller com `snap` precisa de
  `scroll-padding` casado, sempre.**
- O `overflow-hidden` saiu do wrapper do trilho: o `<ul>` se estende 12px à esquerda dele
  de propósito, e clipar ali mataria justamente esse espaço. À direita o `<ul>` não passa
  da borda do wrapper, então não há barra de rolagem na página — verificado com
  `documentElement.scrollWidth === clientWidth`.
- **Como isso foi verificado, e por que importa:** as duas correções anteriores foram
  validadas lendo HTML e CSS, e as duas passaram nos meus testes enquanto o defeito seguia
  na tela. Esta foi medida em navegador de verdade (Chrome headless renderizando o painel
  com o primeiro e o último card forçados abertos, `getBoundingClientRect` nos dois
  extremos de rolagem) e conferida em captura de tela. 🔴 **Geometria de layout não se
  verifica por string de classe.**

### Setas do carrossel ficavam sobre o texto do card aberto (2026-08-31)

- ✅ **resolvido.** As setas eram `top-1/2` do trilho. O trilho cresce quando um card
  expande, então a seta descia para cima do título e do lead. Agora ficam centradas na
  CAPA: `top-[calc(var(--lib-card)*9/32 + var(--spacing)*3)]` — a capa é 16:9 da largura do
  card, logo seu centro está a `card × 9/32` do topo, mais os 12px de `py-3` do trilho.

### Documentar um nome de classe faz o Tailwind emiti-la (2026-08-31)

- Curiosidade com consequência pequena: o Tailwind v4 escaneia **todos** os arquivos não
  ignorados pelo Git, `.md` incluso. Citar `w-[calc(100%+1.5rem)]` neste arquivo faz a
  regra ser gerada no CSS mesmo sem nenhum componente usá-la. São ~60 bytes órfãos.
  Registrado para ninguém perder tempo caçando a origem — e para não mutilar a doc por
  causa disso.

### Seta do carrossel perdeu o posicionamento (2026-08-31)

- 🔴 **Bug.** A seta é posicionada com
  `top: calc(var(--lib-card) * 9/32 + 12px)` para ficar centrada na CAPA. Mas as variáveis
  `--lib-*` eram declaradas no `<ul>`, e **as setas são IRMÃS do `<ul>`**, não descendentes.
  `var(--lib-card)` chegava indefinida, o `calc()` inteiro ficava inválido, o `top` era
  descartado e a seta caía na posição estática.
- ✅ **resolvido com um wrapper INTERNO** que declara as variáveis e ancora tanto o `<ul>`
  quanto as setas. Não foi possível declará-las no wrapper de fora porque `--lib-card` usa
  `100cqw`, e **unidade de container não é resolvida no próprio elemento que É o
  container** — um elemento não consulta a si mesmo. Então: `@container` no wrapper de
  fora, variáveis no de dentro.
- 🔴 **Duas armadilhas para quem reimplementar:** custom property só desce para
  DESCENDENTES (irmão não vê), e `cqw` não vale no próprio container.

### Como esta feature passou a ser verificada (2026-08-31)

Três correções de layout seguidas passaram nos testes e continuaram quebradas na tela,
porque a verificação era leitura de HTML e de CSS gerado. Isso confirma que a regra existe,
não que ela produz o resultado certo.

O que passou a ser feito, e vale repetir em qualquer mexida de geometria aqui:

1. `dist/` servido em `localhost` com fallback de SPA (um `http.server` cru devolve 404 em
   `/biblioteca-exclusiva` e o app nem monta).
2. Uma página de driver, na MESMA origem, com o app num `<iframe>` — mesma origem para
   poder scriptar o conteúdo.
3. O driver **clica de verdade** (`button[aria-expanded]`), rola até as duas pontas e mede
   com `getBoundingClientRect`: capa vs. título, moldura vs. borda do trilho, centro da
   seta vs. centro da capa, e `documentElement.scrollWidth` vs `clientWidth`.
4. `window.onerror` e `console.error` capturados durante a interação.
5. Captura de tela para conferir o que os números não pegam.

🔴 **Geometria de layout e interação não se verificam por string de classe.**

### Onde o carrossel é recortado: padding do container, não borda do box (2026-08-31)

Regra dada pelo Pedro, com **meclivros.mec.gov.br** como referência: *"a sangria não se dá
exatamente nas bordas do box e sim nas bordas de container invisível (mostra o padding
lateral)"*. Ele registrou achar o visual esquisito e mandou adotar de todo modo, por falta
de alternativa melhor.

- 🔴 **Bug.** O painel da Biblioteca na home alargava o trilho por cima do próprio padding
  (`-mr-6 lg:-mr-10`, do tamanho exato do padding) para o card cortado encostar na borda do
  box azul. Medido em 1440px: painel `[73,1353]`, padding 40, conteúdo `[113,1313]` — e o
  trilho recortando em **1353**, sem folga nenhuma depois do card cortado.
- ✅ **resolvido tirando a className de largura do `LibCarousel`.** O recorte passou a
  1313: o card cortado mostra 56px e sobram os 40px de padding do painel antes da borda. O
  trilho JÁ estava certo — o defeito era o consumidor.
- **Para o back-end:** o recorte do carrossel é responsabilidade do próprio carrossel.
  Quem consome não alarga o trilho por cima do padding do container.
- Logo depois, o padding lateral do painel no desktop passou de 40px para **32px**
  (`lg:px-10` → `lg:px-8`, 8 × `--spacing`), a pedido do Pedro. As medidas acima são de
  antes disso; com 32px o conteúdo do painel é `[105,1321]` e o recorte acompanha. O
  padding vertical não mudou (`pt-8` 32px / `pb-10` 40px).
- A ponta esquerda é recortada 12px DENTRO do padding, não rente a ele, e isso é
  deliberado: são os 12px que a moldura do card expandido precisa para não ser decepada
  quando o primeiro card abre com o trilho no começo (medido: moldura em 101 contra recorte
  em 113 — o card aberto ficava sem padding de um lado só). Num padding de 24 a 40px, 12px
  continuam mostrando padding.
- 🔵 **Decidido para o mobile da aba logada:** lá a sangria até a borda da TELA continua
  (`-mr-4` abaixo de `lg`). Não há box com fundo próprio, a borda do container é a borda da
  tela, e os 16px virariam faixa branca — o defeito que essa sangria corrigiu em 30/08.
  🔴 A confirmar: se a referência do MEC também vale no mobile, é só apagar a constante
  `SANGRIA_MOBILE`; nada mais depende dela.

### Home tem rolagem horizontal no mobile, e não é da Biblioteca (2026-08-31)

Medido em 390px de viewport: `documentElement.scrollWidth = 519` contra
`clientWidth = 375` — 144px de vazamento. **Acontece igual com a seção da Biblioteca
desligada** (`?biblioteca=banner` dá o mesmo 519), então a origem é outra seção da home.
Os elementos que vazam são âncoras de título de card fora de qualquer scroller.

🔴 Fica registrado sem correção: está fora do escopo da Biblioteca e mexe em componentes de
outras seções. Vale investigar — é a mesma classe de defeito que o Pedro já apontou duas
vezes ("o scroll horizontal continua aparecendo"), agora num lugar diferente.

### Destaque da aba ganhou os recursos do card listado (2026-08-31)

Figma `8480:3299` (`CardHighlight`), trazido pelo Pedro: *"fiz atualizações para que ficasse
com os mesmos recursos dos cards listados"*. O que mudou no destaque:

- **ActionBar** (baixar / abrir o post / compartilhar / favoritar) ancorada no rodapé da
  coluna de texto. Ela foi **extraída** do `LibCard` para `~/components/lib-action-bar` e
  os dois consomem a MESMA — duas cópias divergiriam no primeiro ajuste, e "os mesmos
  recursos" é exatamente o que o nó pede. O marcador `data-handoff="lib-card-actionbar"`
  foi mantido nos dois: ele identifica o contrato, não o arquivo.
- **Badge de tipo saiu de perto da categoria e foi para cima da imagem**, canto superior
  direito, inset 16px (nó em x=991/y=16 num card de 1080). O slot `badge` do `NewsCard`
  (que punha o selo ao lado da categoria, criado para este mesmo destaque em 27/08) perdeu
  o único consumidor e **saiu do contrato**; entrou `mediaBadge`.
- **Título é `headline-md` (28/36), um degrau ABAIXO** do destaque único da home
  (`headline-lg`, 32/40), que é o que o `NewsCard` `xlarge` entrega por default. Override
  via `titleClassName`, com `lg:` — classe sem variante não vence classe com variante no
  twMerge.
- Clamps medidos nos nós, não estimados: título 72px = 2 linhas de 36; lead 72px = 3 linhas
  de 24.
- O card segue com título e imagem linkados (3 âncoras) e a barra como IRMÃ dos links —
  nenhum `<button>` dentro de `<a>`, conferido no DOM renderizado. Diferente do LibCard,
  aqui o título pode ser link: não existe estado expandido para o clique disputar.

Três divergências entre os dois nós, implementadas como cada um pede, **a confirmar**:

| | Card listado (8296:91785) | Destaque (8480:3308) |
|---|---|---|
| Badge sobre a capa | topo à **esquerda** (`top-2 left-2`) | topo à **direita** (inset 16) |
| `action-group` | ocupa até a borda (125px numa barra de 236) | 112px fixos colados no "Baixar", 253px de sobra |
| Padding inferior do texto | — | Figma pede 24px; o painel do `NewsCard` é `p-8` uniforme → 32px |

🔴 As duas primeiras viraram a prop `align` da barra e posições diferentes do badge. A
terceira ficou **sem correção**: 8px num card de 348px de altura não justificam um escape
hatch novo num componente que 11 portais consomem. Se a medida importar, é um prop.

### Nenhum texto da Biblioteca cita tipo de material (2026-08-31)

Decisão do Pedro, com um dado que não estava no Figma: **na prática o acervo é só e-book.**
Whitepaper e infográfico vão levar tempo para existir. As duas frases de apoio citavam os
três.

| Onde | Antes | Agora |
|---|---|---|
| Painel da home | "Análises e tendências que o setor inteiro está lendo. Baixe e-books, whitepapers e infográficos sem pagar nada." | "Análises e tendências que o setor inteiro está lendo." |
| Cabeçalho da aba | "E-books, whitepapers e infográficos do portal, reunidos num só lugar." | "Análises e tendências do setor, reunidas num só lugar." |

A regra que fica: **o valor é o que o leitor leva, não o formato do arquivo.** Lista de
tipos volta a mentir a cada mudança do acervo, e a mentira aparece justamente na frase que
deveria convencer alguém a se cadastrar.

- 🔵 **DECIDIDO (Pedro, 2026-08-31): o badge segue refletindo `material.tipo`.** O acervo
  extraído tem 29 e-books e 1 whitepaper (o item com sufixo `[Pesquisa]`), então esse badge
  é hoje o único ponto da tela que anuncia um tipo que o portal ainda não produz em escala —
  e fica assim de propósito. **A regra separa dois papéis:** texto de apoio PROMETE (e
  promessa que envelhece vira mentira), badge DESCREVE o item que está ali (e descrição de
  um item só erra se o dado estiver errado).
- **Para o back-end:** `MaterialType` continua sendo dado do material, não constante. O
  badge lê `material.tipo` e nada mais; não existe rótulo fixo a implementar.
