import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IFilterChipProps } from './types'

/**
 * Componente: Filter chip
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1859-18460
 * Variantes (Figma): Configuration (Label only | Label & leading icon) × State (Enabled |
 *            Hovered | Focused | Pressed | Dragged | Disabled) × Selected (False | True) ×
 *            Show trailing icon (False | True) — 48 variantes.
 * Doc do Figma: "Filter chips use tags or descriptive words to filter content. They can be
 *            a good alternative to toggle buttons or checkboxes. Tapping on a filter chip
 *            activates it and appends a leading checkmark icon to the starting edge of the
 *            chip label." (https://m3.material.io/components/chips/overview)
 * Tokens: --color-secondary-50, --color-primary-600, --color-neutral-50, --color-neutral-100,
 *         --color-neutral-950, --text-label-lg
 *
 * Chip de filtro do MD3. É o controle canônico de "filtrar conteúdo por categoria" deste
 * DS — a barra de refino da busca e o filtro da Biblioteca exclusiva são o mesmo controle
 * e usam este componente. **Não criar pílula de filtro nova em tela nenhuma:** foi
 * exatamente isso (um `Toggle` com rótulo servindo de chip na Biblioteca) que produziu
 * dois controles para a mesma função, corrigido em 2026-08-30.
 *
 * ## Como o "selecionado" fica visível — três sinais, não um
 *
 * O `Toggle [1.0]` deste DS sinaliza estado só pelo preenchimento. O Filter chip do MD3
 * empilha três mudanças, e as três vêm do Figma:
 *
 * 1. **Check de 20px aparece à esquerda** do rótulo (o "leading checkmark" da doc). É o
 *    sinal que não depende de cor e sobrevive a daltonismo e a tema de alto contraste.
 * 2. **A borda some e o fundo entra** (`secondary-50`). Não é fundo somado à borda: o
 *    selecionado do Figma não tem `border` nenhuma.
 * 3. **O texto vira `primary-600`**, saindo do `neutral-950` do não-selecionado.
 *
 * O padding também muda, e isso não é detalhe: `px-4` no não-selecionado vira `pl-2 pr-4`
 * no selecionado, porque o check ocupa a borda esquerda. Sem isso o rótulo dança para a
 * direita ao selecionar.
 *
 * ## Semântica
 *
 * Chip de filtro é botão de dois estados → `aria-pressed`. A exceção é o chip que abre
 * menu (trailing `expand-more` na busca): ali `ariaHasPopup` substitui o `aria-pressed`,
 * porque disparador de menu não é toggle.
 *
 * Hover e foco são CSS puro (`:hover`/`:focus-visible`), não prop de "state" — mesma
 * convenção do `Toggle` e do `Button` deste repo.
 */
export function FilterChip({
	label,
	selected = false,
	onSelectedChange,
	leadingIcon,
	trailingIcon,
	ariaHasPopup,
	disabled = false,
	className,
}: IFilterChipProps) {
	// Selecionado troca o ícone da esquerda pelo check — é a regra do MD3, o `leadingIcon`
	// só existe enquanto o chip está desligado.
	const iconeEsquerda = selected ? 'check' : leadingIcon

	return (
		<button
			type="button"
			disabled={disabled}
			onClick={() => onSelectedChange?.(!selected)}
			aria-pressed={ariaHasPopup ? undefined : selected}
			aria-haspopup={ariaHasPopup}
			className={twMerge(
				'inline-flex h-8 shrink-0 items-center justify-center gap-2 rounded-full font-body font-semibold text-label-lg whitespace-nowrap transition-colors',
				'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
				selected
					? // Selecionado não tem borda: o fundo é o contêiner. `shadow-md` no hover é
						// o Elevation/1 do Figma.
						'bg-secondary-50 text-primary-600 hover:shadow-md'
					: 'border border-neutral-100 text-neutral-950 hover:bg-neutral-50 focus-visible:bg-neutral-50',
				// Padding assimétrico: quem tiver ícone naquele lado recorre a 8px, o lado só
				// com texto fica em 16px.
				iconeEsquerda ? 'pl-2' : 'pl-4',
				trailingIcon ? 'pr-2' : 'pr-4',
				disabled && 'cursor-not-allowed border-black/8 opacity-[0.38] hover:bg-transparent hover:shadow-none',
				className,
			)}
		>
			{iconeEsquerda ? <Icon name={iconeEsquerda} className="size-5 shrink-0" /> : null}
			{label}
			{trailingIcon ? <Icon name={trailingIcon} className="size-4 shrink-0" /> : null}
		</button>
	)
}
