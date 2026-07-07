/**
 * Componente: ProteinaAnimalSection
 * Figma Desktop: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=973-6474
 * Figma Mobile:  https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3035-35314
 * Mobile: cabecalho padrao (SectionTitle/coral) + 4 cards empilhados, titulo text-title-lg.
 * Desktop: cabecalho bespoke centralizado + grid-cols-4, titulo text-title-md (inalterado).
 * Tokens: --color-coral, --text-title-lg, --text-title-md, --text-headline-md
 */
import { twMerge } from '~/lib/tw-merge'
import { SectionTitle } from '~/components/section-title'
import { Thumbnail } from '~/components/thumbnail'
import { picsumSrc } from '~/mocks/articles'
import type { IProteinaAnimalSectionProps } from './types'

export function ProteinaAnimalSection({ title = 'Proteína Animal', articles, className }: IProteinaAnimalSectionProps) {
	return (
		<section className={twMerge('w-full', className)}>
			<div className="lg:hidden">
				<SectionTitle label={title} color="coral" />
			</div>

			<div className="hidden lg:flex flex-col items-center pt-10 w-full">
				<div className="flex flex-col gap-2 items-start max-w-screen-xl mx-auto w-full px-4 lg:px-6">
					<div className="flex items-center w-full">
						<div className="flex-1 h-px bg-coral" />
					</div>
					<div className="flex h-[72px] items-center w-full">
						<h2 className="flex-1 text-center font-display font-bold text-headline-md text-coral">{title}</h2>
					</div>
				</div>
			</div>

			<div className="max-w-screen-xl mx-auto px-4 lg:px-6 mt-4 lg:mt-0 pb-6 lg:pb-0 flex flex-col gap-8 lg:grid lg:grid-cols-4 lg:gap-6">
				{articles.map((card) => (
					<article key={card.id} className="group flex flex-col gap-3">
						<Thumbnail src={picsumSrc(card.seed, 600, 338)} alt="Capa" href="/conteudo" ratio="video" />
						<div className="flex flex-col gap-1">
							<h3 className="text-title-lg lg:text-title-md font-display font-bold text-primary-600 leading-tight">
								<a href="/conteudo" className="group-hover:text-secondary-950 transition-colors">
									{card.title}
								</a>
							</h3>
						</div>
					</article>
				))}
			</div>
		</section>
	)
}
