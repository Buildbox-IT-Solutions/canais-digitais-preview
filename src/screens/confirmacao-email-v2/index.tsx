import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import { Modal } from '~/components/modal'
import type { IconName } from '~/components/icon/paths'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import type { ProofPanelMinimalVariant } from '~/components/proof-panel-minimal/types'
import HomeScreen from '../home'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthInput } from '../_auth/input'
import { AuthStatusRing, type StatusRingAccent } from '../_auth/status-ring'

type ConfirmacaoState = 'waiting' | 'corrigir' | 'success'

const STATES: ConfirmacaoState[] = ['waiting', 'corrigir', 'success']

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

function buildConfig(state: ConfirmacaoState): ConfirmacaoConfig {
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
function CorrigirForm({ email, intent }: { email: string; intent: string }) {
	return (
		<div className="w-full max-w-[392px] flex flex-col gap-6">
			<AuthStatusRing accent="primary" icon="mail" />

			<div className="flex flex-col gap-2 w-full">
				<h1
					id="confirmacao-v2-title"
					className="font-display font-bold text-headline-lg text-primary-600"
				>
					Corrigir e-mail
				</h1>
				<p className="font-body text-body-lg text-neutral-900">
					Digite o e-mail correto e reenviaremos o link de confirmação — sem refazer o cadastro.
				</p>
			</div>

			<form action="/confirmacao-email" method="get" className="flex flex-col gap-4 w-full" noValidate>
				<input type="hidden" name="state" value="waiting" />
				{intent ? <input type="hidden" name="intent" value={intent} /> : null}

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
 * Estados "warm" (usuário na sessão, modal aberto): waiting|corrigir|success — conteúdo idêntico
 * à full page (confirmacao-email): anel de status 120px, layout centralizado (máx. 392px),
 * tipografia e botões iguais. A única diferença é a apresentação — aqui vive dentro de um Modal
 * 912px sobre o portal, com proof panel à esquerda (50%) e botão de fechar.
 * Os estados de link inválido (link-expired|link-used) são cold-entry — o usuário chega pelo link
 * do e-mail sem o modal aberto — e por isso vivem na full page /confirmacao-email-full.
 * Extras exclusivos do modal: estado "corrigir" (EML-02, troca de e-mail sem refazer cadastro)
 * e roteamento intent=download.
 * Estados: ?state=waiting|corrigir|success · ?email=... · ?intent=download
 */
export default function ConfirmacaoEmailV2Screen() {
	const [params] = useSearchParams()
	const stateParam = params.get('state') ?? 'waiting'
	const state = (STATES.includes(stateParam as ConfirmacaoState)
		? stateParam
		: 'waiting') as ConfirmacaoState

	const email = params.get('email') ?? 'mariana.albuquerque@empresa.com.br'
	const intent = params.get('intent') ?? ''
	const cfg = buildConfig(state)
	const isWaiting = state === 'waiting'
	const isCorrigir = state === 'corrigir'
	const showBack = isWaiting || isCorrigir

	const backHref = isCorrigir ? `?state=waiting&email=${encodeURIComponent(email)}` : '/login'

	const corrigirHref = `?state=corrigir&email=${encodeURIComponent(email)}${
		intent ? `&intent=${encodeURIComponent(intent)}` : ''
	}`

	return (
		<>
			{/* Portal ao fundo */}
			<HomeScreen />

			<Modal
				open
				size="xl"
				padded={false}
				showClose={false}
				closeHref="/home"
				labelledById="confirmacao-v2-title"
				className="max-w-[912px] min-h-[min(696px,90vh)]"
			>
				<ProofPanelMinimal
					variant={cfg.proof}
					size="sm"
					className="hidden md:flex grow basis-1/2 min-w-0"
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
							<CorrigirForm email={email} intent={intent} />
						) : (
							<div className="w-full max-w-[392px] flex flex-col items-center gap-8 text-center">
								<AuthStatusRing accent={cfg.accent} icon={cfg.icon} />

								<div className="flex flex-col gap-2 w-full">
									<h1
										id="confirmacao-v2-title"
										className="font-display font-bold text-headline-lg text-primary-600"
									>
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
