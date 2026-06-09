import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { IconName } from '~/components/icon/paths'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import type { ProofPanelMinimalVariant } from '~/components/proof-panel-minimal/types'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthStatusRing, type StatusRingAccent } from '../_auth/status-ring'

type ConfirmacaoState = 'waiting' | 'success' | 'link-expired' | 'link-used'

const STATES: ConfirmacaoState[] = ['waiting', 'success', 'link-expired', 'link-used']

type ButtonVariant = 'filled' | 'outlined' | 'ghost'

interface ConfirmacaoButton {
	label: string
	href?: string
	variant: ButtonVariant
	isResend?: boolean
}

interface ConfirmacaoConfig {
	accent: StatusRingAccent
	icon: IconName
	title: string
	body: string | null
	buttons: ConfirmacaoButton[]
	proof: ProofPanelMinimalVariant | null
}

function buildConfig(state: ConfirmacaoState, email: string): ConfirmacaoConfig {
	switch (state) {
		case 'success':
			return {
				accent: 'mint',
				icon: 'check',
				title: 'Tudo pronto!',
				body: 'Acesse conteúdo exclusivo, análises e dados do seu setor sem restrições.',
				buttons: [
					{ label: 'Explorar o portal', href: '/home', variant: 'filled' },
					{ label: 'Ir para minha conta', href: '/', variant: 'ghost' },
				],
				proof: 'confirm-welcome',
			}
		case 'link-expired':
			return {
				accent: 'neutral',
				icon: 'schedule',
				title: 'Link expirado',
				body: 'O link de confirmação é válido por 24 horas. Solicite um novo para ativar sua conta.',
				buttons: [
					{
						label: 'Enviar novo link',
						href: `?state=waiting&email=${encodeURIComponent(email)}`,
						variant: 'filled',
					},
					{ label: 'Voltar para o login', href: '/login', variant: 'ghost' },
				],
				proof: null,
			}
		case 'link-used':
			return {
				accent: 'mint',
				icon: 'check',
				title: 'Sua conta já está ativa',
				body: 'Este link de confirmação já foi usado. Basta fazer login para continuar.',
				buttons: [{ label: 'Fazer login', href: '/login', variant: 'filled' }],
				proof: null,
			}
		default:
			return {
				accent: 'primary',
				icon: 'mail',
				title: 'Confirme seu e-mail',
				body: null,
				buttons: [
					{ label: 'Verificar depois', href: '/home', variant: 'filled' },
					{ label: 'Reenviar e-mail', variant: 'outlined', isResend: true },
				],
				proof: 'confirm-waiting',
			}
	}
}

const BTN_BASE =
	'inline-flex items-center justify-center w-full h-12 px-6 rounded-full font-body font-bold text-body-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2'

const BTN_VARIANT: Record<ButtonVariant, string> = {
	filled: 'bg-primary-600 hover:bg-secondary-950 text-white',
	outlined: 'border-[1.5px] border-primary-600 bg-white hover:bg-primary-600/[0.04] text-primary-600',
	ghost: 'bg-transparent hover:bg-neutral-50 text-primary-600',
}

function ReenviarEmailButton({ className }: { className: string }) {
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
			className={twMerge(className, isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none')}
		>
			{isDisabled ? `Reenviar e-mail (${secondsLeft}s)` : 'Reenviar e-mail'}
		</button>
	)
}

function ConfirmButton({ label, href, variant, isResend }: ConfirmacaoButton) {
	const className = twMerge(BTN_BASE, BTN_VARIANT[variant])
	if (isResend) return <ReenviarEmailButton className={className} />
	if (href) {
		return (
			<a href={href} className={className}>
				{label}
			</a>
		)
	}
	return (
		<button type="button" className={className}>
			{label}
		</button>
	)
}

/**
 * Tela: Confirmação de E-mail (Full Page) — v2
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=6974-8571
 * Anel de status 120px (outline), conteúdo centralizado (máx. 392px). "Aguardando" e "Tudo pronto"
 * usam split 50/50 com proof panel; "Link expirado" e "Conta já ativa" ocupam a largura cheia,
 * centralizados, sem proof panel. Só "Aguardando" tem page-header (Voltar) e page-footer (Corrigir).
 * Estados: ?state=waiting|success|link-expired|link-used · ?email=...
 * Tokens: --color-primary-600, --color-mint, --color-neutral-900, --color-secondary-950
 */
export default function ConfirmacaoEmailScreen() {
	const [params] = useSearchParams()
	const stateParam = params.get('state') ?? 'waiting'
	const state = (STATES.includes(stateParam as ConfirmacaoState)
		? stateParam
		: 'waiting') as ConfirmacaoState

	const email = params.get('email') ?? 'mariana.albuquerque@empresa.com.br'
	const cfg = buildConfig(state, email)
	const isWaiting = state === 'waiting'
	const hasProof = cfg.proof !== null

	return (
		<>
			<main className="flex min-h-screen items-stretch">
				{/* Coluna do conteúdo */}
				<div
					className={twMerge(
						'flex grow flex-col bg-white animate-fade-up-sm',
						hasProof && 'basis-1/2 min-w-0',
					)}
				>
					{/* page-header — apenas no estado "aguardando" */}
					{isWaiting ? (
						<header className="shrink-0 px-10 pt-10 pb-6">
							<a
								href="/login"
								className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 -ml-1 rounded-full font-body font-bold text-body-md text-primary-600 hover:bg-neutral-50 transition-colors"
							>
								<Icon name="arrow-left" className="size-5" />
								Voltar
							</a>
						</header>
					) : null}

					{/* page-body */}
					<div className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-6 py-8">
						<div className="w-full max-w-[392px] flex flex-col items-center gap-8 text-center">
							<AuthStatusRing accent={cfg.accent} icon={cfg.icon} />

							<div className="flex flex-col gap-2 w-full">
								<h1 className="font-display font-bold text-headline-lg text-primary-600">
									{cfg.title}
								</h1>

								{isWaiting ? (
									<div className="flex flex-col gap-1 w-full font-body text-body-lg text-neutral-900">
										<p>Enviamos um link para</p>
										<p className="font-bold break-words">{email}</p>
										<p>Clique no link para ativar sua conta. O link expira em 24 horas.</p>
									</div>
								) : (
									<p className="font-body text-body-lg text-neutral-900">{cfg.body}</p>
								)}
							</div>

							<div className="flex flex-col gap-3 w-full">
								{cfg.buttons.map((btn) => (
									<ConfirmButton key={btn.label} {...btn} />
								))}
							</div>
						</div>
					</div>

					{/* page-footer — apenas no estado "aguardando" */}
					{isWaiting ? (
						<footer className="shrink-0 px-10 pt-6 pb-10">
							<p className="text-center font-body text-body-md text-neutral-700">
								E-mail errado?{' '}
								<a
									href="/cadastro?step=1"
									className="font-bold text-secondary-950 hover:underline"
								>
									Corrigir
								</a>
							</p>
						</footer>
					) : null}
				</div>

				{hasProof ? (
					<ProofPanelMinimal
						variant={cfg.proof as ProofPanelMinimalVariant}
						size="md"
						className="hidden md:flex grow basis-1/2 min-w-0"
					/>
				) : null}
			</main>

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
