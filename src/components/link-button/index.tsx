import { twMerge } from '~/lib/tw-merge'
import type { ILinkButtonProps, LinkButtonSize } from './types'

/**
 * Componente: Link Button
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=662-11195
 * Variantes: 4 sizes (xl/lg/md/sm). XL/LG/MD usam Aleo; SM usa Open Sans.
 * Tokens: --color-secondary-950, --color-secondary-900
 */

const SIZE_CLASSES: Record<LinkButtonSize, string> = {
	xl: 'text-title-xl font-display',
	lg: 'text-title-lg font-display',
	md: 'text-title-md font-display',
	sm: 'text-label-lg font-body',
}

export function LinkButton({ label, href, onClick, size = 'lg', className }: ILinkButtonProps) {
	const classes = twMerge(
		'inline-flex items-center font-bold transition-colors text-secondary-950 hover:text-secondary-900 hover:underline',
		SIZE_CLASSES[size],
		className,
	)

	// Sem destino, isto é uma ação e não uma navegação — `<a>` sem `href` não recebe
	// foco nem responde a Enter. Mesma bifurcação de `Button` e `IconButton`.
	if (!href) {
		return (
			<button type="button" onClick={onClick} className={classes}>
				{label}
			</button>
		)
	}

	return (
		<a href={href} onClick={onClick} className={classes}>
			{label}
		</a>
	)
}
