import { twMerge } from '~/lib/tw-merge'
import type { ITagProps } from './types'

/**
 * Componente: Tag
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=567-9604
 * Variantes: link (com href) | estático (span)
 * Tokens: --color-primary-100, --color-primary-800, --color-neutral-50, --color-secondary-950
 */

const TAG_CLASSES =
	'inline-flex items-center px-2 py-1 rounded-sm bg-primary-100 text-primary-800 hover:bg-neutral-50 hover:text-secondary-950 transition-colors font-body font-semibold text-title-sm'

export function Tag({ label, href, className }: ITagProps) {
	if (href) {
		return (
			<a href={href} className={twMerge(TAG_CLASSES, className)}>
				{label}
			</a>
		)
	}

	return <span className={twMerge(TAG_CLASSES, className)}>{label}</span>
}
