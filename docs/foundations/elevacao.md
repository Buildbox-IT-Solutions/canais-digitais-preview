---
status: documentado
---

## 1. O que é e por quê

A escala nativa de `box-shadow` do Tailwind v4 (`shadow-sm`/`md`/`lg`/`xl`), usada como está — não existe nenhum token de elevação customizado declarado no `@theme` de `src/index.css`.

> ⚠️ DECISÃO PENDENTE — o Figma tem alguma escala de elevação numerada (tipo Material "dp") que deveria virar token dedicado, ou os 4 níveis nativos do Tailwind bastam para todo caso de sombra do projeto? Hoje não há nenhuma decisão registrada sobre isso — só o fato observável de que nenhum token foi criado ainda.

## 2. Valores

Ver amostra visual gerada abaixo — cada nível aplicado a uma caixa real, com o `box-shadow` computado lido ao vivo do navegador.

## 3. Como usar

| Classe Tailwind | Uso típico |
|---|---|
| `shadow-sm` | Elevação sutil (card em repouso) |
| `shadow-md` | Elevação de hover/dropdown |
| `shadow-lg` | Modal, drawer, painel flutuante |
| `shadow-xl` | Elemento acima de todos os outros (raro) |

## 4. O que não fazer

- Não escrever `box-shadow` customizado em `style` ou CSS avulso — os 4 níveis nativos são os únicos usados no projeto hoje.
- Não combinar sombra com borda pesada no mesmo elemento sem confirmar com design se os dois sinais de elevação devem coexistir.

## 5. Decisões e histórico

> 🔴 A CONFIRMAR — chegou a existir uma proposta de escala de elevação própria (tokens `--shadow-*`) que foi descartada em favor da escala nativa do Tailwind, ou os 4 níveis nativos nunca foram questionados?
