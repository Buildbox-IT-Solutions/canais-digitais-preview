---
status: documentado
---

## O que é

Um container único (`max-w-screen-xl`, 1280px) com padding responsivo de página — não há um sistema de grid de colunas customizado no DS; o "grid" é o container combinado com `flex`/`grid` do Tailwind, aplicado caso a caso. A decisão por trás: o Figma não define breakpoints formais (ver foundation "Breakpoints", bloqueada) — por isso este fundamento documenta só a largura máxima e o padding, que são as duas regras estáveis hoje.

## Como usar

| Token/Classe | Uso |
|---|---|
| `max-w-screen-xl` | Largura máxima de qualquer página de conteúdo |
| `mx-auto` | Centraliza o container na tela |
| `px-4` | Padding horizontal padrão (mobile) |
| `lg:px-6` | Padding horizontal a partir do breakpoint `lg` |

> O valor exato do breakpoint `lg` (e dos demais) ainda não está registrado como token — ver foundation "Breakpoints" (bloqueada).

## O que não fazer

- Não usar uma largura máxima diferente de `max-w-screen-xl` para página de conteúdo — variação aqui é o tipo de divergência que aparece diferente em cada um dos 11 portais.
- Não zerar o padding em telas largas — `px-4 lg:px-6` é o mínimo de respiro em qualquer breakpoint.
