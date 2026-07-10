import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import incentiveBannerTexture from '~/assets/images/incentive-banner-texture.png'
import { AdFrame } from '~/components/ad-frame'
import { Avatar } from '~/components/avatar'
import { Button } from '~/components/button'
import { Categoria } from '~/components/categoria'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { Icon } from '~/components/icon'
import { IconButton } from '~/components/icon-button'
import type { IconName } from '~/components/icon/paths'
import { IncentiveBanner } from '~/components/incentive-banner'
import { IncentiveDownloadDialog } from '~/components/incentive-download-dialog'
import { NewsCard } from '~/components/news-card'
import { SectionTitle } from '~/components/section-title'
import { Tag } from '~/components/tag'
import { Thumbnail } from '~/components/thumbnail'
import { Toast } from '~/components/toast'
import { WidgetEmAlta } from '~/components/widget-em-alta'
import { markPassiveShown, shouldShowPassiveIncentive, suppressPassiveFor7Days } from '~/lib/incentive-storage'
import { useLogado } from '~/lib/use-logado'
import { ARTICLE_TAGS, EM_ALTA, picsumSrc, VEJA_TAMBEM } from '~/mocks/articles'

const SHARE_ICONS: Array<{ icon: IconName; label: string }> = [
	{ icon: 'print', label: 'Imprimir' },
	{ icon: 'whatsapp', label: 'WhatsApp' },
	{ icon: 'linkedin', label: 'LinkedIn' },
	{ icon: 'facebook', label: 'Facebook' },
	{ icon: 'twitter', label: 'Twitter' },
	{ icon: 'share', label: 'Compartilhar' },
]

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

	const [leituraOpen, setLeituraOpen] = useState(false)
	const [downloadOpen, setDownloadOpen] = useState(false)

	useEffect(() => {
		if (!isConteudoRoute || logado) return
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
	}, [isConteudoRoute, logado])

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

	return (
		<>
		<main className="bg-white">
			<HeaderDesktop activeCategory="food-service" />

			{/* §2 — Ad 970×250 */}
			<section className="flex flex-col items-center py-6 w-full">
				<AdFrame width={970} height={250} />
			</section>

			{/* §3 — Article + sidebar */}
			<section className="w-full">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 grid grid-cols-11 gap-6 items-start">
					<article className="col-span-7 flex flex-col items-start">
						<div className="flex flex-col gap-8 w-full">
							<div className="flex flex-col gap-4 w-full">
								<Categoria color="saffron" label="Food Service" href="/categoria" />
								<h1 className="font-display font-bold text-display-sm text-primary-600">
									Análise sensorial com IA: como funciona, aplicações na indústria de
									alimentos
								</h1>
								<p className="font-body text-body-lg text-neutral-900 tracking-[0.5px]">
									A análise sensorial com IA combina sensores digitais e algoritmos para
									avaliar sabor, aroma e textura em alimentos.
								</p>
							</div>

							<div className="flex gap-8 items-center w-full">
								<div className="flex items-center gap-2 flex-1">
									<Avatar
										src="https://i.pravatar.cc/80?img=12"
										alt="Redação Food Connection"
										shape="rounded"
										className="size-10"
									/>
									<div className="flex flex-col gap-1">
										<div className="flex flex-wrap gap-x-1 gap-y-0.5 items-center">
											<span className="font-body font-semibold text-label-lg text-neutral-900">
												Por
											</span>
											<a
												href="/categoria"
												className="font-body font-bold text-label-lg text-secondary-950 hover:underline"
											>
												Redação Food Connection
											</a>
										</div>
										<div className="flex gap-1 items-center font-body font-semibold text-label-md text-neutral-900">
											<span>dd/mm/aaaa 00h00</span>
											<span>•</span>
											<span>Atualizado há 22 horas</span>
										</div>
									</div>
								</div>

								<div className="flex gap-1 items-center shrink-0">
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

						<div className="mt-6 w-full">
							<Thumbnail
								src={picsumSrc('conteudo-hero', 1408, 939)}
								alt="Imagem de destaque"
								ratio="photo"
							/>
						</div>

						<div className="mt-6 flex flex-col gap-9 w-full">
							<p className="font-body text-body-xl text-neutral-950">
								A análise sensorial é uma metodologia essencial na indústria alimentícia
								para medir atributos como sabor, aroma, textura e aparência. Tradicionalmente,
								ela depende de painéis humanos treinados, o que traz limitações de escala e
								subjetividade.
							</p>
							<p className="font-body text-body-xl text-neutral-950">
								Com o avanço da inteligência artificial, sensores eletrônicos — como narizes
								e línguas artificiais — associados a algoritmos de machine learning estão
								transformando a forma como avaliamos alimentos. A IA permite processar
								milhares de amostras com consistência, identificando padrões sutis que o
								paladar humano pode perder.
							</p>

							<h2 className="font-display font-bold text-headline-lg text-primary-600">
								Como funciona a análise sensorial com IA
							</h2>
							<p className="font-body text-body-xl text-neutral-950">
								O processo envolve três etapas: coleta de dados sensoriais por meio de
								dispositivos eletrônicos, treinamento do modelo de IA com datasets rotulados
								por painelistas humanos, e inferência em tempo real sobre novas amostras.
							</p>

							<h2 className="font-display font-bold text-headline-lg text-primary-600">
								Áreas de aplicação na indústria
							</h2>
							<p className="font-body text-body-xl text-neutral-950">
								As aplicações abrangem controle de qualidade em linhas de produção,
								desenvolvimento de novos produtos, detecção de adulteração e monitoramento de
								shelf-life. Empresas como Nestlé e Danone já utilizam IA sensorial em escala
								para garantir consistência global de seus produtos.
							</p>

							<figure className="w-full">
								<div className="aspect-video rounded-sm overflow-hidden bg-neutral-100">
									<img
										src={picsumSrc('conteudo-inline', 1408, 792)}
										alt="Imagem no artigo"
										className="w-full h-full object-cover"
									/>
								</div>
								<figcaption className="font-body font-semibold text-body-sm text-neutral-900 mt-2">
									Sensores eletrônicos analisam amostras em laboratório de alimentos.
								</figcaption>
							</figure>

							<h2 className="font-display font-bold text-headline-lg text-primary-600">
								Desafios e futuro
							</h2>
							<p className="font-body text-body-xl text-neutral-950">
								Apesar dos avanços, a calibração dos sensores e a representatividade dos
								dados de treinamento continuam sendo desafios. O futuro aponta para modelos
								multimodais que combinam dados sensoriais, visuais e químicos para uma
								avaliação holística do alimento.
							</p>
							<p className="font-body text-body-xl text-neutral-950">
								A integração com blockchain para rastreabilidade sensorial e a
								personalização de sabor via digital twins são tendências que devem ganhar
								tração nos próximos anos.
							</p>
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

					{/* Sidebar */}
					<aside className="col-span-4 flex flex-col gap-10">
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
							<div className="pt-4 pb-8 px-6 w-full [&>a]:w-full">
								<Button
									label="Assine agora"
									href="/form-newsletter"
									type="filled"
									size="large"
								/>
							</div>
						</div>

						{/* Card Download */}
						{logado ? (
							<div className="bg-white border border-neutral-100 flex flex-col gap-6 items-start rounded-sm shadow-sm p-8 w-full max-w-[392px]">
								<div className="inline-flex items-center justify-center size-16 rounded-full bg-[#DCFCE7]">
									<Icon name="check" className="size-8 text-[#16A34A]" />
								</div>
								<div className="flex flex-col gap-2 w-full">
									<h3 className="font-display font-bold text-title-xl text-neutral-950">
										Tudo pronto!
									</h3>
									<p className="font-body text-body-md text-neutral-700">
										Seu material está pronto para baixar.
									</p>
								</div>
								<a
									href="#"
									className="bg-primary-600 inline-flex gap-3 items-center justify-center w-full h-12 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg"
								>
									<Icon name="download" className="size-6" />
									Baixar agora
								</a>
								<p className="font-body text-label-md text-neutral-500">
									Não é você?{' '}
									<a href="/home" className="font-bold text-secondary-950 hover:underline">
										Sair da conta
									</a>
									.
								</p>
							</div>
						) : (
							<div className="bg-primary-100 flex flex-col items-start overflow-hidden rounded-sm w-full max-w-[392px]">
								<div className="aspect-[3/2] w-full overflow-hidden bg-secondary-50">
									<img
										src={picsumSrc('material-capa', 392, 261)}
										alt="Capa do material"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="flex flex-col gap-4 pt-8 pb-4 px-6 text-primary-600">
									<h3 className="font-display font-bold text-title-lg">
										10 tendências em Food Service para 2026
									</h3>
									<p className="font-body text-body-md text-neutral-700">
										Baixe sem custo. Acesse com um clique e use todos os materiais.
									</p>
								</div>
								<div className="pt-4 pb-8 px-6 w-full">
									<Button
										label="Baixar material"
										onClick={() => setDownloadOpen(true)}
										type="filled"
										size="large"
										className="w-full"
									/>
								</div>
							</div>
						)}

						{/* Ad 300×250 */}
						<div className="bg-white p-4 flex justify-center">
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
			<section className="flex flex-col items-center py-6 w-full">
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
			</>
		) : null}

		{showDownloadToast ? (
			<div className="fixed bottom-6 right-6 z-50">
				<Toast type="success" message="Seu download começou." />
			</div>
		) : null}
		</>
	)
}
