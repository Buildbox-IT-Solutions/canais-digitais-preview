/**
 * Screen: Patrocinador (página individual / sponsor post)
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=7097-57567
 * Rota: /patrocinador?id=<id>
 * Responsiva: mobile-first, breakpoints md: para desktop
 */

import { useSearchParams, Link } from 'react-router-dom'
import { HeaderDesktop } from '~/components/header-desktop'
import { FooterDesktop } from '~/components/footer-desktop'
import { SponsorLine } from '~/components/sponsor-line'
import { sponsors } from '~/mocks/sponsors'

export function PatrocinadorScreen() {
	const [searchParams] = useSearchParams()
	const id = searchParams.get('id')
	const sponsor = sponsors.find((s) => s.id === id) ?? sponsors[0]

	return (
		<div className="flex min-h-screen flex-col bg-white">
			<HeaderDesktop />

			<main className="flex-1">
				{/* Breadcrumb */}
				<div className="border-b border-neutral-200 bg-neutral-50">
					<div className="mx-auto max-w-screen-xl px-4 py-3 lg:px-6">
						<nav
							className="flex gap-2 font-body text-label-sm text-neutral-500"
							aria-label="Breadcrumb"
						>
							<Link to="/" className="hover:text-primary-600">
								Home
							</Link>
							<span>/</span>
							<Link to="/patrocinadores" className="hover:text-primary-600">
								Patrocinadores
							</Link>
							<span>/</span>
							<span className="text-neutral-950">{sponsor.name}</span>
						</nav>
					</div>
				</div>

				{/* Hero — mobile: stacked, desktop: two-column */}
				<section className="border-b border-neutral-200 py-8 md:py-12">
					<div className="mx-auto max-w-screen-xl px-4 lg:px-6">
						<div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
							{/* Logo */}
							<div className="flex shrink-0 items-center justify-center rounded-lg bg-neutral-100 p-6 md:h-48 md:w-64">
								<img
									src={sponsor.logoSrc}
									alt={`Logo ${sponsor.name}`}
									className="max-h-24 max-w-full object-contain md:max-h-32"
								/>
							</div>

							{/* Info */}
							<div className="flex flex-col gap-4">
								<SponsorLine company={sponsor.name} />

								<h1 className="font-display font-bold text-headline-sm text-neutral-950 md:text-headline-md">
									{sponsor.name}
								</h1>

								<p className="font-body text-body-md italic text-neutral-500">
									{sponsor.tagline}
								</p>

								{sponsor.category && (
									<span className="inline-flex w-fit items-center rounded-full bg-secondary-50 px-3 py-1 font-body text-label-sm font-semibold text-secondary-700">
										{sponsor.category}
									</span>
								)}
							</div>
						</div>
					</div>
				</section>

				{/* Descrição institucional */}
				<section className="py-8 md:py-12">
					<div className="mx-auto max-w-screen-xl px-4 lg:px-6">
						<div className="mx-auto max-w-3xl">
							<h2 className="mb-4 font-display font-bold text-title-lg text-neutral-950">
								Sobre a empresa
							</h2>
							<p className="font-body text-body-md leading-relaxed text-neutral-700">
								{sponsor.description}
							</p>
						</div>
					</div>
				</section>

				{/* CTA — visitar site */}
				<section className="bg-neutral-50 py-8 md:py-12">
					<div className="mx-auto max-w-screen-xl px-4 lg:px-6">
						<div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-lg bg-white p-6 shadow-md md:flex-row md:items-center md:justify-between md:p-8">
							<div className="flex flex-col gap-1">
								<span className="font-body text-label-sm font-semibold uppercase tracking-wider text-neutral-500">
									Informações institucionais
								</span>
								<span className="font-display font-bold text-title-md text-neutral-950">
									{sponsor.name}
								</span>
								<span className="font-body text-body-sm text-neutral-500">
									{sponsor.href.replace(/^https?:\/\//, '')}
								</span>
							</div>

							<a
								href={sponsor.href}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary-600 px-6 py-3 font-body text-label-md font-semibold text-white hover:bg-primary-700"
							>
								Visitar site ↗
							</a>
						</div>
					</div>
				</section>

				{/* Outros patrocinadores */}
				<section className="py-8 md:py-12">
					<div className="mx-auto max-w-screen-xl px-4 lg:px-6">
						<h2 className="mb-6 font-display font-bold text-title-md text-neutral-950">
							Outros patrocinadores
						</h2>
						<div className="flex flex-wrap gap-4">
							{sponsors
								.filter((s) => s.id !== sponsor.id)
								.map((s) => (
									<Link
										key={s.id}
										to={`/patrocinador?id=${s.id}`}
										className="flex items-center rounded-lg border border-neutral-200 bg-white px-4 py-3 shadow-sm hover:border-primary-300 hover:shadow-md"
									>
										<img
											src={s.logoSrc}
											alt={`Logo ${s.name}`}
											className="h-8 max-w-[120px] object-contain"
										/>
									</Link>
								))}
						</div>
					</div>
				</section>
			</main>

			<FooterDesktop />
		</div>
	)
}
