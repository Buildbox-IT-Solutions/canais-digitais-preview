# Text field

**Figma:** [`1757:14338`](https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1757-14338)
**Arquivo:** [`src/components/text-field.php`](../src/components/text-field.php)

Input Material 3 customizado. Props do Figma: `state × leadingIcon × trailingIcon × required × supportingText`.

## Anatomia
- **Width** default 250, **altura 40** (`h-10`, NÃO 48)
- **rounded-sm** (4px)
- **Label container** acima: text-label-lg (14/20 Open Sans SemiBold), `text-neutral-950` (#283857), asterisco opcional pro `required`
- **Leading icon** (16px) em chip 32×32 (`p-2 rounded-full`)
- **Input text**: `text-body-lg` (16/24), `text-primary-600` preenchido, `text-neutral-500` (#8391A9) placeholder
- **Trailing icon** (close 16px) em chip 32×32
- **Supporting text** abaixo: `text-label-md` (12/16 tracking 0.5), `text-neutral-950`

## Estados (6)
| Estado | BG | Border | Label | Input |
|---|---|---|---|---|
| Enabled | white | neutral-100 | neutral-950 | neutral-500 (placeholder) |
| Placeholder text | white | neutral-100 | neutral-950 | primary-600 |
| Hovered | **neutral-50** | neutral-100 | neutral-950 | primary-600 |
| Focused | white | **secondary-950** (#003cb2) | neutral-950 | primary-600 + caret |
| Error | white | **#bf0413** | **#bf0413** | primary-600 + caret + trailing error icon |
| Disabled | neutral-50 | neutral-100 | **neutral-300** | **neutral-400** |

## Decisões de design
- **Error red** (`#bf0413`) não é um token do DS — é um Material red puro do Figma. Declarado inline via Tailwind arbitrary value (`border-[#bf0413]`, `text-[#bf0413]`) pra manter fidelidade. Se um `--color-error` for adicionado ao `tokens.css` no futuro, migrar.
- **Trailing icon no error** usa um error/info icon (círculo com !), não close.
- **Required asterisk** vive no label container, antes do asterisco: `<label>Label</label><span>*</span>`.
- **Leading icon** é obrigatório no master (o Figma mostra todos os estados com icon). No markup real, envolver em `<?php if ($leadingIcon): ?>` quando promovido a partial.
- Height 40 (`h-10`, não `h-12`) foi a maior correção da sessão 5.

> ✅ **VALIDADO contra Figma em 2026-04-09** — sessão 5. Height corrigido de 48 → 40. Adicionado leading icon + trailing close + error icon + label required asterisk + supporting text abaixo. Error color ajustado de coral → `#bf0413`.
