import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { Icon } from '~/components/icon'
import { IconButton } from '~/components/icon-button'
import { Modal } from '~/components/modal'
import { PasswordChecklist } from '~/components/password-checklist'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import { sanitizeReturnTo, serializeReturnTo } from '~/lib/sanitize-return-to'
import HomeScreen from '../home'
import { AuthBottomLink } from '../_auth/bottom-link'
import {
	CADASTRO_STEPS,
	CADASTRO_TOTAL_STEPS,
	EMAIL_FIELD,
	HEADINGS,
	IDENTITY_FIELDS,
	PRIMARY_CTA,
	PROOF_VARIANT,
	STEP_FIELDS,
	type CadastroStep,
} from '../_auth/cadastro-steps'
import { AuthErrorAlert } from '../_auth/error-alert'
import { AuthFieldList } from '../_auth/field-list'
import { AuthInput } from '../_auth/input'
import { AuthPasswordInput } from '../_auth/password-input'
import { authErrorAxis, cadastroStepAxis } from '../_auth/scenarios'
import { useScenarios } from '~/dev/use-scenarios'

type Step1Error = 'none' | 'empty' | 'invalido' | 'existente' | 'campos'
type Step2Error = 'none' | 'mismatch' | 'termos'
type Step3Error = 'none' | 'campos'
type Step4Error = 'none' | 'campos'

const STEP1_ERRORS: Step1Error[] = ['none', 'empty', 'invalido', 'existente', 'campos']
const STEP2_ERRORS: Step2Error[] = ['none', 'mismatch', 'termos']
const STEP3_ERRORS: Step3Error[] = ['none', 'campos']
const STEP4_ERRORS: Step4Error[] = ['none', 'campos']

const ERRORS_BY_STEP: Record<CadastroStep, string[]> = {
	1: STEP1_ERRORS,
	2: STEP2_ERRORS,
	3: STEP3_ERRORS,
	4: STEP4_ERRORS,
}

/**
 * Tela: Cadastro Multi-Step (Modal) — v2
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=6930-43301
 * Modal compacto (912×600, colunas 50/50) sobre o portal. Coluna do formulário estruturada em:
 * top-bar (Voltar nos passos 2–4 + fechar) · header (Passo X de 4 + título) · body (campos) ·
 * footer (CTA). O avanço se dá pela submissão do formulário; o retorno pelo botão "Voltar".
 * Campos e rótulos vêm de `_auth/cadastro-steps` (espelham o formulário do Eloqua).
 * Estados: ?step=1|2|3|4 · ?error=... · ?email=...
 * Tokens: --color-primary-600, --color-secondary-500, --color-secondary-950, --color-neutral-*
 */
export default function CadastroV2Screen() {
	const [params] = useSearchParams()

	const stepRaw = Number(params.get('step') ?? 1)
	const step = ((CADASTRO_STEPS as number[]).includes(stepRaw) ? stepRaw : 1) as CadastroStep

	// Vazio por padrão: o passo 1 tem de mostrar o placeholder do campo. O e-mail só
	// aparece preenchido quando volta pela URL (?email=) ou por um erro de validação.
	const emailParam = params.get('email') ?? ''
	// Usado onde o e-mail é apenas exibido/repassado nos passos seguintes — aí ele
	// precisa de um valor, senão o passo 2 fala de uma conta sem endereço.
	const emailDisplay = emailParam || 'mariana.albuquerque@empresa.com.br'
	const intent = params.get('intent') ?? ''
	// Intenção de favoritar viaja como parâmetro próprio (não pelo `intent`, que só
	// escolhe qual toast mostrar) — precisa sobreviver a todo o fluxo multi-step até
	// o retorno pós-confirmação de e-mail (ver confirmacao-email-v2 e 00-mapa.md).
	const favoritar = params.get('favoritar') ?? ''
	const returnTo = sanitizeReturnTo(params.get('returnTo'))
	// `serializeReturnTo` recompõe path+query num único texto — aqui vira valor de
	// campo (querystring de link ou hidden input abaixo), nunca `action` de form,
	// então não tem o problema do form GET descartando a query do próprio action.
	const returnToSerialized = serializeReturnTo(returnTo)
	const crossLinkQuery = `&returnTo=${encodeURIComponent(returnToSerialized)}${
		intent ? `&intent=${encodeURIComponent(intent)}` : ''
	}${favoritar ? `&favoritar=${encodeURIComponent(favoritar)}` : ''}`

	const errorParam = params.get('error') ?? 'none'
	const validErrors = ERRORS_BY_STEP[step]
	const errorMode = validErrors.includes(errorParam) ? errorParam : 'none'

	useScenarios([
		cadastroStepAxis(CADASTRO_STEPS, step),
		authErrorAxis(validErrors, errorMode, { empty: 'E-mail vazio' }),
	])

	// Step 1
	const emailError =
		errorMode === 'empty'
			? 'Informe seu e-mail.'
			: errorMode === 'invalido'
				? 'Digite um e-mail válido.'
				: errorMode === 'existente'
					? 'Esse e-mail já tem uma conta.'
					: undefined
	const emailValueByError =
		errorMode === 'invalido'
			? 'teste@'
			: errorMode === 'existente'
				? 'maria.silva@empresa.com.br'
				: ''

	// Step 2
	const confirmError = errorMode === 'mismatch' ? 'As senhas não coincidem.' : undefined
	const termosError =
		errorMode === 'termos'
			? 'Você precisa aceitar os Termos de Uso e a Política de Privacidade.'
			: undefined

	// Steps 1, 3 e 4 — validação de obrigatórios
	const campoVazioError = errorMode === 'campos' ? 'Preencha todos os campos obrigatórios.' : undefined

	const senhaInicial = errorMode === 'mismatch' ? 'Minhasenha1@' : ''
	const confirmInicial = errorMode === 'mismatch' ? 'outrasenha456' : ''

	const [pw, setPw] = useState(senhaInicial)
	useEffect(() => { setPw(senhaInicial) }, [senhaInicial])

	const prevStep =
		step === 1
			? null
			: `/cadastro?step=${step - 1}&email=${encodeURIComponent(emailParam)}${crossLinkQuery}`

	// Ao concluir o último passo, o modal é fechado e a confirmação abre em fullpage (tela 3.1).
	const isLastStep = step === CADASTRO_TOTAL_STEPS
	const nextAction = isLastStep ? '/confirmacao-email' : '/cadastro'

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
				labelledById="cadastro-v2-title"
				className="max-w-none lg:max-w-[912px] lg:min-h-[min(696px,90vh)]"
			>
				<ProofPanelMinimal
					variant={PROOF_VARIANT[step]}
					size="sm"
					className="hidden lg:flex grow basis-1/2 min-w-0"
				/>

				{/* Coluna do formulário */}
				<div className="relative flex grow basis-1/2 min-w-0 min-h-0 flex-col bg-white">
					{/* top-bar: Voltar (passos 2–4) + fechar */}
					<div className="shrink-0 flex items-center justify-between px-4 pt-4 pb-2">
						{prevStep ? (
							<a
								href={prevStep}
								className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full font-body font-bold text-body-md text-primary-600 hover:bg-neutral-50 transition-colors"
							>
								<Icon name="arrow-back" className="size-5" />
								Voltar
							</a>
						) : (
							<span aria-hidden="true" />
						)}

						<IconButton icon="close" label="Fechar" size="medium" type="ghost" href="/home" />
					</div>

					{/* header */}
					<div className="shrink-0 pt-6 pb-4 px-8 flex flex-col gap-3">
						<p className="font-body font-semibold text-label-md text-neutral-900">
							Passo {step} de {CADASTRO_TOTAL_STEPS}
						</p>
						<div className="flex flex-col gap-1">
							<h2
								id="cadastro-v2-title"
								className="font-display font-bold text-headline-sm text-primary-600"
							>
								{HEADINGS[step].title}
							</h2>
							{HEADINGS[step].sub ? (
								<p className="font-body text-body-md text-neutral-900">{HEADINGS[step].sub}</p>
							) : null}
						</div>
					</div>

					<form action={nextAction} method="get" className="flex-1 min-h-0 flex flex-col" noValidate>
						{isLastStep ? (
							<input type="hidden" name="state" value="waiting" />
						) : (
							<input type="hidden" name="step" value={step + 1} />
						)}
						{intent ? <input type="hidden" name="intent" value={intent} /> : null}
						{favoritar ? <input type="hidden" name="favoritar" value={favoritar} /> : null}
						<input type="hidden" name="returnTo" value={returnToSerialized} />

						{/* body */}
						<div className="flex-1 min-h-0 overflow-y-auto px-8 pt-2 pb-4 flex flex-col gap-6">
							{campoVazioError ? <AuthErrorAlert message={campoVazioError} /> : null}
							{termosError ? <AuthErrorAlert message={termosError} /> : null}

							{step === 1 ? (
								<>
									<AuthFieldList
										fields={IDENTITY_FIELDS}
										invalid={Boolean(campoVazioError)}
										autoFocusFirst
									/>

									<AuthInput
										label={EMAIL_FIELD.label}
										name={EMAIL_FIELD.name}
										type={EMAIL_FIELD.type}
										required
										autoComplete={EMAIL_FIELD.autoComplete}
										placeholder={EMAIL_FIELD.placeholder}
										defaultValue={emailValueByError || emailParam}
										error={emailError ?? (campoVazioError ? ' ' : undefined)}
										helperLink={
											errorMode === 'existente'
												? { label: 'Entrar', href: `/login?${crossLinkQuery.slice(1)}` }
												: undefined
										}
									/>
								</>
							) : null}

							{step === 2 ? (
								<>
									<input type="hidden" name="email" value={emailDisplay} />

									<div className="flex flex-col gap-3 w-full">
										<AuthPasswordInput
											label="Senha"
											name="senha"
											id="cadastro-v2-senha"
											autoComplete="new-password"
											value={pw}
											onChange={setPw}
											required
										/>
										<PasswordChecklist value={pw} />
									</div>

									<AuthPasswordInput
										label="Confirmar Senha"
										name="confirmar_senha"
										id="cadastro-v2-confirmar"
										autoComplete="new-password"
										defaultValue={confirmInicial}
										error={confirmError}
										required
									/>

									<div className="flex flex-col w-full">
										<label className="flex items-start gap-4 cursor-pointer group py-2">
											<input type="checkbox" name="termos" required className="sr-only" />
											<span
												className={`inline-flex items-center justify-center size-[18px] rounded-xs border-2 mt-0.5 shrink-0 transition-colors ${
													termosError ? 'border-red-600' : 'border-neutral-950'
												} group-has-[:checked]:bg-primary-600 group-has-[:checked]:border-primary-600`}
											>
												<Icon name="check" className="size-3 text-white opacity-0 group-has-[:checked]:opacity-100" />
											</span>
											<span className="flex-1 font-body text-body-md text-neutral-950">
												Li e aceito os{' '}
												<a href="#" className="font-bold text-secondary-950">
													Termos de Uso
												</a>{' '}
												e a{' '}
												<a href="#" className="font-bold text-secondary-950">
													Política de Privacidade
												</a>
											</span>
										</label>

										<label className="flex items-start gap-4 cursor-pointer group py-2">
											<input type="checkbox" name="marketing" className="sr-only" />
											<span className="inline-flex items-center justify-center size-[18px] rounded-xs border-2 border-neutral-950 mt-0.5 shrink-0 transition-colors group-has-[:checked]:bg-primary-600 group-has-[:checked]:border-primary-600">
												<Icon name="check" className="size-3 text-white opacity-0 group-has-[:checked]:opacity-100" />
											</span>
											<span className="flex-1 font-body text-body-md text-neutral-950">
												Quero receber comunicações e novidades da Informa Markets
											</span>
										</label>
									</div>
								</>
							) : null}

							{step === 3 || step === 4 ? (
								<>
									<input type="hidden" name="email" value={emailDisplay} />

									<AuthFieldList
										fields={STEP_FIELDS[step]}
										invalid={Boolean(campoVazioError)}
										autoFocusFirst
									/>
								</>
							) : null}
						</div>

						{/* footer */}
						<div className="shrink-0 px-8 pt-4 pb-8 flex flex-col gap-4">
							<button
								type="submit"
								className="inline-flex items-center justify-center gap-3 w-full h-12 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
							>
								{PRIMARY_CTA[step]}
								{!isLastStep ? <Icon name="arrow-forward" className="size-6" /> : null}
							</button>

							{step === 1 ? (
								<AuthBottomLink
									label="Já tem uma conta?"
									linkLabel="Entrar"
									linkHref={`/login?${crossLinkQuery.slice(1)}`}
								/>
							) : null}
						</div>
					</form>
				</div>
			</Modal>
		</>
	)
}
