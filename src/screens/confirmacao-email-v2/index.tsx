import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { twMerge } from '~/lib/tw-merge'
import { Modal } from '~/components/modal'
import type { IconName } from '~/components/icon/paths'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import type { ProofPanelMinimalVariant } from '~/components/proof-panel-minimal/types'
import HomeScreen from '../home'
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
	secondLabel: string | null
	secondHref: string | null
	proof: ProofPanelMinimalVariant
}

function buildConfig(state: ConfirmacaoState, email: string, intent: string): ConfirmacaoConfig {
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
				secondHref: '/home',
				proof: 'welcome',
			}
		case 'link-expired':
			return {
				tone: 'warning',
				icon: 'schedule',
				title: 'Link expirado',
				body: 'O link de confirmacao e valido por 24 horas. Solicite um novo para ativar sua conta.',
				primaryLabel: 'Enviar novo link',
				primaryHref: intent === 'download'
					? `/gate-download?state=waiting&email=${encodeURIComponent(email)}`
					: `?state=waiting&email=${encodeURIComponent(email)}`,
				secondLabel: 'Voltar para o login',
				secondHref: '/login-v2',
				proof: 'login',
			}
		case 'link-used':
			return {
				tone: 'info-primary',
				icon: 'check',
				title: 'Sua conta já está ativa',
				body: 'Este link de confirmação já foi usado. Basta fazer login para continuar.',
				primaryLabel: 'Fazer login',
				primaryHref: '/login-v2',
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
				secondLabel: 'Errei o e-mail',
				secondHref: '/cadastro-v2?step=1',
				proof: 'signup-1',
			}
	}
}

const OUTLINED_BTN =
	'inline-flex items-center justify-center w-full h-12 px-6 rounded-full border-[1.5px] border-primary-600 bg-white hover:bg-primary-600/[0.04] text-primary-600 font-body font-bold text-body-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2'

function ReenviarEmailButton() {
	const [secondsLeft, setSecondsLeft] = useState(0)
	const isDisabled = secondsLeft > 0

	useEffect(() => {
		if (secondsLeft <= 0) return
		const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
		return () => clearTimeout(id)
	}, [secondsLeft])

	return (
		<button
			type="button"
			disabled={isDisabled}
			onClick={() => setSecondsLeft(60)}
			className={twMerge(OUTLINED_BTN, isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none')}
		>
			{isDisabled ? `Reenviar e-mail (${secondsLeft}s)` : 'Reenviar e-mail'}
		</button>
	)
}

/**
 * Tela: Confirmação de E-mail (Modal) — v2 (deriva de confirmacao-email)
 * Mudanças: (1) no estado "waiting", "Verificar depois" ganha o mesmo peso do CTA primário —
 * botão cheio (bg-primary-600), full-width, h-12 — e fica no topo; "Reenviar e-mail" vira o
 * botão outline logo abaixo. (2) Apresentado como modal sobre o portal (HomeScreen), mantendo
 * o ProofPanelMinimal, com o fluxo apontando para as rotas v2.
 * Estados: ?state=waiting|success|link-expired|link-used · ?email=...
 */
export default function ConfirmacaoEmailV2Screen() {
	const [params] = useSearchParams()
	const stateParam = params.get('state') ?? 'waiting'
	const state = (STATES.includes(stateParam as ConfirmacaoState)
		? stateParam
		: 'waiting') as ConfirmacaoState

	const email = params.get('email') ?? 'mariana.albuquerque@empresa.com.br'
	const intent = params.get('intent') ?? ''
	const cfg = buildConfig(state, email, intent)
	const isWaiting = state === 'waiting'

	return (
		<>
			{/* Portal ao fundo */}
			<HomeScreen />

			<Modal open size="xl" padded={false} closeHref="/home" labelledById="confirmacao-v2-title">
				<section className="flex flex-col w-full md:w-[470px] shrink-0 px-8 sm:px-12 py-12 overflow-y-auto">
					<div className="w-full">
						{state !== 'success' ? (
							<AuthBackLink href="/login-v2" label="Voltar para o login" />
						) : null}
					</div>

					<div className="flex-1 flex flex-col justify-center w-full">
						<div className="flex flex-col gap-6 w-full">
							<AuthStatusIcon tone={cfg.tone} icon={cfg.icon} />

							<div className="flex flex-col gap-2 w-full">
								<h1
									id="confirmacao-v2-title"
									className="font-display font-bold text-headline-md text-primary-600"
								>
									{cfg.title}
								</h1>

								{isWaiting ? (
									<>
										<p className="font-body text-body-lg text-neutral-900">
											Enviamos um link para <strong className="font-bold">{email}</strong>. Clique
											no link para ativar sua conta.
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
								{isWaiting ? (
									<>
										<a
											href="/home"
											className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
										>
											Verificar depois
										</a>

										<ReenviarEmailButton />

										{cfg.secondLabel && cfg.secondHref ? (
											<a
												href={cfg.secondHref}
												className="self-center font-body font-bold text-body-md text-secondary-950 hover:underline"
											>
												{cfg.secondLabel}
											</a>
										) : null}
									</>
								) : (
									<>
										<a
											href={cfg.primaryHref}
											className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
										>
											{cfg.primaryLabel}
										</a>

										{cfg.secondLabel && cfg.secondHref ? (
											<a
												href={cfg.secondHref}
												className="self-center font-body font-bold text-body-md text-secondary-950 hover:underline"
											>
												{cfg.secondLabel}
											</a>
										) : null}
									</>
								)}
							</div>
						</div>
					</div>

					<div className="w-full">
						{isWaiting ? (
							<p className="text-center font-body text-label-md text-neutral-400">
								<a
									href={
										intent === 'download'
											? '/conteudo?logado=true'
											: `?state=success&email=${encodeURIComponent(email)}`
									}
									className="underline hover:text-neutral-600"
								>
									[Simular clique no link do e-mail]
								</a>
							</p>
						) : null}
					</div>
				</section>

				<ProofPanelMinimal variant={cfg.proof} className="hidden md:flex flex-1 min-h-0 p-12" />
			</Modal>

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
