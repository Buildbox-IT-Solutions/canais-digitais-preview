import { useSearchParams } from 'react-router'
import { Icon } from '~/components/icon'
import { Modal } from '~/components/modal'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import HomeScreen from '../home'
import { AuthBottomLink } from '../_auth/bottom-link'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthErrorAlert } from '../_auth/error-alert'
import { AuthInput } from '../_auth/input'
import { AuthStatusRing } from '../_auth/status-ring'

type RecuperaState = 'default' | 'sent'
type RecuperaError = 'none' | 'empty' | 'invalido' | 'throttle'

const STATES: RecuperaState[] = ['default', 'sent']
const ERRORS: RecuperaError[] = ['none', 'empty', 'invalido', 'throttle']

/**
 * Tela: Recupera Senha (Modal) — v2
 * Versão modal do fluxo de recuperação, espelhando Login/Cadastro modal (912px, proof panel size="sm",
 * top-bar com Voltar + fechar). O estado "sent" replica o status do "Confirme seu e-mail" modal:
 * AuthStatusIcon (mail), título + corpo + ações.
 * Estados: ?state=default|sent · erros: ?error=empty|invalido|throttle
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-*
 */
export default function RecuperaSenhaV2Screen() {
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

	const isSent = state === 'sent'

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
				labelledById="recupera-v2-title"
				className="max-w-[912px] min-h-[min(696px,90vh)]"
			>
				<ProofPanelMinimal variant="login" size="sm" className="hidden md:flex grow basis-1/2 min-w-0" />

				{/* Coluna do conteúdo */}
				<div className="relative flex grow basis-1/2 min-w-0 min-h-0 flex-col bg-white">
					{/* top-bar: Voltar + fechar */}
					<div className="shrink-0 flex items-center justify-between px-4 pt-4 pb-2">
						<a
							href="/login"
							className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full font-body font-bold text-body-md text-primary-600 hover:bg-neutral-50 transition-colors"
						>
							<Icon name="arrow-left" className="size-5" />
							Voltar
						</a>

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
						{isSent ? (
							<div className="flex flex-col items-center gap-8 text-center w-full">
								<AuthStatusRing accent="primary" icon="mail" />

								<div className="flex flex-col gap-2 w-full">
									<h2
										id="recupera-v2-title"
										className="font-display font-bold text-headline-md text-primary-600"
									>
										Confira sua caixa de entrada
									</h2>
									<p className="font-body text-body-lg text-neutral-900">
										Se este e-mail estiver cadastrado, você receberá um link em instantes para criar
										uma nova senha.
									</p>
									<p className="font-body text-body-md text-neutral-700">
										Não esqueça de verificar a pasta de spam. O link expira em 1 hora.
									</p>
								</div>

								<div className="flex flex-col gap-3 w-full">
									<a
										href="/login"
										className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
									>
										Voltar para o login
									</a>
									<a
										href="?state=default"
										className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-transparent hover:bg-neutral-50 text-primary-600 font-body font-bold text-body-lg transition-colors"
									>
										Tentar com outro e-mail
									</a>
								</div>
							</div>
						) : (
							<div className="flex flex-col gap-6 w-full">
								<div className="flex flex-col gap-2 w-full">
									<h2
										id="recupera-v2-title"
										className="font-display font-bold text-headline-md text-primary-600"
									>
										Esqueceu a senha?
									</h2>
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
							</div>
						)}
					</div>

					{/* footer */}
					{isSent ? null : (
						<div className="shrink-0 px-8 pt-4 pb-8">
							<AuthBottomLink
								label="Não tem conta?"
								linkLabel="Criar conta"
								linkHref="/cadastro?step=1"
							/>
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
