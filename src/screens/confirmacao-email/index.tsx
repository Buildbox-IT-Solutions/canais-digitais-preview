import { useSearchParams } from 'react-router'
import type { IconName } from '~/components/icon/paths'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import type { ProofPanelMinimalVariant } from '~/components/proof-panel-minimal/types'
import { AuthBackLink } from '../_auth/back-link'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthStatusIcon, type StatusTone } from '../_auth/status-icon'

type ConfirmacaoState = 'waiting' | 'success' | 'link-expired' | 'link-used'

const STATES: ConfirmacaoState[] = ['waiting', 'success', 'link-expired', 'link-used']

interface ConfirmacaoConfig {
	tone: StatusTone
	icon: IconName
	title: string
	body: string | null
	primaryLabel: string
	primaryHref: string
	primaryAsButton?: boolean
	secondLabel: string | null
	secondHref: string | null
	proof: ProofPanelMinimalVariant
}

function buildConfig(state: ConfirmacaoState, email: string): ConfirmacaoConfig {
	switch (state) {
		case 'success':
			return {
				tone: 'success',
				icon: 'check',
				title: 'Tudo pronto!',
				body: 'Sua conta está ativa. Bem-vindo aos Canais Digitais.',
				primaryLabel: 'Ir para minha conta',
				primaryHref: '/',
				secondLabel: 'Explorar o portal',
				secondHref: '/',
				proof: 'welcome',
			}
		case 'link-expired':
			return {
				tone: 'warning',
				icon: 'schedule',
				title: 'Link expirado',
				body: 'O link de confirmação é válido por 24 horas. Solicite um novo para ativar sua conta.',
				primaryLabel: 'Enviar novo link',
				primaryHref: `?state=waiting&email=${encodeURIComponent(email)}`,
				secondLabel: 'Voltar para o login',
				secondHref: '/login',
				proof: 'login',
			}
		case 'link-used':
			return {
				tone: 'info-primary',
				icon: 'check',
				title: 'Sua conta já está ativa',
				body: 'Este link de confirmação já foi usado. Basta fazer login para continuar.',
				primaryLabel: 'Fazer login',
				primaryHref: '/login',
				secondLabel: null,
				secondHref: null,
				proof: 'login',
			}
		default:
			return {
				tone: 'info-secondary',
				icon: 'mail',
				title: 'Confirme seu e-mail',
				body: null,
				primaryLabel: 'Reenviar e-mail',
				primaryHref: '#',
				primaryAsButton: true,
				secondLabel: 'Errei o e-mail',
				secondHref: '/cadastro?step=1',
				proof: 'signup-1',
			}
	}
}

/**
 * Tela: Confirmação de E-mail — v3.0
 * Estados: ?state=waiting|success|link-expired|link-used · ?email=...
 */
export default function ConfirmacaoEmailScreen() {
	const [params] = useSearchParams()
	const stateParam = params.get('state') ?? 'waiting'
	const state = (STATES.includes(stateParam as ConfirmacaoState)
		? stateParam
		: 'waiting') as ConfirmacaoState

	const email = params.get('email') ?? 'mariana.albuquerque@empresa.com.br'
	const cfg = buildConfig(state, email)

	return (
		<>
			<div className="flex min-h-screen items-stretch">
				<section className="flex flex-col w-[560px] shrink-0 px-14 py-12 bg-white animate-fade-up-sm">
					<div className="w-full">
						{state !== 'success' ? (
							<AuthBackLink href="/login" label="Voltar para o login" />
						) : null}
					</div>

					<div className="flex-1 flex flex-col justify-center w-full">
						<div className="flex flex-col gap-6 w-full">
							<AuthStatusIcon tone={cfg.tone} icon={cfg.icon} />

							<div className="flex flex-col gap-2 w-full">
								<h1 className="font-display font-bold text-headline-md text-primary-600">
									{cfg.title}
								</h1>

								{state === 'waiting' ? (
									<>
										<p className="font-body text-body-lg text-neutral-900">
											Enviamos um link para <strong className="font-bold">{email}</strong>.
											Clique no link para ativar sua conta.
										</p>
										<p className="font-body text-body-md text-neutral-700">
											Não esqueça de verificar a pasta de spam. O link expira em 24 horas.
										</p>
									</>
								) : (
									<p className="font-body text-body-lg text-neutral-900">{cfg.body}</p>
								)}
							</div>

							<div className="flex flex-col gap-3 w-full mt-2">
								{cfg.primaryAsButton ? (
									<button
										type="button"
										className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full border-[1.5px] border-primary-600 bg-white hover:bg-primary-600/[0.04] text-primary-600 font-body font-bold text-body-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2"
									>
										{cfg.primaryLabel}
									</button>
								) : (
									<a
										href={cfg.primaryHref}
										className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
									>
										{cfg.primaryLabel}
									</a>
								)}

								{cfg.secondLabel && cfg.secondHref ? (
									<a
										href={cfg.secondHref}
										className="self-center font-body font-bold text-body-md text-secondary-950 hover:underline"
									>
										{cfg.secondLabel}
									</a>
								) : null}

								{state === 'waiting' ? (
									<a
										href="/home"
										className="self-center font-body text-body-md text-neutral-500 hover:text-neutral-700 hover:underline"
									>
										Verificar depois
									</a>
								) : null}
							</div>
						</div>
					</div>

					<div className="w-full">
						{state === 'waiting' ? (
							<p className="text-center font-body text-label-md text-neutral-400">
								<a
									href={`?state=success&email=${encodeURIComponent(email)}`}
									className="underline hover:text-neutral-600"
								>
									[Simular clique no link do e-mail]
								</a>
							</p>
						) : null}
					</div>
				</section>

				<ProofPanelMinimal variant={cfg.proof} />
			</div>

			<AuthDevNav
				paramName="state"
				label="Estado"
				options={STATES as unknown as string[]}
				current={state}
				extraQuery={`&email=${encodeURIComponent(email)}`}
			/>
		</>
	)
}
