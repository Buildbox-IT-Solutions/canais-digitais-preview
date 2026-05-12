import { twMerge } from '~/lib/tw-merge'
import type { IDividerProps } from './types'

/**
 * Componente: Divider
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=56-6360
 * Variantes: horizontal | vertical
 * Tokens: --color-neutral-100
 */
export function Divider({ orientation = 'horizontal', className }: IDividerProps) {
	const orientationClasses = orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full'

	return (
		<div
			role="separator"
			aria-orientation={orientation}
			className={twMerge('bg-neutral-100', orientationClasses, className)}
		/>
	)
}
