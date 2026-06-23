/**
 * Screen: Patrocinadores
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=7097-57567
 * Rota: /patrocinadores
 */

import { HeaderDesktop } from '~/components/header-desktop'
import { FooterDesktop } from '~/components/footer-desktop'
import { SectionTitle } from '~/components/section-title'
import { SponsorCard } from '~/components/sponsor-card'
import { sponsors } from '~/mocks/sponsors'

export function PatrocinadoresScreen() {
	return (
		<div className="flex min-h-screen flex-col bg-neutral-50">
			<HeaderDesktop />

			<main className="flex-1">
				{/* Hero da seção */}
				<section className="bg-primary-950 py-12">
					<div className="mx-auto max-w-screen-xl px-4 lg:px-6">
						<div className="flex flex-col gap-3">
							<span className="font-body text-label-sm font-semibold uppercase tracking-wider text-secondary-400">
								Conteúdo Patrocinado
							</span>
							<h1 className="font-display font-bold text-headline-md text-white">
								Nossos Patrocinadores
							</h1>
							<p className="max-w-2xl font-body text-body-md text-neutral-300">
								Conheça as empresas que apoiam a produção de conteúdo especializado
								em alimentos e bebidas da Informa.
							</p>
						</div>
					</div>
				</section>

				{/* Grid de patrocinadores */}
				<section className="py-12">
					<div className="mx-auto max-w-screen-xl px-4 lg:px-6">
						<SectionTitle label="Patrocinadores" />

						<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{sponsors.map((sponsor) => (
								<SponsorCard
									key={sponsor.id}
									name={sponsor.name}
									logoSrc={sponsor.logoSrc}
									tagline={sponsor.tagline}
									description={sponsor.description}
									href={'/patrocinador?id=' + sponsor.id}
								/>
							))}
						</div>
					</div>
				</section>

				{/* CTA anuncie */}
				<section className="border-t border-neutral-200 bg-white py-12">
					<div className="mx-auto max-w-screen-xl px-4 lg:px-6">
						<div className="flex flex-col items-center gap-4 text-center">
							<h2 className="font-display font-bold text-title-lg text-neutral-950">
								Quer ser um patrocinador?
							</h2>
							<p className="max-w-lg font-body text-body-md text-neutral-600">
								Alcance o público certo e fortaleça sua marca no mercado de alimentos
								e bebidas.
							</p>
							<a
								href="/anuncie"
								className="inline-flex items-center rounded-full bg-primary-600 px-6 py-3 font-body font-semibold text-label-md text-white hover:bg-primary-700"
							>
								Fale com nosso time
							</a>
						</div>
					</div>
				</section>
			</main>

			<FooterDesktop />
		</div>
	)
}
