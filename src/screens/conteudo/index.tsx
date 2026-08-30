import { format, formatDistanceToNowStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import incentiveBannerTexture from '~/assets/images/incentive-banner-texture.png'
import { AdFrame } from '~/components/ad-frame'
import { AiSummaryBlock } from '~/components/ai-summary-block'
import { AudioVersionBlock } from '~/components/audio-version-block'
import { Avatar } from '~/components/avatar'
import { AvatarStack } from '~/components/avatar-stack'
import { BannerDownload } from '~/components/banner-download'
import { BannerNewsletter } from '~/components/banner-newsletter'
import { Categoria } from '~/components/categoria'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { IconButton } from '~/components/icon-button'
import { IncentiveBanner } from '~/components/incentive-banner'
import { IncentiveDownloadDialog } from '~/components/incentive-download-dialog'
import { ARQUIVO_EXEMPLO_URL, nomeArquivoDownload } from '~/mocks/downloads'
import { IncentiveNewsletterDialog } from '~/components/incentive-newsletter-dialog'
import { NewsCard } from '~/components/news-card'
import { PlayButton } from '~/components/play-button'
import { SectionTitle } from '~/components/section-title'
import { TableOfContents } from '~/components/table-of-contents'
import { TableOfContentsIcon } from '~/components/table-of-contents-icon'
import { TableOfContentsMargin } from '~/components/table-of-contents-margin'
import { Tag } from '~/components/tag'
import { Thumbnail } from '~/components/thumbnail'
import { Toast } from '~/components/toast'
import { FavoritoToggle } from '~/components/favorito-toggle'
import { Tooltip } from '~/components/tooltip'
import { WidgetEmAlta } from '~/components/widget-em-alta'
import type { ScenarioAxis } from '~/dev/scenario-store'
import { useScenarios } from '~/dev/use-scenarios'
import { getPostByParam } from '~/fixtures/posts'
import { compartilharConteudo } from '~/lib/compartilhar-conteudo'
import { markPassiveShown, shouldShowPassiveIncentive, suppressPassiveFor7Days } from '~/lib/incentive-storage'
import { useAssinarNewsletter } from '~/lib/use-assinar-newsletter'
import { useFavoritoAuthModal } from '~/lib/use-favorito-auth-modal'
import { useHeaderUsuario } from '~/lib/use-header-usuario'
import { useFavoritoToggle } from '~/lib/use-favorito-toggle'
import { useLogado } from '~/lib/use-logado'
import { ARTICLE_TAGS, EM_ALTA, picsumSrc, VEJA_TAMBEM } from '~/mocks/articles'
import { NEWSLETTER_DO_PORTAL } from '~/mocks/dashboard-perfil'
import type { Author, ContentBlock, Post } from '~/types/post'
import { newsletterAxis, newsletterAxisValue } from '../_newsletter/scenarios'
import { sessaoAxis } from '../_sessao/scenarios'

// Desenho final da barra: favoritar, WhatsApp, share — imprimir/LinkedIn/Facebook/
// Twitter saíram, condensados no share nativo (que já lista os apps instalados do
// usuário, incluindo essas redes). WhatsApp abre um wa.me com título+link
// pré-preenchidos (link puro, sem SDK/API — mesma categoria de um mailto:).
// Compartilhar reusa `compartilharConteudo` (Web Share API, fallback de copiar
// link) — o mesmo helper já usado em Últimas leituras/Favoritos.
// Tooltip nos 3: favoritar usa tooltipOn/tooltipOff do Toggle ("Remover"/
// "Favoritar", igual à home); WhatsApp e share usam o Tooltip genérico direto —
// "Enviar" (verbo curto, mesma família de Favoritar/Remover/Compartilhar) e
// "Compartilhar" (esse coincide com o aria-label do IconButton de propósito,
// já que os dois descrevem a mesma ação de verdade — "Enviar" no WhatsApp
// evita repetir "Compartilhar" em dois ícones vizinhos com ações diferentes).
function whatsappShareHref(title: string, path: string): string {
	const url = new URL(path, window.location.origin).toString()
	return `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`
}

// Fase 2 (briefing pagina-conteudo-toc) — decisão pendente de validação com
// Pedro/Micaelly (ver GATE 2): posição default é o final do corpo; troque
// para 'apos-introducao' para testar a alternativa.
const DOWNLOAD_BLOCK_POSITION: 'fim-do-corpo' | 'apos-introducao' = 'fim-do-corpo'

// Ver comentário equivalente em screens/home — a página como fundo de um modal de auth
// não registra eixos.
const NO_AXES: ScenarioAxis[] = []

/**
 * Tela: Conteúdo — Página interna de artigo
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=4179-32002
 */
export default function ConteudoScreen() {
	const [params] = useSearchParams()
	const logado = useLogado()
	const isConteudoRoute = useLocation().pathname === '/conteudo'
	const navigate = useNavigate()
	const showNewsletterToast = params.get('toast') === 'newsletter-subscribed'
	const previewIncentive = params.get('preview')
	const tocVariant = params.get('toc')

	const activePost = getPostByParam(params.get('post'))

	// Registro vazio quando a página é só o fundo de um modal de auth — mesma regra da
	// home: os eixos da barra são os da tela da frente. O eixo da newsletter só entra
	// com ?logado=true, porque deslogado não há estado de assinatura para variar.
	useScenarios(
		isConteudoRoute
			? [
					sessaoAxis(logado),
					...(logado ? [newsletterAxis(newsletterAxisValue(params.get('newsletter')))] : []),
				]
			: NO_AXES,
	)

	// Assinar a newsletter do portal direto no banner da sidebar (logado). Ver as 7
	// regras em src/lib/use-assinar-newsletter.ts.
	const newsletter = useAssinarNewsletter()

	// O header reflete a sessão em toda tela pública — ver src/lib/use-header-usuario.ts.
	const headerUsuario = useHeaderUsuario()

	// Feature Favoritos: contentId é o slug do post (== chave de POSTS_BY_ID ==
	// valor de `?post=`) — cada variação/fixture tem seu próprio estado de favorito.
	const favoritoAuthModal = useFavoritoAuthModal(activePost.slug)
	const favoritoToggle = useFavoritoToggle(activePost.slug, favoritoAuthModal.requestAuth)

	// URL canônica do post (não a URL da aba, que pode carregar querystring só de
	// simulação de protótipo — ?logado=, ?toc=, ?preview=) — usada pelo WhatsApp e
	// pelo share nativo.
	const shareUrl = `/conteudo?post=${activePost.slug}`

	const [leituraOpen, setLeituraOpen] = useState(previewIncentive === 'leitura')
	const [downloadOpen, setDownloadOpen] = useState(previewIncentive === 'download')
	const [newsletterOpen, setNewsletterOpen] = useState(previewIncentive === 'newsletter')

	useEffect(() => {
		if (!isConteudoRoute || logado || previewIncentive) return
		if (!shouldShowPassiveIncentive()) return

		let ticking = false

		function evaluate() {
			const scrollable = document.documentElement.scrollHeight - document.documentElement.clientHeight
			if (scrollable > 0 && window.scrollY / scrollable >= 0.5) {
				markPassiveShown()
				setLeituraOpen(true)
				window.removeEventListener('scroll', onScroll)
			}
			ticking = false
		}

		function onScroll() {
			if (!ticking) {
				requestAnimationFrame(evaluate)
				ticking = true
			}
		}

		window.addEventListener('scroll', onScroll, { passive: true })
		evaluate()
		return () => window.removeEventListener('scroll', onScroll)
	}, [isConteudoRoute, logado, previewIncentive])

	function handleLeituraCreateAccount() {
		suppressPassiveFor7Days()
		setLeituraOpen(false)
		navigate('/cadastro?step=1&returnTo=%2Fconteudo')
	}

	function handleLeituraLogin() {
		suppressPassiveFor7Days()
		setLeituraOpen(false)
		navigate('/login?returnTo=%2Fconteudo')
	}

	function handleLeituraDismiss() {
		suppressPassiveFor7Days()
		setLeituraOpen(false)
	}

	function handleDownloadCreateAccount() {
		setDownloadOpen(false)
		navigate('/cadastro?step=1&intent=download&returnTo=%2Fconteudo')
	}

	function handleDownloadLogin() {
		setDownloadOpen(false)
		navigate('/login?intent=download&returnTo=%2Fconteudo')
	}

	function handleDownloadDismiss() {
		setDownloadOpen(false)
	}

	function handleNewsletterCreateAccount() {
		setNewsletterOpen(false)
		navigate('/cadastro?step=1&intent=newsletter&returnTo=%2Fconteudo')
	}

	function handleNewsletterLogin() {
		setNewsletterOpen(false)
		navigate('/login?intent=newsletter&returnTo=%2Fconteudo')
	}

	function handleNewsletterDismiss() {
		setNewsletterOpen(false)
	}

	// Fase 2: <BannerDownload> vive no fluxo do corpo, no final por default —
	// separamos os blocos em duas fatias só quando a posição alternativa
	// ("após a introdução", isto é, antes do primeiro heading) está ativa.
	const introBreakIndex =
		DOWNLOAD_BLOCK_POSITION === 'apos-introducao' ? activePost.body.findIndex((b) => b.type === 'heading') : -1
	const introBlocks = introBreakIndex > -1 ? activePost.body.slice(0, introBreakIndex) : activePost.body
	const restBlocks = introBreakIndex > -1 ? activePost.body.slice(introBreakIndex) : []

	const downloadBanner = activePost.download ? (
		<PostDownloadBanner
			download={activePost.download}
			logado={logado}
			onRequestAccess={() => setDownloadOpen(true)}
		/>
	) : null

	return (
		<>
		<main className="bg-white">
			<HeaderDesktop activeCategory="food-service" {...headerUsuario} />

			{/* §2 — Ad 970×90 (Super Leaderboard) */}
			<section className="flex flex-col items-center py-6 w-full overflow-hidden">
				<AdFrame width={970} height={90} />
			</section>

			{/* §3 — Article + sidebar. Empilha abaixo de lg (1024px); vira grid 11 col a partir daí. */}
			<section className="w-full">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 flex flex-col lg:grid lg:grid-cols-11 gap-6 lg:items-start">
					<article className="lg:col-span-7 flex flex-col items-start min-w-0">
						<div className="flex flex-col gap-8 w-full">
							<div className="flex flex-col gap-4 w-full">
								<Categoria
									color="saffron"
									label={activePost.kicker}
									href="/categoria"
									className="inline-block py-3.5 -my-3.5"
								/>
								<h1 className="font-display font-bold text-display-sm text-primary-600">
									{activePost.title}
								</h1>
								{activePost.subtitle ? (
									<p className="font-body text-body-lg text-neutral-900 tracking-[0.5px]">
										{activePost.subtitle}
									</p>
								) : null}
							</div>

							<div className="flex flex-wrap gap-4 lg:gap-8 items-center w-full">
								<AuthorshipRow
									authors={activePost.authors}
									publishedAt={activePost.publishedAt}
									updatedAt={activePost.updatedAt}
								/>

								{/* `max-w-full overflow-x-auto` (scroll horizontal) saiu daqui: era pros 6
								    ícones antigos (print/whatsapp/linkedin/facebook/twitter/share), que já
								    nem existem mais — com só 3 nunca precisou de scroll. Mantinha, o overflow-x
								    força overflow-y:auto também (regra do CSS quando só um eixo é != visible),
								    cortando o Tooltip (absolute, mt-2 abaixo do ícone) que passa da altura da
								    própria linha. */}
								<div className="flex gap-1 items-center shrink-0">
									{/* Bookmark: primeiro da fila, sempre visível (sem regra de hover —
									    isso é do card, aqui a página é única). surface="default" pra
									    ter o mesmo peso visual dos vizinhos (nenhum destaque de cor). */}
									<FavoritoToggle
										pressed={favoritoToggle.pressed}
										onPressedChange={favoritoToggle.onPressedChange}
										size="medium"
										surface="default"
									/>
									<Tooltip label="Enviar">
										<IconButton
											icon="whatsapp"
											label="WhatsApp"
											type="ghost"
											size="medium"
											href={whatsappShareHref(activePost.title, shareUrl)}
											target="_blank"
										/>
									</Tooltip>
									<Tooltip label="Compartilhar">
										<IconButton
											icon="share"
											label="Compartilhar"
											type="ghost"
											size="medium"
											onClick={() => compartilharConteudo(activePost.title, shareUrl)}
										/>
									</Tooltip>
								</div>
							</div>
						</div>

						{activePost.audioVersion && activePost.media?.kind !== 'podcast' ? (
							<div className="mt-6 w-full">
								<AudioVersionBlock durationSec={activePost.audioVersion.durationSec} />
							</div>
						) : null}

						{activePost.aiSummary ? (
							<div className="mt-6 w-full">
								<AiSummaryBlock
									bullets={activePost.aiSummary.bullets}
									disclaimer={activePost.aiSummary.disclaimer}
								/>
							</div>
						) : null}

						{activePost.media?.kind === 'video' ? (
							<div className="mt-6 w-full">
								<div className="relative w-full aspect-video rounded-sm overflow-hidden bg-neutral-950">
									<img
										src={picsumSrc(`${activePost.slug}-video`, 1408, 792)}
										alt=""
										className="w-full h-full object-cover opacity-70"
									/>
									<div className="absolute inset-0 flex items-center justify-center">
										<PlayButton as="div" size="xlarge" />
									</div>
									<div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
										<p className="font-body font-semibold text-body-md text-white">
											{activePost.media.title}
										</p>
									</div>
								</div>
							</div>
						) : (
							<div className="mt-6 w-full">
								<Thumbnail
									src={picsumSrc(activePost.slug, 1408, 939)}
									alt="Imagem de destaque"
									ratio="photo"
								/>
							</div>
						)}

						<div className="mt-6 w-full">
							{tocVariant === 'margem' ? (
								<TableOfContentsMargin headings={activePost.headings} />
							) : tocVariant === 'pill' ? (
								<TableOfContents headings={activePost.headings} />
							) : (
								<TableOfContentsIcon headings={activePost.headings} />
							)}
						</div>

						<div className="mt-6 flex flex-col gap-9 w-full">
							{introBlocks.map((block, i) => (
								<ContentBlockView key={block.type === 'heading' ? block.id : i} block={block} />
							))}

							{DOWNLOAD_BLOCK_POSITION === 'apos-introducao' ? downloadBanner : null}

							{restBlocks.map((block, i) => (
								<ContentBlockView key={block.type === 'heading' ? block.id : `rest-${i}`} block={block} />
							))}

							{DOWNLOAD_BLOCK_POSITION === 'fim-do-corpo' ? downloadBanner : null}
						</div>

						<div className="py-10 flex flex-col gap-2 w-full">
							<p className="font-display font-bold text-title-md text-neutral-950">Temas</p>
							<div className="flex flex-wrap gap-2">
								{ARTICLE_TAGS.map((t) => (
									<Tag key={t} label={t} href="/categoria" />
								))}
							</div>
						</div>
					</article>

					{/* Sidebar — só Em Alta, Newsletter e anúncio (Download saiu, ver GATE 2). Empilha abaixo do artigo em <lg. */}
					<aside className="lg:col-span-4 flex flex-col items-center lg:items-start gap-10">
						{/* Widget Em Alta */}
						<WidgetEmAlta
							items={EM_ALTA.map((title) => ({ title }))}
							className="max-w-[392px]"
						/>

						{/* Banner Newsletter — mesmo componente da home, layout `sidebar`. Nomeia a
						    newsletter porque, para o logado, o clique já assina (um clique = um
						    consentimento LGPD específico). Deslogado, o `returnTo` leva a matéria
						    junto: quem entrar pelo lembrete do formulário volta PARA ESTA leitura,
						    não para a home nem para o formulário. */}
						<BannerNewsletter
							variant="sidebar"
							className="max-w-[392px]"
							image={picsumSrc('newsletter', 600, 400)}
							title={`Assine a newsletter ${NEWSLETTER_DO_PORTAL.title}`}
							description="Fique ligado nas inovações, estratégias e oportunidades do setor com conteúdos selecionados pelo Food Connection."
							ctaLabel="Assine agora"
							ctaHref={
								logado
									? newsletter.tabHref
									: `/form-newsletter?returnTo=${encodeURIComponent(`/conteudo?post=${activePost.slug}`)}`
							}
							onCtaClick={logado ? newsletter.assinar : undefined}
							state={newsletter.state}
						/>

						{/* Ad 300×250 */}
						<div className="bg-white p-4 flex justify-center w-full overflow-hidden">
							<AdFrame width={300} height={250} />
						</div>
					</aside>
				</div>
			</section>

			{/* §4 — Veja também */}
			<section className="w-full mt-10">
				<SectionTitle label="Veja também" color="primary-600" />
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 pt-6 pb-10 flex flex-wrap gap-x-6 gap-y-8">
					{VEJA_TAMBEM.map((card) => (
						<NewsCard
							key={card.id}
							contentId={card.id}
							size="small"
							orientation="vertical"
							title={card.title}
							image={picsumSrc(card.seed, 600, 338)}
							href="/conteudo"
							categoria={{ label: card.category, color: card.categoryColor, href: '/categoria' }}
							className="flex-1 min-w-[288px]"
						/>
					))}
				</div>
			</section>

			{/* §5 — Ad 728×90 */}
			<section className="flex flex-col items-center py-6 w-full overflow-hidden">
				<AdFrame width={728} height={90} />
			</section>

			<FooterDesktop />
		</main>

		{!logado ? (
			<>
				<IncentiveBanner
					open={leituraOpen}
					icon="description"
					title="Gostando da"
					titleHighlight="leitura?"
					description="Crie uma conta gratuita para acessar mais conteúdos como este e receber nossas newsletters."
					backgroundImage={incentiveBannerTexture}
					onCreateAccount={handleLeituraCreateAccount}
					onLogin={handleLeituraLogin}
					onDismiss={handleLeituraDismiss}
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

		{/* Modal de auth do favoritar — mesmo IncentiveDownloadDialog do gatilho de
		    download (ver NewsCard/CategoryColumn), `open` já é interno a
		    favoritoAuthModal e só liga quando deslogado clica; não depende do
		    bloco `!logado` acima. */}
		<IncentiveDownloadDialog
			open={favoritoAuthModal.open}
			onDismiss={favoritoAuthModal.onDismiss}
			onCreateAccount={favoritoAuthModal.onCreateAccount}
			onLogin={favoritoAuthModal.onLogin}
			icon="favorite"
			title={
				<>
					<span className="font-bold text-secondary-500">Salve</span> este conteúdo na sua biblioteca
				</>
			}
			body="Crie sua conta para guardar conteúdos e encontrá-los depois, e receber recomendações do seu setor."
		/>

		{showNewsletterToast ? (
			<div className="fixed bottom-6 right-6 z-50">
				<Toast type="success" message="Inscrição confirmada." />
			</div>
		) : null}

		</>
	)
}

/**
 * Fase 2: assinatura de autoria — mesmo componente suporta 1 ou N autores
 * (regra do briefing: N>=2 vira avatar stack + "Nome e outros N").
 */
function AuthorshipRow({
	authors,
	publishedAt,
	updatedAt,
}: {
	authors: Author[]
	publishedAt: string
	updatedAt?: string
}) {
	const [firstAuthor, ...otherAuthors] = authors
	const dateLabel = format(new Date(publishedAt), "dd/MM/yyyy HH'h'mm", { locale: ptBR })
	const updatedLabel = updatedAt ? formatDistanceToNowStrict(new Date(updatedAt), { locale: ptBR }) : null

	return (
		<div className="flex items-center gap-3 flex-1">
			{otherAuthors.length > 0 ? (
				<AvatarStack authors={authors} />
			) : (
				<Avatar src={firstAuthor.avatarUrl} alt={firstAuthor.name} shape="rounded" className="size-10" />
			)}
			<div className="flex flex-col gap-1">
				<div className="flex flex-wrap gap-x-1 gap-y-0.5 items-center">
					<span className="font-body font-semibold text-label-lg text-neutral-900">Por</span>
					<a
						href="/categoria"
						className="inline-block py-3 -my-3 font-body font-bold text-label-lg text-secondary-950 hover:underline"
					>
						{firstAuthor.name}
					</a>
					{otherAuthors.length > 0 ? (
						<span className="font-body font-semibold text-label-lg text-neutral-900">
							e outros {otherAuthors.length}
						</span>
					) : null}
				</div>
				<div className="flex gap-1 items-center font-body font-semibold text-label-md text-neutral-900">
					<span>{dateLabel}</span>
					{updatedLabel ? (
						<>
							<span>•</span>
							<span>Atualizado há {updatedLabel}</span>
						</>
					) : null}
				</div>
			</div>
		</div>
	)
}

/** Fase 2: <BannerDownload> no fluxo do conteúdo — substitui o card da sidebar. */
function PostDownloadBanner({
	download,
	logado,
	onRequestAccess,
}: {
	download: NonNullable<Post['download']>
	logado: boolean
	onRequestAccess: () => void
}) {
	const gated = !logado && download.requiresAuth

	// Com acesso, sem handler: a âncora com `download` baixa nativamente e quem confirma é
	// o navegador. Gateado, `onCtaClick` intercepta e abre o modal de incentivo — o href
	// fica inerte de propósito, porque o material não pode ser servido sem conta.
	return (
		<BannerDownload
			title={download.title}
			description={download.description}
			ctaLabel={download.ctaLabel}
			ctaHref={gated ? '#' : ARQUIVO_EXEMPLO_URL}
			ctaDownload={gated ? undefined : nomeArquivoDownload(download.title)}
			onCtaClick={gated ? onRequestAccess : undefined}
		/>
	)
}

function ContentBlockView({ block }: { block: ContentBlock }) {
	switch (block.type) {
		case 'paragraph':
			return <p className="font-body text-body-xl text-neutral-950">{block.text}</p>

		case 'heading':
			return block.level === 2 ? (
				<h2
					id={block.id}
					className="font-display font-bold text-headline-lg text-primary-600 scroll-mt-24"
				>
					{block.text}
				</h2>
			) : (
				<h3
					id={block.id}
					className="font-display font-bold text-headline-md text-primary-600 scroll-mt-24"
				>
					{block.text}
				</h3>
			)

		case 'image':
			return (
				<figure className="w-full">
					<div className="aspect-video rounded-sm overflow-hidden bg-neutral-100">
						<img src={block.src} alt={block.alt} className="w-full h-full object-cover" />
					</div>
					{block.caption ? (
						<figcaption className="font-body font-semibold text-body-sm text-neutral-900 mt-2">
							{block.caption}
						</figcaption>
					) : null}
				</figure>
			)

		case 'highlight':
			return (
				<blockquote className="border-l-4 border-neutral-50 pl-8 py-6 font-display text-title-xl text-primary-600">
					{block.text}
				</blockquote>
			)
	}
}
