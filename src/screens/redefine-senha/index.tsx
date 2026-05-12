import { useSearchParams } from 'react-router'
import { PasswordStrength } from '~/components/password-strength'
import type { PasswordStrengthLevel } from '~/components/password-strength/types'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import type { ProofPanelMinimalVariant } from '~/components/proof-panel-minimal/types'
import { AuthBackLink } from '../_auth/back-link'
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
		ctaHref: '/login',
		proof: 'welcome',
	},
	expired: {
		tone: 'warning',
		icon: 'schedule',
		title: 'Link expirado',
		body: 'O link de redefinição é válido por 1 hora. Solicite um novo para continuar.',
		ctaLabel: 'Solicitar novo link',
		ctaHref: '/recupera-senha',
		proof: 'login',
	},
	used: {
		tone: 'info-primary',
		icon: 'check',
		title: 'Este link já foi usado',
		body: 'Sua senha já foi redefinida. Faça login para entrar na sua conta.',
		ctaLabel: 'Fazer login',
		ctaHref: '/login',
		proof: 'login',
	},
}

/**
 * Tela: Redefine Senha — v3.0
 * Estados: ?state=valid|loading|success|expired|used · erros: ?error=fraca|mismatch
 */
export default function RedefineSenhaScreen() {
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
	const proofVariant: ProofPanelMinimalVariant = terminal?.proof ?? 'login'

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
	const pwLevel: PasswordStrengthLevel = isLoading
		? 'strong'
		: errorMode === 'fraca'
			? 'weak'
			: 'empty'

	return (
		<>
			<div className="flex min-h-screen items-stretch">
				<section className="flex flex-col w-[560px] shrink-0 px-14 py-12 bg-white animate-fade-up-sm">
					<div className="w-full">
						{state === 'valid' ? (
							<AuthBackLink href="/recupera-senha" label="Voltar" />
						) : null}
					</div>

					<div className="flex-1 flex flex-col justify-center w-full">
						{terminal ? (
							<div className="flex flex-col gap-6 w-full">
								<AuthStatusIcon tone={terminal.tone} icon={terminal.icon} />

								<div className="flex flex-col gap-2 w-full">
									<h1 className="font-display font-bold text-headline-md text-primary-600">
										{terminal.title}
									</h1>
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
								<AuthStatusIcon tone="info-secondary" icon="lock" />

								<div className="flex flex-col gap-2 w-full">
									<h1 className="font-display font-bold text-headline-md text-primary-600">
										Crie uma nova senha
									</h1>
									<p className="font-body text-body-lg text-neutral-900">
										Escolha uma senha forte com letras e números para proteger sua conta.
									</p>
								</div>

								<form
									action="/redefine-senha"
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
												id="redef-pw"
												autoComplete="new-password"
												defaultValue={pwValue}
												error={senhaError}
												required
											/>
											<PasswordStrength level={pwLevel} inputId="redef-pw" />
										</div>

										<AuthPasswordInput
											label="Confirmar senha"
											name="confirmar"
											id="redef-confirm"
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

					<AuthBottomLink label="Lembrou da senha?" linkLabel="Entrar" linkHref="/login" />
				</section>

				<ProofPanelMinimal variant={proofVariant} />
			</div>

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
