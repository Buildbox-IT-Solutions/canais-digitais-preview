# Header Informa

**Figma:** [`110:3575`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=110-3575)
**Arquivo:** [`src/components/header-informa.php`](../src/components/header-informa.php)

Faixa institucional Material com 4 variantes: `device (Desktop|Mobile) × opened (false|true)`.

## Anatomia

### Closed (default)
- `bg-neutral-950` (#283857)
- Header bar: `flex flex-col items-center justify-center px-6 py-3 w-full`
- Conteúdo: `informa` logo + chevron `arrow_drop_down` (size 20)
- Mobile: `max-w-440 min-w-320`
- Desktop: `w-full` (1920 no Figma)

### Opened
Header bar (com `arrow_drop_up` em vez de drop_down) + content panel:

- **Container do panel**: `pb-6 pt-2 px-6` (px-4 no mobile)
- **Wrapper interno**: `max-w-1284`
  - Desktop: `flex-wrap gap-x-10 gap-y-6 items-start justify-center`
  - Mobile: `flex-col gap-6 items-center`

**Coluna esquerda** — descrição legal Informa PLC:
> "Este site é operado por uma empresa ou empresas de propriedade da Informa PLC e todos os direitos autorais residem com eles. A sede da Informa PLC é 5 Howick Place, Londres SW1P 1WG. Registrado na Inglaterra e no País de Gales. Número 8860726."

**Coluna direita** — tagline + lista:
- "Food Connection faz parte da divisão Informa Markets da Informa PLC"
- Lista flex-wrap: `Informa PLC` (bold) + `Sobre Nós` + `Relação com Cinvestidores` + `Talento` (semibold)

## Tipografia
- `text-body-md` Open Sans Regular 14/20 tracking 0.25 — todo o texto
- `Informa PLC` é Bold; demais links são SemiBold

## Decisões de design
- Removidos os links rápidos (Contato, Anuncie, Newsletter) e social icons que eu havia colocado na primeira versão — eles NÃO existem na bar do Header Informa. Aquela bar é exclusivamente o "informa dropdown". Os links sociais e ações do Header vivem no Header principal (`header.php`).
- O conteúdo do panel opened tem um typo do Figma: "Cinvestidores" (deveria ser "Investidores") — mantido idêntico ao master pra fidelidade.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
