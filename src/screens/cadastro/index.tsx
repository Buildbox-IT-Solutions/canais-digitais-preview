import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { Icon } from '~/components/icon'
import { PasswordChecklist } from '~/components/password-checklist'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
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
 * Tela: Cadastro Multi-Step (Full Page) — v2
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=6930-6129
 * Split 50/50: coluna do formulário (page-header com "Voltar" / page-body centralizado, máx. 392px /
 * page-footer no passo 1) + proof panel à direita. O passo é indicado pelo eyebrow "Passo X de 4".
 * Campos e rótulos vêm de `_auth/cadastro-steps` (espelham o formulário do Eloqua).
 * Estados: ?step=1|2|3|4 · ?error=... · ?email=...
 * Tokens: --color-primary-600, --color-secondary-500, --color-secondary-950, --color-neutral-*
 */
export default function CadastroScreen() {
	const [params] = useSearchParams()

	const stepRaw = Number(params.get('step') ?? 1)
	const step = ((CADASTRO_STEPS as number[]).includes(stepRaw) ? stepRaw : 1) as CadastroStep

	// Vazio por padrão: o passo 1 tem de mostrar o placeholder do campo. O e-mail só
	// aparece preenchido quando volta pela URL (?email=) ou por um erro de validação.
	const emailParam = params.get('email') ?? ''
	// Usado onde o e-mail é apenas exibido/repassado nos passos seguintes — aí ele
	// precisa de um valor, senão o passo 2 fala de uma conta sem endereço.
	const emailDisplay = emailParam || 'mariana.albuquerque@empresa.com.br'

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

	const backHref =
		step === 1 ? '/login' : `/cadastro?step=${step - 1}&email=${encodeURIComponent(emailParam)}`

	const isLastStep = step === CADASTRO_TOTAL_STEPS
	const nextAction = isLastStep ? '/confirmacao-email' : '/cadastro'

	const sub = step === 2 ? null : HEADINGS[step].sub

	return (
		<>
			<main className="flex min-h-screen items-stretch">
				{/* Coluna do formulário */}
				<div className="flex grow basis-1/2 min-w-0 flex-col bg-white animate-fade-up-sm">
					{/* page-header */}
					<header className="shrink-0 px-10 pt-10 pb-6">
						<a
							href={backHref}
							className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 -ml-1 rounded-full font-body font-bold text-body-md text-primary-600 hover:bg-neutral-50 transition-colors"
						>
							<Icon name="arrow-back" className="size-5" />
							Voltar
						</a>
					</header>

					{/* page-body */}
					<div className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-6 py-8">
						<div className="w-full max-w-[392px] flex flex-col gap-6">
							<div className="flex flex-col gap-3">
								<p className="font-body font-semibold text-label-md text-neutral-900">
									Passo {step} de {CADASTRO_TOTAL_STEPS}
								</p>
								<div className="flex flex-col gap-1">
									<h1 className="font-display font-bold text-headline-sm text-primary-600">
										{HEADINGS[step].title}
									</h1>
									{step === 2 ? (
										<p className="font-body text-body-md text-neutral-900">
											Será usada junto com <strong className="font-bold">{emailDisplay}</strong> para
											acessar sua conta.
										</p>
									) : sub ? (
										<p className="font-body text-body-md text-neutral-900">{sub}</p>
									) : null}
								</div>
							</div>

							{campoVazioError ? <AuthErrorAlert message={campoVazioError} /> : null}
							{termosError ? <AuthErrorAlert message={termosError} /> : null}

							<form action={nextAction} method="get" className="flex flex-col gap-6" noValidate>
								{isLastStep ? null : <input type="hidden" name="step" value={step + 1} />}

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
												errorMode === 'existente' ? { label: 'Entrar', href: '/login' } : undefined
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
												id="cadastro-senha"
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
											id="cadastro-confirmar"
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

								<button
									type="submit"
									className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
								>
									{PRIMARY_CTA[step]}
									{!isLastStep ? <Icon name="arrow-forward" className="size-6" /> : null}
								</button>
							</form>
						</div>
					</div>

					{/* page-footer */}
					{step === 1 ? (
						<footer className="shrink-0 px-10 pt-6 pb-10">
							<AuthBottomLink label="Já tem uma conta?" linkLabel="Entrar" linkHref="/login" />
						</footer>
					) : null}
				</div>

				<ProofPanelMinimal
					variant={PROOF_VARIANT[step]}
					size="md"
					className="hidden md:flex grow basis-1/2 min-w-0"
				/>
			</main>
		</>
	)
}
