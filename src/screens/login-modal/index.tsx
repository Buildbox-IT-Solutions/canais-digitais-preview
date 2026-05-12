import { useSearchParams } from 'react-router'
import { twMerge } from '~/lib/tw-merge'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { Icon } from '~/components/icon'
import { LinkButton } from '~/components/link-button'
import { SocialButton } from '~/components/social-button'
import { Toast } from '~/components/toast'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthPasswordInput } from '../_auth/password-input'

type ModalState =
	| 'default'
	| 'loading'
	| 'error-cred'
	| 'error-unverified'
	| 'locked'
	| 'session-expired'
	| 'post-download'
	| 'linkedin-merge'

const STATES: ModalState[] = [
	'default',
	'loading',
	'error-cred',
	'error-unverified',
	'locked',
	'session-expired',
	'post-download',
	'linkedin-merge',
]

const PORTAIS_COMPACT = [
	'Food Connection',
	'Canal Energia',
	'Aquaculture Brasil',
	'Inovação em Pauta',
	'Cosmetiquim',
	'AgroPages',
]

interface AlertConfig {
	type: 'error' | 'warning'
	text: string
	countdown?: string
	link?: { label: string; action: string }
}

interface ModalCfg {
	subtitle: string
	badge: string | null
	alert: AlertConfig | null
	formDisabled: boolean
	submitDisabled: boolean
	submitLabel: string
	submitLoading: boolean
}

function buildCfg(state: ModalState): ModalCfg {
	const base: ModalCfg = {
		subtitle: 'Acesse sua conta para baixar materiais e personalizar sua experiência.',
		badge: null,
		alert: null,
		formDisabled: false,
		submitDisabled: false,
		submitLabel: 'Entrar',
		submitLoading: false,
	}

	switch (state) {
		case 'loading':
			return { ...base, submitLabel: 'Entrando...', submitLoading: true, formDisabled: true }
		case 'error-cred':
			return {
				...base,
				alert: {
					type: 'error',
					text: 'E-mail ou senha incorretos. Verifique os dados e tente novamente.',
				},
			}
		case 'error-unverified':
			return {
				...base,
				alert: {
					type: 'warning',
					text: 'Seu e-mail ainda não foi confirmado.',
					link: {
						label: 'Reenviar e-mail de confirmação',
						action: 'resend-confirmation',
					},
				},
			}
		case 'locked':
			return {
				...base,
				alert: {
					type: 'error',
					text: 'Muitas tentativas. Tente novamente em ',
					countdown: '14:58',
				},
				formDisabled: true,
				submitDisabled: true,
			}
		case 'session-expired':
			return {
				...base,
				subtitle: 'Sua sessão expirou. Entre novamente para continuar.',
				alert: { type: 'warning', text: 'Por segurança, pedimos que você faça login novamente.' },
			}
		case 'post-download':
			return { ...base, badge: 'Faça login para baixar este material' }
		default:
			return base
	}
}

/**
 * Tela: Login Modal (fluxo)
 * Modal de login sobre um placeholder de página. Estados: ?state=...
 */
export default function LoginModalScreen() {
	const [params] = useSearchParams()
	const stateParam = params.get('state') ?? 'default'
	const state = (STATES.includes(stateParam as ModalState) ? stateParam : 'default') as ModalState

	const effectiveState = state === 'linkedin-merge' ? 'default' : state
	const cfg = buildCfg(effectiveState)
	const isDefault = effectiveState === 'default'

	const alertIconPath =
		cfg.alert?.type === 'error'
			? 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z'
			: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'
	const alertStyles =
		cfg.alert?.type === 'error'
			? 'bg-[#FEF2F2] border-[#bf0413] text-[#bf0413]'
			: 'bg-[#FFFBEB] border-[#F59E0B] text-[#92400E]'

	return (
		<>
			<main className="bg-white min-h-screen">
				<HeaderDesktop activeCategory={null} />

				<section className="relative">
					{/* Background placeholder */}
					<div className="bg-neutral-50 min-h-[720px] flex flex-col items-center justify-center gap-6 py-16 px-4">
						<div className="max-w-screen-xl w-full mx-auto">
							<div className="grid grid-cols-12 gap-6 opacity-40">
								<div className="col-span-8 space-y-4">
									<div className="h-10 w-2/3 bg-neutral-100 rounded-sm" />
									<div className="h-4 w-full bg-neutral-100 rounded-sm" />
									<div className="h-4 w-11/12 bg-neutral-100 rounded-sm" />
									<div className="h-4 w-10/12 bg-neutral-100 rounded-sm" />
									<div className="h-60 w-full bg-neutral-100 rounded-sm mt-6" />
								</div>
								<div className="col-span-4 space-y-4">
									<div className="h-60 w-full bg-neutral-100 rounded-sm" />
									<div className="h-40 w-full bg-neutral-100 rounded-sm" />
								</div>
							</div>
						</div>
					</div>

					{/* Overlay + modal */}
					<div className="absolute inset-0 bg-primary-950/[.32] flex flex-col items-center justify-center gap-4 p-4">
						{state === 'linkedin-merge' ? (
							<div className="w-full max-w-[480px]">
								<Toast type="success" message="Conta vinculada ao LinkedIn com sucesso." />
							</div>
						) : null}

						<div
							role="dialog"
							aria-modal="true"
							aria-labelledby={`login-title-${effectiveState}`}
							className="relative bg-white w-full max-w-[480px] rounded-lg shadow-lg p-6 md:p-8"
						>
							{/* Close */}
							<div className="absolute right-3 top-3">
								<a
									href="/home"
									aria-label="Fechar"
									className="inline-flex items-center justify-center h-10 w-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors"
								>
									<Icon name="close" className="size-[18px]" />
								</a>
							</div>

							{cfg.badge ? (
								<div className="inline-flex items-center gap-2 rounded-full bg-secondary-50 px-3 py-1 mb-4">
									<Icon name="download" className="size-4 text-secondary-950" />
									<span className="font-body text-label-md text-secondary-950">{cfg.badge}</span>
								</div>
							) : null}

							<h2
								id={`login-title-${effectiveState}`}
								className="font-display text-headline-md text-neutral-950"
							>
								Entrar
							</h2>

							<div className="flex flex-wrap gap-1.5 justify-center my-3">
								{PORTAIS_COMPACT.map((p) => (
									<span
										key={p}
										className="px-2.5 py-1 rounded-full bg-neutral-50 border border-neutral-100 font-body text-label-sm text-neutral-600 whitespace-nowrap"
									>
										{p}
									</span>
								))}
								<span className="px-2.5 py-1 rounded-full bg-secondary-50 border border-secondary-100 font-body text-label-sm text-secondary-950 whitespace-nowrap font-semibold">
									e mais 5
								</span>
							</div>
							<p className="font-body text-body-sm text-neutral-500 text-center mb-4">
								Uma conta. Todos os portais. É grátis.
							</p>

							<p className="mt-2 font-body text-body-lg text-neutral-700">{cfg.subtitle}</p>

							{cfg.alert ? (
								<div
									role={cfg.alert.type === 'error' ? 'alert' : 'status'}
									className={twMerge(
										'mt-5 flex items-start gap-3 rounded-lg border-l-4 p-3',
										alertStyles,
									)}
								>
									<svg
										className="size-5 shrink-0 mt-0.5"
										viewBox="0 0 24 24"
										fill="currentColor"
										aria-hidden="true"
									>
										<path d={alertIconPath} />
									</svg>
									<div className="flex-1 font-body text-body-md">
										<p>
											{cfg.alert.text}
											{cfg.alert.countdown ? (
												<>
													<span aria-live="polite" className="font-bold tabular-nums">
														{cfg.alert.countdown}
													</span>
													.
												</>
											) : null}
										</p>
										{cfg.alert.link ? (
											<button
												type="button"
												className="mt-1 font-bold underline hover:no-underline"
											>
												{cfg.alert.link.label}
											</button>
										) : null}
									</div>
								</div>
							) : null}

							{/* Social */}
							<div className="mt-6 flex flex-col gap-3">
								<SocialButton provider="linkedin" href={isDefault ? '/' : '#'} />
								<SocialButton provider="google" href={isDefault ? '/' : '#'} />
							</div>

							{/* Divider */}
							<div className="mt-6 flex items-center gap-3">
								<div className="h-px flex-1 bg-neutral-100" />
								<span className="font-body text-label-md text-neutral-500">ou</span>
								<div className="h-px flex-1 bg-neutral-100" />
							</div>

							{/* Form */}
							<form
								className="mt-6 flex flex-col gap-4"
								action={isDefault ? '/' : undefined}
								method={isDefault ? 'get' : undefined}
								aria-disabled={cfg.formDisabled || undefined}
							>
								<fieldset className="contents" disabled={cfg.formDisabled}>
									<label className="flex flex-col items-start w-full">
										<div className="flex gap-0.5 items-center pb-1 px-1 w-full">
											<span className="font-body font-semibold text-label-lg text-neutral-950">
												E-mail
											</span>
											<span className="font-body font-semibold text-label-lg text-neutral-950">
												*
											</span>
										</div>
										<div className="bg-white border border-neutral-100 flex h-10 items-center rounded-sm w-full focus-within:border-secondary-950">
											<input
												type="email"
												autoComplete="email"
												placeholder="seu@empresa.com.br"
												className="flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body text-primary-600 placeholder:text-neutral-500 focus:outline-none disabled:bg-neutral-50"
											/>
										</div>
									</label>

									<AuthPasswordInput
										label="Senha"
										name="senha"
										id={`login-password-${effectiveState}`}
										autoComplete="current-password"
										required
									/>

									<div className="flex justify-end">
										<LinkButton
											label="Esqueci minha senha"
											href={isDefault ? '/recupera-senha' : '#'}
											size="sm"
										/>
									</div>

									<button
										type="submit"
										disabled={cfg.submitDisabled}
										className="mt-2 inline-flex items-center justify-center gap-2 w-full h-12 rounded-full bg-primary-600 hover:bg-secondary-950 disabled:bg-neutral-200 disabled:cursor-not-allowed transition-colors font-body font-bold text-body-lg text-white"
									>
										{cfg.submitLoading ? (
											<svg
												className="size-5 animate-spin"
												viewBox="0 0 24 24"
												fill="none"
												aria-hidden="true"
											>
												<circle
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="3"
													strokeOpacity=".25"
												/>
												<path
													d="M12 2a10 10 0 0 1 10 10"
													stroke="currentColor"
													strokeWidth="3"
													strokeLinecap="round"
												/>
											</svg>
										) : null}
										{cfg.submitLabel}
									</button>
								</fieldset>
							</form>

							<p className="mt-6 text-center font-body text-body-md text-neutral-700">
								Não tem conta?{' '}
								<a
									href={isDefault ? '/cadastro?step=1' : '#'}
									className="font-bold text-secondary-950 hover:underline"
								>
									Criar conta
								</a>
							</p>
						</div>
					</div>
				</section>

				<FooterDesktop />
			</main>

			<AuthDevNav
				paramName="state"
				label="Simular"
				options={STATES as unknown as string[]}
				current={state}
			/>
		</>
	)
}
