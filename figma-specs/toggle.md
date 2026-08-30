# Toggle [1.0]

**Figma:** [Toggle [1.0] — `7952:127473`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=7952-127473)
**Arquivo:** [`src/components/toggle/`](../src/components/toggle/)
**Instância pronta:** [`src/components/favorito-toggle/`](../src/components/favorito-toggle/)
**Composição:** [`src/components/toggle-group/`](../src/components/toggle-group/)
**Figma (com rótulo):** [Toggle Label [1.0] — `8463:129460`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=8463-129460)

Botão de dois estados. **144 variants** do Figma — `Selected` (Off/On) × `State` (Enabled/Hovered/Focused/Disabled) × `Surface` (Default/OnMedia) × `Size` (Small/Medium/Large) × `Type` (Ghost/Outlined/Filled) — colapsadas em **3 types × 2 surfaces × 3 sizes**, com `State` implementado por pseudo-classes CSS (`:hover`, `:focus-visible`, `:disabled`), não por variant separada.

> A property `Type` foi criada no Figma em **30/08/2026** (48 → 144 variants), depois de existir primeiro no código. As 48 originais viraram `Type=Ghost`, que é o que sempre foram.

Controlado: `pressed` vem de fora, o clique só notifica via `onPressedChange`. O componente é genérico e não sabe o que está ligando/desligando — regra de produto vive em quem chama.

## O que é do Figma e o que é extensão dev-side

| | Origem | Formalizado no Figma? |
|---|---|---|
| Só-ícone, `type="ghost"`, `surface`, `size` | Component set `7952:127473` | ✅ sim — é o componente |
| `type="outlined"` / `type="filled"` | Nasceu no código 30/08/2026 | ✅ **formalizado no Figma no mesmo dia** — property `Type`, 48 → 144 variants |
| Rótulo visível (`text`/`textOn`/`textOff`) | Nasceu no código 30/08/2026 | ✅ **formalizado no Figma no mesmo dia** — component set SEPARADO `Toggle Label [1.0]` (`8463:129460`), 144 variants |
| `iconPosition` | Extensão dev-side, 30/08/2026 | ❌ ainda não |
| `ToggleGroup` | Composição, não componente novo | ❌ n/a — não é um componente do arquivo |

Precedente do mesmo formato: `tone="inverse"` do [`button.md`](button.md), que nasceu dev-side e foi formalizado no Figma depois, com as cores implementadas seguidas 1:1.

Base de interação da extensão: [shadcn/ui Toggle](https://ui.shadcn.com/docs/components/base/toggle) e ToggleGroup. Dois desvios deliberados em relação a ela, ambos por convívio com o resto deste DS:

- A aparência se chama **`type`** (`ghost | outlined | filled`), não `variant` (`default | outline`). É o mesmo conceito e os mesmos nomes de `Button [1.1]` e `Icon Button [1.2]`; um terceiro vocabulário para a mesma coisa é o começo da divergência entre os 11 portais. O `outline` do shadcn é o `outlined` daqui.
- O modo do grupo se chama **`selection`** (`single | multiple`), não `type` — que aqui já está ocupado pela aparência.

## Geometria

**Só-ícone** (o do Figma) — caixa quadrada, escala do `Icon Button [1.0]`:

| Size | caixa | ícone |
|---|---|---|
| Large | `h-12 w-12` | `size-8` |
| Medium | `h-10 w-10` | `size-6` |
| Small | `h-8 w-8` | `size-4` |

> NÃO é a escala do Play Button. E NÃO é a escala de ícone do `IconButton` compartilhado, que usa 18px no medium e 24px no large — por isso a tabela vive no `Toggle`, e não naquele componente, usado por outros botões que não seguem esta escala.

**Com rótulo** (extensão) — o Figma não desenhou toggle com texto. Em vez de inventar medidas, herda a pílula do `Button [1.1]`: mesma altura, mesmo padding, mesmo gap, mesma tipografia, **importados de lá** (`BUTTON_SIZE_CLASSES`, `BUTTON_PADDING_NO_ICON`, `BUTTON_LEADING_ICON_PADDING`, `BUTTON_TRAILING_ICON_PADDING`, `buttonIconSize`), não redigitados — a tabela completa está em [`button.md`](button.md). Consequência deliberada: com rótulo o ícone segue a escala do Button (20/24/24), não a do Icon Button — dentro de uma pílula o ícone emparelha com o texto, não com a caixa.

## `Toggle Label [1.0]` — o set com rótulo (`8463:129460`)

Component set **separado**, não uma property do `Toggle [1.0]`. Somar `Label` ao set só-ícone o levaria de 144 a 288 variants; dois sets de 144 e 72 são navegáveis, um de 288 não é.

**144 variants:** `Selected` (2) × `State` (4) × `Size` (3) × `Type` (3) × `Icon` (2).

| | |
|---|---|
| Geometria | herdada do `Button [1.2]` (`3185:47973`), lida do próprio arquivo: `h48 / pad 12,24,12,20 / gap 12 / Open Sans Bold 16-24 / ls 0.5` no Large |
| Property de texto | `Label` (tipo TEXT, default `"Label"`) — trocável por instância, sem detach |
| `Icon=On` | ícone `bookmark` / `bookmark_filled` à esquerda, 20px no Small e 24px no Medium/Large (escala do Button, não a do Icon Button) |
| `Icon=Off` | **só o rótulo.** É eixo de variant e não uma property booleana de visibilidade porque o padding MUDA sem ícone — não bastaria esconder o vetor |
| `Surface` | **não existe neste set.** Não há caso de produto para pílula com texto sobre fotografia; incluir dobraria para 288 variants sem consumidor |

**Padding por `Icon`** — as duas colunas da tabela do `Button [1.2]`, e as mesmas constantes que o código importa (`BUTTON_LEADING_ICON_PADDING` e `BUTTON_PADDING_NO_ICON`):

| Size | `Icon=On` (ícone à esquerda) | `Icon=Off` (só rótulo) |
|---|---|---|
| Large | `pad 12,24,12,20` · gap 12 | `pad 12,24,12,24` |
| Medium | `pad 8,20,8,16` · gap 8 | `pad 8,24,8,24` |
| Small | `pad 6,16,6,12` · gap 8 | `pad 6,12,6,12` |

O estado ligado **sempre preenche** aqui: sem troca de ícone que carregue o estado sozinha, o preenchimento é o único sinal disponível. É a mesma regra da seção abaixo, vista do outro lado.

## Cor por superfície × aparência × estado

**`surface="default"`** (sem foto atrás):

| Tipo | Off | On | Hover |
|---|---|---|---|
| **Ghost** | text `primary-600`, sem fundo | `bg-primary-100` text `secondary-950` | off: `bg-neutral-50` · on: `bg-black/8` |
| **Outlined** | border 1px `neutral-100`, text `primary-600` | border 1px `neutral-100` (**a mesma**), `bg-primary-100`, text `secondary-950` | off: `bg-neutral-50` · on: `bg-black/8` |
| **Filled** | `bg-neutral-50` text `primary-600` | `bg-secondary-950` text `white` | off: `bg-black/8` · on: `bg-primary-600` |

**`surface="onMedia"`** (sobre fotografia arbitrária):

| Tipo | Off | On | Hover |
|---|---|---|---|
| **Ghost** | `bg-white/80` text `primary-600` | `bg-white` text `secondary-950` | `bg-white` |
| **Outlined** | border 1px `white`, text `white` | border 1px `white` (**a mesma**), `bg-white`, text `secondary-950` | off: `bg-white/10` · on: `bg-white` |
| **Filled** | `bg-white/80` text `primary-600` | `bg-secondary-950` text `white` | off: `bg-white` · on: `bg-primary-600` |

> Branco com opacidade é fill cru: não existe estilo de branco-com-opacidade no arquivo do Figma. É a mesma saída usada pelo Play Button 2.0 de lá.
>
> Em `onMedia`, `ghost` e `filled` partem do MESMO repouso e só divergem no `on`. Não é descuido: sobre uma foto não existe "contêiner neutro" que se distinga do scrim — o branco 80% **é** o contêiner.

**Disabled** (atributo nativo, não prop de "state"):

| Superfície | Ghost | Outlined | Filled |
|---|---|---|---|
| `default` | fundo some, text `neutral-200` | border `neutral-100` (**a mesma do repouso**), text `neutral-200`, fundo some | `bg-neutral-200` text `white` |
| `onMedia` | mantém `bg-white/80`, text `neutral-200` | border+text `white/40` | mantém `bg-white/80`, text `neutral-200` |

> Em `onMedia` o branco 80% PERMANECE quando desabilitado e só o conteúdo apaga. É o comportamento do próprio Figma, e é a limitação conhecida #1 abaixo.

## A regra do preenchimento no estado "on"

Uma regra só: **o `on` ganha preenchimento sempre que o estado não estiver legível de outra forma.**

Ele está legível de outra forma em exatamente um caso — `type="ghost"` **só-ícone** com `iconOn` ≠ `iconOff`, que é o set do Figma (contorno → preenchido). Aí o fundo não muda em estado nenhum e a cor do ícone fica fixa: o hover só reforça o preenchimento de fundo e nunca compete com o sinal de `Selected`.

Em todo o resto — qualquer coisa com texto, qualquer `outlined`/`filled`, ou um ícone que não troca — o `on` preenche, como no shadcn (`data-[state=on]:bg-accent`) e no MD3. Sem essa regra, um toggle de texto `ghost` ficaria com o estado **invisível**.

`outlined` e `filled` seguem o toggle do MD3, não o botão: o não-selecionado do `filled` é um contêiner neutro (`neutral-50`). No `Button`, `filled` quer dizer "ação principal"; aqui quer dizer "contêiner que se preenche ao ligar". Mesmo nome, significados diferentes por causa do que o componente é — está documentado porque não é adivinhável.

## Nome acessível

| Formato | Nome acessível | Estado |
|---|---|---|
| Só-ícone | `aria-label` = `labelOn`/`labelOff` (**obrigatórios pelo tipo**) | `aria-pressed` |
| Com rótulo | o texto na tela — **nenhum `aria-label` é emitido** | `aria-pressed` |

Com rótulo visível, um `aria-label` divergente do texto quebra o WCAG 2.5.3 (Label in Name): quem dita "clicar em Favoritar" por voz não alcançaria o botão. Por isso `labelOn`/`labelOff` são **proibidos pelo tipo** nesse formato, e o texto do rótulo deve ser estável entre os estados — o `aria-pressed` já anuncia ligado/desligado.

Os três pares de texto do `FavoritoToggle` existem por razões diferentes e não são intercambiáveis:

| Prop | Exemplo | Por quê |
|---|---|---|
| `labelOn`/`labelOff` | "Remover dos favoritos" / "Favoritar" | aria-label — descreve a AÇÃO do clique, por extenso |
| `tooltipOn`/`tooltipOff` | "Remover" / "Favoritar" | curto, para caber no balão |
| `text` | "Favoritar" (nos dois estados) | rótulo visível, estável |

## HTML alvo

```html
<!-- só-ícone -->
<button type="button" aria-label="Favoritar" aria-pressed="false" class="…rounded-full h-10 w-10…">
  <svg class="shrink-0 size-6">…</svg>
</button>

<!-- com rótulo -->
<button type="button" aria-pressed="true" class="…rounded-full h-10 gap-2 pl-4 pr-5…">
  <svg class="shrink-0 size-6">…</svg>
  Favoritar
</button>

<!-- grupo -->
<div role="group" aria-label="Filtrar por formato" class="inline-flex flex-wrap items-center gap-2">
  <button type="button" aria-pressed="true" …>Vídeos</button>
  …
</div>
```

`role="group"` e não `radiogroup` no modo `single` — pelo mesmo motivo do Radix: um radio não pode ser desmarcado, e aqui `allowDeselect` permite voltar a "nenhum". Os itens continuam sendo botões de dois estados com `aria-pressed`.

## Decisões de design

- **Foco é `ring` (box-shadow), não `border`.** Um `border` real reduziria a área de conteúdo (box-sizing); `ring` não afeta layout. Segue a convenção já usada no repo (ex. `read-list-item`). Cor do anel: `primary-600` em `default`, `white` em `onMedia`.
  - ⚠️ **Espessura diverge:** o arquivo do Figma desenha o foco com **1px** (`strokeAlign: OUTSIDE`), não 2px — lido direto do nó em 30/08/2026, corrigindo o que esta spec afirmava antes. O código usa `ring-2`. Ver [`../ds/achados.md`](../ds/achados.md).
  - No `Type=Outlined` o anel **não pode** ser o stroke do nó: no Figma um nó tem um único stroke, com um único alinhamento, e ele já está ocupado pela borda neutra (INSIDE). Nas 12 variants `Outlined + Focused` o anel é um retângulo filho chamado `focus ring`, posicionado em absoluto, 1px maior de cada lado. É a modelagem fiel do CSS, onde o `box-shadow` fica FORA da caixa da borda e os dois coexistem. Tentar o anel como `DROP_SHADOW` **não funciona**: sem `fill`, a sombra do Figma não tem geometria de onde ser projetada e não desenha nada.
- **O outlined tem contorno neutro que NÃO muda ao ligar** (`border-neutral-100`), e o que muda é o miolo. Um contorno `primary-600` de 1.5px fazia o estado DESLIGADO pedir a atenção da tela — é o estado que menos merece. Ligado, quem fala é o fundo `primary-100` e o texto `secondary-950`.
- **`border` (1px), não `border-[1.5px]`.** 1.5px é a medida exata do `Button [1.1]` no Figma, justificada lá. O Toggle outlined **não existe no Figma**, então não havia medida a honrar — usar 1.5px era herdar por analogia. 1px + `neutral-100` é o que todo controle interativo com contorno deste DS já usa: `form-field`, `form-select` e `search-bar` são os três `border border-neutral-100`.
- **O filled ligado é ultramarine (`secondary-950`), não `primary-600`.** Alinha com o resto dos controles de estado do DS — o `Switch` marcado e os checkboxes ligam em `secondary-950`, e [`form-toggle.md`](form-toggle.md) registra isso ("Cor ON é `secondary-950` (Ultramarine), **não** `primary-600`. Alinhado com checkboxes do DS"). De quebra desfaz uma colisão: `bg-primary-600` é exatamente o `Button [1.1]` filled em repouso, então o toggle ligado era indistinguível de um botão comum. O hover do ligado aprofunda pra `primary-600` (#002244) — direção inversa à do Button (que parte do navy e clareia pro ultramarine #003CB2), porque aqui o repouso já é o ultramarine. Mesmo par de tokens, ordens opostas.
- **Os itens do `ToggleGroup` não viram controle segmentado** (cantos retos grudados, como no shadcn). A geometria deste DS é pílula; cortar o raio das pontas internas exigiria um raio fora da tabela do DS. Ficam pílulas separadas por `gap-2`.
- **`flex-wrap` no grupo** — mobile está sempre em escopo. Um grupo de filtros que não quebra linha ou estoura a viewport ou vira scroll horizontal escondido; as duas coisas somem com o item mais à direita, que é onde os filtros menos usados ficam.
- **O `FavoritoToggle` não chama `useFavoritoToggle`.** O hook precisa de `contentId` e do gancho de autenticação, e no `NewsCard` uma única chamada alimenta DOIS toggles (o de cima da mídia e o inline). Quem chama continua dono do hook; o componente só desenha.

## Limitações conhecidas (documentadas, não corrigidas)

1. **`surface="onMedia"` + `disabled` tem contraste baixo** — conteúdo `neutral-200` sobre branco 80%. Controle desabilitado é isento de contraste pela norma, mas a combinação é visualmente ruim. Comportamento do próprio Figma, não bug do código.
2. **`size="small"` é 32px**, abaixo dos 44px de alvo de toque recomendado. É o tamanho herdado do Icon Button do arquivo, usado propositalmente nos cards (área de toque reduzida, pedido de produto — ver comentário em `NewsCard/index.tsx`). A página de conteúdo continua `medium`, por convívio com os outros ícones da barra de ações.
3. **O anel de foco não tem folga do ícone** (sem `ring-offset`) — no Figma isso exigiria uma moldura extra; no CSS teria que ser um `ring-offset` que não foi aplicado sem alinhamento prévio com o Figma.
