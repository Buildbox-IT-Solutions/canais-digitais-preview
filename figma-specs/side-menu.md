# Side Menu

**Figma:** [`986:9198`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=986-9198)
**Arquivo:** [`src/components/side-menu.php`](../src/components/side-menu.php)

Drawer lateral. **4 variantes**: `device (Desktop|Mobile) × level (Level 1|Level 2)`.

## Anatomia
- Container: `bg-white border-r border-primary-100 (#d4dae0) py-2`
- `max-w-280 min-w-240 w-280`
- Heights:
  - Mobile L1: 983
  - Mobile L2: 688
  - Desktop: 1080

## Estrutura
1. **btn-area top** (`px-3 py-2`): Icon Button close ghost
2. **Menu Title** (apenas Level 2): Aleo Bold 16/24 text-neutral-700 com `pl-6 pr-4`
3. **Menu list**: 13+ Building Block menu items SEM leading/trailing/supporting/divider
4. **Footer** (`flex-1 flex flex-col gap-4 items-start justify-end px-5 py-2`):
   - **Desktop L1**: Divider neutral-100 + Brand Informa logo (104×34)
   - **Mobile L1**: Button "Anuncie" filled w-full + social list 5 icons (WhatsApp, LinkedIn, Facebook, YouTube, X) + Divider + Brand Informa
5. **Scrollbar custom** à direita (12px wide com bar 4px neutral-700)

## Decisões de design
- Width corrigida 320 → **280** (max 280 / min 240).
- Border é `border-r-primary-100`, NÃO shadow flutuante.
- Sem search bar inline embedded — eu tinha adicionado.
- Sem groups de Editorias/Institucional separados — é uma única lista contínua.
- Items SEM leading icon, trailing chevron, supporting text ou dividers.
- Level 2 mostra "Menu Title" no topo (Aleo Bold) seguido de subitems.

## Composição
- Mobile L1 footer usa botão "Anuncie" + 5 social icons + Brand Informa.
- Cada item da lista é apenas um link com `flex h-14 items-center px-3 py-2 hover:bg-black/8`.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
