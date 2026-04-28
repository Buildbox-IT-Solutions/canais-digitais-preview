# DESIGN.md — Canais Digitais 2.0

> Decisões de Design do projeto. Lido pelo Claude Code (para decisões de implementação) e pelo time de Devs (para entender o DS).
> Para regras técnicas de código, consulte o CLAUDE.md.

---

## Contexto do produto

**Canais Digitais Informa** é um template WordPress usado como base para **11+ portais editoriais** da Informa Markets, cobrindo verticais distintos — alimentos e bebidas, saúde, construção civil, arquitetura e outros. Cada portal compartilha a mesma estrutura, componentes e DS. O que varia entre portais é o conteúdo e as cores categoriais das editorias.

Este projeto não é um portal específico — é a **plataforma base** que serve todos eles.

---

## Personalidade visual

**Neutro, institucional e escalável.** O DS precisa funcionar para verticais muito diferentes sem favorecer nenhum. Por isso a personalidade é deliberadamente neutra — limpa, séria, com hierarquia tipográfica forte. A identidade de cada vertical emerge pelo conteúdo e pelas cores categoriais, não pela estrutura visual.

O que é fixo em todos os portais:
- Estrutura de componentes e layouts
- Tipografia (Aleo + Open Sans)
- Paleta primary (navy) e secondary (sky blue)
- Espaçamento, radius e shadows

O que pode variar por portal:
- Cores categoriais das editorias (Mint, Coral, Saffron, Lavander e equivalentes)
- Conteúdo editorial

---

## Tipografia

Duas famílias, papéis bem definidos:

| Família | Classe Tailwind | Uso |
|---------|----------------|-----|
| **Aleo** | `font-display` | Display, Headline, Title — tudo que é editorial ou hierárquico |
| **Open Sans** | `font-body` | Body, Label — texto corrido, UI, navegação |

**Escala tipográfica — Material Design 3 (17 escalas):**

| Token | Tamanho | Line-height | Uso típico |
|-------|---------|-------------|-----------|
| `text-display-lg` | 57px | 64px | Hero máximo |
| `text-display-md` | 45px | 52px | Hero secundário |
| `text-display-sm` | 36px | 44px | Títulos de seção grandes |
| `text-headline-lg` | 32px | 40px | Títulos de página |
| `text-headline-md` | 28px | 36px | Card Large |
| `text-headline-sm` | 24px | 32px | Card Medium |
| `text-title-xl` | 22px | 28px | Card destaque |
| `text-title-lg` | 18px | 24px | Subtítulos |
| `text-title-md` | 16px | 24px | Card Small, labels de seção |
| `text-title-sm` | 14px | 20px | Labels menores |
| `text-body-xl` | 18px | 28px | Lead de artigo |
| `text-body-lg` | 16px | 24px | Corpo de texto padrão |
| `text-body-md` | 14px | 20px | Texto secundário |
| `text-body-sm` | 12px | 16px | Captions, metadados |
| `text-label-lg` | 14px | 20px | Botões, navegação |
| `text-label-md` | 12px | 16px | Chips, badges |
| `text-label-sm` | 11px | 16px | Elementos mínimos |

**Pesos disponíveis:** `font-regular` (400) · `font-semibold` (600) · `font-bold` (700)

---

## Cores

### Paleta principal

| Paleta | Descrição | Base institucional |
|--------|-----------|-------------------|
| **Primary** | Deep navy → branco | `primary-600` (#002244) |
| **Secondary** | Sky blue vibrante | `secondary-500` (#28B4FF) |
| **Neutral** | Slate (cool gray azulado) | `neutral-500` (#8391A9) |

Cada paleta tem 11 escalas: 50 (mais claro) → 950 (mais escuro).

**Regra de uso:**
- `primary-600` — cor institucional base, textos principais, backgrounds escuros
- `primary-50` (#FFFFFF) — branco
- `secondary-500` — accent, CTAs, destaques interativos
- `secondary-950` — hover state de títulos e links
- `neutral-*` — textos secundários, bordas, backgrounds sutis

### Cores categoriais (editorias)

Cores de identificação atribuídas pelo conteudista no momento da publicação — semelhante ao que portais como Globo.com fazem (esporte: verde, notícias: vermelho). Não há regra rígida de branding, apenas um conjunto de cores disponíveis no DS para diferenciar editorias visualmente.

O componente `Categoria` é o veículo. A cor é um atributo configurável.

| Token | Hex |
|-------|-----|
| `mint` | #00786E |
| `coral` | #FF547C |
| `saffron` | #B05223 |
| `lavander` | #9423FC |

Cada portal pode usar combinações diferentes dessas cores por editoria. A estrutura do token é a mesma em todos os portais — apenas a atribuição por editoria varia.

### Uso prático das cores categoriais

- Em texto: `text-mint`, `text-coral`, `text-saffron`, `text-lavander`
- Em background (chips/badges): `bg-mint`, `bg-coral`, `bg-saffron`, `bg-lavander`
- Componente `Categoria` é o principal consumidor — 28 variantes cobrindo todas as combinações

---

## Espaçamento

Escala padrão Tailwind v4 com base de **4px**. O Figma não tokeniza spacing — todos os auto-layouts usam múltiplos de 4 inline.

Valores mais usados no projeto: `gap-1` (4px) · `gap-2` (8px) · `gap-3` (12px) · `gap-4` (16px) · `gap-6` (24px) · `gap-8` (32px) · `gap-10` (40px) · `gap-12` (48px)

---

## Border Radius

Escala padrão Tailwind v4. Valores em uso no projeto:

| Classe | Valor | Uso |
|--------|-------|-----|
| `rounded-xs` | 2px | Chips, badges pequenos |
| `rounded-sm` | 4px | Cards, thumbnails, imagens, botões padrão |
| `rounded-lg` | 8px | Containers maiores, sheets |
| `rounded-full` | 9999px | Avatares circulares, pills, botões redondos |

> Os demais valores da escala Tailwind existem no framework mas **não fazem parte do DS** deste projeto.

---

## Iconografia

**Familia adotada:** Material Icons (Google) — estilo **filled**.

Todos os icones de UI do projeto usam SVG inline com `fill="currentColor"` e `viewBox="0 0 24 24"`. A cor e herdada do container via `text-{cor}`. Icones sociais/brand usam SVGs oficiais de cada marca (nao Material Icons).

| Tamanho | Classe | Uso |
|---------|--------|-----|
| 24px | `size-6` | Padrao (buttons, header, cards) |
| 20px | `size-5` | Small buttons |
| 16px | `size-4` | Trailing close, chips |

**Icones UI em uso no DS:**

| Material name | Uso |
|---------------|-----|
| `search` | Search bar, header |
| `close` | Search bar (clear), side menu, modais |
| `menu` | Header hamburger |
| `arrow_forward` | Button trailing icon |
| `arrow_back` | Navegacao |
| `expand_more` | Select, filter chip, accordions |
| `expand_less` | Accordions (aberto) |
| `arrow_drop_down` | Nav item chevron |
| `chevron_right` | Side menu, pagination, carousel |
| `chevron_left` | Pagination, carousel |
| `file_download` | Download section, buttons |
| `add` | Icon button |
| `add_circle` | Button icon-left |
| `check` | Checkbox, filter chip (selected) |
| `bookmark` | Salvar conteudo |
| `favorite` | Curtir |
| `share` | Compartilhar |
| `print` | Imprimir artigo |
| `play_arrow` | Play button, video |
| `pause` | Play button (hover) |
| `home` | Menu item |

**Brand/Social icons:** WhatsApp, LinkedIn, Facebook, YouTube, X/Twitter, Instagram — SVGs oficiais.

**Centralizacao:** todos os paths estao centralizados no partial `_partials/icon-button.php`. Novos icones devem ser adicionados la.

> Preview visual: `http://localhost:8000/src/docs/icons.html`

---

## Elevation / Shadows

**Padrão adotado:** escala nativa do Tailwind v4 (`shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`).

| Tailwind | Uso |
|----------|-----|
| `shadow-md` | Dropdowns, tooltips, cards flutuantes |
| `shadow-lg` | Modais, bottom sheets |

**Migração:** o projeto foi iniciado com shadows MD3 (`shadow-elevation-1` a `5`), mas a decisão foi migrar para o padrão Tailwind — mais simples, nativo ao framework e sem necessidade de declaração customizada em `tokens.css`. Os tokens `--shadow-elevation-*` devem ser removidos do `tokens.css` e todas as ocorrências nos componentes substituídas pelas classes Tailwind equivalentes.

O Figma deve ser atualizado para refletir os novos valores quando as variables forem criadas.

---

## Mapeamento Figma → Código

### Tokens
| Figma | Tailwind v4 |
|-------|------------|
| Styles de cor (sem variables) | `--color-{paleta}-{escala}` em `tokens.css` |
| Text styles | `--text-{escala}` em `tokens.css` |
| Auto-layout gap/padding | Classes utilitárias Tailwind (`gap-*`, `p-*`) |
| Radius 4px | `rounded-sm` |
| Radius 16px | `rounded-2xl` |
| Radius circular | `rounded-full` |

### Nomenclatura de componentes
O nome do componente no Figma é preservado no arquivo PHP correspondente. Exemplos:

| Figma | Arquivo |
|-------|---------|
| News Card 2.0 | `news-card.php` |
| Video Card 2.0 / Inverse | `video-card-inverse.php` |
| Banner Newsletter | `banner-newsletter.php` |
| Header Informa | `header-informa.php` |

---

## Breakpoints e grid

**Padrão adotado:** escala nativa do Tailwind v4, sem customização.

| Prefixo | Largura | Uso |
|---------|---------|-----|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop pequeno |
| `xl` | 1280px | Desktop padrão |
| `2xl` | 1536px | Desktop grande |

**Container padrão:**
```html
<div class="max-w-screen-xl mx-auto px-4 lg:px-6">
```

- Largura máxima: `max-w-screen-xl` (1280px) — substitui o `max-w-[1224px]` customizado anterior
- Padding mobile: `px-4` (16px cada lado)
- Padding desktop: `lg:px-6` (24px cada lado a partir de 1024px)

**Grid:** 12 colunas no desktop, 4 colunas no mobile — conforme definido nos componentes e layouts do Figma.

**Migração:** todos os `max-w-[1224px]` existentes nos layouts e componentes devem ser substituídos por `max-w-screen-xl`. Os paddings `px-4` isolados em containers de página devem adotar o padrão `px-4 lg:px-6`.

---

## Dark mode

Não está no escopo atual. O Figma tem um modo dark definido (mesma paleta com escala invertida), mas a implementação está pendente para sessão futura — será feita via `@media (prefers-color-scheme: dark)` ou `data-theme` attribute, sem alterar os nomes dos tokens.

---

## Regras de negócio e decisões de design

Esta seção documenta regras que explicam o **porquê** de decisões visuais que, sem contexto, podem parecer arbitrárias. Ignorá-las resulta em implementações incorretas.

---

### Conteúdo patrocinado

Com exceção do Video Card 2.0, todos os cards possuem uma variante **Patrocinado**. Ela sinaliza ao leitor que aquele conteúdo foi financiado por uma marca — por transparência editorial. O layout é intencionalmente diferente do card regular para que o leitor identifique imediatamente a natureza do conteúdo.

Algumas variantes sofreram adaptações específicas para acomodar o bloco de sponsor sem prejudicar a leitura. Essas adaptações estão documentadas nos specs de cada componente.

> O Video Card 2.0 é o único card sem variante patrocinada — decisão de design deliberada.

---

### Sistema de grid e variantes de cards

Os cards foram projetados para um grid de **12 colunas no desktop** e **4 colunas no mobile**.

Cada variante de tamanho tem relações específicas entre imagem e texto, projetadas para:
- Caber no espaço alocado na grade
- Privilegiar a leitura sem comprometer a hierarquia visual
- Evitar que o card pareça pequeno ou grande demais para o slot

**Usar a variante errada prejudica o visual da página.** Os layouts no Figma apontam explicitamente qual variante deve ser usada em cada posição. Isso deve ser seguido à risca.

No mobile, geralmente são usadas as versões verticais, escalando por tamanho conforme o espaço disponível.

---

### Propriedades on/off dos cards

Os cards têm propriedades configuráveis que ligam ou desligam elementos:

| Propriedade | Quando ativa |
|-------------|-------------|
| `author` | Conteúdo escrito por colunista ou especialista identificado |
| `lead` | Seções que exibem Headline + parágrafo de apoio |
| `categoria` | Seções que precisam identificar a editoria do conteúdo |

Essas combinações não são aleatórias — são decisões editoriais que criam **ritmo na página** e evitam repetição visual excessiva. Uma home que mostra autor + lead + categoria em todos os cards ao mesmo tempo sobrecarrega o leitor.

Os layouts no Figma definem quais propriedades estão ativas em cada posição e seção.

---

### Seções e itens configuráveis por portal

Seções inteiras da home — como Podcasts, Vídeos, Especialistas — podem não existir em determinados portais. Se o portal não produz aquele tipo de conteúdo, a seção simplesmente não é exibida.

O mesmo vale para itens de navegação e outros blocos de página. Tudo é configurável pelos editores do portal via painel admin do WordPress.

**Implicação de design:** nenhuma seção pode ser tratada como obrigatória. O layout precisa funcionar com ou sem cada seção opcional.

---

### Variantes por quantidade de conteúdo

Algumas seções têm versões responsivas baseadas na quantidade de itens configurada pelo editor. Exemplo: a seção de Vídeos na home suporta entre **2 (mínimo) e 4 (máximo)** cards — e tem um layout específico para cada quantidade.

Isso significa que o layout não pode assumir um número fixo de itens. A variante correta para cada quantidade está definida no Figma.

---

### Publicidade (Ad Frames)

Os ad frames reservam espaços fixos no layout, mas o formato veiculado dentro de cada slot pode variar conforme configuração no Google Ad Manager — gerenciado pelo time Informa.

A regra é de **compatibilidade de formato com o slot**, não de dimensão exata:

- Um slot leaderboard (970×250) pode servir um banner menor (728×90) — mesma orientação horizontal, encaixe preservado
- O que não pode acontecer é substituir um formato horizontal por um squared (ou vice-versa) — isso quebra o encaixe da página

No mobile, os formatos também se adaptam conforme configuração no Ad Manager. O template reserva o espaço correto — o Ad Manager decide o que preenche.

Os formatos suportados estão documentados no componente `ad-frame.php` (7 tamanhos IAB).

---

### Seção Especialistas

A seção Especialistas na home exibe os **autores/colunistas ativos** daquele portal. O Card Colunista mostra sempre a **última notícia publicada** pelo autor — não uma notícia qualquer. Isso é um dado dinâmico alimentado pelo WordPress, não conteúdo estático.

---



| Item | Situação | Prioridade |
|------|----------|-----------|
| Variables de cor | Não criadas — apenas styles soltos | Alta |
| Cores categoriais | Sem mapeamento oficial por editoria | Alta |
| Breakpoints | Migrados para escala Tailwind nativa — `max-w-screen-xl` + `px-4 lg:px-6` | Resolvido |
| Shadows | Migrados para Tailwind nativo — remover `--shadow-elevation-*` do `tokens.css` | Resolvido |
| Dark mode | Definido visualmente, sem implementação | Baixa |

---

## Showcase de referência

| Recurso | URL (servidor local) |
|---------|---------------------|
| Tokens (cores, radius, shadows) | `http://localhost:8000/src/docs/tokens.html` |
| Tipografia | `http://localhost:8000/src/docs/typography.html` |
| Iconografia | `http://localhost:8000/src/docs/icons.html` |
| Componentes | `http://localhost:8000/src/docs/index.html` |
| Layouts | `http://localhost:8000/src/docs/layouts.html` |

> Servidor: `cd C:\wptheme && C:\xampp\php\php.exe -S localhost:8000 router.php`
