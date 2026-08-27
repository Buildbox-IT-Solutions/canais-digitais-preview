import { useSearchParams } from 'react-router'
import { IconButton } from '~/components/icon-button'
import { Modal } from '~/components/modal'
import { twMerge } from '~/lib/tw-merge'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import { StatusRing } from '~/components/status-ring'
import { tituloDoMaterialDoRetorno } from '~/lib/material-do-retorno'
import { ARQUIVO_EXEMPLO_URL, nomeArquivoDownload } from '~/mocks/downloads'
import { AUTH_PANEL_BTN_BASE, AUTH_PANEL_BTN_VARIANT } from '../_auth/panel-button'
import { buildReturnToHref, sanitizeReturnTo, serializeReturnTo } from '~/lib/sanitize-return-to'
import { useScenarios } from '~/dev/use-scenarios'
import HomeScreen from '../home'
import { AuthBottomLink } from '../_auth/bottom-link'
import { AuthErrorAlert } from '../_auth/error-alert'
import { authErrorAxis } from '../_auth/scenarios'
import { AuthInput } from '../_auth/input'
import { AuthPasswordInput } from '../_auth/password-input'

type LoginError = 'none' | 'empty' | 'invalid' | 'locked'

const ALLOWED_ERRORS: LoginError[] = ['none', 'empty', 'invalid', 'locked']

// `download` NÃO está aqui: esse fluxo não volta para a página avisando nada — termina no
// próprio modal, com o painel "Tudo pronto!" e o botão que baixa (ver ETAPA abaixo). Até
// 24/08/2026 mapeava para 'download-started', que prometia um download que nunca acontecia.
const TOAST_BY_INTENT: Record<string, string> = {
	newsletter: 'newsletter-subscribed',
}

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

	useScenarios([authErrorAxis(ALLOWED_ERRORS, errorMode)])

	const intent = params.get('intent') ?? ''
	// Ver comentário equivalente em cadastro-v2 — mesma convenção, ida direta pro
	// destino já que login não tem passos intermediários.
	const favoritar = params.get('favoritar') ?? ''
	const returnTo = sanitizeReturnTo(params.get('returnTo'))

	// ETAPA — o login tem dois desfechos. Com `intent=download` ele NÃO devolve o usuário
	// para a página: termina aqui mesmo, no painel "Tudo pronto!", com o botão que baixa.
	// Isso existe porque devolver e avisar obrigava a procurar e clicar no MESMO botão que
	// trouxe o usuário até o login. Qualquer outra intenção segue indo direto pro destino.
	const fechaNoModal = intent === 'download'
	const etapa = fechaNoModal && params.get('state') === 'success' ? 'sucesso' : 'formulario'
	// Campos ocultos com os nomes ORIGINAIS dos parâmetros preservados (ex.: `post`)
	// — não um `returnTo` único: o form abaixo submete com GET direto pro destino
	// (`action={returnTo.path}`), e um form GET descarta qualquer querystring já
	// presente no seu próprio `action` ao montar a URL de submit. Reconstituir via
	// campos ocultos com o nome de cada parâmetro é o que faz o navegador
	// remontar `action?os-mesmos-parametros` sozinho.
	const returnToQueryFields = Array.from(new URLSearchParams(returnTo.query))
	const crossLinkQuery = `&returnTo=${encodeURIComponent(serializeReturnTo(returnTo))}${
		intent ? `&intent=${encodeURIComponent(intent)}` : ''
	}${favoritar ? `&favoritar=${encodeURIComponent(favoritar)}` : ''}`

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
			{/* Portal ao fundo — só visível ≥lg (o modal cobre tudo no mobile) */}
			<div className="hidden lg:block">
				<HomeScreen />
			</div>

			<Modal
				open
				size="xl"
				padded={false}
				mobileFullScreen
				showClose={false}
				closeHref="/home"
				labelledById="login-v2-title"
				className="max-w-none lg:max-w-[912px] lg:min-h-[min(696px,90vh)]"
			>
				<ProofPanelMinimal variant="login" size="sm" className="hidden lg:flex grow basis-1/2 min-w-0" />

				{/* Coluna do formulário */}
				<div className="relative flex grow basis-1/2 min-w-0 min-h-0 flex-col bg-white">
					<IconButton
						icon="close"
						label="Fechar"
						size="medium"
						type="ghost"
						href="/home"
						className="absolute right-4 top-4 z-10"
					/>

					{/* bloco título + form, centralizado verticalmente no espaço acima do footer */}
					<div className="flex-1 min-h-0 overflow-y-auto flex flex-col px-8 py-6">
						{etapa === 'sucesso' ? (
							<div className="w-full max-w-[392px] mx-auto my-auto flex flex-col items-center gap-8 text-center">
								<StatusRing accent="mint" icon="check" size="sm" />

								<div className="flex flex-col gap-2 w-full">
									<h2
										id="login-v2-title"
										className="font-display font-bold text-headline-sm text-primary-600"
									>
										Tudo pronto!
									</h2>
									<p className="font-body text-body-md text-neutral-900">
										Seu material está pronto para baixar.
									</p>
								</div>

								<div className="flex flex-col gap-3 w-full">
									{/* Âncora nativa: quem confirma a conclusão é o navegador. */}
									<a
										href={ARQUIVO_EXEMPLO_URL}
										download={nomeArquivoDownload(tituloDoMaterialDoRetorno(returnTo))}
										className={twMerge(AUTH_PANEL_BTN_BASE, AUTH_PANEL_BTN_VARIANT.filled)}
									>
										Baixar agora
									</a>
									<a
										href={buildReturnToHref(returnTo, { logado: 'true' })}
										className={twMerge(AUTH_PANEL_BTN_BASE, AUTH_PANEL_BTN_VARIANT.ghost)}
									>
										Explorar o portal
									</a>
								</div>
							</div>
						) : (
						<div className="flex flex-col gap-6 my-auto">
							<h2
								id="login-v2-title"
								className="font-display font-bold text-headline-md text-primary-600"
							>
								Entrar
							</h2>

							{globalError ? <AuthErrorAlert message={globalError} /> : null}

							<form
								action={fechaNoModal ? '/login' : returnTo.path}
								method="get"
								className="flex flex-col gap-6"
								noValidate
							>
								{/* Fechando no modal, o submit volta pra /login em `state=success` e precisa
								    recompor `intent`/`returnTo`, que o GET descarta do próprio action. */}
								{fechaNoModal ? (
									<>
										<input type="hidden" name="state" value="success" />
										<input type="hidden" name="intent" value={intent} />
										<input type="hidden" name="returnTo" value={serializeReturnTo(returnTo)} />
									</>
								) : (
									<input type="hidden" name="logado" value="true" />
								)}
								{TOAST_BY_INTENT[intent] ? (
									<input type="hidden" name="toast" value={TOAST_BY_INTENT[intent]} />
								) : null}
								{favoritar ? <input type="hidden" name="favoritar" value={favoritar} /> : null}
								{!fechaNoModal &&
									returnToQueryFields.map(([key, val]) => (
										<input key={key} type="hidden" name={key} value={val} />
									))}
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
						)}
					</div>

					{/* footer — só na etapa de formulário: no desfecho não há "criar conta" a oferecer */}
					{etapa === 'formulario' ? (
						<div className="shrink-0 px-8 pt-4 pb-8">
							<AuthBottomLink
								label="Não tem conta?"
								linkLabel="Criar conta"
								linkHref={`/cadastro?step=1${crossLinkQuery}`}
							/>
						</div>
					) : null}
				</div>
			</Modal>
		</>
	)
}
