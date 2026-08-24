---
status: documentado
---

## 1. O que é e por quê

Dois overlays neutros (preto com opacidade) para dois papéis fixos, registrados no CLAUDE.md: `bg-black/8` para feedback de interação (hover/press) e `bg-black/20` para escurecimento de fundo (scrim de modal/drawer).

> 🔴 A CONFIRMAR — por que preto com opacidade em vez de uma cor de marca (ex.: `primary-600` com opacidade)? Os dois valores (8% e 20%) valem para qualquer fundo do sistema, incluindo fundos já escuros como `primary-600`, ou só para fundos claros?

## 2. Valores

Ver amostra visual gerada abaixo — os dois overlays aplicados sobre uma superfície real, com a cor computada (incluindo o alfa) lida ao vivo do navegador.

## 3. Como usar

| Token/Classe | Papel |
|---|---|
| `bg-black/8` | Hover/press — feedback de interação sobre um elemento |
| `bg-black/20` | Scrim/overlay — fundo escurecido atrás de modal, drawer, sheet |

## 4. O que não fazer

- Não usar uma opacidade diferente de 8% ou 20% para esses dois papéis — são os dois únicos valores registrados no CLAUDE.md hoje.
- Não usar uma cor diferente de preto para state layer sem confirmar com design (ver pergunta em aberto na seção 1).

## 5. Decisões e histórico

> 🔴 A CONFIRMAR — os valores 8%/20% vieram de uma medição no Figma (opacidade exata das camadas de overlay) ou foram calibrados por olho durante a implementação? Algum outro valor de opacidade foi testado antes de fechar nesses dois?
