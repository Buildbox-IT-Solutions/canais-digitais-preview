# Briefing — Documentação de Componentes (Canais Digitais)

## Objetivo

Gerar páginas de documentação para os componentes do design system, dentro deste repositório, usando **o código como fonte da verdade** e o template em `docs/_template-componente.md` como formato.

O consumidor final da doc é o time de back-end (WordPress/PHP), que precisa reproduzir o comportamento destes componentes em outra stack. A doc existe para eliminar a dependência de perguntar ao designer.

---

## Regras invariantes

Estas valem em todas as fases. Nenhuma tarefa justifica quebrá-las.

**1. Não modifique código de componente.** Esta é uma tarefa de documentação. Se encontrar bug, inconsistência de token ou prop morta, anote em `docs/_achados.md` e siga. Não corrija.

**2. Não invente conhecimento de design.** O código te dá: props, variantes, estados implementados, classes, tokens usados, estrutura do DOM. O código **não** te dá: quando não usar o componente, qual componente usar no lugar, regras de conteúdo, intenção por trás de um breakpoint.

Para tudo que não for derivável do código, use uma das duas marcações — **não são a mesma coisa**:

```
> 🔴 A CONFIRMAR — [pergunta específica]
```
Existe uma decisão já tomada (no Figma, na cabeça do designer, em algum lugar), só falta descrevê-la. É uma pergunta de esclarecimento — "isso já foi decidido, qual foi a decisão?".

```
> ⚠️ DECISÃO PENDENTE — [o que falta decidir]
```
Não existe decisão nenhuma ainda. É trabalho de design a fazer antes de a doc poder afirmar qualquer coisa — não uma pergunta de esclarecimento, um item de backlog.

Na dúvida entre as duas, `🔴 A CONFIRMAR` é o padrão — só use `⚠️ DECISÃO PENDENTE` quando tiver evidência de que a decisão genuinamente não existe (ex.: nenhum componente do repo implementa nada parecido, nenhuma regra escrita em lugar nenhum).

Não escreva uma versão plausível "para o Pedro revisar depois" para nenhuma das duas. Uma pergunta explícita é entregável; um chute não é.

**3. Não escreva PHP.** A seção "HTML alvo" documenta a saída renderizada esperada (tags, hierarquia, classes). Como o WordPress produz isso não é escopo desta doc.

**4. Não deletar nem mover arquivos existentes.** Só criar dentro de `docs/`.

**5. Pare nos gates.** Cada fase termina com um resumo e uma pergunta. Não emende a fase seguinte sem resposta.

**6. Comportamento incorreto não vira documentação.** Quando o comportamento implementado divergir do comportamento correto (acessibilidade, semântica, foco), documente o CORRETO e registre a divergência em `docs/_achados.md` como "código a corrigir". Nunca documente um comportamento sabidamente incorreto só porque está no código. Na dúvida sobre qual é o correto: `🔴 A CONFIRMAR`.

**7. Arquivados não são documentados.** Componente arquivado não entra em `docs/componentes/` nem no índice da `/ds`. O sinal de "não usar" fica no cabeçalho do próprio arquivo. O DS lista o que se deve usar, não o histórico.

---

## Fases

### Fase 0 — Reconhecimento (não escreve doc nenhuma)

1. Mapeie os componentes em `src/components/` (ou onde estiverem).
2. Para cada um, conte quantas vezes é importado em outros arquivos.
3. Classifique em: **base** (usado por outros componentes), **composto**, **de página** (usado uma vez só).
4. Sinalize os que já têm variantes/estados implementados vs. os que são casca.

**Entregar:** tabela ordenada por número de usos + proposta dos **6 primeiros a documentar**, com justificativa de uma linha cada. Critério de escolha: aparece em mais de um contexto **e** tem regra não-óbvia.

**Gate:** aguardar confirmação da lista antes de escrever qualquer doc.

---

### Fase 1 — Piloto, nível stub

Escrever a doc de **um único componente** — o primeiro da lista aprovada — preenchendo **apenas as seções 1, 5 e 6** do template (cabeçalho, props, implementação).

Para a seção 6:
- **React:** exemplo de uso real, extraído de uma chamada existente no repo, não inventado.
- **HTML alvo:** derive da estrutura JSX real do componente, com as classes que efetivamente saem. Se houver classes condicionais, documente a variante mais comum e marque as demais.

Salvar em `docs/componentes/[nome].md`.

**Gate:** parar e apresentar. O objetivo é calibrar densidade e formato antes de escalar. Espere feedback sobre o que está demais e o que falta.

---

### Fase 2 — Piloto, nível utilizável

No mesmo arquivo, adicionar as seções 2, 4 e 7.

- Seção 4 (variantes/estados): derivável do código. Preencher.
- Seções 2 e 7: majoritariamente **não** deriváveis. Preencher só o que o código comprova (ex.: existe um `focus-visible` no CSS → documente; não existe → `🔴 A CONFIRMAR`). O resto vira pergunta.

**Entregar junto:** lista consolidada dos `🔴 A CONFIRMAR` gerados, para resposta em bloco.

**Gate:** aguardar as respostas, aplicá-las, e só então prosseguir.

---

### Fase 3 — Replicação, um por vez

Repetir Fases 1+2 para os cinco componentes restantes, **um por commit e um por rodada**. Ao fim de cada componente, apresentar e aguardar sinal verde.

Não paralelize. O padrão da doc ainda está se firmando e um erro replicado seis vezes custa mais caro que a lentidão.

---

### Fase 4 — Costura

1. `docs/componentes/README.md` — índice com nome, status e uma linha de descrição.
2. Anotar em cada página o nível atingido (stub / utilizável / completo).
3. Consolidar `docs/_achados.md` com os problemas encontrados no caminho.

**Não** criar changelog por componente, tabela de tokens duplicada, nem página de princípios.

---

## Formato de saída

- Markdown puro, sem front-matter.
- Português (PT-BR).
- Seção vazia é seção apagada — não deixar cabeçalho órfão.
- Nada de preâmbulo do tipo "Este documento descreve...". Comece pelo cabeçalho do template.

---

## Comece pela Fase 0.

Antes de rodar, leia `docs/_template-componente.md` por inteiro e confirme que entendeu a estrutura das 8 seções e a distinção entre "React" e "HTML alvo" na seção 6.
