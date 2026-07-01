/**
 * Componente: NewsCard
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1709-7090
 * Variantes: size (large|medium|small) × orientation (vertical|horizontal) · categoria/lead/author on-off
 * Tokens: --text-headline-md, --text-title-xl/lg/md, --text-body-lg/md, --color-primary-600, --color-neutral-900
 */
import { twMerge } from '~/lib/tw-merge'
import { Thumbnail } from '~/components/thumbnail'
import { Categoria } from '~/components/categoria'
import { Byline } from '~/components/byline'
import type { INewsCardProps, NewsCardSize } from './types'

const HEADLINE: Record<string, string> = {
	'large-vertical': 'text-headline-md',
	'medium-vertical': 'text-title-xl',
	'small-vertical': 'text-title-lg',
	'large-horizontal': 'text-title-xl',
	'medium-horizontal': 'text-title-lg',
	'small-horizontal': 'text-title-md',
}

const LEAD: Record<string, string | null> = {
	'large-vertical': 'text-body-lg',
	'medium-vertical': 'text-body-md',
	'small-vertical': 'text-body-md',
	'large-horizontal': 'text-body-md',
	'medium-horizontal': null,
	'small-horizontal': null,
}

const H_THUMB_WIDTH: Record<NewsCardSize, string> = {
	large: 'w-[240px]',
	medium: 'w-[180px]',
	small: 'w-[120px]',
}

export function NewsCard({
	title,
	image,
	href,
	size = 'large',
	orientation = 'vertical',
	categoria,
	lead,
	author,
	authorHref,
	mediaOverlay,
	className,
}: INewsCardProps) {
	const key = `${size}-${orientation}`
	const headlineClass = HEADLINE[key]
	const leadClass = LEAD[key]
	const bylineSize = size === 'small' ? 'sm' : 'md'

	const thumb = (
		<Thumbnail src={image} alt={title} href={href} ratio="video" overlay={mediaOverlay} />
	)

	const content = (
		<div className="flex flex-col gap-2 min-w-0 flex-1">
			{categoria ? <Categoria {...categoria} /> : null}
			<h3 className={twMerge('font-display font-bold text-primary-600', headlineClass)}>
				<a href={href} className="group-hover:underline">
					{title}
				</a>
			</h3>
			{lead && leadClass ? (
				<p className={twMerge('font-body text-neutral-900', leadClass)}>{lead}</p>
			) : null}
			{author ? <Byline author={author} href={authorHref} size={bylineSize} /> : null}
		</div>
	)

	if (orientation === 'horizontal') {
		return (
			<article className={twMerge('group flex flex-row items-center gap-4 w-full', className)}>
				<div className={twMerge('shrink-0', H_THUMB_WIDTH[size])}>{thumb}</div>
				{content}
			</article>
		)
	}

	return (
		<article className={twMerge('group flex flex-col gap-3', className)}>
			{thumb}
			{content}
		</article>
	)
}
