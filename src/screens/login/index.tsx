import { useSearchParams } from 'react-router'
import { Icon } from '~/components/icon'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import { SocialButton } from '~/components/social-button'
import { AuthBottomLink } from '../_auth/bottom-link'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthErrorAlert } from '../_auth/error-alert'
import { AuthInput } from '../_auth/input'
import { AuthPasswordInput } from '../_auth/password-input'

type LoginError = 'none' | 'empty' | 'invalid' | 'locked'

const ALLOWED_ERRORS: LoginError[] = ['none', 'empty', 'invalid', 'locked']

/**
 * Tela: Login (Full Page) — v2
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=6908-5483
 * Split 50/50: coluna do formulário (page-header com "Voltar" / page-body centralizado, máx. 392px /
 * page-footer) + proof panel à direita em altura cheia.
 * Estados de erro: ?error=empty|wrong|not-found|locked
 * Tokens: --color-primary-600, --color-secondary-500, --color-secondary-950, --color-neutral-*
 */
export default function LoginScreen() {
	const [params] = useSearchParams()
	const errorParam = params.get('error') ?? 'none'
	const errorMode = (ALLOWED_ERRORS.includes(errorParam as LoginError)
		? errorParam
		: 'none') as LoginError

	const emailDefault =
		errorMode === 'invalid'
			? 'mariana.albuquerque@empresa.com.br'
			: errorMode === 'locked'
				? 'ana.souza@informa.com'
				: ''

	// Credenciais inválidas: marca os dois campos em erro com a mesma mensagem genérica,
	// sem revelar qual campo falhou nem se o e-mail existe — evita enumeração de contas.
	const emailError =
		errorMode === 'empty'
			? 'Informe seu e-mail.'
			: errorMode === 'invalid'
				? 'E-mail ou senha incorretos.'
				: undefined

	const senhaError =
		errorMode === 'empty'
			? 'Informe sua senha.'
			: errorMode === 'invalid'
				? 'E-mail ou senha incorretos.'
				: undefined

	const globalError =
		errorMode === 'locked'
			? 'Conta bloqueada por 15 minutos após 5 tentativas inválidas. Use "Esqueci minha senha".'
			: undefined

	const senhaValue = errorMode === 'invalid' ? '********' : ''

	return (
		<>
			<main className="flex min-h-screen items-stretch">
				{/* Coluna do formulário */}
				<div className="flex grow basis-1/2 min-w-0 flex-col bg-white animate-fade-up-sm">
					{/* page-header */}
					<header className="shrink-0 px-10 pt-10 pb-6">
						<a
							href="/home"
							className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 -ml-1 rounded-full font-body font-bold text-body-md text-primary-600 hover:bg-neutral-50 transition-colors"
						>
							<Icon name="arrow-left" className="size-5" />
							Voltar
						</a>
					</header>

					{/* page-body */}
					<div className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-6 py-8">
						<div className="w-full max-w-[392px] flex flex-col gap-6">
							<div className="flex flex-col gap-2">
								<h1 className="font-display font-bold text-headline-md text-primary-600">Entrar</h1>
								<p className="font-body text-body-lg text-neutral-900">
									Acesse sua conta para baixar materiais exclusivos e personalizar sua experiência.
								</p>
							</div>

							{globalError ? <AuthErrorAlert message={globalError} /> : null}

							<div className="flex flex-col gap-4">
								<SocialButton provider="linkedin" href="/home" />
								<SocialButton provider="google" href="/home" />
							</div>

							<div className="flex items-center gap-3 overflow-hidden">
								<span className="flex-1 h-px bg-neutral-100" />
								<span className="font-body text-body-md text-neutral-500">ou</span>
								<span className="flex-1 h-px bg-neutral-100" />
							</div>

							<form action="/home" method="get" className="flex flex-col gap-6" noValidate>
								<div className="flex flex-col gap-4">
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
								</div>

								<button
									type="submit"
									className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
								>
									Entrar
								</button>
							</form>
						</div>
					</div>

					{/* page-footer */}
					<footer className="shrink-0 px-10 pt-6 pb-10">
						<AuthBottomLink
							label="Não tem conta?"
							linkLabel="Criar conta"
							linkHref="/cadastro?step=1"
						/>
					</footer>
				</div>

				<ProofPanelMinimal
					variant="login"
					size="md"
					className="hidden md:flex grow basis-1/2 min-w-0"
				/>
			</main>

			<AuthDevNav
				paramName="error"
				label="Erro"
				options={['none', 'empty', 'invalid', 'locked']}
				current={errorMode}
			/>
		</>
	)
}
