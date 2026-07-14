import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import { Modal } from '~/components/modal'
import type { IconName } from '~/components/icon/paths'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import type { ProofPanelMinimalVariant } from '~/components/proof-panel-minimal/types'
import { sanitizeReturnTo } from '~/lib/sanitize-return-to'
import HomeScreen from '../home'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthInput } from '../_auth/input'
import { StatusRing, type StatusRingAccent } from '~/components/status-ring'
import { maskEmail } from '../_auth/mask-email'
import { AuthTerminalModal, type AuthTerminalButton } from '../_auth/terminal-modal'

type ConfirmacaoState = 'waiting' | 'corrigir' | 'success' | 'link-expired' | 'link-used'

const STATES: ConfirmacaoState[] = ['waiting', 'corrigir', 'success', 'link-expired', 'link-used']

const ERROR_TERMINAL: Record<'link-expired' | 'link-used', {
	accent: StatusRingAccent
	icon: IconName
	title: string
	body: string
	buttons: AuthTerminalButton[]
}> = {
	'link-expired': {
		accent: 'neutral',
		icon: 'schedule',
		title: 'Link expirado',
		body: 'O link de confirmação é válido por 24 horas. Solicite um novo para ativar sua conta.',
		buttons: [
			{ label: 'Enviar novo link', href: '?state=waiting', variant: 'filled' },
			{ label: 'Voltar para o login', href: '/login', variant: 'ghost' },
		],
	},
	'link-used': {
		accent: 'mint',
		icon: 'check',
		title: 'Sua conta já está ativa',
		body: 'Este link de confirmação já foi usado. Basta fazer login para continuar.',
		buttons: [{ label: 'Fazer login', href: '/login', variant: 'filled' }],
	},
}

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
	proof: ProofPanelMinimalVariant
}

function buildConfig(state: ConfirmacaoState, intent: string, returnTo: string): ConfirmacaoConfig {
	switch (state) {
		case 'success': {
			if (intent === 'download') {
				return {
					accent: 'mint',
					icon: 'check',
					title: 'Tudo pronto!',
					body: 'Seu material está pronto para baixar.',
					buttons: [
						{
							label: 'Baixar agora',
							href: `${returnTo || '/home'}?logado=true&toast=download-started`,
							variant: 'filled',
						},
					],
					proof: 'confirm-welcome',
				}
			}
			if (intent === 'newsletter') {
				return {
					accent: 'mint',
					icon: 'check',
					title: 'Tudo pronto!',
					body: 'Você já está inscrito na newsletter Food Connection.',
					buttons: [
						{
							label: 'Ir para o portal',
							href: `${returnTo || '/home'}?logado=true&toast=newsletter-subscribed`,
							variant: 'filled',
						},
					],
					proof: 'confirm-welcome',
				}
			}
			return {
				accent: 'mint',
				icon: 'check',
				title: 'Tudo pronto!',
				body: 'Acesse conteúdo exclusivo, análises e dados do seu setor sem restrições.',
				buttons: [
					{
						label: 'Explorar o portal',
						href: returnTo ? `${returnTo}?logado=true` : '/home',
						variant: 'filled',
					},
					{ label: 'Ir para minha conta', href: '/', variant: 'ghost' },
				],
				proof: 'confirm-welcome',
			}
		}
		default:
			// waiting + corrigir compartilham o config base
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
 * Estado "corrigir" (EML-02): a conta ainda não foi criada, então corrigir o e-mail
 * é só reenviar o link para o endereço certo — sem refazer o cadastro. Submete de volta
 * para o estado "waiting" com o novo e-mail.
 */
function CorrigirForm({ email, intent, returnTo }: { email: string; intent: string; returnTo: string }) {
	return (
		<div className="w-full max-w-[392px] flex flex-col items-center gap-8 text-center">
			<StatusRing accent="primary" icon="mail" size="sm" />

			<div className="flex flex-col gap-2 w-full">
				<h1
					id="confirmacao-v2-title"
					className="font-display font-bold text-headline-sm text-primary-600"
				>
					Corrigir e-mail
				</h1>
				<p className="font-body text-body-md text-neutral-900">
					Digite o e-mail correto e reenviaremos o link de confirmação — sem refazer o cadastro.
				</p>
			</div>

			<form
				action="/confirmacao-email"
				method="get"
				className="flex flex-col gap-4 w-full text-left"
				noValidate
			>
				<input type="hidden" name="state" value="waiting" />
				{intent ? <input type="hidden" name="intent" value={intent} /> : null}
				{returnTo ? <input type="hidden" name="returnTo" value={returnTo} /> : null}

				<AuthInput
					label="Novo e-mail"
					name="email"
					type="email"
					required
					autoFocus
					autoComplete="email"
					placeholder="seu@empresa.com.br"
					defaultValue={email}
				/>

				<button
					type="submit"
					className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors mt-2"
				>
					Salvar e reenviar
				</button>
			</form>
		</div>
	)
}

/**
 * Tela: Confirmação de E-mail (Modal) — v2
 * Modal sobre a home (portal ao fundo). Estados de jornada (waiting/corrigir/success) vivem na casca
 * 912px 50/50 (proof panel à esquerda + coluna de conteúdo, anel de status 80px, máx. 392px). Os
 * estados de fim de linha (link-expired/link-used) usam o AuthTerminalModal compacto, sem proof.
 * O link do e-mail abre este modal sobre a home; a full page /confirmacao-email-full foi arquivada.
 * Extras exclusivos do modal: estado "corrigir" (EML-02, troca de e-mail sem refazer cadastro)
 * e roteamento intent=download|newsletter.
 * Estados: ?state=waiting|corrigir|success|link-expired|link-used · ?email=... · ?intent=download|newsletter
 */
export default function ConfirmacaoEmailV2Screen() {
	const [params] = useSearchParams()
	const stateParam = params.get('state') ?? 'waiting'
	const state = (STATES.includes(stateParam as ConfirmacaoState)
		? stateParam
		: 'waiting') as ConfirmacaoState

	const email = params.get('email') ?? 'mariana.albuquerque@empresa.com.br'
	const intent = params.get('intent') ?? ''
	const hasReturnTo = params.get('returnTo') !== null
	const returnTo = sanitizeReturnTo(params.get('returnTo'))

	const isErrorTerminal = state === 'link-expired' || state === 'link-used'
	const errorTerminal = isErrorTerminal ? ERROR_TERMINAL[state as 'link-expired' | 'link-used'] : null

	const cfg = buildConfig(state, intent, hasReturnTo ? returnTo : '')
	const isWaiting = state === 'waiting'
	const isCorrigir = state === 'corrigir'
	const showBack = isWaiting || isCorrigir

	const extraQuery = `${intent ? `&intent=${encodeURIComponent(intent)}` : ''}${
		hasReturnTo ? `&returnTo=${encodeURIComponent(returnTo)}` : ''
	}`

	const backHref = isCorrigir ? `?state=waiting&email=${encodeURIComponent(email)}${extraQuery}` : '/login'

	const corrigirHref = `?state=corrigir&email=${encodeURIComponent(email)}${extraQuery}`

	return (
		<>
			{/* Portal ao fundo — só visível ≥lg (o modal cobre tudo no mobile) */}
			<div className="hidden lg:block">
				<HomeScreen />
			</div>

			{errorTerminal ? (
				<AuthTerminalModal
					accent={errorTerminal.accent}
					icon={errorTerminal.icon}
					title={errorTerminal.title}
					body={errorTerminal.body}
					buttons={errorTerminal.buttons}
					labelledById="confirmacao-v2-title"
				/>
			) : (
			<Modal
				open
				size="xl"
				padded={false}
				mobileFullScreen
				showClose={false}
				closeHref="/home"
				labelledById="confirmacao-v2-title"
				className="max-w-none lg:max-w-[912px] lg:min-h-[min(696px,90vh)]"
			>
				<ProofPanelMinimal
					variant={cfg.proof}
					size="sm"
					className="hidden lg:flex grow basis-1/2 min-w-0"
				/>

				{/* Coluna do conteúdo */}
				<div className="relative flex grow basis-1/2 min-w-0 min-h-0 flex-col bg-white">
					{/* top-bar: Voltar (waiting/corrigir) + fechar */}
					<div className="shrink-0 flex items-center justify-between px-4 pt-4 pb-2">
						{showBack ? (
							<a
								href={backHref}
								className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full font-body font-bold text-body-md text-primary-600 hover:bg-neutral-50 transition-colors"
							>
								<Icon name="arrow-left" className="size-5" />
								Voltar
							</a>
						) : (
							<span aria-hidden="true" />
						)}

						<a
							href="/home"
							aria-label="Fechar"
							className="inline-flex items-center justify-center size-9 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors"
						>
							<Icon name="close" className="size-[18px]" />
						</a>
					</div>

					{/* body centralizado */}
					<div className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center justify-center px-6 py-8">
						{isCorrigir ? (
							<CorrigirForm email={email} intent={intent} returnTo={hasReturnTo ? returnTo : ''} />
						) : (
							<div className="w-full max-w-[392px] flex flex-col items-center gap-8 text-center">
								<StatusRing accent={cfg.accent} icon={cfg.icon} size="sm" />

								<div className="flex flex-col gap-2 w-full">
									<h1
										id="confirmacao-v2-title"
										className="font-display font-bold text-headline-sm text-primary-600"
									>
										{cfg.title}
									</h1>

									{isWaiting ? (
										<div className="flex flex-col gap-1 w-full font-body text-body-md text-neutral-900">
											<p>Enviamos um link para</p>
											<p className="font-bold break-words">{maskEmail(email)}</p>
											<p>Clique no link para ativar sua conta.</p>
										</div>
									) : (
										<p className="font-body text-body-md text-neutral-900">{cfg.body}</p>
									)}
								</div>

								<div className="flex flex-col gap-3 w-full">
									{cfg.buttons.map((btn) => (
										<ConfirmButton key={btn.label} {...btn} />
									))}
								</div>
							</div>
						)}
					</div>

					{/* footer — apenas no estado "aguardando" */}
					{isWaiting ? (
						<footer className="shrink-0 px-8 pt-6 pb-6">
							<p className="text-center font-body text-body-md text-neutral-700">
								E-mail errado?{' '}
								<a href={corrigirHref} className="font-bold text-secondary-950 hover:underline">
									Corrigir
								</a>
							</p>
						</footer>
					) : null}
				</div>
			</Modal>
			)}

			<AuthDevNav
				paramName="state"
				label="Estado"
				options={STATES as unknown as string[]}
				current={state}
				extraQuery={`&email=${encodeURIComponent(email)}${extraQuery}`}
			/>
		</>
	)
}
