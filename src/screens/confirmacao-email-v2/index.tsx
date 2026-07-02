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
import { AuthStatusIcon, type StatusTone } from '../_auth/status-icon'

type ConfirmacaoState = 'waiting' | 'corrigir' | 'success' | 'link-expired' | 'link-used'

const STATES: ConfirmacaoState[] = ['waiting', 'corrigir', 'success', 'link-expired', 'link-used']

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
				body: 'O link de confirmação é válido por 24 horas. Solicite um novo para ativar sua conta.',
				primaryLabel: 'Enviar novo link',
				primaryHref: intent === 'download'
					? `/gate-download?state=waiting&email=${encodeURIComponent(email)}`
					: `?state=waiting&email=${encodeURIComponent(email)}`,
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
			// waiting + corrigir compartilham o config base
			return {
				tone: 'info-secondary',
				icon: 'mail',
				title: 'Confirme seu e-mail',
				body: null,
				primaryLabel: 'Reenviar e-mail',
				primaryHref: '#',
				secondLabel: 'Errei o e-mail',
				secondHref: `?state=corrigir&email=${encodeURIComponent(email)}${
					intent ? `&intent=${encodeURIComponent(intent)}` : ''
				}`,
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
 * Estado "corrigir" (EML-02): a conta ainda não foi criada, então corrigir o e-mail
 * é só reenviar o link para o endereço certo — sem refazer o cadastro. Submete de volta
 * para o estado "waiting" com o novo e-mail.
 */
function CorrigirForm({ email, intent }: { email: string; intent: string }) {
	return (
		<div className="flex flex-col gap-6 w-full">
			<AuthStatusIcon tone="info-secondary" icon="mail" />

			<div className="flex flex-col gap-2 w-full">
				<h1
					id="confirmacao-v2-title"
					className="font-display font-bold text-headline-md text-primary-600"
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
 * Layout padrão dos modais de auth (EML-04): proof panel à esquerda (50%) + coluna de conteúdo
 * à direita (50%), 912px, top-bar com Voltar + fechar. Estado "corrigir" (EML-02) permite
 * trocar o e-mail sem refazer o cadastro.
 * Estados: ?state=waiting|corrigir|success|link-expired|link-used · ?email=... · ?intent=download
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
	const isCorrigir = state === 'corrigir'

	const backHref = isCorrigir ? `?state=waiting&email=${encodeURIComponent(email)}` : '/login'
	const backLabel = isCorrigir ? 'Voltar' : 'Voltar para o login'

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
					{/* top-bar: Voltar (exceto success) + fechar */}
					<div className="shrink-0 flex items-center justify-between px-4 pt-4 pb-2">
						{state !== 'success' ? (
							<a
								href={backHref}
								className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full font-body font-bold text-body-md text-primary-600 hover:bg-neutral-50 transition-colors"
							>
								<Icon name="arrow-left" className="size-5" />
								{backLabel}
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
					<div className="flex-1 min-h-0 overflow-y-auto px-8 pt-4 pb-4 flex flex-col justify-center">
						{isCorrigir ? (
							<CorrigirForm email={email} intent={intent} />
						) : (
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
						)}
					</div>

					{/* footer: simular clique (só waiting) */}
					{isWaiting ? (
						<div className="shrink-0 px-8 pt-2 pb-6">
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
						</div>
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
