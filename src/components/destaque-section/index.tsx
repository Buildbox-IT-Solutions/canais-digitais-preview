/**
 * Componente: DestaqueSection
 * Figma Desktop: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=973-6474
 * Figma Mobile:  https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=3035-24819
 * Mobile: pilha única reordenada (hero, top2, top3, patrocinado, bottom2, bottom3, ad,
 * text0-2) — ordem e conteúdo diferem do desktop, por isso duas árvores (lg:hidden /
 * hidden lg:flex) em vez de reflow por classe.
 * Tokens: --text-title-lg, --text-title-md, --text-body-md, --text-body-sm,
 *         --color-primary-600, --color-neutral-100
 */
import { twMerge } from '~/lib/tw-merge'
import { NewsCard } from '~/components/news-card'
import { Thumbnail } from '~/components/thumbnail'
import { Categoria } from '~/components/categoria'
import { SponsorLine } from '~/components/sponsor-line'
import { AdFrame } from '~/components/ad-frame'
import { picsumSrc } from '~/mocks/articles'
import type { IDestaqueSectionProps } from './types'

export function DestaqueSection({ hero, top2, top3, heroText, heroBottom, className }: IDestaqueSectionProps) {
	const [sponsored, bottom2, bottom3] = heroBottom

	return (
		<section className={twMerge('w-full', className)}>
			<div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-6">
				{/* Mobile (<lg): pilha única reordenada */}
				<div className="flex flex-col gap-8 lg:hidden">
					<article className="group flex flex-col gap-3">
						<Thumbnail src={picsumSrc(hero.seed, 600, 338)} alt="Capa" href="/conteudo" ratio="video" />
						<div className="flex flex-col gap-2">
							<Categoria color={hero.categoryColor} label={hero.category} href="/categoria" />
							<h3 className="text-title-lg font-display font-bold text-primary-600 leading-tight">
								<a href="/conteudo" className="group-hover:text-secondary-950 transition-colors">
									{hero.title}
								</a>
							</h3>
							{hero.lead ? <p className="text-body-md font-body text-neutral-900">{hero.lead}</p> : null}
						</div>
					</article>

					{[top2, top3].map((article) => (
						<article key={article.id} className="group flex flex-col gap-3">
							<Thumbnail src={picsumSrc(article.seed, 600, 338)} alt="Capa" href="/conteudo" ratio="video" />
							<div className="flex flex-col gap-2">
								<Categoria color={article.categoryColor} label={article.category} href="/categoria" />
								<h3 className="text-title-lg font-display font-bold text-primary-600 leading-tight">
									<a href="/conteudo" className="group-hover:text-secondary-950 transition-colors">
										{article.title}
									</a>
								</h3>
							</div>
						</article>
					))}

					<article className="group bg-white border border-neutral-100 hover:border-secondary-950 transition-colors flex flex-col rounded-sm overflow-hidden w-full">
						<Thumbnail src={picsumSrc(sponsored.seed, 600, 338)} alt="Capa" href="/conteudo" ratio="video" radius={false} />
						<div className="flex flex-col gap-2 px-4 py-3">
							<Categoria color={sponsored.categoryColor} label={sponsored.category} href="/categoria" />
							<h3 className="text-title-lg font-display font-bold text-primary-600 leading-tight">
								<a href="/conteudo" className="group-hover:text-secondary-950 transition-colors">
									{sponsored.title}
								</a>
							</h3>
							<SponsorLine company="Company Name" href="#" />
						</div>
					</article>

					{[bottom2, bottom3].map((article) => (
						<article key={article.id} className="group flex flex-col gap-3">
							<Thumbnail src={picsumSrc(article.seed, 600, 338)} alt="Capa" href="/conteudo" ratio="video" />
							<div className="flex flex-col gap-2">
								<Categoria color={article.categoryColor} label={article.category} href="/categoria" />
								<h3 className="text-title-lg font-display font-bold text-primary-600 leading-tight">
									<a href="/conteudo" className="group-hover:text-secondary-950 transition-colors">
										{article.title}
									</a>
								</h3>
							</div>
						</article>
					))}

					<div className="flex items-center justify-center">
						<AdFrame width={300} height={250} />
					</div>

					{heroText.map((article) => (
						<article key={article.id} className="group flex flex-col gap-2">
							<Categoria color={article.categoryColor} label={article.category} href="/categoria" />
							<h3 className="text-title-lg font-display font-bold text-primary-600 leading-tight">
								<a href="/conteudo" className="group-hover:text-secondary-950 transition-colors">
									{article.title}
								</a>
							</h3>
							<p className="text-body-md font-body text-neutral-900">{article.lead}</p>
						</article>
					))}
				</div>

				{/* Desktop (>=lg): JSX original, inalterado */}
				<div className="hidden lg:flex lg:flex-col lg:gap-8">
					<div className="grid grid-cols-[600px_1fr_1fr] gap-6">
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

						<div className="flex flex-col gap-8">
							{[top2, top3].map((article) => (
								<article key={article.id} className="group flex flex-col gap-3">
									<Thumbnail src={picsumSrc(article.seed, 600, 338)} alt="Capa" href="/conteudo" ratio="video" />
									<div className="flex flex-col gap-1">
										<Categoria color={article.categoryColor} label={article.category} href="/categoria" />
										<h3 className="text-title-md font-display font-bold text-primary-600 leading-tight">
											<a href="/conteudo" className="group-hover:text-secondary-950 transition-colors">
												{article.title}
											</a>
										</h3>
									</div>
								</article>
							))}
						</div>

						<div className="flex flex-col gap-6">
							{heroText.map((article) => (
								<article key={article.id} className="group flex flex-col gap-1">
									<Categoria color={article.categoryColor} label={article.category} href="/categoria" />
									<h3 className="text-title-md font-display font-bold text-primary-600 leading-tight">
										<a href="/conteudo" className="group-hover:text-secondary-950 transition-colors">
											{article.title}
										</a>
									</h3>
									<p className="text-body-sm font-body text-neutral-900">{article.lead}</p>
								</article>
							))}
						</div>
					</div>

					<div className="grid grid-cols-4 gap-6">
						{heroBottom.map((article) => (
							<article key={article.id} className="group flex flex-col gap-3">
								<Thumbnail src={picsumSrc(article.seed, 600, 338)} alt="Capa" href="/conteudo" ratio="video" />
								<div className="flex flex-col gap-1">
									<Categoria color={article.categoryColor} label={article.category} href="/categoria" />
									<h3 className="text-title-md font-display font-bold text-primary-600 leading-tight">
										<a href="/conteudo" className="group-hover:text-secondary-950 transition-colors">
											{article.title}
										</a>
									</h3>
								</div>
							</article>
						))}
						<div className="border border-primary-100 bg-neutral-50 flex items-center justify-center rounded-sm aspect-[300/250]">
							<span className="font-body font-bold text-label-md text-neutral-700">300 × 250</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
