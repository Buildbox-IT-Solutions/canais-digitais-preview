import { AdFrame } from '~/components/ad-frame'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { Icon } from '~/components/icon'
import { Thumbnail } from '~/components/thumbnail'
import { CATEGORIA_FEATURED, CATEGORIA_LIST, picsumSrc } from '~/mocks/articles'

/**
 * Tela: Categoria — Página de listagem por editoria
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=5433-16684
 */
export default function CategoriaScreen() {
	const [hero, ...featured] = CATEGORIA_FEATURED

	return (
		<main className="bg-white">
			<HeaderDesktop activeCategory="embalagens" />

			{/* §2 — Category hero (cor da editoria — mint = Embalagens) */}
			<section className="bg-mint flex flex-col items-center py-16 w-full">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 w-full">
					<h1 className="font-display font-bold text-display-md text-white">Embalagens</h1>
				</div>
			</section>

			{/* §3 — Ad 970×90 */}
			<section className="flex flex-col items-center py-6 w-full">
				<AdFrame width={970} height={90} />
			</section>

			{/* §4 — Featured: 1 Large V + 2×2 grid */}
			<section className="w-full">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 flex gap-6 items-start">
					{/* Large V */}
					<article className="group flex flex-col gap-3 shrink-0 w-[600px]">
						<Thumbnail
							src={picsumSrc(hero.seed, 1200, 800)}
							alt="Capa"
							href="/conteudo"
							ratio="photo"
						/>
						<div className="flex flex-col gap-2">
							<h2 className="text-headline-md font-display font-bold text-primary-600">
								<a
									href="/conteudo"
									className="group-hover:text-secondary-950 transition-colors"
								>
									{hero.title}
								</a>
							</h2>
							<p className="text-body-lg font-body text-neutral-900">{hero.lead}</p>
						</div>
					</article>

					{/* 2×2 grid */}
					<div className="flex flex-col gap-6 flex-1 min-w-0">
						<div className="flex gap-6">
							{featured.slice(0, 2).map((article) => (
								<article
									key={article.id}
									className="group flex flex-col gap-3 flex-1 min-w-[288px]"
								>
									<Thumbnail
										src={picsumSrc(article.seed, 600, 338)}
										alt="Capa"
										href="/conteudo"
										ratio="video"
									/>
									<div className="flex flex-col gap-2">
										<h3 className="text-title-lg font-display font-bold text-primary-600 leading-tight">
											<a
												href="/conteudo"
												className="group-hover:text-secondary-950 transition-colors"
											>
												{article.title}
											</a>
										</h3>
									</div>
								</article>
							))}
						</div>
						<div className="flex gap-6">
							{featured.slice(2, 3).map((article) => (
								<article
									key={article.id}
									className="group flex flex-col gap-3 flex-1 min-w-[288px]"
								>
									<Thumbnail
										src={picsumSrc(article.seed, 600, 338)}
										alt="Capa"
										href="/conteudo"
										ratio="video"
									/>
									<div className="flex flex-col gap-2">
										<h3 className="text-title-lg font-display font-bold text-primary-600 leading-tight">
											<a
												href="/conteudo"
												className="group-hover:text-secondary-950 transition-colors"
											>
												{article.title}
											</a>
										</h3>
									</div>
								</article>
							))}
							<div className="flex flex-col items-center flex-1 min-w-[288px]">
								<AdFrame width={300} height={250} />
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* §5 — Ad 970×90 */}
			<section className="flex flex-col items-center py-6 w-full">
				<AdFrame width={970} height={90} />
			</section>

			{/* §6 — Article list + sidebar */}
			<section className="w-full">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 flex gap-10 items-start justify-center">
					{/* Left — Article list */}
					<div className="flex flex-col gap-10 flex-1 max-w-[912px]">
						{CATEGORIA_LIST.map((article) => (
							<article key={article.id} className="group flex flex-row gap-4 items-center w-full">
								<div className="flex-1 min-w-[288px] max-w-[392px]">
									<Thumbnail
										src={picsumSrc(article.seed, 784, 441)}
										alt="Capa"
										href="/conteudo"
										ratio="video"
									/>
								</div>
								<div className="flex flex-col gap-2 flex-1 min-w-0 justify-center">
									<h3 className="text-title-xl font-display font-bold text-primary-600">
										<a
											href="/conteudo"
											className="group-hover:text-secondary-950 transition-colors"
										>
											{article.title}
										</a>
									</h3>
									<p className="text-body-md font-body text-neutral-900">{article.lead}</p>
								</div>
							</article>
						))}

						{/* Pagination */}
						<nav
							className="flex items-center justify-center p-4 w-full"
							aria-label="Paginação"
						>
							<button
								type="button"
								aria-label="Página anterior"
								className="inline-flex items-center justify-center p-2 rounded-full text-neutral-300 cursor-not-allowed"
							>
								<Icon name="chevron-left" className="size-6" />
							</button>
							<span className="inline-flex items-center justify-center size-10 rounded-full border border-primary-600 font-body font-bold text-label-lg text-primary-600">
								1
							</span>
							{[2, 3, 4].map((n) => (
								<a
									key={n}
									href="/categoria"
									className="inline-flex items-center justify-center size-10 rounded-full font-body font-bold text-label-lg text-neutral-900 hover:bg-neutral-50 transition-colors"
								>
									{n}
								</a>
							))}
							<span className="inline-flex items-center justify-center size-10 font-body font-bold text-label-lg text-neutral-900">
								...
							</span>
							<a
								href="/categoria"
								className="inline-flex items-center justify-center size-10 rounded-full font-body font-bold text-label-lg text-neutral-900 hover:bg-neutral-50 transition-colors"
							>
								99
							</a>
							<a
								href="/categoria"
								aria-label="Próxima página"
								className="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors"
							>
								<Icon name="chevron-right" className="size-6" />
							</a>
						</nav>
					</div>

					{/* Right — Sidebar Ads */}
					<div className="flex flex-col gap-2 items-center shrink-0">
						<div className="bg-white p-4">
							<AdFrame width={300} height={250} />
						</div>
						<div className="bg-white p-4">
							<AdFrame width={300} height={250} />
						</div>
					</div>
				</div>
			</section>

			{/* §7 — Ad 970×90 */}
			<section className="flex flex-col items-center py-6 w-full">
				<AdFrame width={970} height={90} />
			</section>

			<FooterDesktop />
		</main>
	)
}
