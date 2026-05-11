import { AdFrame } from '~/components/ad-frame'
import { Avatar } from '~/components/avatar'
import { Button } from '~/components/button'
import { Categoria } from '~/components/categoria'
import { Divider } from '~/components/divider'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { IconButton } from '~/components/icon-button'
import type { IconName } from '~/components/icon/paths'
import { SectionTitle } from '~/components/section-title'
import { Tag } from '~/components/tag'
import { Thumbnail } from '~/components/thumbnail'
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
	return (
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
						<div className="bg-neutral-50 border border-neutral-100 flex flex-col items-start overflow-hidden pb-4 rounded-lg w-full max-w-[392px]">
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
						</div>

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
									href="#"
									type="filled"
									size="large"
								/>
							</div>
						</div>

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
						<article
							key={card.id}
							className="group flex flex-col gap-3 flex-1 min-w-[288px]"
						>
							<Thumbnail
								src={picsumSrc(card.seed, 600, 338)}
								alt="Capa"
								href="/conteudo"
								ratio="video"
							/>
							<div className="flex flex-col gap-2">
								<Categoria color={card.categoryColor} label={card.category} href="/categoria" />
								<h3 className="text-title-lg font-display font-bold text-primary-600 leading-tight">
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

			{/* §5 — Ad 728×90 */}
			<section className="flex flex-col items-center py-6 w-full">
				<AdFrame width={728} height={90} />
			</section>

			<FooterDesktop />
		</main>
	)
}
