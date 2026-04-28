# Divider

**Figma:** [Divider — `56:6360`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=56-6360)
**Arquivo:** [`src/components/divider.php`](../src/components/divider.php)

Linha separadora 1px. Duas orientações: `horizontal` (padrão, `h-px w-full`) e `vertical` (`w-px h-full`). Cor única: `bg-neutral-100` (#D6D8DD), que bate exato com o fill do Figma.

**Decisões de design:**
- Sem variant property no código — orientação é uma escolha de classe utilitária (`h-px w-full` vs `w-px h-full`), não um prop. Mais simples e idiomático em Tailwind.
- A propriedade `Type` do Figma colapsa em duas combinações de classes que o Dev escolhe na hora do uso.
- O componente não tem padding/margin próprios — quem usa decide o espaçamento via container.
