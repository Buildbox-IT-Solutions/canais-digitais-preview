# News Card 2.0 / Patrocinado

**Figma Patrocinado:**   [`2358:14810`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2358-14810)
**Figma Patrocinado 2:** [`2370:30429`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2370-30429)
**Figma Boxed:**         [`3862:28403`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3862-28403)
**Arquivo:** [`src/components/news-card-patrocinado.php`](../src/components/news-card-patrocinado.php)

News Card patrocinado: BOX com border + Sponsor Line. 12 variantes (size × orientation × state × image/lead/categoria bools).

## Anatomia
- **Container externo**: `bg-white border border-neutral-100 hover:border-secondary-950 rounded-sm overflow-hidden`
- **Padding interno do conteúdo**: `px-4 py-3 gap-2`
- **Categoria**: chip OFF (apenas texto inline mint)
- **Title**: Aleo Bold, sizes variam:
  - Large: `text-headline-md` (28/36)
  - Medium: `text-title-xl` (22/28)
  - Small V: `text-title-lg` (18/24)
  - Small H / XSmall: `text-title-md` (16/24 tracking 0.15)
- **Title color**: `text-primary-600` enabled, `text-secondary-950` hovered
- **Lead**: Open Sans Regular, `text-neutral-900` (#3c4e69), tamanho varia (body-lg/md)
- **Sponsor Line** no rodapé (substitui o byline padrão)

## Diferenças vs versão antiga
- Era um label `text-saffron uppercase` com texto "Conteúdo patrocinado" + brand box border. **Errado.**
- Real é uma Sponsor Line completa: "Conteúdo Patrocinado" (label-sm neutral-900) + Link Button "Company Name" (Aleo Bold 16/24 secondary-950).
- Container precisa de `border` + `bg-white` + `rounded-sm overflow-hidden` — sem isso, o card patrocinado vira um News Card normal.
- A variante "Boxed" do Figma é apenas um shape diferente do mesmo padrão — coberta pelo container do showcase principal.

## Composição via partials
- `_partials/thumbnail` (image)
- `_partials/categoria` (chip off mint)
- `_partials/sponsor-line` (NOVO partial criado nesta sessão — gera "Conteúdo Patrocinado" + Link Button Company Name)

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
