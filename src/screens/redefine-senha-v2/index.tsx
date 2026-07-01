import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { Icon } from '~/components/icon'
import { Modal } from '~/components/modal'
import { PasswordStrength } from '~/components/password-strength'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import type { ProofPanelMinimalVariant } from '~/components/proof-panel-minimal/types'
import HomeScreen from '../home'
import { AuthBottomLink } from '../_auth/bottom-link'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthPasswordInput } from '../_auth/password-input'
import { AuthStatusIcon, type StatusTone } from '../_auth/status-icon'
import type { IconName } from '~/components/icon/paths'

type RedefineState = 'valid' | 'loading' | 'success' | 'expired' | 'used'
type RedefineError = 'none' | 'fraca' | 'mismatch'

const STATES: RedefineState[] = ['valid', 'loading', 'success', 'expired', 'used']
const ERRORS: RedefineError[] = ['none', 'fraca', 'mismatch']

interface TerminalConfig {
	tone: StatusTone
	icon: IconName
	title: string
	body: string
	ctaLabel: string
	ctaHref: string
	proof: ProofPanelMinimalVariant
}

const TERMINAL: Record<'success' | 'expired' | 'used', TerminalConfig> = {
	success: {
		tone: 'success',
		icon: 'check',
		title: 'Senha redefinida',
		body: 'Sua nova senha está ativa. Faça login para continuar.',
		ctaLabel: 'Fazer login',
		ctaHref: '/login-v2',
		proof: 'welcome',
	},
	expired: {
		tone: 'warning',
		icon: 'schedule',
		title: 'Link expirado',
		body: 'O link de redefinição é válido por 1 hora. Solicite um novo para continuar.',
		ctaLabel: 'Solicitar novo link',
		ctaHref: '/recupera-senha-v2',
		proof: 'login',
	},
	used: {
		tone: 'info-primary',
		icon: 'check',
		title: 'Este link já foi usado',
		body: 'Sua senha já foi redefinida. Faça login para entrar na sua conta.',
		ctaLabel: 'Fazer login',
		ctaHref: '/login-v2',
		proof: 'login',
	},
}

/**
 * Tela: Redefine Senha (Modal) — v2
 * Versão modal do fluxo de redefinição, espelhando Login/Cadastro modal (912px, proof panel size="sm",
 * top-bar com Voltar + fechar). Estados terminais (success/expired/used) replicam o status modal do
 * "Confirme seu e-mail": AuthStatusIcon, título + corpo + ação única.
 * Estados: ?state=valid|loading|success|expired|used · erros: ?error=fraca|mismatch
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-*
 */
export default function RedefineSenhaV2Screen() {
	const [params] = useSearchParams()
	const stateParam = params.get('state') ?? 'valid'
	const state = (STATES.includes(stateParam as RedefineState)
		? stateParam
		: 'valid') as RedefineState

	const errorParam = params.get('error') ?? 'none'
	const errorMode = (ERRORS.includes(errorParam as RedefineError)
		? errorParam
		: 'none') as RedefineError

	const isTerminal = state === 'success' || state === 'expired' || state === 'used'
	const isLoading = state === 'loading'
	const terminal = isTerminal ? TERMINAL[state] : null

	const senhaError =
		errorMode === 'fraca'
			? 'Senha muito fraca. Use letras e números, mín. 8 caracteres.'
			: undefined
	const confirmError = errorMode === 'mismatch' ? 'As senhas não coincidem.' : undefined

	const pwValue = isLoading
		? 'minhaSenhaNova2026!'
		: errorMode === 'fraca'
			? 'abc'
			: errorMode === 'mismatch'
				? 'minhasenha123'
				: ''
	const confirmValue = isLoading
		? 'minhaSenhaNova2026!'
		: errorMode === 'mismatch'
			? 'outrasenha456'
			: ''

	const [pw, setPw] = useState(pwValue)
	useEffect(() => { setPw(pwValue) }, [pwValue])

	const proofVariant: ProofPanelMinimalVariant = terminal?.proof ?? 'login'

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
				labelledById="redefine-v2-title"
				className="max-w-[912px] min-h-[min(696px,90vh)]"
			>
				<ProofPanelMinimal
					variant={proofVariant}
					size="sm"
					className="hidden md:flex grow basis-1/2 min-w-0"
				/>

				{/* Coluna do conteúdo */}
				<div className="relative flex grow basis-1/2 min-w-0 min-h-0 flex-col bg-white">
					{/* top-bar: Voltar (só no formulário) + fechar */}
					<div className="shrink-0 flex items-center justify-between px-4 pt-4 pb-2">
						{terminal ? (
							<span aria-hidden="true" />
						) : (
							<a
								href="/recupera-senha-v2"
								className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full font-body font-bold text-body-md text-primary-600 hover:bg-neutral-50 transition-colors"
							>
								<Icon name="arrow-left" className="size-5" />
								Voltar
							</a>
						)}

						<a
							href="/home"
							aria-label="Fechar"
							className="inline-flex items-center justify-center size-9 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors"
						>
							<Icon name="close" className="size-[18px]" />
						</a>
					</div>

					{/* body */}
					<div className="flex-1 min-h-0 overflow-y-auto px-8 pt-4 pb-4 flex flex-col justify-center">
						{terminal ? (
							<div className="flex flex-col gap-6 w-full">
								<AuthStatusIcon tone={terminal.tone} icon={terminal.icon} />

								<div className="flex flex-col gap-2 w-full">
									<h2
										id="redefine-v2-title"
										className="font-display font-bold text-headline-md text-primary-600"
									>
										{terminal.title}
									</h2>
									<p className="font-body text-body-lg text-neutral-900">{terminal.body}</p>
								</div>

								<a
									href={terminal.ctaHref}
									className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors mt-2"
								>
									{terminal.ctaLabel}
								</a>
							</div>
						) : (
							<div className="flex flex-col gap-6 w-full">
								<div className="flex flex-col gap-2 w-full">
									<h2
										id="redefine-v2-title"
										className="font-display font-bold text-headline-md text-primary-600"
									>
										Crie uma nova senha
									</h2>
									<p className="font-body text-body-lg text-neutral-900">
										Escolha uma senha forte com letras e números para proteger sua conta.
									</p>
								</div>

								<form
									action="/redefine-senha-v2"
									method="get"
									className="flex flex-col gap-6 w-full"
									noValidate
								>
									<input type="hidden" name="state" value="success" />
									<fieldset className="contents" disabled={isLoading}>
										<div className="flex flex-col gap-3 w-full">
											<AuthPasswordInput
												label="Nova senha"
												name="senha"
												id="redef-v2-pw"
												autoComplete="new-password"
												value={pw}
												onChange={setPw}
												error={senhaError}
												required
											/>
											<PasswordStrength value={pw} inputId="redef-v2-pw" />
										</div>

										<AuthPasswordInput
											label="Confirmar senha"
											name="confirmar"
											id="redef-v2-confirm"
											autoComplete="new-password"
											defaultValue={confirmValue}
											error={confirmError}
											required
										/>

										<button
											type="submit"
											className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 disabled:bg-neutral-300 text-white font-body font-bold text-body-lg transition-colors"
										>
											{isLoading ? (
												<>
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
													Redefinindo...
												</>
											) : (
												'Redefinir senha'
											)}
										</button>
									</fieldset>
								</form>
							</div>
						)}
					</div>

					{/* footer — apenas no formulário */}
					{terminal ? null : (
						<div className="shrink-0 px-8 pt-4 pb-8">
							<AuthBottomLink label="Lembrou da senha?" linkLabel="Entrar" linkHref="/login-v2" />
						</div>
					)}
				</div>
			</Modal>

			<AuthDevNav
				rows={[
					{
						paramName: 'state',
						label: 'Estado',
						options: STATES as unknown as string[],
						current: state,
					},
					...(state === 'valid'
						? [
								{
									paramName: 'error',
									label: 'Erro',
									options: ERRORS as unknown as string[],
									current: errorMode,
								},
							]
						: []),
				]}
			/>
		</>
	)
}
