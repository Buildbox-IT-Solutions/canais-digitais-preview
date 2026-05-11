import { twMerge } from 'tailwind-merge'
import type { IImageProps, ImageRatio } from './types'

/**
 * Componente: Image
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=30-3878
 * Variantes: 9 aspect ratios (5 landscape + 4 portrait)
 * Tokens: --color-neutral-100
 */

const RATIO_CLASSES: Record<ImageRatio, string> = {
	square: 'aspect-square',
	'4-3': 'aspect-[4/3]',
	'3-2': 'aspect-[3/2]',
	video: 'aspect-video',
	'21-9': 'aspect-[21/9]',
	'3-4': 'aspect-[3/4]',
	'2-3': 'aspect-[2/3]',
	'9-16': 'aspect-[9/16]',
	'9-21': 'aspect-[9/21]',
}

export function Image({ src, alt, ratio = 'video', className }: IImageProps) {
	return (
		<div
			className={twMerge(
				'rounded-sm bg-neutral-100 overflow-hidden',
				RATIO_CLASSES[ratio],
				className,
			)}
		>
			<img src={src} alt={alt} className="w-full h-full object-cover" />
		</div>
	)
}
