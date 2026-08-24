---
status: documentado
---

## 1. O que é e por quê

Duas famílias — Aleo (`--font-display`, títulos) e Open Sans (`--font-body`, texto corrido) — combinadas em uma escala MD3 de 17 níveis, de `display-lg` (57px) a `label-sm`. A família não é acoplada ao tamanho: cada nível de tamanho (`text-display-lg`, `text-body-md`...) é uma classe separada da família (`font-display`/`font-body`), então qualquer nível pode em tese ser combinado com qualquer família — a escolha de família é sempre explícita na classe, nunca implícita no nível.

> 🔴 A CONFIRMAR — por que Aleo para display/headline/title e Open Sans para body/label especificamente? Existe uma combinação de família+tamanho que é proibida na prática (ex.: nunca usar Aleo em `label-sm`), mesmo sendo tecnicamente possível combinar qualquer família com qualquer tamanho?

## 2. Valores

Ver amostra visual gerada abaixo — os 17 níveis com texto de exemplo (`Aa`) renderizado na escala real, lidos ao vivo do `@theme` de `src/index.css`.

## 3. Como usar

| Token | Classe Tailwind | Exemplo |
|---|---|---|
| `--text-display-lg` | `font-display text-display-lg` | Hero/título editorial grande |
| `--text-headline-sm` | `font-display text-headline-sm` | Título de página/seção |
| `--text-title-md` | `font-display text-title-md` | Cabeçalho de card |
| `--text-body-md` | `font-body text-body-md` | Parágrafo padrão |
| `--text-label-lg` | `font-body font-semibold text-label-lg` | Rótulo de botão/badge |

## 4. O que não fazer

- Não declarar `font-size` fora da escala (`text-[15px]`) — os 17 níveis cobrem de hero a label.
- Não usar `font-display` para texto corrido nem `font-body` para títulos grandes — ver pergunta em aberto na seção 1 sobre se há uma regra explícita além do costume observado no código.
- Não usar `font-mono` ou qualquer família fora de `--font-display`/`--font-body` — não faz parte do DS.

## 5. Decisões e histórico

> 🔴 A CONFIRMAR — a escala de 17 níveis é a escala completa do MD3 ou um subconjunto escolhido para este projeto? Se for subconjunto, quais níveis do MD3 foram descartados e por quê?
