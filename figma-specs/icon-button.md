# Icon Button [1.0]

**Figma:** [Icon Button [1.0] — `71:6001`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=71-6001)
**Arquivo:** [`src/components/icon-button.php`](../src/components/icon-button.php)

Versão "só ícone" do Button [1.1]. Container quadrado com `rounded-full`. Mesma paleta de cores e mesmas regras de estado (`hover`/`disabled`) do Button [1.1], mas aqui o outlined usa `border` (1px) — não `border-[1.5px]`.

| Size | container | ícone |
|---|---|---|
| Large | `h-12 w-12` | `size-6` (24px) |
| Medium | `h-10 w-10` | `size-[18px]` |
| Small | `h-8 w-8` | `size-3` (12px) |

**Decisões de design:**
- Padding não é aplicado — o container é `h-N w-N` e o ícone fica centralizado via `justify-center items-center`.
- SVGs inline usam `currentColor` → herdam `text-*` automaticamente nos estados.
- Sempre incluir `aria-label` no `<button>` — é a única forma de comunicar a ação pro screen reader já que não tem texto visível.
- 18px é `size-[18px]` (arbitrary value) porque não existe token equivalente na escala 4px de spacing. A alternativa seria `size-4.5` no Tailwind v4, mas o arbitrary é mais explícito.
