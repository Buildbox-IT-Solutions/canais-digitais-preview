import { Divider } from '~/components/divider'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { NewsCard } from '~/components/news-card'
import { SectionTitle } from '~/components/section-title'
import { picsumSrc, VEJA_TAMBEM } from '~/mocks/articles'

/**
 * Tela: Sobre — Página institucional
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=4951-50343
 */
export default function SobreScreen() {
	return (
		<main className="bg-white">
			<HeaderDesktop />

			<section className="w-full">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 flex justify-center">
					<article className="w-[704px] py-10">
						<h1 className="font-display font-bold text-display-sm text-primary-600 mb-6">
							Sobre
						</h1>

						<div className="w-full rounded-sm overflow-hidden mb-8">
							<img
								src={picsumSrc('sobre-banner', 1408, 268)}
								alt="Banner Saúde Business"
								className="w-full h-auto object-cover"
							/>
						</div>

						<div className="flex flex-col gap-6 font-body text-body-lg text-neutral-900 tracking-[0.5px] leading-relaxed">
							<p className="font-display font-bold text-title-xl text-primary-600">
								Juntos para fomentar boas práticas de gestão e tecnologia em saúde.
							</p>

							<p>
								Formar e informar o executivo de saúde é o que fazemos todos os dias. Há mais
								de 20 anos desenvolvemos conteúdos voltados para os principais gestores do
								país, acompanhando as notícias e tendências que impactam no dia a dia dos
								hospitais, operadoras, centros diagnósticos, farmacêuticas, healthtechs e muito
								de saúde.
							</p>

							<p>
								Hoje, o Portal Saúde Business é uma das iniciativas de Healthcare Business
								Unit (HBU) na Informa Markets e nossa organização de eventos de negócio da
								saúde.
							</p>

							<h2 className="font-display font-bold text-title-xl text-primary-600 mt-2">
								Como podemos transformar o setor?
							</h2>

							<p>
								Acreditamos na inovação e no impacto da co-criação de conteúdos relevantes e
								trocas de experiências entre profissionais do setor de saúde. Presencialmente
								e virtualmente, a combinação desse saber em nossos eventos:{' '}
								<strong>Hospitalar</strong>, <strong>Saúde Business Forum (SBF)</strong> e{' '}
								<strong>Healthcare Innovation Show (HIS)</strong>.
							</p>

							<p>
								Ao longo das últimas décadas, nossos eventos geraram milhares de oportunidades
								de negócio para clientes, parceiros e congressistas.{' '}
								<a href="/anuncie" className="font-bold text-secondary-950 hover:underline">
									Saiba mais sobre como sua marca pode impactar um público segmentado e
									qualificado por meio de projetos de conexão.
								</a>
							</p>

							<p>
								Com uma vasta experiência no setor de saúde e nas melhores práticas de
								divulgação e promoção de eventos, a equipe por trás do Portal Saúde Business
								cuida para informar, analisar, projetar e incentivar o desenvolvimento dos
								negócios de saúde.{' '}
								<a href="/contato" className="font-bold text-secondary-950 hover:underline">
									Conheça nossa equipe editorial.
								</a>
							</p>
						</div>

						<div className="w-full rounded-sm overflow-hidden mt-8 mb-6">
							<img
								src={picsumSrc('sobre-banner2', 1408, 268)}
								alt="Banner eventos"
								className="w-full h-auto object-cover"
							/>
						</div>

						<div className="flex flex-col gap-4">
							<p className="font-body text-body-sm text-neutral-700">
								Todos os direitos reservados. É proibida qualquer forma de reutilização,
								distribuição, reprodução ou publicação parcial ou total deste conteúdo sem
								prévia autorização da Informa Markets.
							</p>
							<Divider />
						</div>
					</article>
				</div>
			</section>

			<section className="w-full">
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
