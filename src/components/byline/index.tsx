import { twMerge } from 'tailwind-merge'
import type { BylineSize, IBylineProps } from './types'

/**
 * Componente: Byline — "Por Author Name"
 * Usado em cards (News, Video, Podcast). md em cards Large/Medium, sm em Small/XSmall.
 * Tokens: --color-neutral-900, --color-neutral-950
 */

const SIZE_CLASSES: Record<BylineSize, string> = {
	md: 'text-body-md',
	sm: 'text-body-sm',
}

export function Byline({ author, href, size = 'md', className }: IBylineProps) {
	return (
		<p
			className={twMerge(
				'font-body font-semibold text-neutral-900',
				SIZE_CLASSES[size],
				className,
			)}
		>
			Por{' '}
			{href ? (
				<a href={href} className="text-neutral-950 font-bold hover:underline">
					{author}
				</a>
			) : (
				<span className="text-neutral-950 font-bold">{author}</span>
			)}
		</p>
	)
}
