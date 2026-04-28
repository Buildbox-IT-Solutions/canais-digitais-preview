# Avatar Stack

**Figma:** [`3422:29955`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3422-29955)
**Arquivo:** [`src/components/avatar-stack.php`](../src/components/avatar-stack.php)

Coleção de avatares circulares sobrepostos. 5 variantes: `qty (2|3|4|5|6)`.

## Anatomia
- Container: `flex items-center justify-between pr-2 w-{72|104|136|168|200}`
- Cada avatar: `size-10 rounded-full border-2 border-white object-cover mr-[-8px]`
- Overlap negativo: **8px** (`mr-[-8px]`)
- `pr-2` no container compensa o último avatar

## Larguras por qty
| qty | width |
|-----|-------|
| 2   | 72    |
| 3   | 104   |
| 4   | 136   |
| 5   | 168   |
| 6   | 200   |

## Decisões de design
- **Overlap corrigido** de 12px (`-space-x-3`) para 8px (`mr-[-8px]`).
- Border é `border-2 border-white`, NÃO `ring-2 ring-white` como eu tinha antes.
- O master NÃO tem variante com counter `+N` (era inferência minha) — removida.
- Larguras são fixas porque o auto-layout do Figma é absoluto. O `justify-between` distribui os avatares uniformemente dentro da largura.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 6.
