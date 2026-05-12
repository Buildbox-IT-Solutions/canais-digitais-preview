import { twMerge } from '~/lib/tw-merge'
import type { IAvatarProps } from './types'

/**
 * Componente: Avatar
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=751-3445
 * Variantes: rounded | squared (com state-layer no hover)
 * Tokens: --color-neutral-100, --color-white
 */
export function Avatar({ src, alt, shape = 'rounded', className }: IAvatarProps) {
	const shapeClass = shape === 'rounded' ? 'rounded-full' : 'rounded-sm'

	return (
		<div className={twMerge('group relative inline-block shrink-0 size-20', className)}>
			<img
				src={src}
				alt={alt}
				className={twMerge('block w-full h-full object-cover bg-neutral-100', shapeClass)}
			/>
			<div
				className={twMerge(
					'absolute inset-0 bg-white/0 group-hover:bg-white/25 transition-colors',
					shapeClass,
				)}
				aria-hidden="true"
			/>
		</div>
	)
}
