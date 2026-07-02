import { Divider } from '~/components/divider'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { NewsCard } from '~/components/news-card'
import { SectionTitle } from '~/components/section-title'
import { picsumSrc, VEJA_TAMBEM } from '~/mocks/articles'

const STEPS = [
	{ num: '1', title: 'Conhecemos que desafios enfrentam nossos participantes de eventos.', img: 'anuncie-s1' },
	{ num: '2', title: 'Transformamos os dados desses ambientes de comportamento e preferências do compra.', img: 'anuncie-s2' },
	{ num: '3', title: 'Por meio da consultoria, compartilhamos a serviço de inteligência de conteúdo.', img: 'anuncie-s3' },
]

const VANTAGENS = [
	'Alta confiabilidade — Dados obtidos diretamente do nosso portal e eventos.',
	'Segmentação qualificada — Alcance o público certo com mais precisão.',
	'Maior conversão — Campanhas mais assertivas e eficazes.',
]

/**
 * Tela: Anuncie — Página comercial
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=4941-49088
 */
export default function AnuncieScreen() {
	return (
		<main className="bg-white">
			<HeaderDesktop />

			<section className="w-full">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 flex justify-center">
					<article className="w-[704px] py-10">
						<h1 className="font-display font-bold text-display-sm text-primary-600 mb-6">
							Anuncie no Portal Saúde Business!
						</h1>

						<div className="flex flex-col gap-4 font-body text-body-lg text-neutral-900 tracking-[0.5px] leading-relaxed mb-8">
							<p>
								O Saúde Business é o portal oficial de notícias do núcleo de saúde da Informa
								Markets e cobre os eventos Hospitalar, do Hospitalar Innovation Show — HIS e
								do Saúde Business Forum — SBF.
							</p>
							<p>
								Diariamente, trazemos atualizações, tendências, tudo o que acontece de mais
								relevante no mundo da saúde. Além disso, publicamos também artigos de
								especialistas, e-books, entrevistas e muito mais!
							</p>
						</div>

						<div className="w-full rounded-sm overflow-hidden mb-8">
							<img
								src={picsumSrc('anuncie-banner', 1408, 148)}
								alt="Soluções digitais Informa Markets"
								className="w-full h-auto object-cover"
							/>
						</div>

						<div className="flex flex-col gap-4 font-body text-body-lg text-neutral-900 tracking-[0.5px] leading-relaxed mb-8">
							<h2 className="font-display font-bold text-title-xl text-primary-600">
								Amplie sua presença no setor de saúde com as nossas soluções.
							</h2>
							<p>
								Maximize a audiência certa, posicione sua marca e gere leads qualificados com
								produtos digitais.
							</p>

							<h2 className="font-display font-bold text-title-xl text-primary-600 mt-4">
								O que é First-Party Data e por que ele é essencial para sua estratégia
								digital?
							</h2>
							<p>
								O First-Party Data são dados coletados diretamente pelos nossos eventos a
								partir de relacionamentos. Investir em soluções digitais com First-Party Data
								é a estratégia quando construir um estande: em ambos, você fica em público
								qualificado, criando contatos diretos e resultados reais.
							</p>

							<h3 className="font-display font-bold text-title-lg text-primary-600 mt-2">
								Vantagens
							</h3>
							<ul className="list-none space-y-1">
								{VANTAGENS.map((v) => (
									<li key={v} className="flex gap-2 items-start">
										<span className="text-secondary-500">✓</span> {v}
									</li>
								))}
							</ul>
						</div>

						<div className="flex flex-col gap-6 mb-8">
							<h2 className="font-display font-bold text-title-xl text-primary-600">
								Como funciona?
							</h2>
							<p className="font-body text-body-lg text-neutral-900">
								Nosso produto tem três etapas principais:
							</p>
							<div className="grid grid-cols-3 gap-6">
								{STEPS.map((s) => (
									<div key={s.num} className="flex flex-col items-center gap-3 text-center">
										<div className="size-[120px] rounded-full overflow-hidden bg-neutral-100">
											<img
												src={picsumSrc(s.img, 240, 240)}
												alt=""
												className="w-full h-full object-cover"
											/>
										</div>
										<p className="font-body text-body-md text-neutral-900">
											{s.num}. {s.title}
										</p>
									</div>
								))}
							</div>
						</div>

						<Divider />

						<div className="flex flex-col gap-6 py-8">
							<h2 className="font-display font-bold text-title-xl text-primary-600">
								Geração de Leads
							</h2>
							<div className="flex gap-6">
								<div className="flex-1 rounded-sm overflow-hidden bg-secondary-950 aspect-video">
									<img
										src={picsumSrc('anuncie-leads1', 600, 338)}
										alt="Meetings"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="flex-1 flex flex-col gap-2 justify-center">
									<p className="font-display font-bold text-title-lg text-primary-600">
										Transformamos conexões em clientes e oportunidades em resultados!
									</p>
									<p className="font-body text-body-md text-neutral-900">
										Com nossos produtos de geração de leads, você vai estar qualificado e
										expor seu negócio ao próximo nível.
									</p>
								</div>
							</div>
							<div className="flex gap-6">
								<div className="flex-1 flex flex-col gap-2 justify-center">
									<p className="font-display font-bold text-title-lg text-primary-600">
										Destaque-se no setor de seu público!
									</p>
									<p className="font-body text-body-md text-neutral-900">
										Fortaleça sua relação com o público autoridade com nossas soluções de
										awareness e marketing.
									</p>
								</div>
								<div className="flex-1 rounded-sm overflow-hidden bg-secondary-950 aspect-video">
									<img
										src={picsumSrc('anuncie-leads2', 600, 338)}
										alt="Entrevistas e artigos"
										className="w-full h-full object-cover"
									/>
								</div>
							</div>
						</div>

						<Divider />

						<div className="flex flex-col gap-6 py-8 items-center">
							<h2 className="font-display font-bold text-title-xl text-primary-600 w-full">
								Quem já aposta em nossos produtos digitais:
							</h2>
							<div className="flex items-center justify-center py-4 w-full">
								<span className="font-display font-bold text-headline-md text-neutral-300">
									athie | wohnrath
								</span>
							</div>
						</div>

						<Divider />

						<div className="py-8">
							<blockquote className="border-l-4 border-secondary-500 pl-6 py-2 mb-6">
								<p className="font-body text-body-lg text-neutral-900 italic">
									"Se sua marca quer ser referência na saúde, o Saúde Business é o caminho!
									Aqui, você se conecta ao universo da saúde com informação e estratégia,
									inovação e tendências que movem o setor."
								</p>
							</blockquote>
						</div>

						<div className="w-full rounded-sm overflow-hidden mb-8">
							<img
								src={picsumSrc('anuncie-bottom', 1408, 738)}
								alt="Soluções digitais"
								className="w-full h-auto object-cover"
							/>
						</div>

						<div className="flex flex-col gap-2 font-body text-body-lg text-neutral-900">
							<p>
								Entre em contato para conferir melhor as oportunidades de visibilidade para
								sua marca.
							</p>
							<p className="font-bold text-primary-600 mt-2">Maria Catharina Teixeira</p>
							<p>
								<a
									href="mailto:mariacatharina.teixeira@informa.com"
									className="font-bold text-secondary-950 hover:underline"
								>
									mariacatharina.teixeira@informa.com
								</a>
							</p>
							<p>(11) 8175-7466</p>
						</div>
					</article>
				</div>
			</section>

			<section className="w-full mt-10">
				<SectionTitle label="Veja também" color="primary-600" />
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 pt-6 pb-10 flex flex-wrap gap-x-6 gap-y-8">
					{VEJA_TAMBEM.map((card) => (
						<NewsCard
							key={card.id}
							size="small"
							title={card.title}
							image={picsumSrc(card.seed, 600, 338)}
							href="/conteudo"
							categoria={{ label: card.category, color: card.categoryColor }}
							className="flex-1 min-w-[288px]"
						/>
					))}
				</div>
			</section>

			<FooterDesktop />
		</main>
	)
}
