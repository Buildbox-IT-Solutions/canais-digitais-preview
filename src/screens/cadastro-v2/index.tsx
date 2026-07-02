import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { Icon } from '~/components/icon'
import { Modal } from '~/components/modal'
import { PasswordChecklist } from '~/components/password-checklist'
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
type Step2Error = 'none' | 'mismatch' | 'termos'
type Step3Error = 'none' | 'campos'

const STEP1_ERRORS: Step1Error[] = ['none', 'empty', 'invalido', 'existente']
const STEP2_ERRORS: Step2Error[] = ['none', 'mismatch', 'termos']
const STEP3_ERRORS: Step3Error[] = ['none', 'campos']

const HEADINGS: Record<CadastroStep, { title: string; sub: string | null }> = {
	1: { title: 'Qual é o seu e-mail?', sub: 'Recomendamos o uso do seu e-mail corporativo.' },
	2: { title: 'Crie uma senha', sub: null },
	3: { title: 'Conte um pouco sobre você', sub: null },
}

const PRIMARY_CTA: Record<CadastroStep, string> = {
	1: 'Avançar',
	2: 'Avançar',
	3: 'Criar minha conta',
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
 * Tela: Cadastro Multi-Step (Modal) — v2
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=6930-43301
 * Modal compacto (912×600, colunas 50/50) sobre o portal. Coluna do formulário estruturada em:
 * top-bar (Voltar nos passos 2–3 + fechar) · header (Passo X de 3 + título) · body (campos) ·
 * footer (CTA). O avanço se dá pela submissão do formulário; o retorno pelo botão "Voltar".
 * Estados: ?step=1|2|3 · ?error=... · ?email=...
 * Tokens: --color-primary-600, --color-secondary-500, --color-secondary-950, --color-neutral-*
 */
export default function CadastroV2Screen() {
	const [params] = useSearchParams()

	const stepRaw = Number(params.get('step') ?? 1)
	const step = ([1, 2, 3].includes(stepRaw) ? stepRaw : 1) as CadastroStep

	const emailParam = params.get('email') ?? 'mariana.albuquerque@empresa.com.br'
	const intent = params.get('intent') ?? ''

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
	const confirmError = errorMode === 'mismatch' ? 'As senhas não coincidem.' : undefined
	const termosError =
		errorMode === 'termos'
			? 'Você precisa aceitar os Termos de Uso e a Política de Privacidade.'
			: undefined

	// Step 3
	const campoVazioError = errorMode === 'campos' ? 'Preencha todos os campos obrigatórios.' : undefined

	const senhaInicial = errorMode === 'mismatch' ? 'Minhasenha1@' : ''
	const confirmInicial = errorMode === 'mismatch' ? 'outrasenha456' : ''

	const [pw, setPw] = useState(senhaInicial)
	useEffect(() => { setPw(senhaInicial) }, [senhaInicial])

	const prevStep =
		step === 1
			? null
			: `/cadastro?step=${step - 1}&email=${encodeURIComponent(emailParam)}`

	// Ao concluir o passo 3, o modal é fechado e a confirmação abre em fullpage (tela 3.1).
	const nextAction = step === 3 ? '/confirmacao-email' : '/cadastro'

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
				labelledById="cadastro-v2-title"
				className="max-w-[912px] min-h-[min(696px,90vh)]"
			>
				<ProofPanelMinimal
					variant={PROOF_VARIANT[step]}
					size="sm"
					className="hidden md:flex grow basis-1/2 min-w-0"
				/>

				{/* Coluna do formulário */}
				<div className="relative flex grow basis-1/2 min-w-0 min-h-0 flex-col bg-white">
					{/* top-bar: Voltar (passos 2–3) + fechar */}
					<div className="shrink-0 flex items-center justify-between px-4 pt-4 pb-2">
						{prevStep ? (
							<a
								href={prevStep}
								className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full font-body font-bold text-body-md text-primary-600 hover:bg-neutral-50 transition-colors"
							>
								<Icon name="arrow-left" className="size-5" />
								Voltar
							</a>
						) : (
							<span aria-hidden="true" />
						)}

						<a
							href="/home"
							aria-label="Fechar"
							className="inline-flex items-center justify-center size-9 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors"
						>
							<Icon name="close" className="size-[18px]" />
						</a>
					</div>

					{/* header */}
					<div className="shrink-0 pt-6 pb-4 px-8 flex flex-col gap-3">
						<p className="font-body font-semibold text-label-md text-neutral-900">
							Passo {step} de 3
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
						{step === 3 ? (
							<input type="hidden" name="state" value="waiting" />
						) : (
							<input type="hidden" name="step" value={step + 1} />
						)}
						{intent ? <input type="hidden" name="intent" value={intent} /> : null}

						{/* body */}
						<div className="flex-1 min-h-0 overflow-y-auto px-8 pt-2 pb-4 flex flex-col gap-6">
							{campoVazioError ? <AuthErrorAlert message={campoVazioError} /> : null}
							{termosError ? <AuthErrorAlert message={termosError} /> : null}

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
										errorMode === 'existente' ? { label: 'Entrar', href: '/login' } : undefined
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
											value={pw}
											onChange={setPw}
											required
										/>
										<PasswordChecklist value={pw} />
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
										<label className="flex items-start gap-4 cursor-pointer group py-2">
											<input type="checkbox" name="termos" required className="sr-only" />
											<span
												className={`inline-flex items-center justify-center size-[18px] rounded-xs border-2 mt-0.5 shrink-0 transition-colors ${
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

										<label className="flex items-start gap-4 cursor-pointer group py-2">
											<input type="checkbox" name="marketing" className="sr-only" />
											<span className="inline-flex items-center justify-center size-[18px] rounded-xs border-2 border-neutral-950 mt-0.5 shrink-0 transition-colors group-has-[:checked]:bg-primary-600 group-has-[:checked]:border-primary-600">
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
						</div>

						{/* footer */}
						<div className="shrink-0 px-8 pt-4 pb-8 flex flex-col gap-4">
							<button
								type="submit"
								className="inline-flex items-center justify-center gap-3 w-full h-12 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
							>
								{PRIMARY_CTA[step]}
								{step !== 3 ? <Icon name="arrow-right" className="size-6" /> : null}
							</button>

							{step === 1 ? (
								<AuthBottomLink label="Já tem uma conta?" linkLabel="Entrar" linkHref="/login" />
							) : null}
						</div>
					</form>
				</div>
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
