import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IRecentNewsItemProps } from './types'

/**
 * Componente: Recent News Item
 * Figma: 6045:6047
 * Linha "Últimas leituras" — categoria + título + meta + chevron.
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-100, --color-neutral-600,
 *         --color-neutral-950
 */
export function RecentNewsItem({
	category,
	title,
	when,
	href = '#',
	isLast = false,
	className,
}: IRecentNewsItemProps) {
	return (
		<a href={href} className={twMerge('flex flex-col px-1 group', className)}>
			<div className="flex items-center justify-between py-4 gap-4">
				<div className="flex-1 min-w-0 flex flex-col gap-1">
					<p className="font-body font-semibold text-label-md tracking-wider text-neutral-950">
						{category}
					</p>
					<p className="font-display font-bold text-title-lg text-primary-600 line-clamp-2 max-w-[75ch] group-hover:text-secondary-950 transition-colors">
						{title}
					</p>
					<div className="flex items-center gap-1.5 font-body text-body-md text-neutral-600">
						<span>{when}</span>
					</div>
				</div>
				<Icon name="open-in-new" className="size-6 text-neutral-950 shrink-0" />
			</div>
			{!isLast ? <div className="h-px bg-neutral-100 w-full" /> : null}
		</a>
	)
}
