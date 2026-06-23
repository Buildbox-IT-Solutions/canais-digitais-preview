import { AdFrame } from '~/components/ad-frame'
import { Byline } from '~/components/byline'
import { Categoria } from '~/components/categoria'
import { Divider } from '~/components/divider'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { Icon } from '~/components/icon'
import { PlayButton } from '~/components/play-button'
import { SectionTitle } from '~/components/section-title'
import { SponsorLine } from '~/components/sponsor-line'
import { Thumbnail } from '~/components/thumbnail'
import {
	EM_ALTA,
	ESPECIALISTAS,
	FISPAL_LIST,
	FOOD_SERVICE_LIST,
	HOME_HERO,
	HOME_HERO_BOTTOM,
	HOME_HERO_TEXT,
	INGREDIENTES_LIST,
	LAST_SECTION,
	NEWS_PODCAST,
	PODCASTS,
	PROTEINA_ANIMAL,
	picsumSrc,
	VIDEOS_LIST,
	WEBSTORIES,
} from '~/mocks/articles'
import { sponsors } from '~/mocks/sponsors'

/**
 * Tela: Home v2 — Página inicial com faixa de patrocinadores
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=973-6474
 * 18 seções: hero · faixa patrocinadores · 3 colunas (Ingredientes/Food Service/Em Alta) · Proteína Animal ·
 * Download · Webstories · Vídeos · Fispal · Banner Newsletter · News+Podcasts · Especialistas · Última
 */
export default function HomeV2Screen() {
	const [hero, top2, top3] = HOME_HERO

	return (
		<main className="bg-white">
			<HeaderDesktop />

			{/* §1 — Ad Frame 1224×245 */}
			<section className="flex flex-col items-center py-6 w-full">
				<div className="flex items-center max-w-screen-xl mx-auto w-full px-4 lg:px-6">
					<div className="aspect-[1248/250] border border-primary-100 bg-neutral-50 flex flex-1 items-center justify-center">
						<span className="font-body font-bold text-label-md text-neutral-700">1224 × 245</span>
					</div>
				</div>
			</section>

			{/* §2 — Hero grid */}
			<section className="w-full">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-6 flex flex-col gap-8">
					<div className="grid grid-cols-[600px_1fr_1fr] gap-6">
						<article className="group flex flex-col gap-3">
							<Thumbnail
								src={picsumSrc(hero.seed, 1200, 675)}
								alt="Capa"
								href="/conteudo"
								ratio="video"
							/>
							<div className="flex flex-col gap-2">
								<Categoria color={hero.categoryColor} label={hero.category} href="/categoria" />
								<h3 className="text-headline-md font-display font-bold text-primary-600">
									<a
										href="/conteudo"
										className="group-hover:text-secondary-950 transition-colors"
									>
										{hero.title}
									</a>
								</h3>
								<p className="text-body-lg font-body text-neutral-900 group-hover:text-neutral-950 transition-colors">
									{hero.lead}
								</p>
								{hero.author ? <Byline author={hero.author} href="/categoria" /> : null}
							</div>
						</article>

						<div className="flex flex-col gap-8">
							{[top2, top3].map((article) => (
								<article key={article.id} className="group flex flex-col gap-3">
									<Thumbnail
										src={picsumSrc(article.seed, 600, 338)}
										alt="Capa"
										href="/conteudo"
										ratio="video"
									/>
									<div className="flex flex-col gap-1">
										<Categoria
											color={article.categoryColor}
											label={article.category}
											href="/categoria"
										/>
										<h3 className="text-title-md font-display font-bold text-primary-600 leading-tight">
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

						<div className="flex flex-col gap-6">
							{HOME_HERO_TEXT.map((article) => (
								<article key={article.id} className="group flex flex-col gap-1">
									<Categoria
										color={article.categoryColor}
										label={article.category}
										href="/categoria"
									/>
									<h3 className="text-title-md font-display font-bold text-primary-600 leading-tight">
										<a
											href="/conteudo"
											className="group-hover:text-secondary-950 transition-colors"
										>
											{article.title}
										</a>
									</h3>
									<p className="text-body-sm font-body text-neutral-900">{article.lead}</p>
								</article>
							))}
						</div>
					</div>

					<div className="grid grid-cols-4 gap-6">
						{HOME_HERO_BOTTOM.map((article) => (
							<article key={article.id} className="group flex flex-col gap-3">
								<Thumbnail
									src={picsumSrc(article.seed, 600, 338)}
									alt="Capa"
									href="/conteudo"
									ratio="video"
								/>
								<div className="flex flex-col gap-1">
									<Categoria
										color={article.categoryColor}
										label={article.category}
										href="/categoria"
									/>
									<h3 className="text-title-md font-display font-bold text-primary-600 leading-tight">
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
						<div className="border border-primary-100 bg-neutral-50 flex items-center justify-center rounded-sm aspect-[300/250]">
							<span className="font-body font-bold text-label-md text-neutral-700">300 × 250</span>
						</div>
					</div>
				</div>
			</section>

			{/* ─── Faixa de Patrocinadores ─── */}
			<section className="border-y border-neutral-200 bg-neutral-50 py-4">
				<div className="mx-auto max-w-screen-xl px-4 lg:px-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
						<span className="shrink-0 font-body text-label-sm font-semibold uppercase tracking-wider text-neutral-500">
							Patrocinadores
						</span>
						<div className="flex flex-wrap items-center gap-4 md:gap-6">
							{sponsors.map((sponsor) => (
								<a
									key={sponsor.id}
									href={`/patrocinador?id=${sponsor.id}`}
									title={sponsor.name}
									className="group flex items-center rounded-sm p-2 transition-opacity hover:opacity-80"
								>
									<img
										src={sponsor.logoSrc}
										alt={sponsor.name}
										className="h-8 max-w-[120px] object-contain grayscale group-hover:grayscale-0"
									/>
								</a>
							))}
						</div>
						<a
							href="/patrocinadores"
							className="shrink-0 font-body text-label-sm font-semibold text-primary-600 hover:text-primary-700 md:ml-auto"
						>
							Ver todos →
						</a>
					</div>
				</div>
			</section>

			{/* §3 — 3 colunas: Ingredientes · Food Service · Em Alta */}
			<section className="w-full">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 grid grid-cols-3 gap-6">
					<CategoryColumn
						color="mint"
						label="Ingredientes"
						boxedTitle="Suplemento em gomas: a doce revolução que está transformando o mercado de nutrição"
						boxedSeed="ing-boxed"
						list={INGREDIENTES_LIST}
					/>

					<CategoryColumn
						color="primary-600"
						label="Food Service"
						boxedTitle="Análise essencial: saiba como as crises internacionais impactam a indústria de alimentos"
						boxedSeed="fs-boxed"
						list={FOOD_SERVICE_LIST}
					/>

					<div className="flex flex-col gap-6 pt-10">
						<aside className="bg-neutral-50 border border-neutral-100 flex flex-col items-start overflow-hidden pb-4 rounded-lg w-full">
							<div className="flex items-center p-6 w-full">
								<p className="flex-1 font-display font-bold text-title-xl text-primary-600 leading-7">
									Em Alta
								</p>
							</div>
							<div className="flex flex-col items-start w-full">
								{EM_ALTA.map((title, i) => (
									<div
										key={title}
										className="flex flex-col gap-4 items-start py-2 px-6 w-full"
									>
										<div className="group flex font-display font-bold gap-4 items-start w-full">
											<p className="text-display-sm text-neutral-900 whitespace-nowrap leading-[44px]">
												{i + 1}
											</p>
											<p className="flex-1 font-display font-bold text-title-lg text-primary-600 group-hover:text-secondary-950 transition-colors leading-6">
												{title}
											</p>
										</div>
										{i < EM_ALTA.length - 1 ? <Divider /> : null}
									</div>
								))}
							</div>
						</aside>
						<div className="border border-primary-100 bg-neutral-50 flex items-center justify-center rounded-sm h-[282px] w-full">
							<span className="font-body font-bold text-label-md text-neutral-700">300 × 250</span>
						</div>
					</div>
				</div>
			</section>

			{/* §4 — Proteína Animal */}
			<section className="w-full">
				<div className="flex flex-col items-center pt-10 w-full">
					<div className="flex flex-col gap-2 items-start max-w-screen-xl mx-auto w-full px-4 lg:px-6">
						<div className="flex items-center w-full">
							<div className="flex-1 h-px bg-coral" />
						</div>
						<div className="flex h-[72px] items-center w-full">
							<h2 className="flex-1 text-center font-display font-bold text-headline-md text-coral">
								Proteína Animal
							</h2>
						</div>
					</div>
				</div>
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 grid grid-cols-4 gap-6">
					{PROTEINA_ANIMAL.map((card) => (
						<article key={card.id} className="group flex flex-col gap-3">
							<Thumbnail
								src={picsumSrc(card.seed, 600, 338)}
								alt="Capa"
								href="/conteudo"
								ratio="video"
							/>
							<div className="flex flex-col gap-1">
								<h3 className="text-title-md font-display font-bold text-primary-600 leading-tight">
									<a
										href="/conteudo"
										className="group-hover:text-secondary-950 transition-colors"
									>
										{card.title}
									</a>
								</h3>
							</div>
						</article>
					))}
				</div>
			</section>

			{/* §5 — Download Section */}
			<section className="relative w-full h-[460px] overflow-hidden mt-10">
				<img
					src={picsumSrc('download-bg', 1920, 460)}
					alt=""
					className="absolute inset-0 w-full h-full object-cover"
					aria-hidden="true"
				/>
				<div className="absolute inset-0 bg-black/20" />
				<div className="relative h-full flex items-center max-w-screen-xl mx-auto px-4 lg:px-6 py-8">
					<div className="bg-white/80 flex flex-col gap-6 items-start max-w-[704px] p-8 rounded-sm w-[600px]">
						<span className="bg-white inline-flex items-center justify-center px-2 py-1 rounded-sm">
							<p className="font-body font-semibold text-label-md text-primary-600">
								E-book gratuito
							</p>
						</span>
						<div className="flex flex-col gap-2 items-start text-primary-600 w-full">
							<h2 className="font-display font-bold text-display-sm w-full">
								Como a rastreabilidade reduz custos e aumenta a margem de lucro
							</h2>
							<p className="font-body text-body-lg w-full">
								Saiba como a cadeia de produção está sendo otimizada até o atacarejo com
								rastreabilidade e as tecnologias envolvidas nesse processo.
							</p>
						</div>
						<a
							href="/form-download"
							className="bg-primary-600 inline-flex items-center justify-center gap-3 pl-5 pr-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg"
						>
							<Icon name="download" className="size-6" />
							Baixar agora
						</a>
					</div>
				</div>
			</section>

			{/* §6 — Ad 970×90 */}
			<section className="flex flex-col items-center py-10 w-full">
				<AdFrame width={970} height={90} />
			</section>

			{/* §7 — Webstories */}
			<section className="w-full">
				<SectionTitle label="Webstories" color="primary-600" href="/categoria" />
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 mt-6 flex gap-6 overflow-x-auto pb-2">
					{WEBSTORIES.map((ws) => (
						<a
							key={ws.seed}
							href="/conteudo"
							className="group shrink-0 w-[288px] aspect-[320/569] relative rounded-sm overflow-hidden"
						>
							<img
								src={picsumSrc(ws.seed, 640, 1138)}
								alt="Story"
								className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
							/>
							<div className="absolute inset-0 flex flex-col justify-between">
								<div className="flex flex-col items-start p-5">
									<Categoria color={ws.color} label={ws.label} chip />
								</div>
								<div className="bg-primary-600/70 group-hover:bg-gradient-to-b group-hover:from-primary-600/0 group-hover:via-primary-600/70 group-hover:to-primary-600 flex flex-col gap-2 items-start px-5 py-4 w-full">
									<h3 className="font-display font-bold text-title-md text-white w-full">
										{ws.title}
									</h3>
								</div>
							</div>
						</a>
					))}
				</div>
			</section>

			{/* §8 — Vídeos (bg escuro) */}
			<section className="w-full bg-primary-600 mt-6">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-10">
					<div className="w-full space-y-2 mb-6">
						<div className="flex items-center gap-1 h-1.5 text-white">
							<div className="flex items-center gap-1">
								<span className="block size-[5px] rounded-full bg-current" />
								<span className="block size-[5px] rounded-full bg-current opacity-40" />
								<span className="block size-[5px] rounded-full bg-current opacity-40" />
							</div>
							<div className="flex-1 h-px bg-current" />
						</div>
						<h2 className="text-headline-md font-display font-bold text-white">Vídeos</h2>
					</div>

					<div className="grid grid-cols-2 gap-6">
						<article className="group flex flex-col gap-3">
							<Thumbnail
								src={picsumSrc('vid-hero', 1200, 675)}
								alt="Capa do vídeo"
								href="/conteudo"
								ratio="video"
								overlay={<PlayButton size="small" as="div" />}
							/>
							<div className="flex flex-col gap-2 items-start">
								<Categoria color="mint" label="Categoria" chip href="/categoria" />
								<h3 className="text-headline-md font-display font-bold text-white group-hover:text-primary-100">
									<a href="/conteudo">
										Como fazer um plano de logística integrada na indústria de alimentos
									</a>
								</h3>
								<p className="text-body-lg font-body text-neutral-50">
									Entenda os métodos da logística de alimentos com planejamento, análise,
									integração de sistemas e ações de contingência.
								</p>
							</div>
						</article>

						<div className="flex flex-col gap-6">
							{VIDEOS_LIST.map((vid) => (
								<article
									key={vid.id}
									className="group flex flex-row gap-4 items-center w-full"
								>
									<div className="shrink-0 w-[160px]">
										<Thumbnail
											src={picsumSrc(vid.seed, 320, 180)}
											alt="Capa do vídeo"
											href="/conteudo"
											ratio="video"
											overlay={<PlayButton size="xsmall" as="div" />}
										/>
									</div>
									<div className="flex flex-col gap-1 flex-1 min-w-0 justify-center items-start">
										<Categoria color="mint" label={vid.category} chip href="/categoria" />
										<h3 className="text-title-md font-display font-bold text-white group-hover:text-primary-100 leading-tight">
											<a href="/conteudo">{vid.title}</a>
										</h3>
									</div>
								</article>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* §9 — Fispal Tecnologia */}
			<section className="w-full">
				<SectionTitle label="Fispal Tecnologia" color="primary-600" href="/categoria" />
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 mt-6 grid grid-cols-3 gap-6">
					{FISPAL_LIST.map((card) => (
						<article key={card.id} className="group flex flex-col gap-3">
							<Thumbnail
								src={picsumSrc(card.seed, 800, 450)}
								alt="Capa"
								href="/conteudo"
								ratio="video"
							/>
							<div className="flex flex-col gap-2">
								<Categoria color={card.categoryColor} label={card.category} href="/categoria" />
								<h3 className="text-title-xl font-display font-bold text-primary-600">
									<a
										href="/conteudo"
										className="group-hover:text-secondary-950 transition-colors"
									>
										{card.title}
									</a>
								</h3>
								<p className="text-body-md font-body text-neutral-900 group-hover:text-neutral-950 transition-colors">
									{card.lead}
								</p>
								{card.author ? <Byline author={card.author} href="/categoria" /> : null}
							</div>
						</article>
					))}
				</div>
			</section>

			{/* §10 — Banner Newsletter */}
			<section className="w-full py-10">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6">
					<div className="bg-primary-100 flex items-center overflow-hidden rounded-sm w-full">
						<div className="aspect-[300/200] flex flex-col items-center justify-center overflow-hidden flex-1 min-w-0 self-stretch">
							<img
								src={picsumSrc('banner-news-home', 600, 400)}
								alt=""
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="flex flex-1 flex-col items-start justify-center min-w-0">
							<div className="flex flex-col gap-4 items-start justify-center pb-4 pt-10 px-10 text-primary-600 w-full">
								<p className="font-display font-bold text-display-sm leading-[44px] w-full">
									O melhor conteúdo do setor alimentício, direto na sua caixa de entrada.
								</p>
								<p className="font-body text-body-lg w-full">
									Junte-se a milhares de construtores que já assinam nossa newsletter
									gratuita.
								</p>
							</div>
							<div className="flex flex-col h-24 items-start pb-10 pt-4 px-10 w-full">
								<a
									href="/form-newsletter"
									className="bg-primary-600 inline-flex items-center justify-center px-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg"
								>
									Assine agora
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* §12 — Ad 970×90 */}
			<section className="flex flex-col items-center py-10 w-full">
				<AdFrame width={970} height={90} />
			</section>

			{/* §13 — News + Podcasts */}
			<section className="w-full">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-10 flex gap-6">
					<div className="flex flex-col gap-8 flex-1">
						{NEWS_PODCAST.map((card) => (
							<article
								key={card.id}
								className="group flex flex-row items-center gap-6 w-full"
							>
								<div className="shrink-0 w-[288px]">
									<Thumbnail
										src={picsumSrc(card.seed, 600, 338)}
										alt="Capa"
										href="/conteudo"
										ratio="video"
									/>
								</div>
								<div className="flex flex-col gap-2 flex-1 min-w-0">
									<Categoria
										color={card.categoryColor}
										label={card.category}
										href="/categoria"
									/>
									<h3 className="text-title-xl font-display font-bold text-primary-600">
										<a
											href="/conteudo"
											className="group-hover:text-secondary-950 transition-colors"
										>
											{card.title}
										</a>
									</h3>
									{card.lead ? (
										<p className="text-body-md font-body text-neutral-900 group-hover:text-neutral-950 transition-colors">
											{card.lead}
										</p>
									) : null}
									{card.author ? <Byline author={card.author} href="/categoria" /> : null}
								</div>
							</article>
						))}
					</div>

					<aside className="bg-neutral-50 border border-neutral-100 flex flex-col items-start overflow-hidden pb-2 rounded-lg w-[496px] shrink-0 self-start">
						<div className="flex items-center p-6 w-full">
							<p className="flex-1 font-display font-bold text-title-xl text-primary-600 leading-7">
								Podcasts
							</p>
						</div>
						<div className="flex flex-col items-start w-full">
							<div className="flex flex-col items-start justify-center overflow-hidden py-2 px-6 rounded-lg w-full">
								<div className="bg-white border border-neutral-100 flex flex-col items-start rounded-lg w-full">
									<div className="group flex items-center p-3 w-full">
										<div className="rounded-sm overflow-hidden size-[104px] shrink-0">
											<img
												src={picsumSrc('pod1', 208, 208)}
												alt="Capa podcast"
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="flex flex-1 flex-col gap-2 items-start min-w-0 px-4">
											<span className="font-body font-semibold text-label-md text-mint">
												Food Service
											</span>
											<p className="font-display font-bold text-title-md text-primary-600 group-hover:text-secondary-950 transition-colors line-clamp-3 w-full">
												Meu colega robô: WEG e Mitsubishi apostam em robôs que ajudam humanos
											</p>
										</div>
									</div>
									<Divider />
									<div className="px-4 py-3 w-full">
										<SponsorLine company={sponsors[0].name} href={"/patrocinador?id=" + sponsors[0].id} />
									</div>
								</div>
							</div>
							{PODCASTS.map((pod) => (
								<div
									key={pod.seed}
									className="group flex gap-4 items-center py-3 px-6 w-full"
								>
									<div className="rounded-sm overflow-hidden size-[104px] shrink-0">
										<img
											src={picsumSrc(pod.seed, 208, 208)}
											alt="Capa podcast"
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="flex flex-1 flex-col gap-2 items-start min-w-0">
										<span className="font-body font-semibold text-label-md text-mint">
											{pod.category}
										</span>
										<p className="font-display font-bold text-title-md text-primary-600 group-hover:text-secondary-950 transition-colors line-clamp-3 w-full">
											{pod.title}
										</p>
									</div>
								</div>
							))}
						</div>
						<div className="flex flex-col items-start py-2 px-6 w-full">
							<Divider />
						</div>
						<div className="flex flex-col items-start p-2 w-full">
							<a
								href="/categoria"
								className="inline-flex gap-2 items-center justify-center px-5 pr-4 py-2 rounded-full text-primary-600 hover:bg-neutral-100 font-body font-bold text-body-lg"
							>
								Todos os episódios
								<Icon name="arrow-right" className="size-6" />
							</a>
						</div>
					</aside>
				</div>
			</section>

			{/* §14 — Especialistas */}
			<section className="w-full">
				<div className="block text-primary-600 w-full pt-10">
					<div className="max-w-screen-xl mx-auto px-4 lg:px-6 space-y-2">
						<div className="flex items-center gap-1 h-1.5">
							<div className="flex items-center gap-1">
								<span className="block size-[5px] rounded-full bg-current" />
								<span className="block size-[5px] rounded-full bg-current opacity-40" />
								<span className="block size-[5px] rounded-full bg-current opacity-40" />
							</div>
							<div className="flex-1 h-px bg-current" />
						</div>
						<div className="flex items-center gap-4">
							<h2 className="flex-1 text-headline-md font-display font-bold">
								Especialistas
							</h2>
							<div className="flex gap-2 items-center shrink-0">
								<button
									type="button"
									aria-label="Anterior"
									className="border border-neutral-100 inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:border-primary-600 transition-colors"
								>
									<Icon name="chevron-left" className="size-8" />
								</button>
								<button
									type="button"
									aria-label="Próximo"
									className="border border-primary-600 inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-primary-600 hover:text-white transition-colors"
								>
									<Icon name="chevron-right" className="size-8" />
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 mt-6 relative overflow-hidden h-[224px]">
					<div className="absolute top-0 left-0 flex gap-6">
						{ESPECIALISTAS.map((esp) => (
							<article
								key={esp.name}
								className="group bg-white border border-neutral-100 hover:bg-neutral-50 hover:border-primary-600 transition-colors flex flex-col items-start justify-center rounded-sm overflow-hidden shrink-0 w-[392px]"
							>
								<div className="flex items-center w-full">
									<div className="flex items-center p-3">
										<div className="border border-neutral-50 rounded-sm size-[104px] overflow-hidden">
											<img
												src={`https://i.pravatar.cc/208?img=${esp.img}`}
												alt="Foto"
												className="w-full h-full object-cover"
											/>
										</div>
									</div>
									<div className="flex flex-col flex-1 justify-center min-w-0 pl-2 pr-4 py-4">
										<p className="font-display font-bold text-title-lg text-secondary-950 truncate w-full">
											<a href="/categoria" className="hover:underline">
												{esp.name}
											</a>
										</p>
										<p className="font-body text-body-md text-neutral-900 truncate w-full">
											{esp.role}
										</p>
									</div>
								</div>
								<div className="flex flex-col items-start justify-end h-24 p-4 w-full">
									<p className="font-display font-bold text-title-md text-primary-600 line-clamp-3 w-full">
										{esp.quote}
									</p>
								</div>
							</article>
						))}
					</div>
					<div className="absolute inset-y-0 right-0 w-[79px] bg-gradient-to-l from-white to-transparent pointer-events-none" />
				</div>
			</section>

			{/* §15 — Última seção */}
			<section className="w-full">
				<SectionTitle label="Fispal Food Tecnologia" color="primary-600" href="/categoria" />
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 mt-6 grid grid-cols-[600px_1fr] gap-6">
					<article className="group flex flex-col gap-3">
						<Thumbnail
							src={picsumSrc(LAST_SECTION[0].seed, 1200, 675)}
							alt="Capa"
							href="/conteudo"
							ratio="video"
						/>
						<div className="flex flex-col gap-2">
							<Categoria
								color={LAST_SECTION[0].categoryColor}
								label={LAST_SECTION[0].category}
								href="/categoria"
							/>
							<h3 className="text-headline-md font-display font-bold text-primary-600">
								<a
									href="/conteudo"
									className="group-hover:text-secondary-950 transition-colors"
								>
									{LAST_SECTION[0].title}
								</a>
							</h3>
							<p className="text-body-lg font-body text-neutral-900 group-hover:text-neutral-950 transition-colors">
								{LAST_SECTION[0].lead}
							</p>
							{LAST_SECTION[0].author ? (
								<Byline author={LAST_SECTION[0].author} href="/categoria" />
							) : null}
						</div>
					</article>

					<div className="grid grid-cols-2 gap-6">
						{LAST_SECTION.slice(1, 3).map((card) => (
							<article key={card.id} className="group flex flex-col gap-3">
								<Thumbnail
									src={picsumSrc(card.seed, 600, 338)}
									alt="Capa"
									href="/conteudo"
									ratio="video"
								/>
								<div className="flex flex-col gap-1">
									<Categoria
										color={card.categoryColor}
										label={card.category}
										href="/categoria"
									/>
									<h3 className="text-title-md font-display font-bold text-primary-600 leading-tight">
										<a
											href="/conteudo"
											className="group-hover:text-secondary-950 transition-colors"
										>
											{card.title}
										</a>
									</h3>
								</div>
							</article>
						))}
						<article className="group flex flex-col gap-3">
							<Thumbnail
								src={picsumSrc(LAST_SECTION[3].seed, 600, 338)}
								alt="Capa"
								href="/conteudo"
								ratio="video"
							/>
							<div className="flex flex-col gap-1">
								<h3 className="text-title-md font-display font-bold text-primary-600 leading-tight">
									<a
										href="/conteudo"
										className="group-hover:text-secondary-950 transition-colors"
									>
										{LAST_SECTION[3].title}
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

			<div className="mt-10">
				<FooterDesktop />
			</div>
		</main>
	)
}

/**
 * Coluna de categoria: link de título + card "boxed" + lista de Small H cards.
 * Padrão usado em Ingredientes e Food Service na home.
 */
function CategoryColumn({
	color,
	label,
	boxedTitle,
	boxedSeed,
	list,
}: {
	color: 'mint' | 'primary-600'
	label: string
	boxedTitle: string
	boxedSeed: string
	list: typeof INGREDIENTES_LIST
}) {
	const colorClass = color === 'mint' ? 'text-mint' : 'text-primary-600'

	return (
		<div className="flex flex-col pt-10">
			<a
				href="/categoria"
				className={`group block no-underline hover:opacity-75 transition-opacity space-y-2 ${colorClass}`}
			>
				<div className="flex items-center gap-1 h-1.5">
					<div className="flex items-center gap-1">
						<span className="block size-[5px] rounded-full bg-current" />
						<span className="block size-[5px] rounded-full bg-current opacity-40" />
						<span className="block size-[5px] rounded-full bg-current opacity-40" />
					</div>
					<div className="flex-1 h-px bg-current" />
				</div>
				<h2 className="text-headline-md font-display font-bold">{label}</h2>
			</a>
			<div className="flex flex-col gap-4 mt-4">
				<a
					href="/conteudo"
					className="group relative flex flex-col justify-end rounded-sm overflow-hidden border-b-4 border-mint w-full aspect-[392/262]"
				>
					<img
						src={picsumSrc(boxedSeed, 784, 524)}
						alt="Capa"
						className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
					/>
					<div className="absolute top-2 right-2 bg-white rounded-sm p-2 flex flex-col gap-1 items-end z-10">
						<p className="font-body font-semibold text-label-sm text-neutral-900">
							Conteúdo Patrocinado
						</p>
						<p className="font-display font-bold text-title-md text-secondary-950">
							{sponsors[1].name}
						</p>
					</div>
					<div className="relative bg-black/60 px-4 py-3 w-full z-10">
						<h3 className="font-display font-bold text-title-md text-white leading-snug line-clamp-3">
							{boxedTitle}
						</h3>
					</div>
				</a>

				{list.map((card) => (
					<article key={card.id} className="group flex flex-row items-center gap-4 w-full">
						<div className="shrink-0 w-[120px]">
							<Thumbnail
								src={picsumSrc(card.seed, 240, 135)}
								alt="Capa"
								href="/conteudo"
								ratio="video"
							/>
						</div>
						<div className="flex flex-col gap-1 flex-1 min-w-0">
							<Categoria color={color} label={card.category} href="/categoria" />
							<h3 className="text-title-md font-display font-bold text-primary-600 leading-tight">
								<a
									href="/conteudo"
									className="group-hover:text-secondary-950 transition-colors"
								>
									{card.title}
								</a>
							</h3>
						</div>
					</article>
				))}
			</div>
		</div>
	)
}
