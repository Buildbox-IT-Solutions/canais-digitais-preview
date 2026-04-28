# Loading Button [1.0]

**Figma:** [Loading Button [1.0] — `71:6026`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=71-6026)
**Arquivo:** [`src/components/loading-button.php`](../src/components/loading-button.php)

Pill `h-12 px-6` com spinner SVG branco animado, sem texto. Substitui o conteúdo de um botão Filled enquanto a ação está em progresso. Mesma paleta do Filled do Button [1.1] (primary-600 / secondary-950 / neutral-200).

**Decisões de design:**
- O Figma define apenas variant `Type=Filled` — não existe Outlined/Ghost loading. Faz sentido: loading state é forte por natureza, contraste alto importa.
- O `disabled` no markup não é só visual — semanticamente o botão NÃO pode receber novo clique enquanto carrega. Combinado com `aria-busy="true"` + `aria-label="Carregando"`.
- O spinner é uma SVG inline (círculo de fundo 25% opacity + arco superior animado), com `currentColor` herdando `text-white`. Animação via `animate-spin` (Tailwind default).
- Não usei `<svg>` external porque o spinner é estrutural ao componente — incluir inline preserva o auto-suficiência ("renderiza sem dependências externas").
