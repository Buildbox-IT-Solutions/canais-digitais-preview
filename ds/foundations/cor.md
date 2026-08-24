---
status: documentado
---

## 1. O que é e por quê

Três escalas neutras/institucionais (`primary`, `secondary`, `neutral`) de 50 a 950, mais quatro cores categóricas fixas (coral, mint, saffron, lavander) e três tokens de status (danger, warning, success).

`danger` é a única escala completa (50 a 950) entre os três tokens de status — decisão confirmada nesta sessão: os usos reais de "erro" no código exigem mais de um tom (fundo claro + texto escuro em `icon-tile`, dois tons de hover em `dialog`/`general-item`), enquanto `warning`/`success` só apareceram com um tom cada até hoje.

> 🔴 A CONFIRMAR — qual o racional de ter 3 escalas institucionais (`primary`/`secondary`/`neutral`) separadas de 4 cores categóricas fixas (`coral`/`mint`/`saffron`/`lavander`)? Que papel de produto cada uma cobre, e por que essas 4 cores especificamente para categorias editoriais?

## 2. Valores

Ver amostra visual gerada abaixo — swatches de cada família, lidos ao vivo do `@theme` de `src/index.css`. Tons sem nenhuma classe usando ainda aparecem hachurados (token declarado, mas o Tailwind não emite a variável se nada consome).

## 3. Como usar

| Token | Classe Tailwind | Exemplo |
|---|---|---|
| `--color-primary-600` | `bg-primary-600` / `text-primary-600` | Fundo institucional, texto de marca |
| `--color-secondary-950` | `bg-secondary-950` / `text-secondary-950` | Hover de link/ação sobre `primary-600` |
| `--color-neutral-100` | `border-neutral-100` | Divisórias e bordas sutis |
| `--color-danger-600` | `text-danger-600` / `bg-danger-600` | Erro, ação destrutiva |
| `--color-coral` | `text-coral` / `bg-coral` | Categoria/editoria (uma das 7 cores fixas) |

## 4. O que não fazer

- Não usar classes genéricas do Tailwind fora da paleta do DS (`text-red-500`, `bg-blue-600`) — sempre um token `--color-*` declarado em `src/index.css`.
- Não usar hex direto em `className` (`bg-[#002244]`) mesmo que o valor coincida com um token existente.
- Não inventar um tom novo de `danger`/`warning`/`success` sem antes verificar se a escala já cobre o caso (ver `--color-danger-{50..950}`).

## 5. Decisões e histórico

> 🔴 A CONFIRMAR — as 11 escalas de 50 a 950 vieram direto do Figma (Foundations > Colors) ou foram ajustadas na migração para código? Existe alguma cor do Figma que ficou de fora desta lista?
