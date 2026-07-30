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
import { Button } from '~/components/button'
import { Categoria } from '~/components/categoria'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { IconButton } from '~/components/icon-button'
import type { IconName } from '~/components/icon/paths'
import { IncentiveBanner } from '~/components/incentive-banner'
import { IncentiveDownloadDialog } from '~/components/incentive-download-dialog'
import { IncentiveNewsletterDialog } from '~/components/incentive-newsletter-dialog'
import { NewsCard } from '~/components/news-card'
import { PlayButton } from '~/components/play-button'
import { SectionTitle } from '~/components/section-title'
import { TableOfContents } from '~/components/table-of-contents'
import { Tag } from '~/components/tag'
import { Thumbnail } from '~/components/thumbnail'
import { Toast } from '~/components/toast'
import { WidgetEmAlta } from '~/components/widget-em-alta'
import { getPostByScenario, POSTS_BY_SCENARIO } from '~/fixtures/posts'
import { markPassiveShown, shouldShowPassiveIncentive, suppressPassiveFor7Days } from '~/lib/incentive-storage'
import { useLogado } from '~/lib/use-logado'
import { ARTICLE_TAGS, EM_ALTA, picsumSrc, VEJA_TAMBEM } from '~/mocks/articles'
import type { Author, ContentBlock, Post } from '~/types/post'

const SHARE_ICONS: Array<{ icon: IconName; label: string }> = [
	{ icon: 'print', label: 'Imprimir' },
	{ icon: 'whatsapp', label: 'WhatsApp' },
	{ icon: 'linkedin', label: 'LinkedIn' },
	{ icon: 'facebook', label: 'Facebook' },
	{ icon: 'twitter', label: 'Twitter' },
	{ icon: 'share', label: 'Compartilhar' },
]

// Fase 2 (briefing pagina-conteudo-toc) — decisão pendente de validação com
// Pedro/Micaelly (ver GATE 2): posição default é o final do corpo; troque
// para 'apos-introducao' para testar a alternativa.
const DOWNLOAD_BLOCK_POSITION: 'fim-do-corpo' | 'apos-introducao' = 'fim-do-corpo'

/**
 * Tela: Conteúdo — Página interna de artigo
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=4179-32002
 */
export default function ConteudoScreen() {
	const [params] = useSearchParams()
	const logado = useLogado()
	const isConteudoRoute = useLocation().pathname === '/conteudo'
	const navigate = useNavigate()
	const showDownloadToast = params.get('toast') === 'download-started'
	const showNewsletterToast = params.get('toast') === 'newsletter-subscribed'
	const previewIncentive = params.get('preview')

	const activePost = getPostByScenario(params.get('scenario'))

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
			<HeaderDesktop activeCategory="food-service" />

			{/* §2 — Ad 970×250 */}
			<section className="flex flex-col items-center py-6 w-full overflow-hidden">
				<AdFrame width={970} height={250} />
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

								<div className="flex gap-1 items-center shrink-0 max-w-full overflow-x-auto">
									{SHARE_ICONS.map((s) => (
										<IconButton
											key={s.icon}
											icon={s.icon}
											type="ghost"
											size="large"
											label={s.label}
											href="/categoria"
										/>
									))}
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
							<TableOfContents headings={activePost.headings} />
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
									<Tag key={t} label={t} href="/categoria" className="py-3 -my-2" />
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

						{/* Banner Newsletter */}
						<div className="bg-primary-100 flex flex-col items-start overflow-hidden rounded-sm w-full max-w-[392px]">
							<div className="aspect-[3/2] w-full overflow-hidden bg-secondary-50">
								<img
									src={picsumSrc('newsletter', 600, 400)}
									alt="Newsletter"
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="flex flex-col gap-4 pt-8 pb-4 px-6 text-primary-600">
								<h3 className="font-display font-bold text-headline-sm">
									Assine nossa Newsletter e fique por dentro de tudo do setor alimentício
								</h3>
								<p className="font-body text-body-lg">
									Fique ligado nas inovações, estratégias e oportunidades do setor com
									conteúdos selecionados pelo Food Connection.
								</p>
							</div>
							<div className="pt-4 pb-8 px-6 w-full">
								<Button
									label="Assine agora"
									href={logado ? '/dashboard-perfil-v4?tab=newsletter' : '/form-newsletter'}
									type="filled"
									size="large"
									className="w-full"
								/>
							</div>
						</div>

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

		<ScenarioDebugPanel post={activePost} />
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

	return (
		<BannerDownload
			title={download.title}
			description={download.description}
			ctaLabel={download.ctaLabel}
			ctaHref="#"
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

/**
 * Painel de depuração da Fase 1 (briefing pagina-conteudo-toc) — confirma qual
 * fixture o `?scenario=` resolveu, para o gate de aprovação. Não faz parte do
 * design final; sai quando o TOC (Fase 5) fechar o briefing.
 */
function ScenarioDebugPanel({ post }: { post: Post }) {
	const scenarios = Object.keys(POSTS_BY_SCENARIO)

	return (
		<div className="fixed bottom-4 left-4 z-50 max-w-sm bg-neutral-950/95 text-white rounded-lg shadow-lg p-4 font-body text-label-md flex flex-col gap-3">
			<div>
				<p className="font-bold text-label-lg">Fixture ativa: {post.slug}</p>
				<dl className="mt-1 flex flex-col gap-0.5 text-neutral-100">
					<div className="flex gap-1">
						<dt className="font-semibold">Autores:</dt>
						<dd>{post.authors.map((a) => a.name).join(', ')}</dd>
					</div>
					<div className="flex gap-1">
						<dt className="font-semibold">Mídia:</dt>
						<dd>{post.media?.kind ?? 'nenhuma'}</dd>
					</div>
					<div className="flex gap-1">
						<dt className="font-semibold">Áudio (TTS):</dt>
						<dd>{post.audioVersion ? 'presente' : 'ausente'}</dd>
					</div>
					<div className="flex gap-1">
						<dt className="font-semibold">Download:</dt>
						<dd>{post.download ? 'presente' : 'ausente'}</dd>
					</div>
					<div className="flex gap-1">
						<dt className="font-semibold">Resumo IA:</dt>
						<dd>{post.aiSummary ? `${post.aiSummary.bullets.length} bullets` : 'ausente'}</dd>
					</div>
					<div className="flex gap-1">
						<dt className="font-semibold">Headings:</dt>
						<dd>{post.headings.length}</dd>
					</div>
				</dl>
			</div>
			<div className="flex flex-wrap gap-1.5 border-t border-white/20 pt-3">
				{scenarios.map((key) => (
					<a
						key={key}
						href={`/conteudo?scenario=${key}`}
						className={`px-2 py-1 rounded-full transition-colors ${
							key === post.slug ? 'bg-white text-primary-600' : 'bg-white/10 hover:bg-white/20'
						}`}
					>
						{key}
					</a>
				))}
			</div>
		</div>
	)
}
