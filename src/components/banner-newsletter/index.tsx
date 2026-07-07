/**
 * Componente: Banner Newsletter
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1188-11621
 * Variante implementada: "com photo" (Desktop/Mobile) — imagem 3:2 empilha acima do
 * texto no mobile, ao lado no desktop.
 * Tokens: --color-primary-100, --color-primary-600, --text-display-sm, --text-headline-sm,
 *         --text-body-lg
 */
import { twMerge } from '~/lib/tw-merge'
import type { IBannerNewsletterProps } from './types'

export function BannerNewsletter({ image, title, description, ctaLabel, ctaHref, className }: IBannerNewsletterProps) {
	return (
		<section className={twMerge('w-full py-10', className)}>
			<div className="max-w-screen-xl mx-auto px-4 lg:px-6">
				<div className="bg-primary-100 flex flex-col lg:flex-row items-center overflow-hidden rounded-sm w-full">
					<div className="aspect-[300/200] flex flex-col items-center justify-center overflow-hidden w-full lg:flex-1 lg:min-w-0 lg:self-stretch">
						<img src={image} alt="" className="w-full h-full object-cover" />
					</div>
					<div className="flex flex-col items-start justify-center w-full lg:flex-1 lg:min-w-[704px]">
						<div className="flex flex-col gap-4 items-start justify-center pb-4 pt-8 lg:pt-10 px-6 lg:px-10 text-primary-600 w-full">
							<p className="font-display font-bold text-headline-sm lg:text-display-sm lg:leading-[44px] w-full">{title}</p>
							<p className="font-body text-body-lg w-full">{description}</p>
						</div>
						<div className="flex flex-col h-24 items-start pb-8 lg:pb-10 pt-4 px-6 lg:px-10 w-full">
							<a
								href={ctaHref}
								className="bg-primary-600 inline-flex items-center justify-center px-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg w-full lg:w-auto"
							>
								{ctaLabel}
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
