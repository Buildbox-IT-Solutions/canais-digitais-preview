import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Icon } from '~/components/icon'
import { Modal } from '~/components/modal'
import { StatusRing } from '~/components/status-ring'
import HomeScreen from '../home'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthTerminalModal, type AuthTerminalButton } from '../_auth/terminal-modal'

type CancelState = 'loading' | 'success' | 'invalid' | 'error'

const STATES: CancelState[] = ['loading', 'success', 'invalid', 'error']
const VALIDATE_DELAY_MS = 900

/**
 * Simula a validação do token no backend a partir de marcadores no próprio token
 * (mesmo truque do `isExistente` em gate-download).
 *
 * INTEGRAÇÃO BACKEND (Thiago): trocar por uma chamada real, ex.
 *   GET /api/exclusao/cancelar?token=... → 200 (cancelada, token invalidado)
 *                                        | 410 Gone (expirado OU já usado — mesma resposta)
 *                                        | 4xx/5xx (erro de rede/servidor)
 * Regras que o servidor precisa garantir:
 *  - Token de uso único: invalidar no mesmo request que confirma o cancelamento.
 *  - Expira junto com a janela de 14 dias da solicitação original.
 *  - Nunca diferenciar "expirado" de "já usado" de "conta inexistente" na resposta
 *    (evita enumeração de contas).
 *  - Ao confirmar: reativar a conta e encerrar sessões ativas (bloco "não fui eu").
 */
function mockValidateToken(token: string): 'success' | 'invalid' | 'error' {
	if (token.includes('+error')) return 'error'
	if (token.includes('+invalido') || token.includes('+usado') || token.includes('+expirado')) return 'invalid'
	return 'success'
}

const INVALID_BUTTONS: AuthTerminalButton[] = [
	{ label: 'Criar uma nova conta', href: '/cadastro', variant: 'filled' },
]

/**
 * Tela: Cancelar Exclusão de Conta (Modal) — endpoint do link do e-mail de confirmação de
 * exclusão (fluxo de 14 dias com recuperação; a exclusão imediata não usa esta rota).
 * Modal sobre a home (portal público ao fundo) — NÃO faz auto-login pelo token; o acesso
 * segue pela autenticação normal (botão "Entrar").
 * Estados: loading (valida o token) → success | invalid | error.
 * Override de QA: ?state=loading|success|invalid|error. Sem override, simula a validação a
 * partir de marcadores no ?token= (ver `mockValidateToken`).
 * Tokens: --color-primary-600, --color-mint, --color-neutral-*, --color-red-600
 */
export default function CancelarExclusaoScreen() {
	const [params] = useSearchParams()
	const token = params.get('token') ?? ''
	const stateParam = params.get('state')
	const forcedState = STATES.includes(stateParam as CancelState) ? (stateParam as CancelState) : null

	const [autoState, setAutoState] = useState<CancelState>('loading')
	const [attempt, setAttempt] = useState(0)

	useEffect(() => {
		if (forcedState) return
		setAutoState('loading')
		const id = setTimeout(() => setAutoState(mockValidateToken(token)), VALIDATE_DELAY_MS)
		return () => clearTimeout(id)
	}, [token, forcedState, attempt])

	const state = forcedState ?? autoState

	return (
		<>
			{/* Portal ao fundo — só visível ≥lg (o modal cobre tudo no mobile) */}
			<div className="hidden lg:block">
				<HomeScreen />
			</div>

			{state === 'loading' ? <LoadingModal /> : null}
			{state === 'success' ? <SuccessModal /> : null}
			{state === 'invalid' ? (
				<AuthTerminalModal
					accent="neutral"
					icon="schedule"
					title="Este link não está mais disponível"
					body="O prazo para cancelar pode ter encerrado, ou a solicitação já foi processada."
					buttons={INVALID_BUTTONS}
					labelledById="cancelar-exclusao-title"
				/>
			) : null}
			{state === 'error' ? (
				<AuthTerminalModal
					accent="danger"
					icon="close"
					title="Não foi possível verificar o link"
					body="Ocorreu um problema ao processar sua solicitação. Tente novamente em instantes."
					buttons={[
						{ label: 'Tentar novamente', variant: 'filled', onClick: () => setAttempt((a) => a + 1) },
					]}
					labelledById="cancelar-exclusao-title"
				/>
			) : null}

			<AuthDevNav paramName="state" label="Estado" options={STATES as unknown as string[]} current={state} />
		</>
	)
}

function LoadingModal() {
	return (
		<Modal open size="md" mobileFullScreen closeHref="/home" labelledById="cancelar-exclusao-title">
			<div className="flex flex-col items-center gap-6 text-center w-full max-w-[392px] lg:max-w-none py-6">
				<svg
					className="size-10 animate-spin text-primary-600"
					viewBox="0 0 24 24"
					fill="none"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity=".25" />
					<path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
				</svg>
				<h2
					id="cancelar-exclusao-title"
					className="font-display font-bold text-headline-sm text-primary-600"
				>
					Validando seu link
				</h2>
				<p className="font-body text-body-md text-neutral-900">Aguarde um instante...</p>
			</div>
		</Modal>
	)
}

function SuccessModal() {
	return (
		<Modal open size="md" mobileFullScreen closeHref="/home" labelledById="cancelar-exclusao-title">
			<div className="flex flex-col items-center gap-8 text-center w-full max-w-[392px] lg:max-w-none">
				<StatusRing accent="mint" icon="check" size="sm" />

				<div className="flex flex-col gap-2 w-full">
					<h2
						id="cancelar-exclusao-title"
						className="font-display font-bold text-headline-sm text-primary-600"
					>
						Exclusão cancelada
					</h2>
					<p className="font-body text-body-md text-neutral-900">Sua conta foi reativada.</p>
				</div>

				<a
					href="/login"
					className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
				>
					Entrar
				</a>

				<div className="flex flex-col gap-3 w-full rounded-lg bg-neutral-50 p-4 text-left">
					<div className="flex items-start gap-2">
						<Icon name="shield" className="size-5 shrink-0 text-neutral-600 mt-0.5" />
						<p className="font-body text-body-md text-neutral-900">
							<strong className="font-bold">Não foi você quem pediu a exclusão?</strong> Recomendamos
							proteger sua conta.
						</p>
					</div>
					<a
						href="/recupera-senha"
						className="inline-flex items-center justify-center w-full h-10 px-5 rounded-full border-[1.5px] border-primary-600 text-primary-600 hover:bg-primary-600/[0.04] font-body font-bold text-body-md transition-colors"
					>
						Trocar senha
					</a>
				</div>
			</div>
		</Modal>
	)
}
