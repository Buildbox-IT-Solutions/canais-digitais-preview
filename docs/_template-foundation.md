# Template de Página de Foundation — Canais Digitais

> Foundation não usa o template de 8 seções de componente (`_template-componente-cd.md`).
> É outro tipo de página: fundamento visual/tokens, não peça de UI com props e estados.
> Regra de ouro continua a mesma: seção vazia é seção apagada.

Duas audiências, seções diferentes:
- **Seções 1 e 5** — designers. Racional da decisão, histórico do que foi descartado.
- **Seções 2, 3 e 4** — time de back-end. Valores, classe Tailwind, antipadrão.

---

## 1. O que é e por quê

Duas frases do que o fundamento cobre. Depois, o racional — **só se já existir
uma decisão tomada**. Código e CLAUDE.md dão o "o quê" (quais tokens existem);
raramente dão o "por quê" (por que esses valores, por que essa exclusão).

Quando o "por quê" não estiver escrito em lugar nenhum:

```
> 🔴 A CONFIRMAR — [pergunta específica sobre uma decisão que já existe,
> só não está descrita]
```

Quando não existir decisão alguma ainda — é trabalho de design a fazer, não
uma pergunta de esclarecimento:

```
> ⚠️ DECISÃO PENDENTE — [o que falta decidir]
```

Nunca escrever um racional plausível para preencher a lacuna.

---

## 2. Valores

Tabela **gerada em código** a partir do `@theme` de `src/index.css` (ou, para
fundamentos sem token customizado — radius, elevação, state layers —, lida em
tempo real via `getComputedStyle` da classe Tailwind nativa), com amostra
visual: swatch de cor, texto na escala tipográfica real, caixa com o radius
aplicado. Nunca uma lista escrita à mão na página — se precisar editar um
valor aqui, o lugar certo é `src/index.css`, não este arquivo.

---

## 3. Como usar

| Token | Classe Tailwind | Exemplo |
|---|---|---|
| `--nome-do-token` | `classe-tailwind` | Onde usar |

---

## 4. O que não fazer

O antipadrão concreto — o hardcode ou a classe fora do DS que essa foundation
proíbe. Derivável do código (grep por hex/classe genérica) ou da regra já
escrita no CLAUDE.md.

---

## 5. Decisões e histórico

O que foi considerado e descartado, e por quê. **Quase nunca derivável** —
histórico de decisão não fica no código. Default para:

```
> 🔴 A CONFIRMAR — o que mais foi considerado além do que está em produção,
> e por que foi descartado?
```

Seção vazia é seção apagada — se a resposta virar "nada a registrar", apagar
a seção em vez de deixar o cabeçalho órfão.
