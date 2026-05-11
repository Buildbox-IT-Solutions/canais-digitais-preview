import { AdFrame } from '~/components/ad-frame'
import { Categoria } from '~/components/categoria'
import { Divider } from '~/components/divider'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { Icon } from '~/components/icon'
import { Thumbnail } from '~/components/thumbnail'
import { picsumSrc, SEARCH_RESULTS } from '~/mocks/articles'

const FILTERS = ['Categoria', 'Autor', 'Tipo']

/**
 * Tela: Busca — Página de resultados
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1785-17716
 */
export default function BuscarScreen() {
	return (
		<main className="bg-white">
			<HeaderDesktop />

			{/* §2 — Page title hero */}
			<section className="bg-primary-600 flex flex-col items-center py-16 w-full">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 w-full">
					<h1 className="font-display font-bold text-display-md text-white">Busca</h1>
				</div>
			</section>

			{/* §3 — Ad Frame */}
			<section className="flex flex-col items-center py-6 w-full">
				<AdFrame width={970} height={250} />
			</section>

			{/* §4 — Search results + sidebar */}
			<section className="w-full">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 flex gap-6 items-start justify-center py-10">
					<div className="flex flex-col gap-6 flex-1 max-w-[900px]">
						{/* Search bar */}
						<div className="flex flex-col gap-6 w-full">
							<div className="relative w-full">
								<div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-primary-600">
									<Icon name="search" className="size-6" />
								</div>
								<input
									type="search"
									defaultValue="sorvete"
									className="w-full h-10 pl-10 pr-10 rounded-full border border-neutral-100 bg-white text-body-lg font-body text-primary-600 placeholder:text-neutral-900 focus:outline-none focus:border-secondary-950 transition-colors"
								/>
								<button
									type="button"
									aria-label="Limpar busca"
									className="absolute inset-y-0 right-2 flex items-center justify-center p-2 text-neutral-900 hover:text-primary-600"
								>
									<Icon name="close" className="size-4" />
								</button>
							</div>

							{/* Filter chips */}
							<div className="flex flex-col gap-2 w-full">
								<p className="font-body font-bold text-label-lg text-primary-600">
									Refine sua busca
								</p>
								<div className="flex gap-2 items-center">
									{FILTERS.map((f) => (
										<button
											key={f}
											type="button"
											className="inline-flex h-8 items-center gap-2 pl-4 pr-2 rounded-full border border-neutral-100 font-body font-semibold text-label-lg text-neutral-950 hover:bg-neutral-50 transition-colors"
										>
											{f}
											<Icon name="chevron-down" className="size-4 text-neutral-950" />
										</button>
									))}
								</div>
							</div>

							<Divider />
						</div>

						{/* Results count + sort */}
						<div className="flex items-center justify-between w-full">
							<p className="font-body font-semibold text-label-lg text-neutral-900">
								128 resultados
							</p>
							<div className="flex items-center gap-2">
								<span className="font-body font-semibold text-label-lg text-neutral-900">
									Ordenar por:
								</span>
								<button
									type="button"
									className="inline-flex items-center gap-1 font-body font-bold text-label-lg text-primary-600"
								>
									Mais recentes
									<Icon name="arrow-drop-down" className="size-4" />
								</button>
							</div>
						</div>

						{/* Article list */}
						<div className="flex flex-col gap-10">
							{SEARCH_RESULTS.map((r) => (
								<article key={r.id} className="group flex flex-row gap-4 items-center w-full">
									<div className="flex-1 min-w-[288px] max-w-[392px]">
										<Thumbnail
											src={picsumSrc(r.seed, 784, 441)}
											alt="Capa"
											href="/conteudo"
											ratio="video"
										/>
									</div>
									<div className="flex flex-col gap-2 flex-1 min-w-0 justify-center">
										<Categoria
											color={r.categoryColor}
											label={r.category}
											href="/categoria"
										/>
										<h3 className="text-title-xl font-display font-bold text-primary-600">
											<a
												href="/conteudo"
												className="group-hover:text-secondary-950 transition-colors"
											>
												{r.title}
											</a>
										</h3>
										<p className="text-body-md font-body text-neutral-900">{r.lead}</p>
									</div>
								</article>
							))}
						</div>

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
									href="/buscar"
									className="inline-flex items-center justify-center size-10 rounded-full font-body font-bold text-label-lg text-neutral-900 hover:bg-neutral-50 transition-colors"
								>
									{n}
								</a>
							))}
							<span className="inline-flex items-center justify-center size-10 font-body font-bold text-label-lg text-neutral-900">
								...
							</span>
							<a
								href="/buscar"
								className="inline-flex items-center justify-center size-10 rounded-full font-body font-bold text-label-lg text-neutral-900 hover:bg-neutral-50 transition-colors"
							>
								16
							</a>
							<a
								href="/buscar"
								aria-label="Próxima página"
								className="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors"
							>
								<Icon name="chevron-right" className="size-6" />
							</a>
						</nav>
					</div>

					{/* Sidebar Ad */}
					<aside className="flex flex-col gap-4 items-center shrink-0">
						<div className="bg-white p-4">
							<AdFrame width={300} height={600} />
						</div>
					</aside>
				</div>
			</section>

			<FooterDesktop />
		</main>
	)
}
