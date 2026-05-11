import { twMerge } from 'tailwind-merge'
import type { IThumbnailProps, ThumbnailRatio } from './types'

/**
 * Componente: Thumbnail
 * Versão "card-ready" do Image: hover-zoom + overlay opcional (ex: play-button).
 * Tokens: --color-neutral-100
 *
 * Hover/zoom: aplica `group-hover:scale-105` na <img>. O wrapper externo (card)
 * precisa ter a classe `group` para acionar o zoom.
 */

const RATIO_CLASSES: Record<ThumbnailRatio, string> = {
	video: 'aspect-video',
	photo: 'aspect-[1.5]',
	square: 'aspect-square',
}

export function Thumbnail({
	src,
	alt,
	href,
	ratio = 'video',
	radius = true,
	overlay,
	className,
}: IThumbnailProps) {
	const wrapperClasses = twMerge(
		'relative block bg-neutral-100 overflow-hidden',
		RATIO_CLASSES[ratio],
		radius && 'rounded-sm',
		className,
	)

	const content = (
		<>
			<img
				src={src}
				alt={alt}
				className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
			/>
			{overlay ? (
				<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					{overlay}
				</div>
			) : null}
		</>
	)

	if (href) {
		return (
			<a href={href} className={wrapperClasses}>
				{content}
			</a>
		)
	}

	return <div className={wrapperClasses}>{content}</div>
}
