import { useSearchParams } from 'react-router'
import { CadastroStepper } from '~/components/cadastro-stepper'
import { Icon } from '~/components/icon'
import { Modal } from '~/components/modal'
import { PasswordStrength } from '~/components/password-strength'
import { ProofPanelMinimal } from '~/components/proof-panel-minimal'
import type { ProofPanelMinimalVariant } from '~/components/proof-panel-minimal/types'
import HomeScreen from '../home'
import { AuthBottomLink } from '../_auth/bottom-link'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthErrorAlert } from '../_auth/error-alert'
import { AuthInput } from '../_auth/input'
import { AuthPasswordInput } from '../_auth/password-input'

type CadastroStep = 1 | 2 | 3
type Step1Error = 'none' | 'empty' | 'invalido' | 'existente'
type Step2Error = 'none' | 'fraca' | 'mismatch' | 'termos'
type Step3Error = 'none' | 'campos'

const STEP1_ERRORS: Step1Error[] = ['none', 'empty', 'invalido', 'existente']
const STEP2_ERRORS: Step2Error[] = ['none', 'fraca', 'mismatch', 'termos']
const STEP3_ERRORS: Step3Error[] = ['none', 'campos']

const HEADINGS: Record<CadastroStep, { title: string; sub: string | null }> = {
	1: { title: 'Qual é o seu e-mail?', sub: 'Recomendamos o uso do seu e-mail corporativo.' },
	2: { title: 'Crie uma senha', sub: null },
	3: {
		title: 'Conte um pouco sobre você',
		sub: 'Usamos isso para recomendar conteúdo, eventos e materiais relevantes para o seu mercado.',
	},
}

const PRIMARY_CTA: Record<CadastroStep, string> = {
	1: 'Avançar',
	2: 'Criar minha conta',
	3: 'Avançar',
}

const PROOF_VARIANT: Record<CadastroStep, ProofPanelMinimalVariant> = {
	1: 'signup-1',
	2: 'signup-2',
	3: 'signup-3',
}

const PROFILE_FIELDS: Array<{
	name: string
	label: string
	type: 'text' | 'tel'
	placeholder: string
	autoComplete: string
}> = [
	{ name: 'nome', label: 'Nome completo', type: 'text', placeholder: '', autoComplete: 'name' },
	{ name: 'telefone', label: 'Telefone', type: 'tel', placeholder: '(00) 00000-0000', autoComplete: 'tel' },
	{
		name: 'empresa',
		label: 'Empresa',
		type: 'text',
		placeholder: 'Ex.: Informa Markets Brasil',
		autoComplete: 'organization',
	},
]

const PROFILE_SELECTS = [
	{
		name: 'cargo',
		label: 'Cargo',
		placeholder: 'Selecione seu cargo',
		options: ['Diretor(a)', 'Gerente', 'Coordenador(a)', 'Analista', 'Consultor(a)', 'Outro'],
	},
	{
		name: 'setor',
		label: 'Setor',
		placeholder: 'Selecione o setor principal',
		options: [
			'Agro',
			'Alimentos & Bebidas',
			'Embalagens',
			'Saúde',
			'Logística',
			'Varejo',
			'Tecnologia',
			'Outro',
		],
	},
]

/**
 * Tela: Cadastro Multi-Step (Modal) — v2 (deriva de cadastro)
 * Mesmo fluxo de 3 etapas e layout (form + ProofPanelMinimal), agora apresentado como modal
 * sobre o portal (HomeScreen) em vez de página separada.
 * Estados: ?step=1|2|3 · ?error=... · ?email=...
 */
export default function CadastroV2Screen() {
	const [params] = useSearchParams()

	const stepRaw = Number(params.get('step') ?? 1)
	const step = ([1, 2, 3].includes(stepRaw) ? stepRaw : 1) as CadastroStep

	const emailParam = params.get('email') ?? 'mariana.albuquerque@empresa.com.br'

	const errorParam = params.get('error') ?? 'none'
	const validErrors = step === 1 ? STEP1_ERRORS : step === 2 ? STEP2_ERRORS : STEP3_ERRORS
	const errorMode = (validErrors as string[]).includes(errorParam) ? errorParam : 'none'

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
	const senhaError =
		errorMode === 'fraca' ? 'Senha muito fraca. Use letras e números, mín. 8 caracteres.' : undefined
	const confirmError = errorMode === 'mismatch' ? 'As senhas não coincidem.' : undefined
	const termosError =
		errorMode === 'termos'
			? 'Você precisa aceitar os Termos de Uso e a Política de Privacidade.'
			: undefined

	// Step 3
	const campoVazioError = errorMode === 'campos' ? 'Preencha todos os campos obrigatórios.' : undefined

	const senhaInicial =
		errorMode === 'fraca' ? 'abcdefgh' : errorMode === 'mismatch' ? 'Minhasenha1@' : ''
	const confirmInicial = errorMode === 'mismatch' ? 'outrasenha456' : ''

	const prevStep =
		step === 1
			? null
			: step === 2
				? `/cadastro-v2?step=1&email=${encodeURIComponent(emailParam)}`
				: `/cadastro-v2?step=2&email=${encodeURIComponent(emailParam)}`

	const nextAction = step === 3 ? '/confirmacao-email-v2' : '/cadastro-v2'

	return (
		<>
			{/* Portal ao fundo */}
			<HomeScreen />

			<Modal open size="xl" padded={false} closeHref="/home" labelledById="cadastro-v2-title">
				<section className="flex flex-col w-full md:w-[470px] shrink-0 px-8 sm:px-12 py-12 overflow-y-auto">
					<CadastroStepper current={step} />

					<div className="flex-1 flex flex-col justify-center">
						<div className="flex flex-col gap-8">
							<div className="flex flex-col gap-2">
								<h2
									id="cadastro-v2-title"
									className="font-display font-bold text-headline-md text-primary-600"
								>
									{HEADINGS[step].title}
								</h2>
								{step === 2 ? (
									<p className="font-body text-body-lg text-neutral-900">
										Será usada junto com <strong className="font-bold">{emailParam}</strong> para
										acessar sua conta.
									</p>
								) : (
									<p className="font-body text-body-lg text-neutral-900">{HEADINGS[step].sub}</p>
								)}
							</div>

							{campoVazioError ? <AuthErrorAlert message={campoVazioError} /> : null}

							<form action={nextAction} method="get" className="flex flex-col gap-8" noValidate>
								<input type="hidden" name="step" value={step + 1} />

								{step === 1 ? (
									<AuthInput
										label="E-mail"
										name="email"
										type="email"
										required
										autoFocus
										autoComplete="email"
										placeholder="seu@empresa.com.br"
										defaultValue={emailValueByError || emailParam}
										error={emailError}
										helperLink={
											errorMode === 'existente' ? { label: 'Entrar', href: '/login-v2' } : undefined
										}
									/>
								) : null}

								{step === 2 ? (
									<>
										<input type="hidden" name="email" value={emailParam} />

										<div className="flex flex-col gap-3 w-full">
											<AuthPasswordInput
												label="Senha"
												name="senha"
												id="cadastro-v2-senha"
												autoComplete="new-password"
												defaultValue={senhaInicial}
												error={senhaError}
												required
											/>
											<PasswordStrength inputId="cadastro-v2-senha" value={senhaInicial} />
										</div>

										<AuthPasswordInput
											label="Confirmar senha"
											name="confirmar_senha"
											id="cadastro-v2-confirmar"
											autoComplete="new-password"
											defaultValue={confirmInicial}
											error={confirmError}
											required
										/>

										<div className="flex flex-col w-full">
											<label className="flex items-start gap-3 cursor-pointer group py-2">
												<input type="checkbox" name="termos" required className="sr-only" />
												<span
													className={`inline-flex items-center justify-center size-[18px] rounded-xs border-2 mt-1 shrink-0 transition-colors ${
														termosError ? 'border-red-600' : 'border-neutral-950'
													} group-has-[:checked]:bg-primary-600 group-has-[:checked]:border-primary-600`}
												>
													<svg
														className="size-3 text-white opacity-0 group-has-[:checked]:opacity-100"
														viewBox="0 0 24 24"
														fill="currentColor"
														aria-hidden="true"
													>
														<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
													</svg>
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

											<label className="flex items-start gap-3 cursor-pointer group py-2">
												<input type="checkbox" name="marketing" className="sr-only" />
												<span className="inline-flex items-center justify-center size-[18px] rounded-xs border-2 border-neutral-950 mt-1 shrink-0 transition-colors group-has-[:checked]:bg-primary-600 group-has-[:checked]:border-primary-600">
													<svg
														className="size-3 text-white opacity-0 group-has-[:checked]:opacity-100"
														viewBox="0 0 24 24"
														fill="currentColor"
														aria-hidden="true"
													>
														<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
													</svg>
												</span>
												<span className="flex-1 font-body text-body-md text-neutral-950">
													Quero receber comunicações e novidades da Informa Markets
												</span>
											</label>

											{termosError ? (
												<p className="mt-1 px-1 flex items-center gap-1.5 font-body font-semibold text-label-md text-red-600">
													<svg
														className="size-3.5 shrink-0"
														viewBox="0 0 24 24"
														fill="currentColor"
														aria-hidden="true"
													>
														<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
													</svg>
													{termosError}
												</p>
											) : null}
										</div>
									</>
								) : null}

								{step === 3 ? (
									<>
										<input type="hidden" name="email" value={emailParam} />

										{PROFILE_FIELDS.map((f) => (
											<AuthInput
												key={f.name}
												label={f.label}
												name={f.name}
												type={f.type}
												required
												autoComplete={f.autoComplete}
												placeholder={f.placeholder}
												error={campoVazioError ? ' ' : undefined}
											/>
										))}

										{PROFILE_SELECTS.map((s) => (
											<label key={s.name} className="flex flex-col w-full">
												<span
													className={`flex items-center gap-0.5 px-1 pb-1 font-body font-semibold text-label-lg ${
														campoVazioError ? 'text-red-600' : 'text-neutral-950'
													}`}
												>
													{s.label}
													<span aria-hidden="true">*</span>
												</span>
												<div
													className={`relative flex items-center h-10 px-3 rounded-sm border bg-white transition-colors ${
														campoVazioError
															? 'border-red-600'
															: 'border-neutral-100 focus-within:border-secondary-950'
													}`}
												>
													<select
														name={s.name}
														required
														defaultValue=""
														className="flex-1 appearance-none bg-transparent font-body text-body-lg text-neutral-500 focus:text-primary-600 focus:outline-none pr-7"
													>
														<option value="" disabled>
															{s.placeholder}
														</option>
														{s.options.map((opt) => (
															<option key={opt} value={opt}>
																{opt}
															</option>
														))}
													</select>
													<Icon
														name="arrow-drop-down"
														className="size-4 absolute right-3 text-neutral-500 pointer-events-none"
													/>
												</div>
											</label>
										))}
									</>
								) : null}

								<div
									className={`flex items-center ${prevStep ? 'justify-between' : 'justify-end'} w-full`}
								>
									{prevStep ? (
										<a
											href={prevStep}
											className="inline-flex items-center gap-2 px-4 py-2 -ml-2 rounded-full font-body font-bold text-body-lg text-primary-600 hover:bg-neutral-50 transition-colors"
										>
											<Icon name="arrow-left" className="size-6" />
											Voltar
										</a>
									) : null}

									<button
										type="submit"
										className="inline-flex items-center gap-2 pl-5 pr-4 py-2 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
									>
										{PRIMARY_CTA[step]}
										<Icon name="arrow-right" className="size-6" />
									</button>
								</div>
							</form>
						</div>
					</div>

					{step === 1 ? (
						<div className="pt-8">
							<AuthBottomLink label="Já tem uma conta?" linkLabel="Entrar" linkHref="/login-v2" />
						</div>
					) : null}
				</section>

				<ProofPanelMinimal
					variant={PROOF_VARIANT[step]}
					className="hidden md:flex flex-1 min-h-0 p-12"
				/>
			</Modal>

			<AuthDevNav
				rows={[
					{
						paramName: 'step',
						label: 'Step',
						options: ['1', '2', '3'],
						current: String(step),
						extraQuery: `&email=${encodeURIComponent(emailParam)}`,
					},
					{
						paramName: 'error',
						label: 'Erro',
						options: validErrors as unknown as string[],
						current: errorMode,
						extraQuery: `&step=${step}&email=${encodeURIComponent(emailParam)}`,
					},
				]}
			/>
		</>
	)
}
