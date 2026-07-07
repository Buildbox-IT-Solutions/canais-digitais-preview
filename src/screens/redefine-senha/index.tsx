import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { Icon } from '~/components/icon'
import { PasswordStrength } from '~/components/password-strength'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import type { ProofPanelMinimalVariant } from '~/components/proof-panel-minimal/types'
import { AuthBottomLink } from '../_auth/bottom-link'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthPasswordInput } from '../_auth/password-input'
import { StatusRing, type StatusRingAccent } from '~/components/status-ring'
import type { IconName } from '~/components/icon/paths'

type RedefineState = 'valid' | 'loading' | 'success' | 'expired' | 'used'
type RedefineError = 'none' | 'fraca' | 'mismatch'

const STATES: RedefineState[] = ['valid', 'loading', 'success', 'expired', 'used']
const ERRORS: RedefineError[] = ['none', 'fraca', 'mismatch']

interface TerminalConfig {
	accent: StatusRingAccent
	icon: IconName
	title: string
	body: string
	ctaLabel: string
	ctaHref: string
	proof: ProofPanelMinimalVariant
}

const TERMINAL: Record<'success' | 'expired' | 'used', TerminalConfig> = {
	success: {
		accent: 'mint',
		icon: 'check',
		title: 'Senha redefinida',
		body: 'Sua nova senha está ativa. Faça login para continuar.',
		ctaLabel: 'Fazer login',
		ctaHref: '/login',
		proof: 'welcome',
	},
	expired: {
		accent: 'neutral',
		icon: 'schedule',
		title: 'Link expirado',
		body: 'O link de redefinição é válido por 1 hora. Solicite um novo para continuar.',
		ctaLabel: 'Solicitar novo link',
		ctaHref: '/recupera-senha',
		proof: 'login',
	},
	used: {
		accent: 'mint',
		icon: 'check',
		title: 'Este link já foi usado',
		body: 'Sua senha já foi redefinida. Faça login para entrar na sua conta.',
		ctaLabel: 'Fazer login',
		ctaHref: '/login',
		proof: 'login',
	},
}

/**
 * Tela: Redefine Senha (Full Page) — v2
 * Alinhada ao Login/Confirmação full page: split 50/50, page-header (Voltar) / body centralizado
 * (máx. 392px) / footer + proof panel size="md". Os estados terminais (success/expired/used) usam
 * o layout de status do "Confirme seu e-mail": anel de status 120px, conteúdo centralizado, headline-lg.
 * Estados: ?state=valid|loading|success|expired|used · erros: ?error=mismatch
 * Tokens: --color-primary-600, --color-mint, --color-secondary-950, --color-neutral-*
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
			<main className="flex min-h-screen items-stretch">
				{/* Coluna do conteúdo */}
				<div className="flex grow basis-1/2 min-w-0 flex-col bg-white animate-fade-up-sm">
					{/* page-header — apenas no estado "valid" do formulário */}
					{state === 'valid' ? (
						<header className="shrink-0 px-10 pt-10 pb-6">
							<a
								href="/recupera-senha"
								className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 -ml-1 rounded-full font-body font-bold text-body-md text-primary-600 hover:bg-neutral-50 transition-colors"
							>
								<Icon name="arrow-left" className="size-5" />
								Voltar
							</a>
						</header>
					) : null}

					{/* page-body */}
					<div className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-6 py-8">
						{terminal ? (
							<div className="w-full max-w-[392px] flex flex-col items-center gap-8 text-center">
								<StatusRing accent={terminal.accent} icon={terminal.icon} />

								<div className="flex flex-col gap-2 w-full">
									<h1 className="font-display font-bold text-headline-lg text-primary-600">
										{terminal.title}
									</h1>
									<p className="font-body text-body-lg text-neutral-900">{terminal.body}</p>
								</div>

								<a
									href={terminal.ctaHref}
									className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
								>
									{terminal.ctaLabel}
								</a>
							</div>
						) : (
							<div className="w-full max-w-[392px] flex flex-col gap-6">
								<div className="flex flex-col gap-2">
									<h1 className="font-display font-bold text-headline-md text-primary-600">
										Crie uma nova senha
									</h1>
									<p className="font-body text-body-lg text-neutral-900">
										Escolha uma senha forte com letras e números para proteger sua conta.
									</p>
								</div>

								<form action="/redefine-senha" method="get" className="flex flex-col gap-6" noValidate>
									<input type="hidden" name="state" value="success" />
									<fieldset className="contents" disabled={isLoading}>
										<div className="flex flex-col gap-3 w-full">
											<AuthPasswordInput
												label="Nova senha"
												name="senha"
												id="redef-pw"
												autoComplete="new-password"
												value={pw}
												onChange={setPw}
												error={senhaError}
												required
											/>
											<PasswordStrength value={pw} inputId="redef-pw" />
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

					{/* page-footer — apenas nos estados de formulário */}
					{terminal ? null : (
						<footer className="shrink-0 px-10 pt-6 pb-10">
							<AuthBottomLink label="Lembrou da senha?" linkLabel="Entrar" linkHref="/login" />
						</footer>
					)}
				</div>

				<ProofPanelMinimal
					variant={proofVariant}
					size="md"
					className="hidden md:flex grow basis-1/2 min-w-0"
				/>
			</main>

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
