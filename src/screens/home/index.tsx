import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import incentiveBannerTexture from '~/assets/images/incentive-banner-texture.png'
import { AdFrame } from '~/components/ad-frame'
import { BannerNewsletter } from '~/components/banner-newsletter'
import { CategoryColumn } from '~/components/category-column'
import { DestaqueSection } from '~/components/destaque-section'
import { DestaqueUnico } from '~/components/destaque-unico'
import { BibliotecaSection } from '~/components/biblioteca-section'
import { DownloadSection } from '~/components/download-section'
import { EspecialistasSection } from '~/components/especialistas-section'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { IncentiveBanner } from '~/components/incentive-banner'
import { IncentiveDownloadDialog } from '~/components/incentive-download-dialog'
import { IncentiveNewsletterDialog } from '~/components/incentive-newsletter-dialog'
import { Toast } from '~/components/toast'
import { NewsCard } from '~/components/news-card'
import { ProteinaAnimalSection } from '~/components/proteina-animal-section'
import { SectionTitle } from '~/components/section-title'
import { UltimaSecao } from '~/components/ultima-secao'
import { VideosSection } from '~/components/videos-section'
import { WebstoriesSection } from '~/components/webstories-section'
import { WidgetEmAlta } from '~/components/widget-em-alta'
import { WidgetPodcast } from '~/components/widget-podcast'
import type { ScenarioAxis } from '~/dev/scenario-store'
import { useScenarios } from '~/dev/use-scenarios'
import { markPassiveShown, shouldShowPassiveIncentive, suppressPassiveFor7Days } from '~/lib/incentive-storage'
import { useAssinarNewsletter } from '~/lib/use-assinar-newsletter'
import { useHeaderUsuario } from '~/lib/use-header-usuario'
import { useLogado } from '~/lib/use-logado'
import { NEWSLETTER_DO_PORTAL } from '~/mocks/dashboard-perfil'
import { newsletterAxis, newsletterAxisValue } from '../_newsletter/scenarios'
import { sessaoAxis } from '../_sessao/scenarios'
import { ARQUIVO_EXEMPLO_URL, MATERIAL_DESTAQUE_TITULO, nomeArquivoDownload } from '~/mocks/downloads'
import { materiaisMaisRecentes } from '~/lib/biblioteca'
import {
	EM_ALTA,
	ESPECIALISTAS,
	FISPAL_LIST,
	FOOD_SERVICE_LIST,
	HOME_DESTAQUE_UNICO,
	HOME_DESTAQUE_UNICO_SPONSOR,
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

// Eixo da ScenarioBar — o toggle on/off do destaque único, que na aplicação real vive
// no admin do WP (RN02). "Desligado" é o default: sem ?cenario=, a home renderiza
// exatamente como antes desta feature.
const DESTAQUE_UNICO_AXIS: ScenarioAxis = {
	param: 'cenario',
	label: 'Destaque único',
	value: 'destaque-unico-off',
	defaultValue: 'destaque-unico-off',
	options: [
		{ value: 'destaque-unico-off', label: 'Desligado' },
		{ value: 'destaque-unico-on', label: 'Ligado' },
		{ value: 'destaque-unico-patrocinado', label: 'Ligado + patrocinado' },
	],
}

// Registro vazio quando a home é só o fundo de um modal de auth (/login, /cadastro…):
// nesse caso os eixos da barra são os da tela da frente, e não os desta.
const NO_AXES: ScenarioAxis[] = []

/**
 * Tela: Home — Página inicial
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=973-6474
 * Destaque único (opcional, RN02 — ScenarioBar: ?cenario=destaque-unico-on|
 * destaque-unico-patrocinado) entra ACIMA do hero, sem alterar o resto.
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
	const showNewsletterToast = params.get('toast') === 'newsletter-subscribed'
	const previewIncentive = params.get('preview')

	// RN02/RN03 — desligado, a seção não renderiza e o restante da home segue intacto.
	const cenario = params.get('cenario')
	const destaqueUnicoOn = cenario === 'destaque-unico-on' || cenario === 'destaque-unico-patrocinado'

	const destaqueUnicoValue = DESTAQUE_UNICO_AXIS.options.some((o) => o.value === cenario)
		? (cenario as string)
		: 'destaque-unico-off'

	// Sessão primeiro (ver _sessao/scenarios). O eixo do banner de newsletter só entra
	// na barra com ?logado=true: deslogado o banner leva ao formulário público e não
	// tem estado de assinatura para variar — um controle que não muda nada é pior que
	// controle nenhum.
	useScenarios(
		isHomeRoute
			? [
					sessaoAxis(logado),
					{ ...DESTAQUE_UNICO_AXIS, value: destaqueUnicoValue },
					...(logado ? [newsletterAxis(newsletterAxisValue(params.get('newsletter')))] : []),
				]
			: NO_AXES,
	)

	// Assinar a newsletter do portal direto no banner (logado). Ver as 7 regras em
	// src/lib/use-assinar-newsletter.ts — é lá que o comportamento mora.
	const newsletter = useAssinarNewsletter()

	// O header reflete a sessão em toda tela pública — ver src/lib/use-header-usuario.ts.
	const headerUsuario = useHeaderUsuario()

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
			<HeaderDesktop {...headerUsuario} />

			{/* §1 — Ad 970×90 (desktop) / 360×142 (mobile) — Super Leaderboard */}
			<section className="flex flex-col items-center py-6 w-full">
				<div className="hidden lg:flex"><AdFrame width={970} height={90} /></div>
				<div className="flex lg:hidden"><AdFrame width={360} height={142} /></div>
			</section>

			{/* §1.5 — Destaque único (RN01: exatamente 1 conteúdo). Fica entre o ad de
			    topo e a seção de 3 destaques, que continua intacta abaixo (RN03). */}
			{destaqueUnicoOn ? (
				<DestaqueUnico
					article={HOME_DESTAQUE_UNICO}
					sponsor={cenario === 'destaque-unico-patrocinado' ? HOME_DESTAQUE_UNICO_SPONSOR : undefined}
					sponsorHref={cenario === 'destaque-unico-patrocinado' ? '/patrocinador' : undefined}
				/>
			) : null}

			<DestaqueSection hero={hero} top2={top2} top3={top3} heroText={HOME_HERO_TEXT} heroBottom={HOME_HERO_BOTTOM} />

			{/* §3 — 3 colunas: Ingredientes · Food Service · Em Alta */}
			<section className="w-full">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
					<CategoryColumn
						color="mint"
						label="Ingredientes"
						boxedTitle="Suplemento em gomas: a doce revolução que está transformando o mercado de nutrição"
						boxedSeed="ing-boxed"
						boxedSponsorName="Bridge & Co."
						list={INGREDIENTES_LIST}
					/>
					<CategoryColumn
						color="saffron"
						label="Food Service"
						boxedTitle="Análise essencial: saiba como as crises internacionais impactam a indústria de alimentos"
						boxedSeed="fs-boxed"
						list={FOOD_SERVICE_LIST}
					/>
					<div className="flex flex-col gap-6 pt-6 lg:pt-10">
						<WidgetEmAlta title="Em Alta" items={EM_ALTA.map((title) => ({ title }))} />
						<div className="flex justify-center">
							<AdFrame width={300} height={250} />
						</div>
					</div>
				</div>
			</section>

			<ProteinaAnimalSection articles={PROTEINA_ANIMAL} />

			{/* Vitrine do acervo (node 8424:112623). A anotação do Figma a propõe como
			    SUBSTITUIÇÃO do banner de download abaixo, mas as regras ainda vão para
			    aprovação do cliente — até lá as duas convivem, de propósito. Ver
			    ds/achados.md. */}
			<BibliotecaSection materiais={materiaisMaisRecentes(12)} className="mt-10" />

			{/* Logado, sem handler: a âncora com `download` baixa nativamente, e quem confirma
			    é o próprio navegador (barra de downloads) — não duplicamos isso em toast.
			    Deslogado, `onCtaClick` intercepta e abre o modal de incentivo; o href vira o
			    destino sem-JS. O título é link para a matéria nos dois casos. */}
			<DownloadSection
				eyebrow="E-book gratuito"
				title={MATERIAL_DESTAQUE_TITULO}
				titleHref="/conteudo"
				description="Saiba como a cadeia de produção está sendo otimizada até o atacarejo com rastreabilidade e as tecnologias envolvidas nesse processo."
				ctaLabel="Baixar agora"
				ctaHref={logado ? ARQUIVO_EXEMPLO_URL : '/cadastro?step=1&intent=download&returnTo=%2Fhome'}
				ctaDownload={logado ? nomeArquivoDownload(MATERIAL_DESTAQUE_TITULO) : undefined}
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
							contentId={card.id}
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

			{/* O banner NOMEIA a newsletter porque, para o logado, o clique já assina — e um
			    clique registra um consentimento LGPD específico, nunca um genérico.
			    Deslogado: leva ao formulário público, carregando de onde veio em `returnTo`
			    para que o "Entrar" do lembrete de lá devolva o leitor à home, e não ao
			    formulário que ele estava tentando evitar. */}
			<BannerNewsletter
				image={picsumSrc('banner-news-home', 600, 400)}
				title={`Assine a newsletter ${NEWSLETTER_DO_PORTAL.title}`}
				description="Tendências, entrevistas e novidades do setor de alimentos e bebidas, direto na sua caixa de entrada."
				ctaLabel="Assine agora"
				ctaHref={
					logado ? newsletter.tabHref : `/form-newsletter?returnTo=${encodeURIComponent('/home')}`
				}
				onCtaClick={logado ? newsletter.assinar : undefined}
				state={newsletter.state}
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
							<NewsCard
								key={card.id}
								contentId={card.id}
								size="large"
								orientation="horizontal"
								image={picsumSrc(card.seed, 600, 338)}
								href="/conteudo"
								title={card.title}
								categoria={{ label: card.category, color: card.categoryColor, href: '/categoria' }}
								lead={card.lead}
								author={card.author}
								authorHref="/categoria"
								mediaClassName="w-full lg:w-[288px] lg:shrink-0"
							/>
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

		{showNewsletterToast ? (
			<div className="fixed bottom-6 right-6 z-50">
				<Toast type="success" message="Inscrição confirmada." />
			</div>
		) : null}
		</>
	)
}
