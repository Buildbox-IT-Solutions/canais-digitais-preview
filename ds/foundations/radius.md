---
status: documentado
---

## 1. O que é e por quê

Um subconjunto de 5 valores da escala nativa de `border-radius` do Tailwind v4: `rounded-xs`, `rounded-sm`, `rounded-lg`, `rounded-2xl`, `rounded-full`. `rounded-md` (6px) é o único valor nativo explicitamente excluído — está escrito como regra no CLAUDE.md ("`rounded-md` não faz parte do DS — não usar"), então a exclusão em si é uma decisão confirmada.

> 🔴 A CONFIRMAR — por que `rounded-md` foi excluído especificamente, já que é um valor nativo do Tailwind entre `rounded-sm` (4px) e `rounded-lg` (8px)? A regra existe (código e CLAUDE.md concordam), só o racional não está escrito em nenhum lugar.

## 2. Valores

Ver amostra visual gerada abaixo — cada classe aplicada a uma caixa real, com o valor computado lido ao vivo do navegador (`getComputedStyle`), não uma tabela escrita à mão.

## 3. Como usar

| Classe Tailwind | Uso típico |
|---|---|
| `rounded-xs` | Chips pequenos, indicadores |
| `rounded-sm` | Badge, tag, categoria com chip |
| `rounded-lg` | Card, input, icon-tile |
| `rounded-2xl` | Modal, drawer, painéis grandes |
| `rounded-full` | Avatar, botão pill, dot de status |

## 4. O que não fazer

- Não usar `rounded-md` — não faz parte do DS (ver seção 1).
- Não usar valores arbitrários (`rounded-[10px]`) — se nenhum dos 5 valores serve, é uma lacuna a levar para design, não a resolver com um valor improvisado.

## 5. Decisões e histórico

> 🔴 A CONFIRMAR — algum outro valor da escala nativa do Tailwind (`rounded-md`, `rounded-3xl`) foi testado em algum componente e descartado, ou a lista de 5 já nasceu fechada assim no Figma?
