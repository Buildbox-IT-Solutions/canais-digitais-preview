import { Avatar } from '~/components/avatar'
import { Categoria } from '~/components/categoria'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { SectionTitle } from '~/components/section-title'
import { Thumbnail } from '~/components/thumbnail'
import { CONTATO_EQUIPE_DIGITAL, picsumSrc, VEJA_TAMBEM } from '~/mocks/articles'

/**
 * Tela: Contato — Página institucional
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=4935-30241
 */
export default function ContatoScreen() {
	return (
		<main className="bg-white">
			<HeaderDesktop />

			<section className="w-full">
				<div className="max-w-screen-xl mx-auto px-4 lg:px-6 flex justify-center">
					<article className="w-[704px] py-10">
						<h1 className="font-display font-bold text-display-sm text-primary-600 mb-6">
							Contato
						</h1>

						<div className="flex flex-col gap-4 font-body text-body-lg text-neutral-900 tracking-[0.5px] leading-relaxed">
							<p>
								Formar e informar o executivo de saúde é o que fazemos todos os dias. Somos
								profundamente conectados com os principais gestores do país, acompanhando as
								notícias e tendências que impactam no dia a dia dos hospitais, operadoras,
								centros diagnósticos, farmacêuticas e muitos de saúde.
							</p>
							<p>
								As pautas para o portal Saúde Business derivam de veículos para o mercado B2B,
								então oferecemos para o gestor executivo em saúde — consultórios, hospitais,
								laboratórios, clínicas, operadoras, indústrias, distribuição e varejo
								farmacêutico — conteúdo de relevância, ciência, inovação e abordagem
								inteligente para seus negócios.
							</p>
							<p>
								Para sugestões de pauta e envio de releases, entre em contato:{' '}
								<a
									href="mailto:saudebusiness@informa.com"
									className="font-bold text-secondary-950 hover:underline"
								>
									saudebusiness@informa.com
								</a>
							</p>
						</div>

						<div className="mt-10">
							<h2 className="font-display font-bold text-title-xl text-primary-600 mb-6">
								Equipe de conteúdo digital
							</h2>

							{CONTATO_EQUIPE_DIGITAL.map((p, i) => (
								<div
									key={p.email}
									className={`flex gap-6 items-start py-6 ${i > 0 ? 'border-t border-neutral-100' : ''}`}
								>
									<div className="shrink-0">
										<Avatar
											src={`https://i.pravatar.cc/192?img=${p.img}`}
											alt={p.name}
											shape="rounded"
											className="size-24"
										/>
									</div>
									<div className="flex flex-col gap-2 flex-1 min-w-0">
										<p className="font-display font-bold text-title-lg text-primary-600">
											{p.name}
										</p>
										<p className="font-body font-semibold text-body-md text-neutral-900">
											{p.role}
										</p>
										<p className="font-body text-body-md text-neutral-900">{p.bio}</p>
										<p className="font-body text-body-md text-neutral-900">
											E-mail:{' '}
											<a
												href={`mailto:${p.email}`}
												className="font-bold text-secondary-950 hover:underline"
											>
												{p.email}
											</a>
										</p>
									</div>
								</div>
							))}
						</div>

						<div className="mt-10">
							<h2 className="font-display font-bold text-title-xl text-primary-600 mb-6">
								Equipe de conteúdo para eventos
							</h2>

							<div className="flex gap-6 items-start py-6">
								<div className="shrink-0">
									<Avatar
										src="https://i.pravatar.cc/192?img=32"
										alt="Fernanda Fortunato"
										shape="rounded"
										className="size-24"
									/>
								</div>
								<div className="flex flex-col gap-2 flex-1 min-w-0">
									<p className="font-display font-bold text-title-lg text-primary-600">
										Fernanda Fortunato
									</p>
									<p className="font-body font-semibold text-body-md text-neutral-900">
										Gerente de produto e conteúdo para Saúde
									</p>
									<p className="font-body text-body-md text-neutral-900">
										Apaixonada por tecnologia e saúde. Formada a Engenheira Biomédica com MBA
										em Gestão Empresarial pela FGV. Hoje atua na curadoria de conteúdo,
										patrocínio e gestão dos portais da Informa Saúde Business Forum,
										Hospitalar e HIS.
									</p>
									<p className="font-body text-body-md text-neutral-900">
										E-mail:{' '}
										<a
											href="mailto:fernanda.fortunato@informa.com"
											className="font-bold text-secondary-950 hover:underline"
										>
											fernanda.fortunato@informa.com
										</a>
									</p>
								</div>
							</div>
						</div>
					</article>
				</div>
			</section>

			<section className="w-full">
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
								<Categoria color={card.categoryColor} label={card.category} />
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

			<FooterDesktop />
		</main>
	)
}
