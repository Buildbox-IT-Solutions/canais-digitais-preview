import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { ISearchBarProps, SearchBarState } from './types'

/**
 * Componente: Search Bar
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1776-19053
 * Variantes do Figma: state (compact 128px | opened 288px) × com/sem valor
 * Tokens: --color-neutral-100, --color-neutral-900, --color-primary-600,
 *         --color-secondary-950, --color-white
 *
 * `state="compact"` (default) = barra colapsada (w-32) que **expande no
 * foco** (`focus-within:w-72`) com border secondary-950 — comportamento do
 * Figma `Search Opened=On`. `state="opened"` força w-72 + border permanente,
 * útil em telas onde a busca é o ponto focal (ex.: /buscar).
 *
 * Auto-expand é CSS puro (focus-within + focus:) — sem state em JS.
 */
const STATE_WRAPPER: Record<SearchBarState, string> = {
	compact: 'w-32 focus-within:w-72',
	opened: 'w-72',
}

const STATE_INPUT_BORDER: Record<SearchBarState, string> = {
	compact: 'border-neutral-100 focus:border-secondary-950',
	opened: 'border-secondary-950',
}

export function SearchBar({
	placeholder = 'Buscar',
	state = 'compact',
	value,
	onChange,
	onClear,
	className,
}: ISearchBarProps) {
	const hasValue = Boolean(value)

	return (
		<div
			className={twMerge(
				'relative transition-[width] duration-300',
				STATE_WRAPPER[state],
				className,
			)}
		>
			<div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-900">
				<Icon name="search" className="size-6" />
			</div>
			<input
				type="search"
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
				className={twMerge(
					'w-full h-10 pl-10 pr-3 rounded-full border bg-white text-body-lg font-body text-primary-600 placeholder:text-neutral-900 focus:outline-none transition-colors',
					STATE_INPUT_BORDER[state],
				)}
			/>
			{hasValue ? (
				<button
					type="button"
					aria-label="Limpar busca"
					onClick={onClear}
					className="absolute inset-y-0 right-1 flex items-center justify-center p-2 text-neutral-900 hover:text-primary-600"
				>
					<Icon name="close" className="size-4" />
				</button>
			) : null}
		</div>
	)
}
