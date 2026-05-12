import { useSearchParams } from 'react-router'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { Icon } from '~/components/icon'
import { AuthBackLink } from '../_auth/back-link'
import { AuthDevNav } from '../_auth/dev-nav'

type ExcluirStep = 'intro' | 'sent' | 'marked' | 'cancel'

const STEPS: ExcluirStep[] = ['intro', 'sent', 'marked', 'cancel']

const USER_NAME = 'Mariana Albuquerque'
const USER_EMAIL = 'mariana.albuquerque@empresa.com.br'
const USER_INITIALS = 'MA'

const DELETION_DATE = '29 de maio de 2026'
const DAYS_REMAINING = 30

const WHAT_GOES = [
	'Dados pessoais — nome, e-mail, telefone, endereço',
	'Histórico de leituras, downloads e favoritos',
	'Newsletters e preferências de comunicação',
	'Sessões ativas em todos os dispositivos',
	'Comentários e contribuições editoriais',
]

const WHAT_STAYS: Array<{ main: string; sub: string }> = [
	{ main: 'Registros fiscais e financeiros', sub: '5 anos · LGPD Art. 16' },
	{ main: 'Logs de acesso anonimizados', sub: '6 meses · Marco Civil da Internet' },
	{ main: 'Estatísticas agregadas', sub: 'Sem identificação possível' },
]

const ALTERNATIVES = [
	{
		title: 'Parar de receber e-mails',
		desc: 'Cancele opt-ins por canal sem perder a conta.',
		href: '/dashboard-perfil-v3?tab=newsletter',
		cta: 'Gerenciar newsletters',
	},
	{
		title: 'Remover dados específicos',
		desc: 'Edite ou apague campos do perfil individualmente.',
		href: '/dashboard-perfil-v3?tab=perfil',
		cta: 'Editar perfil',
	},
	{
		title: 'Baixar tudo antes',
		desc: 'Solicite uma cópia completa em JSON ou CSV.',
		href: '/meus-dados',
		cta: 'Baixar meus dados',
	},
]

const DURING_PERIOD = [
	'Suas sessões continuam ativas — você pode acessar normalmente.',
	'Você não receberá mais newsletters, comunicações ou convites.',
	'Cancelar a exclusão é instantâneo — basta clicar no botão abaixo.',
]

/**
 * Tela: Excluir Conta — LGPD Direito ao Esquecimento (Art. 18 IX)
 * Fluxo multi-step com modal de confirmação.
 * Steps: ?step=intro|sent|marked|cancel · modal: ?modal=confirm
 */
export default function ExcluirContaScreen() {
	const [params] = useSearchParams()
	const stepParam = params.get('step') ?? 'intro'
	const step = (STEPS.includes(stepParam as ExcluirStep) ? stepParam : 'intro') as ExcluirStep
	const showConfirmModal = params.get('modal') === 'confirm'

	const backHref = step === 'intro' ? '/dashboard-perfil-v3?tab=conta' : '?step=intro'
	const backLabel = step === 'intro' ? 'Voltar para minha conta' : 'Voltar'

	return (
		<>
			<main className="bg-white min-h-screen flex flex-col">
				<HeaderDesktop
					userLoggedIn
					userName={USER_NAME}
					userEmail={USER_EMAIL}
					userInitials={USER_INITIALS}
				/>

				<div className="flex-1 max-w-screen-xl mx-auto w-full px-4 lg:px-6 py-10">
					<div className="animate-fade-up-sm">
						<AuthBackLink href={backHref} label={backLabel} />
					</div>

					{step === 'intro' ? <IntroStep /> : null}
					{step === 'sent' ? <SentStep /> : null}
					{step === 'marked' ? <MarkedStep /> : null}
					{step === 'cancel' ? <CancelStep /> : null}
				</div>

				<FooterDesktop />
			</main>

			{showConfirmModal ? <ConfirmModal /> : null}

			<AuthDevNav
				paramName="step"
				label="Step"
				options={STEPS as unknown as string[]}
				current={showConfirmModal ? 'modal' : step}
			/>
		</>
	)
}

function IntroStep() {
	return (
		<>
			<header
				className="mt-8 max-w-[60ch] animate-fade-up-sm"
				style={{ animationDelay: '60ms' }}
			>
				<p className="font-body font-semibold text-label-md tracking-wider text-secondary-950 uppercase">
					LGPD · Art. 18 IX
				</p>
				<h1 className="mt-2 font-display font-bold text-headline-lg text-primary-600 leading-tight">
					Excluir sua conta.
				</h1>
				<p className="mt-4 font-body text-body-lg text-neutral-900">
					Você tem o direito ao esquecimento. Sem perguntas, sem retenção desnecessária. Antes de
					continuar, veja exatamente o que vai acontecer.
				</p>
			</header>

			<section
				className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-up-sm"
				style={{ animationDelay: '120ms' }}
			>
				<div>
					<h2 className="font-display font-bold text-title-xl text-primary-600">
						O que será excluído
					</h2>
					<p className="mt-1 font-body text-body-md text-neutral-700 max-w-[50ch]">
						Definitivamente, em até 30 dias após a confirmação.
					</p>
					<ul className="mt-5 flex flex-col gap-3 font-body text-body-md text-neutral-900 max-w-[55ch]">
						{WHAT_GOES.map((item) => (
							<li key={item} className="flex items-start gap-3">
								<Icon name="remove" className="size-5 mt-0.5 shrink-0 text-red-700" />
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h2 className="font-display font-bold text-title-xl text-primary-600">
						O que mantemos por lei
					</h2>
					<p className="mt-1 font-body text-body-md text-neutral-700 max-w-[50ch]">
						Obrigações legais que sobrevivem à exclusão — sem identificação pessoal.
					</p>
					<ul className="mt-5 flex flex-col gap-3 font-body text-body-md text-neutral-900 max-w-[55ch]">
						{WHAT_STAYS.map((item) => (
							<li key={item.main} className="flex items-start gap-3">
								<Icon name="shield" className="size-5 mt-0.5 shrink-0 text-secondary-950" />
								<div className="flex flex-col">
									<span>{item.main}</span>
									<span className="font-body text-body-sm text-neutral-500">{item.sub}</span>
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section
				className="mt-16 max-w-[80ch] animate-fade-up-sm"
				style={{ animationDelay: '180ms' }}
			>
				<header className="mb-6 max-w-[60ch]">
					<h2 className="font-display font-bold text-title-xl text-primary-600">
						Antes de excluir, considere
					</h2>
					<p className="mt-1 font-body text-body-md text-neutral-700">
						Talvez uma dessas opções resolva sem precisar excluir tudo.
					</p>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{ALTERNATIVES.map((alt) => (
						<a
							key={alt.title}
							href={alt.href}
							className="group flex flex-col gap-2 p-5 rounded-lg border border-neutral-100 bg-white hover:border-secondary-950 transition-colors"
						>
							<h3 className="font-display font-bold text-title-md text-primary-600 group-hover:text-secondary-950 transition-colors">
								{alt.title}
							</h3>
							<p className="font-body text-body-md text-neutral-700">{alt.desc}</p>
							<span className="mt-auto pt-2 inline-flex items-center gap-1 font-body font-bold text-label-md text-secondary-950 w-fit">
								{alt.cta}
								<Icon name="chevron-right" className="size-4" />
							</span>
						</a>
					))}
				</div>
			</section>

			<section
				className="mt-16 flex flex-wrap items-center gap-3 animate-fade-up-sm"
				style={{ animationDelay: '240ms' }}
			>
				<a
					href="/dashboard-perfil-v3?tab=conta"
					className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-transparent text-primary-600 hover:bg-neutral-50 font-body font-bold text-body-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2"
				>
					Voltar e ficar
				</a>
				<a
					href="?modal=confirm"
					className="inline-flex items-center justify-center h-10 px-6 rounded-full border-[1.5px] border-red-600 bg-white hover:bg-red-50 text-red-700 font-body font-bold text-body-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
				>
					Continuar a exclusão
				</a>
			</section>
		</>
	)
}

function SentStep() {
	return (
		<div className="mt-12 max-w-[60ch] animate-fade-up-sm" style={{ animationDelay: '60ms' }}>
			<div className="inline-flex items-center justify-center size-12 rounded-full bg-secondary-500/10 text-secondary-950">
				<Icon name="mail" className="size-6" />
			</div>
			<h1 className="mt-6 font-display font-bold text-headline-lg text-primary-600 leading-tight">
				Confira sua caixa de entrada.
			</h1>
			<p className="mt-4 font-body text-body-lg text-neutral-900">
				Enviamos um link de verificação para{' '}
				<strong className="font-bold">{USER_EMAIL}</strong>. Clique no link para iniciar o
				processo de exclusão. O link expira em <strong className="font-bold">24 horas</strong>.
			</p>
			<p className="mt-3 font-body text-body-md text-neutral-700">
				Se você não confirmou esta solicitação, pode ignorar o e-mail — sua conta não será
				afetada.
			</p>
			<div className="mt-8 flex flex-wrap items-center gap-4">
				<a
					href="/dashboard-perfil-v3?tab=conta"
					className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
				>
					Voltar para minha conta
				</a>
				<a
					href="?step=marked"
					className="font-body text-label-md text-neutral-400 hover:text-neutral-700 underline"
				>
					[Simular clique no link do e-mail]
				</a>
			</div>
		</div>
	)
}

function MarkedStep() {
	return (
		<>
			<header
				className="mt-8 max-w-[60ch] animate-fade-up-sm"
				style={{ animationDelay: '60ms' }}
			>
				<p className="font-body font-semibold text-label-md tracking-wider text-amber-700 uppercase">
					Conta marcada para exclusão
				</p>
				<h1 className="mt-2 font-display font-bold text-headline-lg text-primary-600 leading-tight">
					Sua conta será excluída em <span className="text-amber-700">{DELETION_DATE}</span>.
				</h1>
				<p className="mt-4 font-body text-body-lg text-neutral-900">
					Faltam <strong className="font-bold">{DAYS_REMAINING} dias</strong>. Você pode cancelar
					a qualquer momento até essa data e sua conta volta ao normal sem perder nada.
				</p>
			</header>

			<section
				className="mt-12 max-w-[80ch] flex flex-col gap-6 px-6 py-8 rounded-lg bg-amber-50 animate-fade-up-sm"
				style={{ animationDelay: '120ms' }}
			>
				<h2 className="font-display font-bold text-title-xl text-primary-600">
					Durante esses 30 dias
				</h2>
				<ul className="flex flex-col gap-3 font-body text-body-md text-neutral-900 max-w-[60ch]">
					{DURING_PERIOD.map((item) => (
						<li key={item} className="flex items-start gap-3">
							<Icon name="schedule" className="size-5 mt-0.5 shrink-0 text-amber-700" />
							<span>{item}</span>
						</li>
					))}
				</ul>
			</section>

			<section
				className="mt-12 flex flex-wrap items-center gap-4 animate-fade-up-sm"
				style={{ animationDelay: '180ms' }}
			>
				<a
					href="?step=cancel"
					className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
				>
					Cancelar exclusão e continuar
				</a>
				<a
					href="/"
					className="font-body font-bold text-body-md text-neutral-700 hover:text-primary-600 transition-colors"
				>
					Sair agora
				</a>
			</section>
		</>
	)
}

function CancelStep() {
	return (
		<div className="mt-12 max-w-[60ch] animate-fade-up-sm" style={{ animationDelay: '60ms' }}>
			<div className="inline-flex items-center justify-center size-12 rounded-full bg-green-50 text-green-700">
				<Icon name="check" className="size-6" />
			</div>
			<h1 className="mt-6 font-display font-bold text-headline-lg text-primary-600 leading-tight">
				Tudo certo. Sua conta voltou ao normal.
			</h1>
			<p className="mt-4 font-body text-body-lg text-neutral-900">
				A solicitação de exclusão foi cancelada. Bem-vinda de volta — seus dados, históricos e
				preferências estão intactos.
			</p>
			<div className="mt-8">
				<a
					href="/dashboard-perfil-v3?tab=conta"
					className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
				>
					Ir para minha conta
				</a>
			</div>
		</div>
	)
}

function ConfirmModal() {
	return (
		<div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title">
			<a
				href="?step=intro"
				className="absolute inset-0 bg-[#050708]/40 cursor-pointer animate-fade-in"
				aria-label="Fechar"
			/>

			<div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
				<div className="relative bg-white rounded-2xl shadow-xl w-full max-w-[640px] max-h-[90vh] overflow-y-auto pointer-events-auto animate-fade-up-sm">
					<div className="flex items-start gap-4 px-8 pt-8 pb-2">
						<div className="flex-1 min-w-0">
							<h2
								id="confirm-modal-title"
								className="font-display font-bold text-headline-md text-primary-600 leading-tight"
							>
								Excluir conta
							</h2>
						</div>
						<a
							href="?step=intro"
							aria-label="Fechar"
							className="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors shrink-0"
						>
							<Icon name="close" className="size-6" />
						</a>
					</div>

					<p className="px-8 font-body text-body-lg text-neutral-900">
						Você tem <strong className="font-bold">30 dias para cancelar</strong> após
						confirmar. Vamos enviar um e-mail para garantir que é você.
					</p>

					<form
						action="/excluir-conta"
						method="get"
						className="mt-8 px-8 pb-8 flex flex-col gap-6"
						noValidate
					>
						<input type="hidden" name="step" value="sent" />

						<label className="flex flex-col w-full">
							<span className="flex items-center gap-1 px-1 pb-1 font-body font-semibold text-label-lg text-neutral-950">
								Por que está saindo?
								<span className="font-body font-normal text-label-md text-neutral-500 ml-1">
									(opcional)
								</span>
							</span>
							<span className="px-1 pb-2 font-body text-body-md text-neutral-700">
								Sua resposta nos ajuda a melhorar o produto. Não muda nada na exclusão.
							</span>
							<div className="relative flex items-center h-10 px-3 rounded-sm border border-neutral-100 bg-white focus-within:border-secondary-950 transition-colors">
								<select
									name="motivo"
									defaultValue=""
									className="flex-1 appearance-none bg-transparent font-body text-body-lg text-primary-600 focus:outline-none pr-7"
								>
									<option value="">Selecione um motivo</option>
									<option>Não uso mais</option>
									<option>O conteúdo não é relevante para mim</option>
									<option>Preocupações com privacidade</option>
									<option>Recebo muitos e-mails</option>
									<option>Encontrei outra solução</option>
									<option>Outro motivo</option>
								</select>
								<Icon
									name="arrow-drop-down"
									className="size-4 absolute right-3 text-neutral-500 pointer-events-none"
								/>
							</div>
						</label>

						<label className="flex flex-col w-full">
							<span className="flex items-center gap-0.5 px-1 pb-1 font-body font-semibold text-label-lg text-neutral-950">
								Digite{' '}
								<code className="font-mono font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded-xs">
									EXCLUIR
								</code>{' '}
								para confirmar
							</span>
							<div className="flex items-center h-10 px-3 rounded-sm border border-neutral-100 bg-white focus-within:border-red-600 transition-colors">
								<input
									type="text"
									name="confirma"
									required
									autoComplete="off"
									placeholder="Digite EXCLUIR (em maiúsculas)"
									pattern="EXCLUIR"
									className="flex-1 bg-transparent font-body text-body-lg text-primary-600 placeholder:text-neutral-500 focus:outline-none"
								/>
							</div>
						</label>

						<label className="flex items-start gap-3 cursor-pointer group">
							<input type="checkbox" name="entendi" required className="sr-only peer" />
							<span className="inline-flex items-center justify-center size-[18px] rounded-xs border-2 border-neutral-950 mt-1 shrink-0 transition-colors peer-checked:bg-primary-600 peer-checked:border-primary-600">
								<svg
									className="size-3 text-white opacity-0 peer-checked:opacity-100"
									viewBox="0 0 24 24"
									fill="currentColor"
									aria-hidden="true"
								>
									<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
								</svg>
							</span>
							<span className="flex-1 font-body text-body-md text-neutral-900">
								Entendo que após 30 dias da confirmação, esta ação{' '}
								<strong className="font-bold">não pode ser desfeita</strong> e que parte dos
								meus dados pode ser mantida por obrigação legal.
							</span>
						</label>

						<div className="flex flex-wrap items-center justify-end gap-2 mt-2 pt-4 border-t border-neutral-50">
							<a
								href="?step=intro"
								className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-transparent text-primary-600 hover:bg-neutral-50 font-body font-bold text-body-lg transition-colors"
							>
								Cancelar
							</a>
							<button
								type="submit"
								className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-red-600 hover:bg-red-700 text-white font-body font-bold text-body-lg transition-colors"
							>
								Confirmar exclusão
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
