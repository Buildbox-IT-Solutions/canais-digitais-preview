import { useSearchParams } from 'react-router'
import { twMerge } from 'tailwind-merge'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { Icon } from '~/components/icon'
import {
	CONSENT_EVENTS,
	FILTER_LABELS,
	TYPE_LABELS,
	type ConsentType,
} from '~/mocks/consentimentos'
import { AuthBackLink } from '../_auth/back-link'

const ALLOWED_FILTERS: Array<ConsentType | 'all'> = [
	'all',
	'termos',
	'privacidade',
	'newsletters',
	'comunicacoes',
	'cookies',
]

const USER_NAME = 'Mariana Albuquerque'
const USER_EMAIL = 'mariana.albuquerque@empresa.com.br'
const USER_INITIALS = 'MA'

/**
 * Tela: Histórico de Consentimentos — LGPD (Art. 18 II)
 * Archive editorial agrupado por ano. Filtros: ?filter=all|termos|privacidade|...
 */
export default function ConsentimentosScreen() {
	const [params] = useSearchParams()
	const filterParam = params.get('filter') ?? 'all'
	const filter = (ALLOWED_FILTERS.includes(filterParam as ConsentType | 'all')
		? filterParam
		: 'all') as ConsentType | 'all'

	const filtered =
		filter === 'all' ? CONSENT_EVENTS : CONSENT_EVENTS.filter((e) => e.type === filter)

	const byYear = filtered.reduce<Record<number, typeof CONSENT_EVENTS>>((acc, e) => {
		acc[e.year] ??= []
		acc[e.year].push(e)
		return acc
	}, {})
	const years = Object.keys(byYear)
		.map(Number)
		.sort((a, b) => b - a)

	const actionTone = (action: string) => (action === 'Opt-out' ? 'text-red-700' : 'text-secondary-950')

	return (
		<main className="bg-white min-h-screen flex flex-col">
			<HeaderDesktop
				userLoggedIn
				userName={USER_NAME}
				userEmail={USER_EMAIL}
				userInitials={USER_INITIALS}
			/>

			<div className="flex-1 max-w-screen-xl mx-auto w-full px-4 lg:px-6 py-10">
				<div className="animate-fade-up-sm">
					<AuthBackLink
						href="/dashboard-perfil-v3?tab=conta"
						label="Voltar para minha conta"
					/>
				</div>

				<header
					className="mt-8 max-w-[60ch] animate-fade-up-sm"
					style={{ animationDelay: '60ms' }}
				>
					<p className="font-body font-semibold text-label-md tracking-wider text-secondary-950 uppercase">
						LGPD · Art. 18 II
					</p>
					<h1 className="mt-2 font-display font-bold text-headline-lg text-primary-600 leading-tight">
						Tudo que você consentiu, registrado.
					</h1>
					<p className="mt-4 font-body text-body-lg text-neutral-900">
						A LGPD garante que você saiba exatamente quando, em qual versão e em quais termos
						seu consentimento foi dado. Aqui está o registro completo, em ordem cronológica.
					</p>
				</header>

				<nav
					className="mt-10 flex flex-wrap items-center gap-2 animate-fade-up-sm"
					style={{ animationDelay: '120ms' }}
					aria-label="Filtrar por tipo"
				>
					<span className="font-body font-semibold text-label-md tracking-wider text-neutral-500 uppercase mr-2">
						Filtrar
					</span>
					{ALLOWED_FILTERS.map((key) => (
						<a
							key={key}
							href={`?filter=${key}`}
							className={twMerge(
								'inline-flex items-center px-3.5 py-1.5 rounded-full font-body font-bold text-label-md transition-colors',
								filter === key
									? 'bg-primary-600 text-white'
									: 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100',
							)}
						>
							{FILTER_LABELS[key]}
						</a>
					))}
				</nav>

				{filtered.length === 0 ? (
					<section
						className="mt-16 max-w-[60ch] animate-fade-up-sm"
						style={{ animationDelay: '180ms' }}
					>
						<p className="font-body text-body-lg text-neutral-700">
							Nenhum evento desse tipo registrado. Tente outro filtro acima.
						</p>
					</section>
				) : (
					<div
						className="mt-16 flex flex-col gap-16 animate-fade-up-sm"
						style={{ animationDelay: '180ms' }}
					>
						{years.map((year) => {
							const yearEvents = byYear[year]
							return (
								<section key={year}>
									<header className="mb-8">
										<h2 className="font-display font-bold text-display-md text-primary-600 leading-none">
											{year}
										</h2>
										<p className="mt-2 font-body text-body-md text-neutral-500">
											{yearEvents.length}{' '}
											{yearEvents.length === 1
												? 'evento registrado'
												: 'eventos registrados'}
										</p>
									</header>

									<ul className="flex flex-col">
										{yearEvents.map((e, i) => {
											const isLast = i === yearEvents.length - 1
											return (
												<li
													key={`${e.date}-${e.title}-${i}`}
													className={twMerge(
														'grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-12 py-5',
														!isLast && 'border-b border-neutral-100',
													)}
												>
													<div className="font-display font-bold text-title-md text-primary-600 md:pt-0.5">
														{e.date}
													</div>

													<div className="flex flex-col gap-1.5 max-w-[75ch]">
														<div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
															<span className="font-body font-bold text-label-md tracking-wider uppercase text-neutral-500">
																{TYPE_LABELS[e.type]}
															</span>
															<span
																className={twMerge(
																	'font-body font-bold text-label-md tracking-wider uppercase',
																	actionTone(e.action),
																)}
															>
																{e.action}
															</span>
														</div>
														<h3 className="font-display font-bold text-title-lg text-primary-600 leading-tight">
															{e.title}
														</h3>
														{e.detail ? (
															<p className="font-body text-body-md text-neutral-700">
																{e.detail}
															</p>
														) : null}
														{e.docHref ? (
															<a
																href={e.docHref}
																className="inline-flex items-center gap-1 mt-1 font-body font-bold text-label-md text-secondary-950 hover:underline w-fit"
															>
																Ver íntegra do documento
																<Icon name="open-in-new" className="size-4" />
															</a>
														) : null}
													</div>
												</li>
											)
										})}
									</ul>
								</section>
							)
						})}
					</div>
				)}

				<section
					className="mt-16 max-w-[80ch] flex flex-col md:flex-row md:items-center gap-6 px-6 py-8 rounded-lg border border-neutral-100 animate-fade-up-sm"
					style={{ animationDelay: '240ms' }}
				>
					<div className="flex-1 max-w-[60ch]">
						<h2 className="font-display font-bold text-title-xl text-primary-600">
							Precisa de um relatório auditável?
						</h2>
						<p className="mt-1 font-body text-body-md text-neutral-700">
							Baixe um PDF assinado com todo o histórico — válido para apresentar a um DPO,
							departamento jurídico ou autoridade.
						</p>
					</div>
					<a
						href="#"
						className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors shrink-0"
					>
						<Icon name="download" className="size-5" />
						Baixar relatório (PDF)
					</a>
				</section>
			</div>

			<FooterDesktop />
		</main>
	)
}
