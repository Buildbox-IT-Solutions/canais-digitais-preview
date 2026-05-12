import { twMerge } from '~/lib/tw-merge'
import { IconTile } from '~/components/icon-tile'
import type { IStatCardProps } from './types'

/**
 * Componente: Stat Card
 * Figma: 6186:4046
 * Icon-tile + valor grande (Aleo) + label.
 * Tokens: --color-primary-100, --color-primary-600, --color-secondary-950, --color-neutral-900,
 *         --color-white
 */
export function StatCard({ icon, label, value, href, className }: IStatCardProps) {
	const classes = twMerge(
		'group bg-white border border-primary-100 rounded-lg p-5 flex flex-col gap-3 hover:border-secondary-950 transition-colors',
		className,
	)

	const content = (
		<>
			<div className="flex items-center gap-4">
				<IconTile icon={icon} tone="neutral" />
				<span className="font-display font-bold text-headline-lg text-primary-600 group-hover:text-secondary-950 transition-colors">
					{value}
				</span>
			</div>
			<span className="font-body font-semibold text-label-lg text-neutral-900">{label}</span>
		</>
	)

	if (href) {
		return (
			<a href={href} className={classes}>
				{content}
			</a>
		)
	}

	return <div className={classes}>{content}</div>
}
