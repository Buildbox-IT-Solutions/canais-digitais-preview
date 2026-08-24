# Documentação do Design System — Canais Digitais
## Estado das decisões e caminho até a entrega

> Consolidado em 2026-08-17. Este arquivo existe para você não precisar reconstruir contexto a cada sessão. Salve como `docs/_contexto-docs.md` (ou incorpore ao `CLAUDE.md`).

---

## Parte 1 — Decisões já tomadas

### Fundamentos

**Fonte da verdade é o código.** O repositório define comportamento; o Figma define aparência. Quando divergirem, o código ganha — exceto no caso da regra 6 (abaixo).

**Consumidor final é o back-end.** A doc existe para o time de WordPress reproduzir o comportamento em PHP sem precisar perguntar ao designer. Todo critério de "isso vale documentar?" se resolve por essa pergunta.

**Não se documenta PHP.** A seção "HTML alvo" documenta a saída renderizada esperada — tags, hierarquia, classes. Como o WordPress produz isso é decisão do back-end. Escrever PHP te torna dono de um código que você não mantém.

### Formato

**Template de 8 seções** (`docs/_template-componente.md`), mix de: estrutura enxuta do Nord, "quando não usar" e content guidelines do Polaris, dual-stack do Primer, status de maturidade do Carbon. Seção vazia é seção apagada.

**Três níveis de profundidade**, e parar no nível 1 é aceitável:

| Nível | Seções | Quando |
|---|---|---|
| Stub | 1, 5, 6 | componente novo, ainda mudando |
| Utilizável | + 2, 4, 7 | entrou em handoff |
| Completo | + 3, 8 | reusado por 3+ portais |

**As seções que pagam o investimento são a 6 e a 7** — o contrato de saída e as regras invisíveis. O resto o Figma já conta.

### Regras invariantes do briefing

1. Não modificar código de componente — achados vão para `docs/_achados.md`
2. Não inventar conhecimento de design — o que não for derivável do código vira `🔴 A CONFIRMAR`
3. Não escrever PHP
4. Não deletar nem mover arquivos existentes
5. Parar nos gates
6. **Quando o código divergir do comportamento correto (acessibilidade, semântica, foco), documentar o CORRETO** e registrar a divergência em `_achados.md`

### Escopo aprovado

| # | Componente | Situação |
|---|---|---|
| 1 | `categoria` | Fase 1 feita — **aguardando calibragem** |
| 2 | `news-card` | próximo; 25 stories, teste de estresse do formato |
| 3 | `header-desktop` | |
| 4 | `button` | |
| 5 | `modal` | deve documentar a **família de 5 sobreposições** (`modal`, `dialog`, `bottom-sheet`, `drawer`, `side-menu`) com tabela "qual usar quando" na seção 2 |
| 6 | `toast` | comportamento de empilhamento/dismiss, não derivável do Figma |
| 7 | `icon` | formato adaptado — ver abaixo |

**`icon`** não é página de componente comum. Precisa de:

- **Fonte canônica declarada:** Material Symbols (`fonts.google.com/icons`). É de onde todo ícone do sistema sai — nenhum ícone entra por outra origem, nem desenhado sob demanda.
- **Parâmetros fixos da família:** estilo (Outlined / Rounded / Sharp — escolher **um**) e os eixos da variable font: weight, fill, grade, optical size. Sem isso fixado, dois portais usam o mesmo ícone com pesos diferentes e ninguém percebe.
- **Nome canônico = nome na lib.** `bookmark` é `bookmark`. Renomear localmente quebra a rastreabilidade até a origem.
- **Catálogo de nomes gerado** a partir do registry, nunca lista manual.
- **Passo a passo para adicionar ícone novo**, cobrindo os dois lados: como o design leva para o Figma (baixa o SVG e adiciona como asset) e como entra no repo.
- **Racional de entrega, não decisão de entrega.** A doc explica por que a origem única importa (consistência entre 11 portais) e deixa o mecanismo — sprite SVG, inline, ou a própria icon font do Google — a critério de quem implementa. O que o DS exige é o resultado: mesmo ícone, mesmos parâmetros, nome rastreável.

### Fora de escopo, por decisão

- **`card`** — código morto, experimento descartado. Remoção em tarefa separada.
- **`image`, `loading`** — sem referências, origem não confirmada. Investigar antes de decidir.
- **`form-field`, `form-select`, `session-row`** — sem stories, ou seja, os estados nem foram mapeados em design ainda. **Tarefa de design antes de virar doc.** Formulário é onde mais se erra acessibilidade no handoff.
- **Não criar:** changelog por componente, tabela de tokens duplicada em cada página, página de princípios de design.

---

## Parte 2 — Regras a incorporar ao briefing

Nasceram durante a revisão e ainda vivem só em conversa. Suba para o briefing antes de continuar:

**Âncora aninhada com `Categoria`:**
> Dentro de um card com link envolvente, use `Categoria` sem `href`. Ele renderiza `<span>` e não gera âncora aninhada. Com `href`, o `<a>` deve ser irmão dos outros links, nunca filho.

**Formato de `_achados.md`:** todo item entra com data. Seção `## Divergências código × comportamento correto` leva o blockquote avisando que a doc descreve o correto e o React será corrigido — sem isso, o back-end assume que a doc está errada quando os dois discordam.

---

## Parte 3 — Passos até a entrega

### Passo 1 — Consolidar contexto no repo

Escreva em `CLAUDE.md` o que determina decisões de documentação mas não está em `src/`:

- O back-end reimplementa em PHP; não reusa o React
- 11 portais consomem os mesmos componentes; divergência entre eles é o risco central
- A doc precisa ser autoexplicativa: quem aprova não acompanha as discussões de design
- Mobile sempre em escopo — regra de mobile ausente é falta de primeira ordem
- Arquitetura de entrega (ex.: como o ícone chega no WordPress) é decisão de tech lead, não de documentação

Sem isso, cada sessão nova começa cega.

### Passo 2 — Calibrar o `categoria`

Sessão separada, contexto limpo, papel de revisor: carregue só o briefing, o template e `docs/componentes/categoria.md`. O que verificar, em ordem:

1. **Seção 6 (HTML alvo)** — as classes são as reais do DOM? A hierarquia é reproduzível sem ler o React? Com 15 variantes de cor, o certo é uma classe modificadora parametrizada, não 15 blocos de HTML.
2. **Seção 5 (props)** — extraídas do `types.ts` real, defaults corretos.
3. **Densidade** — se um stub de 3 seções já está longo, o `news-card` fica ilegível.

### Passo 3 — `news-card` com Fases 1+2 juntas

O gate intermediário existia para calibrar densidade. Com o formato calibrado, ele deixa de valer. Volte com o arquivo + a lista consolidada de `🔴 A CONFIRMAR` para responder em bloco.

### Passo 4 — Criar `/revisar-doc`

Comando com checklist verificável, para o próprio Claude Code rodar antes de te entregar:

- [ ] Classes do HTML alvo conferem com o DOM real renderizado
- [ ] Props conferem com o `types.ts`, incluindo defaults
- [ ] Nenhuma seção com cabeçalho e corpo vazio
- [ ] Nenhum comportamento afirmado sem evidência no código
- [ ] Nenhum `<a>` aninhado nos exemplos
- [ ] Divergências da regra 6 registradas em `_achados.md`
- [ ] Exemplos de uso extraídos de chamadas reais do repo

### Passo 5 — Componentes 3 a 6

Um por rodada, com `/revisar-doc` antes de cada entrega. Rodar o `modal` com atenção: é onde a regra 6 finalmente será exercitada (focus trap ausente em `modal`/`dialog`/`drawer`, presente em `bottom-sheet`/`side-menu`).

### Passo 6 — `icon`

Não está mais bloqueado. A página fixa a fonte canônica (Material Symbols), os parâmetros da família e o racional de origem única; o mecanismo de entrega fica a critério de quem implementa.

Pode subir de prioridade se quiser — é o componente mais usado do repo (70 usos) e hoje não tem nenhuma regra escrita.

### Passo 7 — Fase 4, costura

`docs/componentes/README.md` com índice, nome, status e uma linha por componente. Nível de profundidade anotado em cada página. `_achados.md` consolidado.

### Passo 8 — Virar skill

Com 6 componentes documentados, o padrão está provado. Empacote em `documentar-componente`: template, regras invariantes, decisões acumuladas, checklist de revisão. A partir daí, componente novo entra documentado sem rodada de decisão.

---

## Um alerta que vale repetir

Nenhum dos design systems de referência foi escrito de uma vez. Todos começaram com 5–8 componentes bem documentados e cresceram. Sendo time de um, a ambição do Carbon é a forma mais rápida de a doc morrer desatualizada — e doc desatualizada é pior que doc ausente, porque o back-end confia nela.
