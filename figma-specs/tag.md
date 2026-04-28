# Tag

**Figma:** [Tag — `567:9604`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=567-9604)
**Arquivo:** [`src/components/tag.php`](../src/components/tag.php)

Chip pequeno usado para marcar palavras-chave/temas em cards e cabeçalhos. Padding 8×4, radius 4px (`rounded-sm`), tipo Open Sans SemiBold 14px (`text-title-sm font-body font-semibold`). Estado padrão: bg `primary-100`, texto `primary-800`. Hover: bg `neutral-50`, texto `secondary-950`.

**Decisões de design:**
- Hover é só pseudo-classe CSS (`hover:bg-neutral-50 hover:text-secondary-950 transition-colors`), não variant separada — DRY.
- Markup default é `<span>` porque o componente em si é estilo, mas no WP geralmente vira `<a href="/categoria/...">` sem mudar nenhuma classe.
- Bate exato com os hex do Figma (#D4DAE0 = primary-100, #081421 = primary-800, #E9EAEC = neutral-50, #003CB2 = secondary-950).
