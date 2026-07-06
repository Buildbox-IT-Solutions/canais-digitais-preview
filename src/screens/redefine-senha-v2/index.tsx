import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { Icon } from '~/components/icon'
import { Modal } from '~/components/modal'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import type { ProofPanelMinimalVariant } from '~/components/proof-panel-minimal/types'
import { PasswordChecklist } from '~/components/password-checklist'
import HomeScreen from '../home'
import { AuthBottomLink } from '../_auth/bottom-link'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthPasswordInput } from '../_auth/password-input'
import { StatusRing, type StatusRingAccent } from '~/components/status-ring'
import { AuthTerminalModal, type AuthTerminalButton } from '../_auth/terminal-modal'
import type { IconName } from '~/components/icon/paths'

type RedefineState = 'valid' | 'loading' | 'success' | 'expired' | 'used'
type RedefineError = 'none' | 'mismatch'

const STATES: RedefineState[] = ['valid', 'loading', 'success', 'expired', 'used']
const ERRORS: RedefineError[] = ['none', 'mismatch']

// Sucesso permanece na casca 50/50 com proof celebratória.
const SUCCESS = {
	accent: 'mint' as StatusRingAccent,
	icon: 'check' as IconName,
	title: 'Senha redefinida',
	body: 'Sua nova senha está ativa. Faça login para continuar.',
	ctaLabel: 'Fazer login',
	ctaHref: '/login',
	proof: 'welcome' as ProofPanelMinimalVariant,
}

// Fim de linha (erro) → modal terminal compacto, sem proof.
const ERROR_TERMINAL: Record<'expired' | 'used', {
	accent: StatusRingAccent
	icon: IconName
	title: string
	body: string
	buttons: AuthTerminalButton[]
}> = {
	expired: {
		accent: 'neutral',
		icon: 'schedule',
		title: 'Link expirado',
		body: 'O link de redefinição é válido por 1 hora. Solicite um novo para continuar.',
		buttons: [{ label: 'Solicitar novo link', href: '/recupera-senha', variant: 'filled' }],
	},
	used: {
		accent: 'mint',
		icon: 'check',
		title: 'Este link já foi usado',
		body: 'Sua senha já foi redefinida. Faça login para entrar na sua conta.',
		buttons: [{ label: 'Fazer login', href: '/login', variant: 'filled' }],
	},
}

/**
 * Tela: Redefine Senha (Modal) — v2
 * Modal sobre a home (912px, proof size="sm"). Formulário (valid/loading) e sucesso na casca 50/50
 * (sucesso com StatusRing size sm + proof celebratória). Fim de linha (expired/used) no
 * AuthTerminalModal compacto, sem proof.
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

	const isSuccess = state === 'success'
	const isErrorTerminal = state === 'expired' || state === 'used'
	const isLoading = state === 'loading'
	const errorTerminal = isErrorTerminal ? ERROR_TERMINAL[state as 'expired' | 'used'] : null

	const confirmError = errorMode === 'mismatch' ? 'As senhas não coincidem.' : undefined

	const pwValue = isLoading
		? 'minhaSenhaNova2026!'
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

	const stateRow = {
		paramName: 'state',
		label: 'Estado',
		options: STATES as unknown as string[],
		current: state,
	}

	if (errorTerminal) {
		return (
			<>
				<HomeScreen />
				<AuthTerminalModal
					accent={errorTerminal.accent}
					icon={errorTerminal.icon}
					title={errorTerminal.title}
					body={errorTerminal.body}
					buttons={errorTerminal.buttons}
					labelledById="redefine-v2-title"
				/>
				<AuthDevNav rows={[stateRow]} />
			</>
		)
	}

	const proofVariant: ProofPanelMinimalVariant = isSuccess ? SUCCESS.proof : 'login'

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
						{isSuccess ? (
							<span aria-hidden="true" />
						) : (
							<a
								href="/recupera-senha"
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
						{isSuccess ? (
							<div className="flex flex-col items-center gap-8 text-center w-full">
								<StatusRing accent={SUCCESS.accent} icon={SUCCESS.icon} size="sm" />

								<div className="flex flex-col gap-2 w-full">
									<h2
										id="redefine-v2-title"
										className="font-display font-bold text-headline-sm text-primary-600"
									>
										{SUCCESS.title}
									</h2>
									<p className="font-body text-body-md text-neutral-900">{SUCCESS.body}</p>
								</div>

								<a
									href={SUCCESS.ctaHref}
									className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
								>
									{SUCCESS.ctaLabel}
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
												id="redef-v2-pw"
												autoComplete="new-password"
												value={pw}
												onChange={setPw}
												required
											/>
											<PasswordChecklist value={pw} />
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
					{isSuccess ? null : (
						<div className="shrink-0 px-8 pt-4 pb-8">
							<AuthBottomLink label="Lembrou da senha?" linkLabel="Entrar" linkHref="/login" />
						</div>
					)}
				</div>
			</Modal>

			<AuthDevNav
				rows={[
					stateRow,
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
