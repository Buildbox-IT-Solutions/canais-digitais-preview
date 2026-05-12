import { useSearchParams } from 'react-router'
import { Categoria } from '~/components/categoria'
import { FooterDesktop } from '~/components/footer-desktop'
import { FormCheckbox } from '~/components/form-checkbox'
import { FormDisclaimer } from '~/components/form-disclaimer'
import { FormField } from '~/components/form-field'
import { FormSelect } from '~/components/form-select'
import { HeaderDesktop } from '~/components/header-desktop'
import { Icon } from '~/components/icon'
import { Orbit } from '~/components/orbit'
import { ProfileProgress } from '~/components/profile-progress'
import { AuthDevNav } from '../_auth/dev-nav'

type DownloadState = 'anonymous-prompt' | 'logged-direct-download' | 'logged-incomplete'

const STATES: DownloadState[] = [
	'anonymous-prompt',
	'logged-direct-download',
	'logged-incomplete',
]

const DOWNLOAD_TITLE = '10 tendências em Food Service para 2026'

/**
 * Tela: Formulário Download
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1992-23811
 * Estados: ?state=anonymous-prompt|logged-direct-download|logged-incomplete · ?user=logged
 */
export default function FormDownloadScreen() {
	const [params] = useSearchParams()
	const userParam = params.get('user') ?? 'anonymous'
	const stateParam =
		params.get('state') ??
		(userParam === 'logged' ? 'logged-direct-download' : 'anonymous-prompt')
	const state = (STATES.includes(stateParam as DownloadState)
		? stateParam
		: 'anonymous-prompt') as DownloadState

	return (
		<>
			<main className="bg-white">
				<HeaderDesktop />

				<div className="bg-[linear-gradient(54deg,var(--color-secondary-950)_0%,var(--color-secondary-500)_75%)] relative overflow-hidden">
					<div className="absolute bottom-0 left-[348px] w-[912px] h-[240px] opacity-75 pointer-events-none">
						<Orbit className="w-full h-full" />
					</div>
					<div className="max-w-screen-xl mx-auto px-4 lg:px-6 relative">
						<div className="flex gap-12 items-start py-20">
							<div className="flex flex-1 flex-col gap-4 items-start py-10 text-white">
								<Categoria color="saffron" label="E-book gratuito" chip />
								<h1 className="font-display text-display-lg w-full">
									Baixe o material gratuitamente
								</h1>
								<p className="font-display text-title-xl w-full">{DOWNLOAD_TITLE}</p>
								<p className="font-body text-body-lg text-white/80 w-full">
									Preencha seus dados para receber o conteúdo no seu e-mail
								</p>
							</div>

							{state === 'logged-direct-download' ? <LoggedDirectCard /> : null}
							{state === 'logged-incomplete' ? <LoggedIncompleteCard /> : null}
							{state === 'anonymous-prompt' ? <AnonymousPromptCard /> : null}
						</div>
					</div>
				</div>

				<FooterDesktop />
			</main>

			<AuthDevNav
				paramName="state"
				label="Estado"
				options={STATES as unknown as string[]}
				current={state}
			/>
		</>
	)
}

function LoggedDirectCard() {
	return (
		<div className="bg-white flex flex-1 flex-col gap-6 items-start max-w-[704px] rounded-sm shadow-sm p-8">
			<div className="inline-flex items-center justify-center size-16 rounded-full bg-[#DCFCE7]">
				<Icon name="download" className="size-8 text-[#16A34A]" />
			</div>
			<div className="flex flex-col gap-2 w-full">
				<h2 className="font-display font-bold text-title-xl text-neutral-950">
					Tudo pronto, Maria!
				</h2>
				<p className="font-body text-body-lg text-neutral-700">
					Vamos enviar{' '}
					<span className="font-semibold text-neutral-950">{DOWNLOAD_TITLE}</span> para{' '}
					<span className="font-semibold text-neutral-950">maria.silva@empresa.com.br</span>.
				</p>
			</div>
			<a
				href="/conteudo"
				className="bg-primary-600 inline-flex gap-3 items-center justify-center w-full h-12 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg"
			>
				<Icon name="download" className="size-6" />
				Baixar agora
			</a>
			<p className="font-body text-label-md text-neutral-500">
				Não é você?{' '}
				<a href="/" className="font-bold text-secondary-950 hover:underline">
					Sair da conta
				</a>
				.
			</p>
		</div>
	)
}

function LoggedIncompleteCard() {
	return (
		<div className="bg-white flex flex-1 flex-col gap-6 items-start max-w-[704px] rounded-sm shadow-sm p-8">
			<div className="inline-flex items-center justify-center size-16 rounded-full bg-[#FEF3C7]">
				<svg
					className="size-8 text-[#92400E]"
					viewBox="0 0 24 24"
					fill="currentColor"
					aria-hidden="true"
				>
					<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
				</svg>
			</div>
			<div className="flex flex-col gap-2 w-full">
				<h2 className="font-display font-bold text-title-xl text-neutral-950">
					Falta pouco para baixar
				</h2>
				<p className="font-body text-body-lg text-neutral-700">
					Precisamos de mais alguns dados do seu perfil para liberar o download de{' '}
					<span className="font-semibold text-neutral-950">{DOWNLOAD_TITLE}</span>.
				</p>
			</div>
			<div className="w-full">
				<ProfileProgress filledFields={4} totalFields={14} />
			</div>
			<div className="flex flex-wrap gap-3 w-full">
				<a
					href="/dashboard-perfil-v3"
					className="bg-primary-600 inline-flex items-center justify-center px-6 h-12 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg"
				>
					Completar meu perfil
				</a>
				<a
					href="/"
					className="inline-flex items-center justify-center px-6 h-12 rounded-full bg-transparent text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-lg"
				>
					Fazer isso depois
				</a>
			</div>
		</div>
	)
}

function AnonymousPromptCard() {
	return (
		<div className="bg-white flex flex-1 flex-col items-start max-w-[704px] rounded-sm shadow-sm">
			<div className="flex flex-col gap-6 items-start p-8 w-full">
				<div className="inline-flex items-center justify-center size-16 rounded-full bg-[#DBEAFE]">
					<Icon name="download" className="size-8 text-primary-600" />
				</div>
				<div className="flex flex-col gap-2 w-full">
					<h2 className="font-display font-bold text-title-xl text-neutral-950">
						Acesse para baixar
					</h2>
					<p className="font-body text-body-lg text-neutral-700">
						Para baixar{' '}
						<span className="font-semibold text-neutral-950">{DOWNLOAD_TITLE}</span>, faça
						login ou crie sua conta. Na próxima vez, o download é automático.
					</p>
				</div>
				<div className="flex flex-col gap-3 w-full">
					<a
						href="/login-modal"
						className="bg-primary-600 inline-flex items-center justify-center w-full h-12 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg"
					>
						Fazer login
					</a>
					<a
						href="/cadastro?step=1"
						className="inline-flex items-center justify-center w-full h-12 rounded-full bg-transparent border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 transition-colors font-body font-bold text-body-lg"
					>
						Criar conta
					</a>
				</div>
			</div>

			<div className="flex items-center gap-3 px-8 w-full">
				<div className="h-px flex-1 bg-neutral-100" />
				<span className="font-body text-label-md text-neutral-500">
					ou preencha o formulário abaixo
				</span>
				<div className="h-px flex-1 bg-neutral-100" />
			</div>

			<div className="flex flex-col items-start w-full">
				<div className="flex flex-col gap-8 items-start pb-12 pt-8 px-8 w-full">
					<h2 className="font-display font-bold text-title-lg text-neutral-950 w-full">
						Dados pessoais
					</h2>

					<div className="flex flex-wrap gap-x-6 gap-y-8 items-start w-full">
						<FormField label="Nome" required />
						<FormField label="Sobrenome" required />
					</div>

					<div className="max-w-[524px] w-full">
						<FormField
							label="E-mail"
							type="email"
							placeholder="exemplo@email.com"
							required
						/>
					</div>
				</div>

				<div className="flex flex-col gap-8 items-start pb-12 px-8 w-full">
					<h2 className="font-display font-bold text-title-lg text-neutral-950 w-full">
						Dados profissionais
					</h2>

					<div className="flex flex-wrap gap-x-6 gap-y-8 items-start w-full">
						<FormField label="Empresa" required />
						<FormSelect label="Cargo" required />
					</div>

					<div className="flex flex-wrap gap-x-6 gap-y-8 items-start w-full">
						<FormField label="Telefone" type="tel" placeholder="(xx) xxxxx-xxxx" required />
						<FormSelect label="País" value="Brasil" required />
					</div>

					<div className="flex flex-wrap gap-x-6 gap-y-8 items-start w-full">
						<FormSelect label="Estado" required />
						<FormField label="Cidade" required />
					</div>
				</div>

				<div className="flex flex-col items-start px-8 w-full">
					<FormCheckbox label="Sim, eu desejo receber informações da Informa Markets e seus parceiros" />
				</div>

				<div className="flex flex-col items-start p-8 w-full">
					<a
						href="/conteudo"
						className="bg-primary-600 inline-flex gap-3 items-center justify-center px-6 py-3 rounded-full text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-lg w-full"
					>
						<Icon name="download" className="size-6" />
						Baixar material
					</a>
				</div>

				<FormDisclaimer />
			</div>
		</div>
	)
}
