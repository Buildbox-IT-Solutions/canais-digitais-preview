import { useSearchParams, useNavigate } from 'react-router'
import { Dialog } from '~/components/dialog'
import { AuthBottomLink } from '../_auth/bottom-link'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthInput } from '../_auth/input'
import { AuthResendButton } from '../_auth/resend-button'
import ConteudoScreen from '../conteudo'

type GateState = 'email' | 'waiting'
type EmailError = 'none' | 'invalido' | 'vazio'
type WaitingError = 'none' | 'nao-recebi'

const GATE_STATES: GateState[] = ['email', 'waiting']
const EMAIL_ERRORS: EmailError[] = ['none', 'invalido', 'vazio']
const WAITING_ERRORS: WaitingError[] = ['none', 'nao-recebi']

function isExistente(email: string): boolean {
	return email.includes('+existe')
}

function maskEmail(email: string): string {
	return email.replace(/^[^@]+/, '****')
}

/**
 * Tela: Gate de Download
 * Dialog sobre ConteudoScreen que controla o acesso ao download de materiais.
 * Regra mock: e-mails com "+existe" → existente (state=waiting); demais → novo (/cadastro?intent=download).
 * Estados: ?state=email|waiting · ?error=invalido|vazio|nao-recebi · ?email=...
 */
export default function GateDownloadScreen() {
	const [params] = useSearchParams()
	const navigate = useNavigate()

	const stateParam = params.get('state') ?? 'email'
	const state = (GATE_STATES.includes(stateParam as GateState) ? stateParam : 'email') as GateState

	const email = params.get('email') ?? ''

	const errorParam = params.get('error') ?? 'none'
	const validErrors = state === 'email' ? EMAIL_ERRORS : WAITING_ERRORS
	const currentError = (validErrors as string[]).includes(errorParam) ? errorParam : 'none'

	const emailFieldError =
		currentError === 'invalido'
			? 'Digite um e-mail válido.'
			: currentError === 'vazio'
				? 'Informe seu e-mail.'
				: undefined

	const emailDefaultValue = currentError === 'invalido' ? 'teste@' : email

	function handleContinuar(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const data = new FormData(e.currentTarget)
		const value = (data.get('email') as string).trim()

		if (!value) {
			navigate('/gate-download?state=email&error=vazio')
			return
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
			navigate('/gate-download?state=email&error=invalido')
			return
		}
		if (isExistente(value)) {
			navigate(`/gate-download?state=waiting&email=${encodeURIComponent(value)}`)
		} else {
			navigate(`/cadastro?step=1&email=${encodeURIComponent(value)}&intent=download`)
		}
	}

	return (
		<>
			<ConteudoScreen />

			{state === 'email' ? (
				<Dialog
					closeHref="/conteudo"
					icon={{ name: 'download', tone: 'secondary' }}
					title="Baixe este material gratuitamente"
					description="Acesse com um clique e use todos os materiais sem preencher formulários de novo."
					primary={{
						label: 'Continuar',
						type: 'submit',
						form: 'gate-email-form',
						icon: 'arrow-right',
						iconPosition: 'trailing',
					}}
					bottomLink={<AuthBottomLink label="Já tem conta?" linkLabel="Entrar" linkHref="/login" />}
				>
					<form id="gate-email-form" onSubmit={handleContinuar} noValidate>
						<AuthInput
							label="E-mail"
							name="email"
							type="email"
							required
							autoFocus
							autoComplete="email"
							placeholder="seu@empresa.com.br"
							defaultValue={emailDefaultValue}
							error={emailFieldError}
						/>
					</form>
				</Dialog>
			) : (
				<Dialog
					closeHref="/conteudo"
					icon={{ name: 'mail', tone: 'secondary' }}
					title="Verifique seu e-mail"
					description={
						<>
							Enviamos um link para{' '}
							<strong className="font-bold text-neutral-950">
								{maskEmail(email || 'voce@empresa.com.br')}
							</strong>
							. Clique no link para baixar seu material.
						</>
					}
				>
					<div className="flex flex-col gap-6">
						{currentError === 'nao-recebi' ? (
							<p className="font-body text-body-md text-neutral-600 bg-neutral-50 rounded-lg p-3">
								Verifique a pasta de spam. O link expira em 24 horas. Se o problema persistir, tente
								reenviar.
							</p>
						) : null}

						<div className="flex flex-col gap-3">
							<AuthResendButton />
							<a
								href="/gate-download?state=email"
								className="self-center font-body font-bold text-body-md text-secondary-950 hover:underline"
							>
								Usei outro e-mail
							</a>
						</div>

						<p className="text-center font-body text-label-md text-neutral-400">
							<a href="/conteudo?logado=true" className="underline hover:text-neutral-600">
								[Simular clique no link]
							</a>
						</p>
					</div>
				</Dialog>
			)}

			<AuthDevNav
				rows={[
					{
						paramName: 'state',
						label: 'State',
						options: GATE_STATES as unknown as string[],
						current: state,
						extraQuery: email ? `&email=${encodeURIComponent(email)}` : '',
					},
					{
						paramName: 'error',
						label: 'Erro',
						options: validErrors as unknown as string[],
						current: currentError,
						extraQuery: `&state=${state}${email ? `&email=${encodeURIComponent(email)}` : ''}`,
					},
				]}
			/>
		</>
	)
}
