# Spec do Figma — Página de Conteúdo (`/conteudo`)

**Fase:** 0.2 — Spec do Figma (read-only)
**Data:** 2026-07-30
**Node:** [707:10906 "Página Interna de Conteúdo"](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=707-10906)

O node não é uma única tela — é um canvas com **5 templates lado a lado** (Post, Vídeo, Podcast, Material para Download, Artigo v1.1), cada um em variante Desktop 1920 / Mobile 360, mais anotações de designer ("Design Note") espalhadas pelo canvas. Este documento cruza esse inventário com o modelo de dados combinatório do briefing.

---

## 1. Inventário dos frames/variantes × modelo de dados

| Template Figma | Dimensões (Desktop / Mobile) | Corresponde a (modelo de dados) |
|---|---|---|
| **Post** (`4179:32002` / `4179:46248`) | 1920×5160 / 360×8818 | Post base: `media: null`, sem `download` |
| **Vídeo** (seção `4179:49206`) | 1920×5160 / 360×8818 | Post com `media.kind === 'video'` |
| **Podcast** (seção `4179:52634`) | 1920×5328 / 360×9013 | Post com `media.kind === 'podcast'` |
| **Material para Download** (`4179:58649`) | 1920×5234 / 360×9749 | Post com `download` preenchido |
| **Artigo v1.1 / Múltiplos autores** (`2865:11657`) | 1920×5406 | Post com `authors.length >= 2` |
| **Artigo v1.1 / Autor único** (`3492:43737`) | 1920×5384 | Post com `authors.length === 1` (mas autor "Colunista/Especialista", ver §1.1) |

Isso **confirma a decisão do briefing de não criar 5 componentes de página**: o próprio Figma trata as 5 variações como o mesmo layout-base ("Post") com substituições pontuais — a nota de designer do template Podcast diz literalmente *"A página de Podcast mantém a estrutura de um post tradicional"*, e a do Vídeo, *"A página de Vídeo mantém a estrutura de um post tradicional, mas substitui a imagem de destaque por um frame de vídeo integrado"*. Os 5 templates são 5 combinações de atributos renderizadas para revisão visual, não 5 páginas distintas — o modelo `Media | Download | Author[]` do briefing está alinhado com a intenção do Figma.

### Estrutura comum (todos os templates)

```
Header (sticky, 2 camadas: 200h principal + 81h sub-nav)
└─ Ad Frame 1920×298 (leaderboard)
└─ container [2 colunas, gap 24px]
   ├─ content (704px)                    ← coluna do artigo
   │  ├─ Article Header
   │  │  ├─ Categoria + Título H1 + Deck/subtítulo
   │  │  └─ Autoria (Avatar/Avatar Stack + nome + data) + share-widget (6 ícones)
   │  ├─ "image 116" — pill/box do player de áudio (Trinity Audio) [ver §2]
   │  ├─ Resumo Box — accordion "Ver resumo" [ver §2]
   │  ├─ img-destaque (Image OU Video Container OU +iFrame) [ver §3]
   │  ├─ corpo do texto (parágrafos + Highlight Post + Relacionadas + intertítulos)
   │  └─ Temas (Tags)
   └─ ad container (496px)               ← SIDEBAR
      ├─ Widget / Em Alta + Banner Newsletter (gap 40px)
      └─ Ad Frame 332×282 (MPU)
└─ section "Relacionadas" (4× News Card 2.0)
└─ Ad Frame 1920×138 (rodapé)
└─ Footer
```

### 1.1 — Divergência: regra de autoria não é só "contagem de autores"

A nota de designer anexada ao template **Artigo v1.1** ("Resumo do Autor") diz:

> *"Para postagens escritas por Colunistas/Especialistas o componente de 'Resumo do Autor' é mostrado."*

Ou seja, o bloco de bio no rodapé do artigo (`Author Summary`/`Authors Carousel`) **não é condicionado por `authors.length`**, e sim por o(s) autor(es) serem colunistas/especialistas — uma distinção de **papel editorial**, não de contagem. O tipo `Author` do briefing já tem `role?: string`, mas como texto livre ("Repórter", "Editor de Energia") — não como flag booleana que dispare esse bloco. **Reportar ao Pedro/Micaelly:** é preciso decidir se `role` vira a fonte da verdade para essa regra (ex: um enum/whitelist de papéis que contam como "colunista/especialista") ou se entra um campo novo, tipo `isColumnist: boolean`.

Regras adicionais da mesma nota, para quando o bloco aparece:
- Nome do autor e avatar/foto **linkam para a "Galeria de Artigos"** do autor (lista todas as matérias dele) — feature que não existe hoje no protótipo (todo link de autor cai em `/categoria`, ver auditoria §2).
- Texto "Sobre" truncado em **no máximo 2 linhas**, com interação "Ver mais" ↔ "Ver menos".
- Campos obrigatórios: Nome, Cargo/Especialidade, Foto/Logo. Opcionais: Descrição, links de redes sociais.
- Variante **"Avatar Stack"**: empilha fotos dos autores, segue a ordem dos nomes, **mínimo de 2** autores — isso sim bate com a regra `authors.length >= 2` do briefing.
- Variante **"Resumo dos autores"**: mostra em carrossel **todos** os autores, na mesma ordem da composição do topo da página.

Conclusão: **duas regras distintas coexistem** — avatar stack no cabeçalho é por contagem (`>=2`), mas o bloco de bio no rodapé é por papel editorial (colunista/especialista). O briefing só previu a primeira.

---

## 2. "Ouça agora" e "Resumo" — já resolvidos no Figma, e melhor do que o briefing esperava

Duas descobertas centrais, ambas confirmadas por anotações de designer (não por inferência visual):

**a) O "Resumo Box" É o `aiSummary` do modelo de dados.** Nota de designer "Resumo": *"Resumo feito por IA · Configurável no Admin · Começa fechado. Usuário clica para ver o resumo."* — confirma 1:1 o `AiSummary` do briefing (bullets + collapse). Renderiza como um accordion "Ver resumo" com chevron, fechado por padrão, `rounded-sm` (4px), borda `Neutral/Light/10`. **Ainda não há, no Figma, disclaimer de IA visível no componente** — o texto placeholder do briefing (`// TODO(copy): disclaimer pendente...`) precisa ser adicionado a essa área quando implementado, já que o Figma não modela onde o disclaimer aparece dentro do box.

**b) O player de áudio ("Ouça agora"/Trinity Audio) já é uma pílula compacta, não uma caixa separada** — só que no Figma atual ele é uma **imagem estática** (`rounded-rectangle "image 116"`, 704×76px), não um componente Figma nativo. É literalmente um screenshot do widget real da Trinity Audio (play button + "Ouça agora" + "Powered by Trinity Audio" + barra de progresso 00:00–04:20) colado como referência visual. A nota de designer "Áudio" confirma: *"Possível adicionar iFrame de áudio através de link no Admin"* — ou seja, em produção isso vira um embed real via link, não um player custom.

**Divergência importante com a mitigação da Fase 3.3 do briefing:** o Figma **não** trata "Ouça agora" como pill inline na linha de metadados (junto de autor/data) — ele é uma **caixa própria full-width, entre a autoria e o Resumo Box**. Isso significa que o empilhamento problemático que a Fase 3.3 tenta mitigar (header → Ouça agora → Resumo → TOC → 1º parágrafo) **já existe assim no Figma de referência**, com "Ouça agora" como bloco cheio, não pill. A mitigação proposta no briefing (pill inline) é uma escolha deliberada de simplificação **contra** o que o Figma mostra — o que é razoável dado o argumento de UX do briefing, mas deve ser validado com quem aprovou o Figma antes de divergir visualmente.

**Divergência com a regra de negócio do briefing:** a tabela de regras derivadas diz *"`media.kind === 'podcast'` → esconder o bloco 'Ouça agora'"*. Comparei a árvore de nós do template **Podcast** (`4179:52634`) com a do **Post** (`4179:32002`) — o nó `image 116` (audio pill) **está presente e idêntico nos dois**. O Figma de referência **não esconde** "Ouça agora" no template Podcast; a regra de escondê-lo é uma decisão do briefing que ainda não está refletida no design. Não é um erro — é uma lacuna a resolver na implementação (o comportamento correto, por UX, é o do briefing), mas **o Figma não pode ser usado como referência visual para esse estado** (Post com podcast + áudio escondido não existe como frame).

---

## 3. Vídeo/Podcast — confirmado por anotações de designer

- **Nota "Vídeo":** único elemento diferente da página "Post"; possível adicionar legenda; mostra duração do vídeo; substitui a imagem de destaque; possibilidade de iFrame para streaming; **aspect ratio 16:9**.
- **Nota "Imagem de destaque":** *"No cenário onde não haja vídeo (iFrame), a imagem de destaque é aplicada"* — aspect ratio 16:9, legenda aplicável. Confirma que `media` e a imagem de destaque são **mutuamente exclusivos na mesma posição visual** (bate com o `Media | null` do modelo de dados).
- **Template Podcast:** reaproveita o mesmo container de vídeo (`Video Container`) como hero **e** adiciona um `frame "iFrame"` (704×168 desktop) logo abaixo, contendo um embed real (a screenshot do node mostra um card do Spotify — "Life at Spotify: The Podcast", player com botão salvar, progresso e play). Ou seim: no template Podcast do Figma, o hero ainda mostra `Video Container` (provavelmente herdado por cópia do template Vídeo, não uma imagem de capa do episódio) **e** o iframe de áudio aparece como bloco adicional — o Figma não deixa claro qual dos dois é a "capa" do episódio quando não há vídeo. **Lacuna a esclarecer:** o modelo `Media.podcast` do briefing não tem campo de imagem de capa — só `episodeTitle`, `src`, `durationSec`. Se o iframe embutido (ex: Spotify) já traz sua própria capa visualmente, o campo de imagem de destaque para podcast pode ser dispensável; se não, falta um `coverImageUrl` no tipo.

---

## 4. Intertítulos — sistema de 3 níveis, não 2

Nota de designer "Intertítulo": *"Intertítulo configurável em 3 níveis: Nível 1: Headline/Medium/Emphasized · Nível 2: Headline/Small/Emphasized · Nível 3: Title/Large/Emphasized."*

Isso **diverge do tipo `Heading` do briefing**, que só prevê `level: 2 | 3` (h2/h3). O Figma prevê **3 níveis de estilo tipográfico** para intertítulos dentro do corpo. Não ficou claro pela spec se os 3 níveis do Figma mapeiam 1:1 para h2/h3/h4 semânticos ou se são só 3 variações visuais dentro do mesmo nível semântico (h2). **Reportar como decisão pendente** — isso afeta diretamente a estrutura de dados do TOC (Fase 5): se existem de fato 3 níveis hierárquicos, o tipo `Heading.level` precisa aceitar `2 | 3 | 4`, e a indentação do painel "Neste artigo" precisa de um terceiro degrau.

Na prática, nos textos de exemplo do Figma (fixture "Post"), só apareceram 2 níveis em uso (H2 "Como funciona..." e H3 "Tipos de tecnologias..."/"Sensores digitais..."), então o 3º nível pode ser um recurso disponível mas não demonstrado nos protótipos atuais.

Confirma-se também que **não existe geração de `id`/slug nos headings no Figma** (esperado — Figma não modela isso) e **não existe nenhum componente de TOC/sumário em nenhum dos 5 templates** — bate com o que o briefing já assume (TOC é feature nova, Fase 5).

---

## 5. Tokens usados e mapeamento para os tokens do projeto

Extraído via `get_variable_defs` + `get_design_context` no template Post/Desktop (`4179:32002`):

| Elemento | Token Figma | Valor | Mapeamento no projeto |
|---|---|---|---|
| Categoria (chip) | Terciary/Saffron Dark + Label/Medium/Primary | `#B05223`, Open Sans SemiBold 12/16 | `--color-secondary-*` ou `--color-tertiary-*` (confirmar qual escala do projeto cobre "saffron") |
| Título H1 | Primary/Light/60 (Indigo) + Display/Small/Emphasized | `#002244`, Aleo Bold 36/44 | `--color-primary-600`-ish + `--text-display-sm` |
| Subtítulo/deck | Neutral/Light/90 (Slate) + Body/Large/Primary | `#3C4E69`, Open Sans Regular 16/24 | `--color-neutral-*` + `--text-body-lg` |
| Nome do autor (link) | Secondary/Light/100 (Ultramarine) + Label/Large/Emphasized | `#003CB2`, Open Sans Bold 14/20 | `--color-secondary-*` |
| Resumo Box (borda/radius) | Neutral/Light/10 | `#D6D8DD`, `rounded-[4px]` | `--color-neutral-100`-ish + **`rounded-sm`** (bate com o DS: 4px) |
| Widget "Em Alta" (radius) | — | `rounded-[8px]` | **`rounded-lg`** (bate exatamente) |
| Avatar/Categoria/Botões (radius) | — | `rounded-[100px]` | **`rounded-full`** |
| Tag (chip) | Primary/Light/10 (fundo) + Primary/Light/80 (texto) | `#D4DAE0` / `#081421`, `rounded-[4px]` | **`rounded-sm`** |
| Banner Newsletter | gradiente Primary/Light/60 → Secondary/Light/100 | `#002244` → `#003CB2` | gradiente com `--color-primary-*`/`--color-secondary-*` |
| Highlight Post (citação/destaque) | Neutral/Light/0 (Cloud) + Title/XLarge/Primary | barra `#E9EAEC` 4px + Aleo Regular 22/28 | sem box, só barra lateral — **nenhum radius envolvido** |
| Grid 2 colunas | Grid/Extra-Large (1600+dp) | conteúdo 704px / sidebar 496px / gap 24px | confirmar contra `max-w-screen-xl` do projeto — este grid é pensado para 1600+dp, **não bate com o container `max-w-screen-xl` (1280px)** do DS atual, ver §6 |

**Nenhuma ocorrência de `rounded-[16px]` (rounded-2xl)** nesta região do design — só `rounded-sm` (4px), `rounded-lg` (8px, só no Widget Em Alta) e `rounded-full` (pills). Nenhum uso de `rounded-md` (6px, fora do DS) — consistente com a regra do projeto.

**Não há Code Connect configurado** para este arquivo — os tokens acima foram lidos diretamente das variáveis do Figma, não de um mapeamento já existente para componentes React.

---

## 6. Divergências entre Figma e código atual

| # | Divergência | Detalhe |
|---|---|---|
| 1 | **Grid pensado para 1600+dp, não para o container de 1280px do projeto** | O Figma usa `Grid/Extra-Large (1600+dp)` com sidebar de 496px; o container real do projeto é `max-w-screen-xl` (1280px). Import direto das larguras do Figma vai estourar o container — os 704px+496px+24px de gap (1224px) cabem dentro de 1280px com folga mínima (56px de padding lateral total), mas a proporção "sidebar fixa em 496px" precisa ser reavaliada para não deixar a coluna de artigo apertada demais em 1280px. |
| 2 | **"Ouça agora" não é escondido no template Podcast do Figma**, contrariando a regra de negócio do briefing (ver §2). |
| 3 | **Sistema de 3 níveis de intertítulo** no Figma vs. `level: 2 \| 3` no tipo `Heading` do briefing (ver §4). |
| 4 | **Regra do bloco "Resumo do Autor" é por papel editorial (colunista/especialista), não por contagem de autores** — o briefing só modela a regra de contagem (ver §1.1). |
| 5 | **Nota de designer da página "Material para Download" tem o texto errado colado** (descreve a página de Vídeo, não a de Download) — não é uma divergência de produto, é uma inconsistência de documentação no próprio arquivo Figma; reportar para quem mantém o arquivo, não implementar em cima disso. |
| 6 | **Categoria no código atual é hardcoded como `color="saffron"`**; no Figma o token real é "Terciary/Saffron Dark" — nome bate, mas vale confirmar se a prop `color` do componente `Categoria` aceita esse token por nome ou por valor. |
| 7 | **Link do nome do autor hoje cai em `/categoria`** no código; no Figma, a nota "Autoria" diz que o link deveria ir para a "galeria de conteúdo daquele autor (se houver)" — feature de página de autor não existe ainda no protótipo. |

---

## 7. Lacunas — o que o Figma não cobre

- **TOC ("Neste artigo") não existe em nenhum dos 5 templates.** Nenhum frame, componente ou anotação de designer menciona sumário/índice/TOC. A Fase 5 do briefing (`docs/referencias/toc-hibrido.html`) não tem nenhuma referência visual no Figma — vai precisar ser desenhado do zero seguindo só a spec funcional do briefing, sem paralelo a validar visualmente contra o arquivo de design.
- **Estados de erro e loading** não existem em nenhum template.
- **Breakpoints intermediários** (768, 1024) não existem — só Desktop 1920 e Mobile 360. Toda a adaptação para os breakpoints intermediários pedidos na Fase 4 do briefing (768, 1024, 1280, 1440) é trabalho de interpretação, não de leitura direta do Figma.
- **Capa/imagem de destaque do podcast** não está clara — hero mostra `Video Container` reaproveitado do template Vídeo, sem um estado dedicado "capa do episódio" (ver §3).
- **Disclaimer do resumo de IA** não aparece no componente `Resumo Box` do Figma — não há indicação visual de onde o texto de compliance (pendente com a Ana) deve entrar dentro do box.
- **Variantes de tamanho do `Banner Download`** existem numa seção à parte ("Variação", fora do fluxo real de página) com 2 tamanhos adicionais (704×288 e 300×478) e uma variante "Institucional" (sem imagem, para portais que não querem imagens vinculadas) — não ficou claro em que contexto cada tamanho é usado; a nota diz apenas que o banner "se repete mais de uma vez em páginas muito extensas" e é "genérico: aparece em toda página com Material para Download".
- **Highlight Post não é uma citação de fonte** — é um destaque editorial de trecho já existente no texto (nota "Highlights": *"Usuário escolhe partes do texto para destacar"*), não um blockquote de entrevistado. Isso não está no modelo de dados do briefing (`body` genérico) — se o corpo vai ter blocos estruturados, um bloco `highlight` (referência a um trecho do próprio texto) precisa existir como tipo.
