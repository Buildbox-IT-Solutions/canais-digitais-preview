/**
 * Componente: PodcastCard
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1709-7090
 * Variantes: default (linha) · sponsor (wrapper bordado + SponsorLine)
 * Tokens: --color-mint, --text-label-md, --text-title-md, --color-primary-600
 */
import { twMerge } from '~/lib/tw-merge'
import { Divider } from '~/components/divider'
import { SponsorLine } from '~/components/sponsor-line'
import type { IPodcastCardProps } from './types'

export function PodcastCard({
	category,
	title,
	image,
	sponsor,
	sponsorHref = '#',
	className,
}: IPodcastCardProps) {
	if (sponsor) {
		return (
			<div className={twMerge('bg-white border border-neutral-100 flex flex-col items-start rounded-lg w-full', className)}>
				<div className="group flex items-center p-3 w-full">
					<div className="rounded-sm overflow-hidden size-[104px] shrink-0">
						<img src={image} alt={`Capa ${title}`} className="w-full h-full object-cover" />
					</div>
					<div className="flex flex-1 flex-col gap-2 items-start min-w-0 px-4">
						<span className="font-body font-semibold text-label-md text-mint">{category}</span>
						<p className="font-display font-bold text-title-md text-primary-600 group-hover:text-secondary-950 transition-colors line-clamp-3 w-full">
							{title}
						</p>
					</div>
				</div>
				<Divider />
				<div className="px-4 py-3 w-full">
					<SponsorLine company={sponsor} href={sponsorHref} />
				</div>
			</div>
		)
	}

	return (
		<div className={twMerge('group flex gap-4 items-center py-3 px-6 w-full', className)}>
			<div className="rounded-sm overflow-hidden size-[104px] shrink-0">
				<img src={image} alt={`Capa ${title}`} className="w-full h-full object-cover" />
			</div>
			<div className="flex flex-1 flex-col gap-2 items-start min-w-0">
				<span className="font-body font-semibold text-label-md text-mint">{category}</span>
				<p className="font-display font-bold text-title-md text-primary-600 group-hover:text-secondary-950 transition-colors line-clamp-3 w-full">
					{title}
				</p>
			</div>
		</div>
	)
}
