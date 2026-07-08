/**
 * Componente: Widget / Podcast
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3074-48896
 * Mobile: w-full (sem largura fixa). Desktop: w-[496px], shrink-0.
 * Tokens: --color-neutral-50, --color-primary-600, --text-title-xl
 */
import { twMerge } from '~/lib/tw-merge'
import { Divider } from '~/components/divider'
import { Icon } from '~/components/icon'
import { PodcastCard } from '~/components/podcast-card'
import type { IWidgetPodcastProps } from './types'

export function WidgetPodcast({ items, allEpisodesHref = '/categoria', className }: IWidgetPodcastProps) {
	const [first, ...rest] = items

	return (
		<aside className={twMerge('bg-neutral-50 border border-neutral-100 flex flex-col items-start overflow-hidden pb-2 rounded-lg w-full lg:w-[496px] lg:shrink-0 lg:self-start', className)}>
			<div className="flex items-center p-6 w-full">
				<p className="flex-1 font-display font-bold text-title-xl text-primary-600 leading-7">Podcasts</p>
			</div>
			<div className="flex flex-col items-start w-full">
				{first ? (
					<div className="flex flex-col items-start justify-center overflow-hidden py-2 px-6 rounded-lg w-full">
						<PodcastCard category={first.category} title={first.title} image={first.image} sponsor={first.sponsor} sponsorHref={first.sponsorHref} />
					</div>
				) : null}
				{rest.map((pod) => (
					<PodcastCard key={pod.title} category={pod.category} title={pod.title} image={pod.image} />
				))}
			</div>
			<div className="flex flex-col items-start py-2 px-6 w-full">
				<Divider />
			</div>
			<div className="flex flex-col items-start p-2 w-full">
				<a
					href={allEpisodesHref}
					className="inline-flex gap-2 items-center justify-center px-5 pr-4 py-2 rounded-full text-primary-600 hover:bg-neutral-100 font-body font-bold text-body-lg"
				>
					Todos os episódios
					<Icon name="arrow-right" className="size-6" />
				</a>
			</div>
		</aside>
	)
}
