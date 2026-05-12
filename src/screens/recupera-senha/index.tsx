import { useSearchParams } from 'react-router'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import { AuthBackLink } from '../_auth/back-link'
import { AuthBottomLink } from '../_auth/bottom-link'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthErrorAlert } from '../_auth/error-alert'
import { AuthInput } from '../_auth/input'
import { AuthStatusIcon } from '../_auth/status-icon'

type RecuperaState = 'default' | 'sent'
type RecuperaError = 'none' | 'empty' | 'invalido' | 'throttle'

const STATES: RecuperaState[] = ['default', 'sent']
const ERRORS: RecuperaError[] = ['none', 'empty', 'invalido', 'throttle']

/**
 * Tela: Recupera Senha — v3.0
 * Tela A do fluxo de recuperação. Estados: ?state=default|sent · erros: ?error=...
 */
export default function RecuperaSenhaScreen() {
	const [params] = useSearchParams()
	const stateParam = params.get('state') ?? 'default'
	const state = (STATES.includes(stateParam as RecuperaState) ? stateParam : 'default') as RecuperaState

	const errorParam = params.get('error') ?? 'none'
	const errorMode = (ERRORS.includes(errorParam as RecuperaError)
		? errorParam
		: 'none') as RecuperaError

	const emailError =
		errorMode === 'empty'
			? 'Informe seu e-mail.'
			: errorMode === 'invalido'
				? 'Digite um e-mail válido.'
				: undefined

	const globalError =
		errorMode === 'throttle'
			? 'Você fez muitas tentativas. Aguarde 5 minutos antes de tentar novamente.'
			: undefined

	const emailDefault =
		errorMode === 'invalido'
			? 'teste@'
			: errorMode === 'throttle'
				? 'maria.silva@empresa.com.br'
				: ''

	return (
		<>
			<div className="flex min-h-screen items-stretch">
				<section className="flex flex-col w-[560px] shrink-0 px-14 py-12 bg-white animate-fade-up-sm">
					<div className="w-full">
						<AuthBackLink href="/login" label="Voltar para o login" />
					</div>

					<div className="flex-1 flex flex-col justify-center w-full">
						<div className="flex flex-col gap-6 w-full">
							{state === 'sent' ? (
								<>
									<AuthStatusIcon tone="success" icon="mail" />

									<div className="flex flex-col gap-2 w-full">
										<h1 className="font-display font-bold text-headline-md text-primary-600">
											Confira sua caixa de entrada
										</h1>
										<p className="font-body text-body-lg text-neutral-900">
											Se este e-mail estiver cadastrado, você receberá um link em instantes
											para criar uma nova senha.
										</p>
										<p className="font-body text-body-md text-neutral-700">
											Não esqueça de verificar a pasta de spam. O link expira em 1 hora.
										</p>
									</div>

									<div className="flex flex-col gap-3 w-full mt-2">
										<a
											href="/login"
											className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
										>
											Voltar para o login
										</a>
										<a
											href="?state=default"
											className="self-center font-body font-bold text-body-md text-secondary-950 hover:underline"
										>
											Tentar com outro e-mail
										</a>
									</div>
								</>
							) : (
								<>
									<div className="flex flex-col gap-2 w-full">
										<h1 className="font-display font-bold text-headline-md text-primary-600">
											Esqueceu a senha?
										</h1>
										<p className="font-body text-body-lg text-neutral-900">
											Informe seu e-mail e enviaremos um link para criar uma nova senha.
										</p>
									</div>

									{globalError ? <AuthErrorAlert message={globalError} /> : null}

									<form
										action="/recupera-senha"
										method="get"
										className="flex flex-col gap-4 w-full"
										noValidate
									>
										<input type="hidden" name="state" value="sent" />

										<AuthInput
											label="E-mail"
											name="email"
											type="email"
											required
											autoFocus
											autoComplete="email"
											placeholder="seu@empresa.com.br"
											defaultValue={emailDefault}
											error={emailError}
										/>

										<button
											type="submit"
											className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors mt-2"
										>
											Enviar link de recuperação
										</button>
									</form>
								</>
							)}
						</div>
					</div>

					<AuthBottomLink
						label="Não tem conta?"
						linkLabel="Criar conta"
						linkHref="/cadastro?step=1"
					/>
				</section>

				<ProofPanelMinimal variant="login" />
			</div>

			<AuthDevNav
				rows={[
					{
						paramName: 'state',
						label: 'Estado',
						options: STATES as unknown as string[],
						current: state,
					},
					...(state === 'default'
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
