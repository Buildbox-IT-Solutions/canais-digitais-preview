import { twMerge } from '~/lib/tw-merge'
import { Button } from '~/components/button'
import { Icon } from '~/components/icon'
import type { IComingSoonProps } from './types'

/**
 * Componente: Coming Soon — empty state "Em breve"
 * Tokens: --color-primary-600, --color-coral, --color-neutral-50, --color-neutral-700, --color-white
 */
export function ComingSoon({
	chip,
	icon = 'book',
	title = 'Em breve',
	description = '',
	ctaLabel = 'Avisar quando lançar',
	ctaHref = '#',
	className,
}: IComingSoonProps) {
	return (
		<div
			className={twMerge(
				'flex flex-col items-center justify-center gap-6 max-w-xl mx-auto py-20 px-4 text-center',
				className,
			)}
		>
			{chip ? (
				<span className="inline-flex items-center gap-1.5 rounded-xs bg-primary-600 text-white px-2 py-1 font-body font-bold text-label-sm uppercase tracking-wider">
					{chip}
				</span>
			) : null}

			<span className="inline-flex items-center justify-center size-24 rounded-full bg-neutral-50 text-primary-600">
				<Icon name={icon} className="size-12" />
			</span>

			<h2 className="font-display font-bold text-headline-lg text-primary-600">
				{title}
				<span className="text-coral">.</span>
			</h2>

			<p className="font-body text-body-lg text-neutral-700 max-w-md">{description}</p>

			<div className="pt-2">
				<Button label={ctaLabel} href={ctaHref} type="outlined" size="medium" icon="arrow-right" />
			</div>
		</div>
	)
}
