import { useSearchParams } from 'react-router'
import { Icon } from '~/components/icon'
import { Modal } from '~/components/modal'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import { SocialButton } from '~/components/social-button'
import HomeScreen from '../home'
import { AuthBottomLink } from '../_auth/bottom-link'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthErrorAlert } from '../_auth/error-alert'
import { AuthInput } from '../_auth/input'
import { AuthPasswordInput } from '../_auth/password-input'

type LoginError = 'none' | 'empty' | 'invalid' | 'locked'

const ALLOWED_ERRORS: LoginError[] = ['none', 'empty', 'invalid', 'locked']

/**
 * Tela: Login (Modal) — v2
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=6930-43699
 * Modal compacto (912×600) sobre o portal (HomeScreen): proof panel à esquerda + coluna de
 * formulário à direita estruturada em header / body / footer.
 * Estados de erro: ?error=empty|wrong|not-found|locked
 * Tokens: --color-primary-600, --color-secondary-500, --color-secondary-950, --color-neutral-*
 */
export default function LoginV2Screen() {
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
			{/* Portal ao fundo */}
			<HomeScreen />

			<Modal
				open
				size="xl"
				padded={false}
				showClose={false}
				closeHref="/home"
				labelledById="login-v2-title"
				className="max-w-[912px] min-h-[min(696px,90vh)]"
			>
				<ProofPanelMinimal variant="login" size="sm" className="hidden md:flex grow basis-1/2 min-w-0" />

				{/* Coluna do formulário */}
				<div className="relative flex grow basis-1/2 min-w-0 min-h-0 flex-col bg-white">
					<a
						href="/home"
						aria-label="Fechar"
						className="absolute right-4 top-4 z-10 inline-flex items-center justify-center size-9 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors"
					>
						<Icon name="close" className="size-[18px]" />
					</a>

					{/* header */}
					<div className="shrink-0 pt-10 pb-4 pl-8 pr-14">
						<h2
							id="login-v2-title"
							className="font-display font-bold text-headline-md text-primary-600"
						>
							Entrar
						</h2>
					</div>

					{/* body */}
					<div className="flex-1 min-h-0 overflow-y-auto px-8 pt-2 pb-4">
						<div className="flex flex-col gap-6">
							{globalError ? <AuthErrorAlert message={globalError} /> : null}

							<div className="flex gap-4">
								<SocialButton provider="google" href="/home" iconOnly className="flex-1" />
								<SocialButton provider="linkedin" href="/home" iconOnly className="flex-1" />
							</div>

							<div className="flex items-center gap-3 overflow-hidden">
								<span className="flex-1 h-px bg-neutral-100" />
								<span className="font-body text-body-md text-neutral-500">ou</span>
								<span className="flex-1 h-px bg-neutral-100" />
							</div>

							<form action="/home" method="get" className="flex flex-col gap-6" noValidate>
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
									className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
								>
									Entrar
								</button>
							</form>
						</div>
					</div>

					{/* footer */}
					<div className="shrink-0 px-8 pt-4 pb-8">
						<AuthBottomLink
							label="Não tem conta?"
							linkLabel="Criar conta"
							linkHref="/cadastro-v2?step=1"
						/>
					</div>
				</div>
			</Modal>

			<AuthDevNav
				paramName="error"
				label="Erro"
				options={['none', 'empty', 'invalid', 'locked']}
				current={errorMode}
			/>
		</>
	)
}
