import { useSearchParams } from 'react-router'
import { Icon } from '~/components/icon'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import { AuthBottomLink } from '../_auth/bottom-link'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthErrorAlert } from '../_auth/error-alert'
import { AuthInput } from '../_auth/input'
import { AuthResendButton } from '../_auth/resend-button'
import { AuthStatusRing } from '../_auth/status-ring'

type RecuperaState = 'default' | 'sent'
type RecuperaError = 'none' | 'empty' | 'invalido' | 'throttle'

const STATES: RecuperaState[] = ['default', 'sent']
const ERRORS: RecuperaError[] = ['none', 'empty', 'invalido', 'throttle']

/**
 * Tela: Recupera Senha (Full Page) — v2
 * Tela A do fluxo de recuperação, alinhada ao Login/Confirmação full page: split 50/50,
 * page-header (Voltar) / body centralizado (máx. 392px) / footer + proof panel size="md".
 * O estado "sent" ("Confira sua caixa de entrada") replica o layout de status do "Confirme seu
 * e-mail": anel de status 120px, conteúdo centralizado, headline-lg.
 * Estados: ?state=default|sent · erros: ?error=empty|invalido|throttle
 * Tokens: --color-primary-600, --color-secondary-950, --color-neutral-*
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

	const isSent = state === 'sent'

	return (
		<>
			<main className="flex min-h-screen items-stretch">
				{/* Coluna do conteúdo */}
				<div className="flex grow basis-1/2 min-w-0 flex-col bg-white animate-fade-up-sm">
					{/* page-header — Voltar para o login nos dois estados (top back, como no modal) */}
					<header className="shrink-0 px-10 pt-10 pb-6">
						<a
							href="/login"
							className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 -ml-1 rounded-full font-body font-bold text-body-md text-primary-600 hover:bg-neutral-50 transition-colors"
						>
							<Icon name="arrow-left" className="size-5" />
							Voltar para o login
						</a>
					</header>

					{/* page-body */}
					<div className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-6 py-8">
						{isSent ? (
							<div className="w-full max-w-[392px] flex flex-col items-center gap-8 text-center">
								<AuthStatusRing accent="primary" icon="mail" size="sm" />

								<div className="flex flex-col gap-2 w-full">
									<h1 className="font-display font-bold text-headline-sm text-primary-600">
										Confira sua caixa de entrada
									</h1>
									<p className="font-body text-body-md text-neutral-900">
										Se este e-mail estiver cadastrado, você receberá um link em instantes para criar
										uma nova senha.
									</p>
									<p className="font-body text-body-sm text-neutral-700">
										Não esqueça de verificar a pasta de spam. O link expira em 1 hora.
									</p>
								</div>

								<div className="flex flex-col gap-3 w-full">
									<AuthResendButton label="Reenviar e-mail" />
								</div>
							</div>
						) : (
							<div className="w-full max-w-[392px] flex flex-col gap-6">
								<div className="flex flex-col gap-2">
									<h1 className="font-display font-bold text-headline-md text-primary-600">
										Esqueceu a senha?
									</h1>
									<p className="font-body text-body-lg text-neutral-900">
										Informe seu e-mail e enviaremos um link para criar uma nova senha.
									</p>
								</div>

								{globalError ? <AuthErrorAlert message={globalError} /> : null}

								<form action="/recupera-senha" method="get" className="flex flex-col gap-6" noValidate>
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
										className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
									>
										Enviar link de recuperação
									</button>
								</form>
							</div>
						)}
					</div>

					{/* page-footer */}
					<footer className="shrink-0 px-10 pt-6 pb-10">
						{isSent ? (
							<AuthBottomLink label="E-mail errado?" linkLabel="Corrigir" linkHref="?state=default" />
						) : (
							<AuthBottomLink label="Não tem conta?" linkLabel="Criar conta" linkHref="/cadastro?step=1" />
						)}
					</footer>
				</div>

				<ProofPanelMinimal
					variant="login"
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
