/**
 * Componente: Banner Download
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=925-11171
 * Variantes: orientation (horizontal|vertical) × photo (ausente|presente) = 4
 * Tokens: --color-primary-600, --color-secondary-950, --color-primary-100,
 *         --text-title-xl, --text-headline-md, --text-headline-lg, --text-body-lg,
 *         rounded-sm
 */
import { Icon } from '~/components/icon'
import { twMerge } from '~/lib/tw-merge'
import type { IBannerDownloadProps } from './types'

export function BannerDownload({
	title,
	description,
	ctaLabel,
	ctaHref,
	ctaDownload,
	onCtaClick,
	onCtaDownload,
	orientation = 'horizontal',
	photoSrc,
	className,
}: IBannerDownloadProps) {
	const hasPhoto = Boolean(photoSrc)
	const isVertical = orientation === 'vertical'

	const titleClass = isVertical
		? 'text-title-xl leading-7'
		: hasPhoto
			? 'text-headline-md leading-9'
			: 'text-headline-lg leading-10'

	return (
		<div
			className={twMerge(
				'relative flex flex-col overflow-hidden rounded-sm w-full',
				isVertical ? 'max-w-[300px]' : 'lg:flex-row lg:items-stretch',
				hasPhoto ? 'bg-primary-100' : 'bg-gradient-to-b from-primary-600 to-secondary-950',
				className,
			)}
		>
			{hasPhoto ? (
				<div
					className={twMerge(
						'overflow-hidden shrink-0',
						isVertical ? 'aspect-[4/3] w-full' : 'aspect-square w-full lg:aspect-auto lg:w-2/5 lg:self-stretch',
					)}
				>
					<img src={photoSrc} alt="" className="w-full h-full object-cover" />
				</div>
			) : null}

			<div
				className={twMerge(
					'flex flex-1 flex-col items-start justify-center min-w-0',
					hasPhoto ? 'text-primary-600' : 'text-white',
				)}
			>
				<div className="flex flex-col gap-4 items-start justify-center pt-8 pb-4 px-6 lg:px-8 w-full">
					<p className={twMerge('font-display font-bold w-full', titleClass)}>{title}</p>
					<p className="font-body text-body-lg w-full">{description}</p>
				</div>
				<div className="flex flex-col items-start pt-4 pb-8 px-6 lg:px-8 w-full">
					<a
						href={ctaHref}
						download={ctaDownload}
						onClick={(e) => {
							// `onCtaClick` INTERCEPTA: cancela o clique e assume o fluxo (ex.: abrir o
							// modal de incentivo pra quem está deslogado). O href vira só fallback sem-JS.
							if (onCtaClick) {
								e.preventDefault()
								onCtaClick()
								return
							}
							// `onCtaDownload` ACOMPANHA: o download segue normalmente e o aviso vai
							// junto. Nunca dá preventDefault — isso mataria o download.
							onCtaDownload?.()
						}}
						className={twMerge(
							'inline-flex gap-3 items-center justify-center pl-5 pr-6 py-3 rounded-full transition-colors font-body font-bold text-body-lg',
							isVertical ? 'w-full' : 'w-fit',
							hasPhoto
								? 'bg-primary-600 text-white hover:bg-secondary-950'
								: 'bg-white text-primary-600 hover:bg-neutral-50',
						)}
					>
						<Icon name="download" className="size-6" />
						{ctaLabel}
					</a>
				</div>
			</div>

			{!hasPhoto ? (
				<div
					className="absolute bottom-0 right-0 size-[240px] opacity-20 pointer-events-none"
					aria-hidden="true"
				>
					<div className="w-full h-full rounded-full border-[3px] border-white/40" />
				</div>
			) : null}
		</div>
	)
}
