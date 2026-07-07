/**
 * Componente: Download Section
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1135-18229
 * Variante implementada: Desktop·Left (w-600, alinhado à esquerda) / Mobile·Center
 * (max-w-704, centralizado). Hero CTA full-width com imagem de fundo + gradient +
 * container glassmorphism.
 * Tokens: --color-primary-600, --color-secondary-950, --text-display-sm,
 *         --text-headline-sm, --text-body-lg, --text-label-md
 */
import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IDownloadSectionProps } from './types'

export function DownloadSection({ eyebrow, title, description, ctaLabel, ctaHref, image, className }: IDownloadSectionProps) {
	return (
		<section className={twMerge('relative w-full h-[642px] lg:h-[460px] overflow-hidden', className)}>
			<img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
			<div className="absolute inset-0 bg-black/20" />
			<div className="relative h-full flex items-center justify-center lg:justify-start max-w-screen-xl mx-auto px-4 lg:px-6 py-8">
				<div className="bg-white/80 flex flex-col gap-4 lg:gap-6 items-start max-w-[704px] p-6 lg:p-8 rounded-sm w-full lg:w-[600px]">
					<span className="bg-white inline-flex items-center justify-center px-2 py-1 rounded-sm">
						<p className="font-body font-semibold text-label-md text-primary-600">{eyebrow}</p>
					</span>
					<div className="flex flex-col gap-2 items-start text-primary-600 w-full">
						<h2 className="font-display font-bold text-headline-sm lg:text-display-sm w-full">{title}</h2>
						<p className="font-body text-body-lg w-full">{description}</p>
					</div>
					<a
						href={ctaHref}
						className="bg-primary-600 inline-flex items-center justify-center gap-3 pl-5 pr-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg w-full lg:w-auto"
					>
						<Icon name="download" className="size-6" />
						{ctaLabel}
					</a>
				</div>
			</div>
		</section>
	)
}
