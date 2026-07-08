/**
 * Componente: UltimaSecao (Home)
 * Figma Desktop: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=973-7005
 * Figma Mobile:  https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3046-37142
 * Mobile: pilha unica, SEM Categoria/Byline, titulo text-title-lg (18px), ordem
 * [0,1,3,2,ad] (diferente do desktop) — por isso duas arvores em vez de reflow por
 * classe, igual ao DestaqueSection.
 * Desktop: grid-cols-[600px_1fr] + sub-grid-cols-2, ordem [0,1,2,3,ad], inalterado.
 */
import { twMerge } from '~/lib/tw-merge'
import { Categoria } from '~/components/categoria'
import { NewsCard } from '~/components/news-card'
import { SectionTitle } from '~/components/section-title'
import { Thumbnail } from '~/components/thumbnail'
import { picsumSrc } from '~/mocks/articles'
import type { IUltimaSecaoProps } from './types'

export function UltimaSecao({ title, articles, className }: IUltimaSecaoProps) {
	const [hero, second, third, fourth] = articles

	return (
		<section className={twMerge('w-full', className)}>
			<SectionTitle label={title} color="primary-600" href="/categoria" />

			{/* Mobile (<lg): pilha unica, sem Categoria/Byline, ordem [0,1,3,2,ad] */}
			<div className="lg:hidden max-w-screen-xl mx-auto px-4 mt-4 pb-6 flex flex-col gap-8">
				{[hero, second, fourth, third].map((card) => (
					<article key={card.id} className="group flex flex-col gap-3">
						<Thumbnail src={picsumSrc(card.seed, 600, 338)} alt="Capa" href="/conteudo" ratio="video" />
						<div className="flex flex-col gap-2">
							<h3 className="text-title-lg font-display font-bold text-primary-600 leading-tight">
								<a href="/conteudo" className="group-hover:text-secondary-950 transition-colors">
									{card.title}
								</a>
							</h3>
							{card.id === hero.id && card.lead ? (
								<p className="text-body-md font-body text-neutral-900">{card.lead}</p>
							) : null}
						</div>
					</article>
				))}
				<div className="border border-primary-100 bg-neutral-50 flex items-center justify-center rounded-sm aspect-[300/250]">
					<span className="font-body font-bold text-label-md text-neutral-700">300 × 250</span>
				</div>
			</div>

			{/* Desktop (>=lg): JSX original, inalterado */}
			<div className="hidden lg:grid max-w-screen-xl mx-auto px-6 mt-6 grid-cols-[600px_1fr] gap-6">
				<NewsCard
					size="large"
					orientation="vertical"
					image={picsumSrc(hero.seed, 1200, 675)}
					href="/conteudo"
					title={hero.title}
					categoria={{ label: hero.category, color: hero.categoryColor, href: '/categoria' }}
					lead={hero.lead}
					author={hero.author}
					authorHref="/categoria"
				/>

				<div className="grid grid-cols-2 gap-6">
					{[second, third].map((card) => (
						<article key={card.id} className="group flex flex-col gap-3">
							<Thumbnail src={picsumSrc(card.seed, 600, 338)} alt="Capa" href="/conteudo" ratio="video" />
							<div className="flex flex-col gap-1">
								<Categoria color={card.categoryColor} label={card.category} href="/categoria" />
								<h3 className="text-title-md font-display font-bold text-primary-600 leading-tight">
									<a href="/conteudo" className="group-hover:text-secondary-950 transition-colors">
										{card.title}
									</a>
								</h3>
							</div>
						</article>
					))}
					<article className="group flex flex-col gap-3">
						<Thumbnail src={picsumSrc(fourth.seed, 600, 338)} alt="Capa" href="/conteudo" ratio="video" />
						<div className="flex flex-col gap-1">
							<h3 className="text-title-md font-display font-bold text-primary-600 leading-tight">
								<a href="/conteudo" className="group-hover:text-secondary-950 transition-colors">
									{fourth.title}
								</a>
							</h3>
						</div>
					</article>
					<div className="border border-primary-100 bg-neutral-50 flex items-center justify-center rounded-sm aspect-[300/250]">
						<span className="font-body font-bold text-label-md text-neutral-700">300 × 250</span>
					</div>
				</div>
			</div>
		</section>
	)
}
