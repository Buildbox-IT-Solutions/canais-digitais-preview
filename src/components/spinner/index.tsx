import { twMerge } from '~/lib/tw-merge'
import type { ISpinnerProps } from './types'

/**
 * Componente: Spinner
 * Indicador de carregamento inline (ex.: botão em estado "enviando"). Sem
 * node Figma próprio — peça de sistema (stroke currentColor + animate-spin).
 * Não confundir com `Loading` (src/components/loading, assets/icons/loading.svg),
 * usado para carregamento de página inteira.
 */
export function Spinner({ className }: ISpinnerProps) {
	return (
		<svg
			className={twMerge('size-5 animate-spin', className)}
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity=".25" />
			<path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
		</svg>
	)
}
