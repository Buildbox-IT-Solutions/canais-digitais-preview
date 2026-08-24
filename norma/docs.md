# Norma — Documentação do Design System

> Consolidação de `_briefing-claude-code-docs.md` + `_contexto-docs-cd.md` (24/08/2026).
> Os dois se sobrepunham: o briefing trazia as regras e as fases, o contexto repetia
> as regras e substituía as fases por passos. Aqui há uma versão de cada coisa.
>
> **Leia este arquivo por inteiro antes de qualquer tarefa de documentação**, junto com
> `norma/template-componente.md` (componentes) ou `norma/template-foundation.md`
> (foundations) — são templates diferentes e não intercambiáveis.

---

## 1. Objetivo

Gerar páginas de documentação para os componentes do design system, dentro deste
repositório, usando **o código como fonte da verdade**.

**Fonte da verdade é o código.** O repositório define comportamento; o Figma define
aparência. Quando divergirem, o código ganha — exceto na regra invariante 6.

**Consumidor final é o back-end.** A doc existe para o time de WordPress reproduzir o
comportamento em PHP sem precisar perguntar ao designer. Todo critério de "isso vale
documentar?" se resolve por essa pergunta.

---

## 2. Regras invariantes

Valem em todas as fases. Nenhuma tarefa justifica quebrá-las.

**1. Não modifique código de componente.** Documentação é tarefa de leitura. Bug,
inconsistência de token ou prop morta vão para `ds/achados.md`. Não corrija.

**2. Não invente conhecimento de design.** O código te dá: props, variantes, estados
implementados, classes, tokens usados, estrutura do DOM. O código **não** te dá: quando
não usar o componente, qual usar no lugar, regras de conteúdo, intenção por trás de um
breakpoint.

Para o que não for derivável, use uma das duas marcações — **não são a mesma coisa**:

```
> 🔴 A CONFIRMAR — [pergunta específica]
```
A decisão existe (no Figma, na cabeça do designer, em algum lugar); falta descrevê-la.
Pergunta de esclarecimento: "isso já foi decidido, qual foi a decisão?".

```
> ⚠️ DECISÃO PENDENTE — [o que falta decidir]
```
Não existe decisão nenhuma. É trabalho de design a fazer antes de a doc poder afirmar
qualquer coisa — item de backlog, não pergunta.

Na dúvida, `🔴 A CONFIRMAR` é o padrão. Só use `⚠️ DECISÃO PENDENTE` com evidência de
que a decisão genuinamente não existe (nenhum componente do repo implementa nada
parecido, nenhuma regra escrita em lugar nenhum).

Não escreva uma versão plausível "para o Pedro revisar depois", em nenhum dos dois
casos. Uma pergunta explícita é entregável; um chute não é.

**3. Não escreva PHP.** A seção "HTML alvo" documenta a saída renderizada esperada —
tags, hierarquia, classes. Como o WordPress produz isso é decisão do back-end. Escrever
PHP te torna dono de um código que você não mantém.

**4. Não delete nem mova arquivos alheios à tarefa.** Documentar é criar dentro de
`ds/`. Reorganização de estrutura é tarefa própria, com aprovação própria — foi assim
que esta pasta virou `norma/` + `ds/` + `notas/` em 24/08/2026.

**5. Pare nos gates.** Cada rodada termina com um resumo e uma pergunta. Não emende a
seguinte sem resposta.

**6. Comportamento incorreto não vira documentação.** Quando o implementado divergir do
correto (acessibilidade, semântica, foco), documente o **correto** e registre a
divergência em `ds/achados.md` como "código a corrigir". Nunca documente comportamento
sabidamente incorreto só porque está no código. Na dúvida sobre qual é o correto:
`🔴 A CONFIRMAR`.

**7. Arquivados não são documentados.** Componente arquivado não entra em
`ds/componentes/` nem no índice da `/ds`. O sinal de "não usar" fica no cabeçalho do
próprio arquivo. O DS lista o que se deve usar, não o histórico.

---

## 3. Formato

**Dois templates, não intercambiáveis.** `norma/template-componente.md` tem 8 seções e
serve a peça de UI com props e estados. `norma/template-foundation.md` tem 5 e serve
fundamento visual/token — foundation não tem prop nem estado, e forçá-la no template de
componente produz seções vazias.

O template de componente é um mix deliberado: estrutura enxuta do Nord, "quando não
usar" e content guidelines do Polaris, dual-stack do Primer, status de maturidade do
Carbon.

**Três níveis de profundidade, e parar no nível 1 é aceitável:**

| Nível | Seções | Quando |
|---|---|---|
| Stub | 1, 5, 6 | componente novo, ainda mudando |
| Utilizável | + 2, 4, 7 | entrou em handoff |
| Completo | + 3, 8 | reusado por 3+ portais |

**As seções que pagam o investimento são a 6 e a 7** — o contrato de saída e as regras
invisíveis. O resto o Figma já conta.

**Saída:** Markdown, PT-BR, front-matter só com `status` (a `/ds` deriva dele; ver
`src/lib/ds/component-registry.ts`). Seção vazia é seção apagada — cabeçalho órfão
ensina o time a ignorar a doc. Nada de preâmbulo do tipo "Este documento descreve…":
comece pelo cabeçalho do template.

**Formato de `ds/achados.md`:** todo item entra com data. A seção de divergências
código × comportamento correto leva o blockquote avisando que a doc descreve o correto e
o React será corrigido — sem isso, o back-end assume que a doc está errada quando os
dois discordam.

---

## 4. Escopo aprovado

| # | Componente | Situação |
|---|---|---|
| 1 | `categoria` | documentado |
| 2 | `header-desktop` | documentado |
| 3 | `news-card` | próximo; é o teste de estresse do formato |
| 4 | `button` | |
| 5 | `modal` | documentar a **família de 5 sobreposições** (`modal`, `dialog`, `bottom-sheet`, `drawer`, `side-menu`) com tabela "qual usar quando" na seção 2 |
| 6 | `toast` | empilhamento e dismiss, não deriváveis do Figma |
| 7 | `icon` | formato adaptado — ver abaixo |

**`icon` não é página de componente comum.** Precisa de:

- **Fonte canônica declarada:** Material Symbols (`fonts.google.com/icons`). É de onde
  todo ícone do sistema sai — nenhum entra por outra origem, nem desenhado sob demanda.
- **Parâmetros fixos da família:** estilo (Outlined / Rounded / Sharp — escolher **um**)
  e os eixos da variable font: weight, fill, grade, optical size. Sem isso fixado, dois
  portais usam o mesmo ícone com pesos diferentes e ninguém percebe.
- **Nome canônico = nome na lib.** `bookmark` é `bookmark`. Renomear localmente quebra a
  rastreabilidade até a origem.
- **Catálogo de nomes gerado** a partir do registry, nunca lista manual.
- **Passo a passo para adicionar ícone novo**, cobrindo os dois lados: como o design leva
  para o Figma e como entra no repo.
- **Racional de entrega, não decisão de entrega.** A doc explica por que a origem única
  importa (consistência entre 11 portais) e deixa o mecanismo — sprite SVG, inline, ou a
  própria icon font do Google — a critério de quem implementa. O DS exige o resultado:
  mesmo ícone, mesmos parâmetros, nome rastreável.

### Fora de escopo, por decisão

- **`card`** — código morto, experimento descartado. Remoção em tarefa separada.
- **`image`, `loading`** — sem referências, origem não confirmada. Investigar antes de
  decidir.
- **`form-field`, `form-select`, `session-row`** — sem stories, ou seja, os estados nem
  foram mapeados em design ainda. **Tarefa de design antes de virar doc.** Formulário é
  onde mais se erra acessibilidade no handoff.
- **Não criar:** changelog por componente, tabela de tokens duplicada em cada página,
  página de princípios de design.

---

## 5. Como rodar cada componente

O briefing original tinha Fases 0 a 4 com um gate intermediário entre "stub" e
"utilizável". Esse gate existia para calibrar densidade, e a calibragem já aconteceu no
`categoria` — então **as fases 1 e 2 vão juntas**.

Por componente:

1. Escrever as seções do nível alvo (stub ou utilizável) em `ds/componentes/<slug>.md`.
   O slug precisa estar em `src/lib/ds/catalog.ts`, senão a página não é alcançável pela
   `/ds` — e o `check-docs` falha na asserção C.
2. Exemplo de uso extraído de chamada **real** do repo, nunca inventado. "HTML alvo"
   derivado do JSX real, com as classes que efetivamente saem; com muitas variantes de
   cor, uma classe modificadora parametrizada, não N blocos de HTML.
3. Voltar com o arquivo **mais** a lista consolidada dos `🔴 A CONFIRMAR`, para resposta
   em bloco.
4. **Um por rodada.** Não paralelize: o padrão ainda está se firmando e um erro replicado
   seis vezes custa mais que a lentidão.

### Checklist antes de entregar

- [ ] Classes do HTML alvo conferem com o DOM real renderizado
- [ ] Props conferem com o `types.ts`, incluindo defaults
- [ ] Nenhuma seção com cabeçalho e corpo vazio
- [ ] Nenhum comportamento afirmado sem evidência no código
- [ ] Nenhum `<a>` aninhado nos exemplos
- [ ] Divergências da regra 6 registradas em `ds/achados.md`
- [ ] Exemplos de uso extraídos de chamadas reais do repo
- [ ] `pnpm check:docs` passa

---

## 6. Estado dos passos de entrega

| Passo | Estado |
|---|---|
| Consolidar contexto de produto no `CLAUDE.md` | ✅ feito — é a seção "Contexto de produto" |
| Calibrar o `categoria` | ✅ feito |
| Regra da âncora aninhada com `Categoria` | ✅ feito — está no `CLAUDE.md` |
| Fonte canônica do `icon` | ✅ feito — está no `CLAUDE.md` |
| `news-card` | próximo |
| Componentes 4 a 7 | um por rodada |
| Índice da `/ds` com nome, status e uma linha | a rota `/ds` já faz isso a partir do catálogo e do front-matter; não escrever `README.md` à mão |
| Virar skill `documentar-componente` | depois de 6 componentes — aí o padrão está provado |

---

## Um alerta que vale repetir

Nenhum dos design systems de referência foi escrito de uma vez. Todos começaram com 5–8
componentes bem documentados e cresceram. Sendo time de um, a ambição do Carbon é a
forma mais rápida de a doc morrer desatualizada — e doc desatualizada é pior que doc
ausente, porque o back-end confia nela.
