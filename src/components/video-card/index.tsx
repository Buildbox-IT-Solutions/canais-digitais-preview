/**
 * Componente: Video Card 2.0 / Inverse
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=2803-26398
 * Variante dark (texto branco) do Video Card 2.0 — sem container proprio; a section pai
 * (sempre fundo escuro) define o background.
 * Sizes: lg = headline-md 28 / body-lg lead, vertical (hero desktop) · sm = title-lg 18 /
 * body-md lead, vertical (mobile, node 3035:35926) · xs = title-md 16, sem lead,
 * horizontal w-160 fixo (lista compacta desktop).
 * Tokens: --color-white, --color-primary-100, --color-neutral-50, --text-headline-md,
 *         --text-title-lg, --text-title-md, --text-body-lg, --text-body-md
 */
import { twMerge } from '~/lib/tw-merge'
import { Categoria } from '~/components/categoria'
import { PlayButton } from '~/components/play-button'
import type { PlayButtonSize } from '~/components/play-button/types'
import { Thumbnail } from '~/components/thumbnail'
import type { IVideoCardProps, VideoCardSize } from './types'

const HEADLINE: Record<VideoCardSize, string> = {
	lg: 'text-headline-md',
	sm: 'text-title-lg',
	xs: 'text-title-md leading-tight',
}

const LEAD: Record<VideoCardSize, string | null> = {
	lg: 'text-body-lg',
	sm: 'text-body-md',
	xs: null,
}

const PLAY_SIZE: Record<VideoCardSize, PlayButtonSize> = {
	lg: 'small',
	sm: 'small',
	xs: 'xsmall',
}

export function VideoCard({
	title,
	image,
	href,
	size = 'lg',
	orientation = 'vertical',
	categoria,
	lead,
	className,
}: IVideoCardProps) {
	const headlineClass = HEADLINE[size]
	const leadClass = LEAD[size]

	const thumb = (
		<Thumbnail src={image} alt="Capa do vídeo" href={href} ratio="video" overlay={<PlayButton size={PLAY_SIZE[size]} as="div" />} />
	)

	const content = (
		<div className={twMerge('flex flex-col items-start', orientation === 'horizontal' ? 'gap-1 flex-1 min-w-0 justify-center' : 'gap-2')}>
			{categoria ? <Categoria {...categoria} chip /> : null}
			<h3 className={twMerge('font-display font-bold text-white group-hover:text-primary-100', headlineClass)}>
				<a href={href}>{title}</a>
			</h3>
			{lead && leadClass ? <p className={twMerge('font-body text-neutral-50', leadClass)}>{lead}</p> : null}
		</div>
	)

	if (orientation === 'horizontal') {
		return (
			<article className={twMerge('group flex flex-row gap-4 items-center w-full', className)}>
				<div className="shrink-0 w-[160px]">{thumb}</div>
				{content}
			</article>
		)
	}

	return (
		<article className={twMerge('group flex flex-col gap-3 w-full', className)}>
			{thumb}
			{content}
		</article>
	)
}
