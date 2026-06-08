import { useSearchParams } from 'react-router'
import { Modal } from '~/components/modal'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import { SocialButton } from '~/components/social-button'
import HomeScreen from '../home'
import { AuthBottomLink } from '../_auth/bottom-link'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthErrorAlert } from '../_auth/error-alert'
import { AuthInput } from '../_auth/input'
import { AuthPasswordInput } from '../_auth/password-input'

type LoginError = 'none' | 'empty' | 'wrong' | 'not-found' | 'locked'

const ALLOWED_ERRORS: LoginError[] = ['none', 'empty', 'wrong', 'not-found', 'locked']

/**
 * Tela: Login (Modal) — v2 (deriva de login)
 * Mesmo fluxo e layout (form + ProofPanelMinimal) da página de login, agora apresentado
 * como modal sobre o portal (HomeScreen) em vez de página separada.
 * Estados de erro: ?error=empty|wrong|not-found|locked
 */
export default function LoginV2Screen() {
	const [params] = useSearchParams()
	const errorParam = params.get('error') ?? 'none'
	const errorMode = (ALLOWED_ERRORS.includes(errorParam as LoginError)
		? errorParam
		: 'none') as LoginError

	const emailDefault =
		errorMode === 'wrong'
			? 'mariana.albuquerque@empresa.com.br'
			: errorMode === 'locked'
				? 'ana.souza@informa.com'
				: errorMode === 'not-found'
					? 'ines.pereira@empresa.com.br'
					: ''

	const emailError =
		errorMode === 'empty'
			? 'Informe seu e-mail.'
			: errorMode === 'not-found'
				? 'E-mail não encontrado. Verifique ou crie uma conta.'
				: undefined

	const senhaError =
		errorMode === 'empty'
			? 'Informe sua senha.'
			: errorMode === 'wrong'
				? 'Senha incorreta. Tente novamente.'
				: undefined

	const globalError =
		errorMode === 'locked'
			? 'Conta bloqueada por 15 minutos após 5 tentativas inválidas. Use "Esqueci minha senha".'
			: undefined

	const senhaValue = errorMode === 'wrong' ? '********' : ''

	return (
		<>
			{/* Portal ao fundo */}
			<HomeScreen />

			<Modal open size="xl" padded={false} closeHref="/home" labelledById="login-v2-title">
				<section className="flex flex-col w-full md:w-[470px] shrink-0 px-8 sm:px-12 py-12 overflow-y-auto">
					<div className="flex-1 flex flex-col justify-center">
						<div className="flex flex-col gap-6">
							<div className="flex flex-col gap-2">
								<h2
									id="login-v2-title"
									className="font-display font-bold text-headline-md text-primary-600"
								>
									Entrar
								</h2>
								<p className="font-body text-body-lg text-neutral-900">
									Acesse sua conta para baixar materiais exclusivos e personalizar sua experiência.
								</p>
							</div>

							{globalError ? <AuthErrorAlert message={globalError} /> : null}

							<div className="flex flex-col gap-3">
								<SocialButton provider="linkedin" href="/home" />
								<SocialButton provider="google" href="/home" />
							</div>

							<div className="flex items-center gap-3 overflow-hidden">
								<span className="flex-1 h-px bg-neutral-100" />
								<span className="font-body text-body-md text-neutral-500">ou</span>
								<span className="flex-1 h-px bg-neutral-100" />
							</div>

							<form action="/home" method="get" className="flex flex-col gap-4" noValidate>
								<AuthInput
									label="E-mail"
									name="email"
									type="email"
									required
									autoComplete="email"
									placeholder="seu@empresa.com.br"
									defaultValue={emailDefault}
									error={emailError}
								/>

								<AuthPasswordInput
									label="Senha"
									name="senha"
									autoComplete="current-password"
									defaultValue={senhaValue}
									error={senhaError}
								/>

								<div className="flex justify-end">
									<a
										href="/recupera-senha"
										className="font-body font-bold text-body-md text-secondary-950 hover:underline"
									>
										Esqueci minha senha
									</a>
								</div>

								<button
									type="submit"
									className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors mt-2"
								>
									Entrar
								</button>
							</form>
						</div>
					</div>

					<div className="pt-8">
						<AuthBottomLink
							label="Não tem conta?"
							linkLabel="Criar conta"
							linkHref="/cadastro-v2?step=1"
						/>
					</div>
				</section>

				<ProofPanelMinimal variant="login" className="hidden md:flex flex-1 min-h-0 p-12" />
			</Modal>

			<AuthDevNav
				paramName="error"
				label="Erro"
				options={['none', 'empty', 'wrong', 'not-found', 'locked']}
				current={errorMode}
			/>
		</>
	)
}
