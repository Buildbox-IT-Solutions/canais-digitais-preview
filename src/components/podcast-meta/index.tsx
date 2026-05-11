import { twMerge } from 'tailwind-merge'
import type { IPodcastMetaProps, PodcastMetaSize } from './types'

/**
 * Componente: Podcast Meta — "99h 99m • Por Author Name"
 * Linha de meta específica do Podcast Card.
 * Tokens: --color-neutral-900, --color-neutral-950
 */

const SIZE_CLASSES: Record<PodcastMetaSize, string> = {
	md: 'text-body-md',
	sm: 'text-body-sm',
}

export function PodcastMeta({ time, author, href, size = 'md', className }: IPodcastMetaProps) {
	return (
		<div
			className={twMerge(
				'flex items-center gap-2 font-body font-semibold text-neutral-900',
				SIZE_CLASSES[size],
				className,
			)}
		>
			<span>{time}</span>
			<span aria-hidden="true">•</span>
			<span>
				Por{' '}
				{href ? (
					<a href={href} className="text-neutral-950 font-bold hover:underline">
						{author}
					</a>
				) : (
					<span className="text-neutral-950 font-bold">{author}</span>
				)}
			</span>
		</div>
	)
}
