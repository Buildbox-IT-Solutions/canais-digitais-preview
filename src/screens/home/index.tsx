import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import incentiveBannerTexture from '~/assets/images/incentive-banner-texture.png'
import { AdFrame } from '~/components/ad-frame'
import { BannerNewsletter } from '~/components/banner-newsletter'
import { CategoryColumn } from '~/components/category-column'
import { DestaqueSection } from '~/components/destaque-section'
import { DownloadSection } from '~/components/download-section'
import { EspecialistasSection } from '~/components/especialistas-section'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { IncentiveBanner } from '~/components/incentive-banner'
import { IncentiveDownloadDialog } from '~/components/incentive-download-dialog'
import { IncentiveNewsletterDialog } from '~/components/incentive-newsletter-dialog'
import { Toast } from '~/components/toast'
import { Byline } from '~/components/byline'
import { Categoria } from '~/components/categoria'
import { NewsCard } from '~/components/news-card'
import { ProteinaAnimalSection } from '~/components/proteina-animal-section'
import { SectionTitle } from '~/components/section-title'
import { Thumbnail } from '~/components/thumbnail'
import { UltimaSecao } from '~/components/ultima-secao'
import { VideosSection } from '~/components/videos-section'
import { WebstoriesSection } from '~/components/webstories-section'
import { WidgetEmAlta } from '~/components/widget-em-alta'
import { WidgetPodcast } from '~/components/widget-podcast'
import { markPassiveShown, shouldShowPassiveIncentive, suppressPassiveFor7Days } from '~/lib/incentive-storage'
import { useLogado } from '~/lib/use-logado'
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
	VIDEOS_SECTION,
	WEBSTORIES,
} from '~/mocks/articles'

/**
 * Tela: Home — Página inicial
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=973-6474
 * 15 seções: hero · 3 colunas (Ingredientes/Food Service/Em Alta) · Proteína Animal ·
 * Download · Webstories · Vídeos · Fispal · Banner Newsletter · News+Podcasts ·
 * Especialistas · Última. Miolo responsivo desde 07/2026 (ver docs/superpowers/specs/
 * 2026-07-07-extracao-secoes-home-design.md).
 */
export default function HomeScreen() {
	const [hero, top2, top3] = HOME_HERO
	const logado = useLogado()
	const isHomeRoute = useLocation().pathname === '/home'
	const navigate = useNavigate()
	const [params] = useSearchParams()
	const showDownloadToast = params.get('toast') === 'download-started'
	const showNewsletterToast = params.get('toast') === 'newsletter-subscribed'
	const previewIncentive = params.get('preview')

	const [portalOpen, setPortalOpen] = useState(previewIncentive === 'portal')
	const [downloadOpen, setDownloadOpen] = useState(previewIncentive === 'download')
	const [newsletterOpen, setNewsletterOpen] = useState(previewIncentive === 'newsletter')

	useEffect(() => {
		if (!isHomeRoute || logado || previewIncentive) return
		if (!shouldShowPassiveIncentive()) return
		const timerId = setTimeout(() => {
			markPassiveShown()
			setPortalOpen(true)
		}, 4000)
		return () => clearTimeout(timerId)
	}, [isHomeRoute, logado, previewIncentive])

	function handlePortalCreateAccount() {
		suppressPassiveFor7Days()
		setPortalOpen(false)
		navigate('/cadastro?step=1&returnTo=%2Fhome')
	}

	function handlePortalLogin() {
		suppressPassiveFor7Days()
		setPortalOpen(false)
		navigate('/login?returnTo=%2Fhome')
	}

	function handlePortalDismiss() {
		suppressPassiveFor7Days()
		setPortalOpen(false)
	}

	function handleDownloadCreateAccount() {
		setDownloadOpen(false)
		navigate('/cadastro?step=1&intent=download&returnTo=%2Fhome')
	}

	function handleDownloadLogin() {
		setDownloadOpen(false)
		navigate('/login?intent=download&returnTo=%2Fhome')
	}

	function handleDownloadDismiss() {
		setDownloadOpen(false)
	}

	function handleNewsletterCreateAccount() {
		setNewsletterOpen(false)
		navigate('/cadastro?step=1&intent=newsletter&returnTo=%2Fhome')
	}

	function handleNewsletterLogin() {
		setNewsletterOpen(false)
		navigate('/login?intent=newsletter&returnTo=%2Fhome')
	}

	function handleNewsletterDismiss() {
		setNewsletterOpen(false)
	}

	return (
		<>
		<main className="bg-white">
			<HeaderDesktop />

			{/* §1 — Ad Frame 1224×245 (já fluido, inalterado) */}
			<section className="flex flex-col items-center py-6 w-full">
				<div className="flex items-center max-w-screen-xl mx-auto w-full px-4 lg:px-6">
					<div className="aspect-[1248/250] border border-primary-100 bg-neutral-50 flex flex-1 items-center justify-center">
						<span className="font-body font-bold text-label-md text-neutral-700">1224 × 245</span>
					</div>
				</div>
			</section>

			<DestaqueSection hero={hero} top2={top2} top3={top3} heroText={HOME_HERO_TEXT} heroBottom={HOME_HERO_BOTTOM} />

			{/* §3 — 3 colunas: Ingredientes · Food Service · Em Alta */}
			<section className="w-full">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
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
					<div className="flex flex-col gap-6 pt-6 lg:pt-10">
						<WidgetEmAlta title="Em Alta" items={EM_ALTA.map((title) => ({ title }))} />
						<div className="flex justify-center lg:hidden">
							<AdFrame width={300} height={250} />
						</div>
						<div className="hidden lg:flex border border-primary-100 bg-neutral-50 items-center justify-center rounded-sm h-[282px] w-full">
							<span className="font-body font-bold text-label-md text-neutral-700">300 × 250</span>
						</div>
					</div>
				</div>
			</section>

			<ProteinaAnimalSection articles={PROTEINA_ANIMAL} />

			<DownloadSection
				eyebrow="E-book gratuito"
				title="Como a rastreabilidade reduz custos e aumenta a margem de lucro"
				description="Saiba como a cadeia de produção está sendo otimizada até o atacarejo com rastreabilidade e as tecnologias envolvidas nesse processo."
				ctaLabel="Baixar agora"
				ctaHref="/gate-download"
				onCtaClick={!logado ? () => setDownloadOpen(true) : undefined}
				image={picsumSrc('download-bg', 1920, 460)}
				className="mt-10"
			/>

			{/* §6 — Ad 970×90 (desktop) / 360×142 (mobile) */}
			<section className="flex flex-col items-center py-10 w-full">
				<div className="hidden lg:flex"><AdFrame width={970} height={90} /></div>
				<div className="flex lg:hidden"><AdFrame width={360} height={142} /></div>
			</section>

			<WebstoriesSection items={WEBSTORIES} />

			<VideosSection items={VIDEOS_SECTION} />

			{/* §9 — Fispal Tecnologia (grid responsivo, sem componente próprio — ver plan Task 11) */}
			<section className="w-full pb-6 lg:pb-0">
				<SectionTitle label="Fispal Tecnologia" color="primary-600" href="/categoria" />
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 mt-4 lg:mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
					{FISPAL_LIST.map((card) => (
						<NewsCard
							key={card.id}
							size="medium"
							orientation="vertical"
							image={picsumSrc(card.seed, 800, 450)}
							href="/conteudo"
							title={card.title}
							categoria={{ label: card.category, color: card.categoryColor, href: '/categoria' }}
							lead={card.lead}
							author={card.author}
							authorHref="/categoria"
						/>
					))}
				</div>
			</section>

			<BannerNewsletter
				image={picsumSrc('banner-news-home', 600, 400)}
				title="O melhor conteúdo do setor alimentício, direto na sua caixa de entrada."
				description="Junte-se a milhares de construtores que já assinam nossa newsletter gratuita."
				ctaLabel="Assine agora"
				ctaHref="/dashboard-perfil-v4?tab=newsletter"
				onCtaClick={!logado ? () => setNewsletterOpen(true) : undefined}
			/>

			{/* §12 — Ad 970×90 (desktop) / 360×142 (mobile) */}
			<section className="flex flex-col items-center py-10 w-full">
				<div className="hidden lg:flex"><AdFrame width={970} height={90} /></div>
				<div className="flex lg:hidden"><AdFrame width={360} height={142} /></div>
			</section>

			{/* §13 — News + Podcasts */}
			<section className="w-full">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-10 flex flex-col lg:flex-row gap-8 lg:gap-6">
					<div className="flex flex-col gap-8 flex-1">
						{NEWS_PODCAST.map((card) => (
							<article key={card.id} className="group flex flex-row items-center gap-6 w-full">
								<div className="shrink-0 w-[288px]">
									<Thumbnail src={picsumSrc(card.seed, 600, 338)} alt="Capa" href="/conteudo" ratio="video" />
								</div>
								<div className="flex flex-col gap-2 flex-1 min-w-0">
									<Categoria color={card.categoryColor} label={card.category} href="/categoria" />
									<h3 className="text-title-xl font-display font-bold text-primary-600">
										<a href="/conteudo" className="group-hover:text-secondary-950 transition-colors">
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

					<WidgetPodcast
						items={[
							{
								category: 'Food Service',
								title: 'Meu colega robô: WEG e Mitsubishi apostam em robôs que ajudam humanos',
								image: picsumSrc('pod1', 208, 208),
								sponsor: 'Company Name',
								sponsorHref: '#',
							},
							...PODCASTS.map((pod) => ({ category: pod.category, title: pod.title, image: picsumSrc(pod.seed, 208, 208) })),
						]}
					/>
				</div>
			</section>

			<EspecialistasSection items={ESPECIALISTAS} />

			<UltimaSecao title="Fispal Food Tecnologia" articles={LAST_SECTION} />

			<div className="mt-10">
				<FooterDesktop />
			</div>
		</main>

		{!logado ? (
			<>
				<IncentiveBanner
					open={portalOpen}
					icon="account-circle"
					title="Crie sua conta"
					titleHighlight="gratuita"
					description="Acesse materiais exclusivos e assine nossas newsletters sem custo."
					backgroundImage={incentiveBannerTexture}
					onCreateAccount={handlePortalCreateAccount}
					onLogin={handlePortalLogin}
					onDismiss={handlePortalDismiss}
				/>
				<IncentiveDownloadDialog
					open={downloadOpen}
					onCreateAccount={handleDownloadCreateAccount}
					onLogin={handleDownloadLogin}
					onDismiss={handleDownloadDismiss}
				/>
				<IncentiveNewsletterDialog
					open={newsletterOpen}
					onCreateAccount={handleNewsletterCreateAccount}
					onLogin={handleNewsletterLogin}
					onDismiss={handleNewsletterDismiss}
				/>
			</>
		) : null}

		{showDownloadToast ? (
			<div className="fixed bottom-6 right-6 z-50">
				<Toast type="success" message="Seu download começou." />
			</div>
		) : null}

		{showNewsletterToast ? (
			<div className="fixed bottom-6 right-6 z-50">
				<Toast type="success" message="Inscrição confirmada." />
			</div>
		) : null}
		</>
	)
}
