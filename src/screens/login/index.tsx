import { useSearchParams } from 'react-router'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import { SocialButton } from '~/components/social-button'
import { AuthBackLink } from '../_auth/back-link'
import { AuthBottomLink } from '../_auth/bottom-link'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthErrorAlert } from '../_auth/error-alert'
import { AuthInput } from '../_auth/input'
import { AuthPasswordInput } from '../_auth/password-input'

type LoginError = 'none' | 'empty' | 'wrong' | 'not-found' | 'locked'

const ALLOWED_ERRORS: LoginError[] = ['none', 'empty', 'wrong', 'not-found', 'locked']

/**
 * Tela: Login (Full Page) — v3.0
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=6268-18394
 * Estados de erro: ?error=empty|wrong|not-found|locked
 */
export default function LoginScreen() {
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
			<div className="flex min-h-screen items-stretch">
				<section className="flex flex-col w-[560px] shrink-0 px-14 py-12 bg-white animate-fade-up-sm">
					<div className="w-full">
						<AuthBackLink href="/home" label="Voltar para o início" />
					</div>

					<div className="flex-1 flex flex-col justify-center w-full">
						<div className="flex flex-col gap-6 w-full">
							<div className="flex flex-col gap-2 w-full">
								<h1 className="font-display font-bold text-headline-md text-primary-600">Entrar</h1>
								<p className="font-body text-body-lg text-neutral-900">
									Acesse sua conta para baixar materiais exclusivos e personalizar sua experiência.
								</p>
							</div>

							{globalError ? <AuthErrorAlert message={globalError} /> : null}

							<div className="flex flex-col gap-4 w-full">
								<SocialButton provider="linkedin" href="/home" />
								<SocialButton provider="google" href="/home" />
							</div>

							<div className="flex items-center gap-3 w-full overflow-hidden">
								<span className="flex-1 h-px bg-neutral-100" />
								<span className="font-body text-body-md text-neutral-500">ou</span>
								<span className="flex-1 h-px bg-neutral-100" />
							</div>

							<form action="/home" method="get" className="flex flex-col gap-4 w-full" noValidate>
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

								<div className="flex justify-end w-full">
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

					<AuthBottomLink
						label="Não tem conta?"
						linkLabel="Criar conta"
						linkHref="/cadastro?step=1"
					/>
				</section>

				<ProofPanelMinimal variant="login" />
			</div>

			<AuthDevNav
				paramName="error"
				label="Erro"
				options={['none', 'empty', 'wrong', 'not-found', 'locked']}
				current={errorMode}
			/>
		</>
	)
}
