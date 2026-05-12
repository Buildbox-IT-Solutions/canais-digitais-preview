import { twMerge } from '~/lib/tw-merge'
import type { CategoriaColor, ICategoriaProps } from './types'

/**
 * Componente: Categoria
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=71-6699
 * Variantes: 7 cores × chip on/off × link/span (28 variants)
 * Tokens: --color-coral, --color-mint, --color-saffron, --color-lavander,
 *         --color-secondary-950, --color-secondary-500, --color-primary-600, --color-white,
 *         --color-neutral-50
 */

const COLOR_CLASSES: Record<CategoriaColor, string> = {
	coral: 'text-coral',
	mint: 'text-mint',
	saffron: 'text-saffron',
	lavander: 'text-lavander',
	'secondary-950': 'text-secondary-950',
	'secondary-500': 'text-secondary-500',
	'primary-600': 'text-primary-600',
}

export function Categoria({
	label,
	color,
	chip = false,
	href,
	className,
}: ICategoriaProps) {
	const isInteractive = Boolean(href)
	const classes = twMerge(
		chip && 'inline-flex items-center px-2 py-1 rounded-sm bg-white transition-colors',
		chip && isInteractive && 'hover:bg-black/8',
		'text-body-sm font-body font-semibold',
		COLOR_CLASSES[color],
		className,
	)

	if (href) {
		return (
			<a href={href} className={classes}>
				{label}
			</a>
		)
	}

	return <span className={classes}>{label}</span>
}
