import { useSearchParams } from 'react-router'
import { AccessMethodCard } from '~/components/access-method-card'
import { DashboardTabsV3 } from '~/components/dashboard-tabs-v3'
import { DashboardWelcome } from '~/components/dashboard-welcome'
import { DownloadItem } from '~/components/download-item'
import { Drawer } from '~/components/drawer'
import { FooterDesktop } from '~/components/footer-desktop'
import { GeneralItem } from '~/components/general-item'
import { HeaderDesktop } from '~/components/header-desktop'
import { Icon } from '~/components/icon'
import { NewsletterItem } from '~/components/newsletter-item'
import { Pagination } from '~/components/pagination'
import { ProfileBox } from '~/components/profile-box'
import { RecentNewsItem } from '~/components/recent-news-item'
import { SessionRow } from '~/components/session-row'
import { Toast } from '~/components/toast'
import {
	DOWNLOADS,
	NEWSLETTERS,
	OPCOES_CARGO,
	OPCOES_GENERO,
	OPCOES_PAIS,
	OPCOES_SETOR,
	PERFIL_CAMPOS,
	RECENT_NEWS,
	SESSIONS,
} from '~/mocks/dashboard-perfil'

type Tab = 'geral' | 'perfil' | 'newsletter' | 'downloads' | 'conta'
type Drawer = 'dados-pessoais' | 'dados-profissionais' | 'dados-fiscais'

const TABS: Tab[] = ['geral', 'perfil', 'newsletter', 'downloads', 'conta']
const DRAWERS: Drawer[] = ['dados-pessoais', 'dados-profissionais', 'dados-fiscais']

const USER_NAME = 'Mariana Albuquerque'
const USER_EMAIL = 'mariana.albuquerque@empresa.com.br'
const USER_INITIALS = 'MA'

const PER_PAGE = 8

/**
 * Tela: Dashboard de Perfil v3 — modelo tabbed (Figma 6155:31441)
 * 6 abas: geral, perfil, newsletter, downloads, favoritos (desabilitada), conta
 * Drawer overlay em perfil: ?drawer=dados-pessoais|dados-profissionais|dados-fiscais
 * Estados: ?state=saved (toast) | empty (novo usuário)
 */
export default function DashboardPerfilV3Screen() {
	const [params] = useSearchParams()

	const tabParam = params.get('tab') ?? 'geral'
	const tab = (TABS.includes(tabParam as Tab) ? tabParam : 'geral') as Tab

	const drawerParam = params.get('drawer')
	const drawer = (DRAWERS.includes(drawerParam as Drawer) && tab === 'perfil'
		? drawerParam
		: null) as Drawer | null

	const state = params.get('state')
	const isSaved = state === 'saved'
	const isEmpty = state === 'empty'

	const totalFields = Object.keys(PERFIL_CAMPOS).length
	const filledFields = Object.values(PERFIL_CAMPOS).filter((v) => v !== '').length
	const pct = Math.round((filledFields / totalFields) * 100)
	const missing = totalFields - filledFields

	return (
		<main className="bg-white min-h-screen flex flex-col">
			<HeaderDesktop
				userLoggedIn
				userName={USER_NAME}
				userEmail={USER_EMAIL}
				userInitials={USER_INITIALS}
			/>

			<div className="max-w-screen-xl mx-auto w-full px-4 lg:px-6 pt-10 pb-6">
				<DashboardWelcome
					firstName="Mariana"
					email={USER_EMAIL}
					initials={USER_INITIALS}
					logoutHref="/"
				/>
			</div>

			<div className="max-w-screen-xl mx-auto w-full px-4 lg:px-6 pt-4">
				<DashboardTabsV3 active={tab} baseHref="/dashboard-perfil-v3" />
			</div>

			<div className="flex-1 max-w-screen-xl mx-auto w-full px-4 lg:px-6 py-10">
				{tab === 'geral' ? (
					<GeralPane pct={pct} missing={missing} isEmpty={isEmpty} />
				) : null}
				{tab === 'perfil' ? <PerfilPane pct={pct} missing={missing} /> : null}
				{tab === 'newsletter' ? <NewsletterPane /> : null}
				{tab === 'downloads' ? <DownloadsPane /> : null}
				{tab === 'conta' ? <ContaPane /> : null}
			</div>

			<FooterDesktop />

			{drawer ? <PerfilDrawer drawer={drawer} /> : null}

			{isSaved ? (
				<div className="fixed bottom-24 right-6 z-50">
					<Toast type="success" message="Alterações salvas." />
				</div>
			) : null}
		</main>
	)
}

function GeralPane({ pct, missing, isEmpty }: { pct: number; missing: number; isEmpty: boolean }) {
	const R = 60
	const CIRC = 2 * Math.PI * R
	const arc = (pct / 100) * CIRC

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col lg:flex-row gap-4 items-stretch">
				<div className="flex-[3] bg-mint-light rounded-lg pl-8 pr-12 py-8 flex items-center gap-8">
					<div className="relative size-[140px] shrink-0">
						<svg width={140} height={140} viewBox="0 0 140 140" aria-hidden="true">
							<circle cx={70} cy={70} r={R} fill="none" stroke="rgba(0,34,68,.15)" strokeWidth={8} />
							<circle
								cx={70}
								cy={70}
								r={R}
								fill="none"
								stroke="var(--color-mint)"
								strokeWidth={8}
								strokeLinecap="round"
								strokeDasharray={`${arc.toFixed(2)} 999`}
								transform="rotate(-90 70 70)"
								style={{ transition: 'stroke-dasharray 600ms cubic-bezier(0.2,0,0,1)' }}
							/>
						</svg>
						<div className="absolute inset-0 flex flex-col items-center justify-center text-primary-600">
							<span className="font-display font-bold text-headline-md leading-none">{pct}%</span>
							<span className="font-body font-semibold text-label-sm tracking-wider mt-1">
								COMPLETO
							</span>
						</div>
					</div>
					<div className="flex-1 min-w-0 flex flex-col gap-4">
						<h2 className="font-display font-bold text-headline-sm text-primary-600 leading-tight">
							Receba conteúdos mais relevantes para você
						</h2>
						<p className="font-body text-body-md text-primary-600">
							<strong className="font-bold">Faltam {missing} campos para chegar a 100%</strong>.
							Cada informação afina o que chega até você em conteúdos, newsletters e eventos.
						</p>
						<a
							href="?tab=perfil"
							className="inline-flex items-center gap-2 h-8 pl-4 pr-3 rounded-full bg-primary-600 text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-md w-fit"
						>
							Completar perfil
							<Icon name="arrow-forward" className="size-5" />
						</a>
					</div>
				</div>

				<div className="flex-1 flex flex-col gap-4">
					<a
						href="?tab=downloads"
						className="group bg-white border border-primary-100 rounded-lg p-5 flex flex-col gap-3 hover:border-secondary-950 transition-colors"
					>
						<div className="flex items-center gap-4">
							<div className="bg-neutral-50 inline-flex items-center justify-center p-3 rounded-lg shrink-0">
								<Icon
									name="download"
									className={isEmpty ? 'size-6 text-neutral-500' : 'size-6 text-primary-600'}
								/>
							</div>
							<span
								className={`font-display font-bold text-headline-lg ${isEmpty ? 'text-neutral-500' : 'text-primary-600 group-hover:text-secondary-950'} transition-colors`}
							>
								{isEmpty ? '0' : '12'}
							</span>
						</div>
						<span className="font-body font-semibold text-label-lg text-neutral-900">
							Downloads totais
						</span>
					</a>
					<a
						href="?tab=newsletter"
						className="group bg-white border border-primary-100 rounded-lg p-5 flex flex-col gap-3 hover:border-secondary-950 transition-colors"
					>
						<div className="flex items-center gap-4">
							<div className="bg-neutral-50 inline-flex items-center justify-center p-3 rounded-lg shrink-0">
								<Icon
									name="mail"
									className={isEmpty ? 'size-6 text-neutral-500' : 'size-6 text-primary-600'}
								/>
							</div>
							<span
								className={`font-display font-bold text-headline-lg ${isEmpty ? 'text-neutral-500' : 'text-primary-600 group-hover:text-secondary-950'} transition-colors`}
							>
								{isEmpty ? '0' : '2'}
							</span>
						</div>
						<span className="font-body font-semibold text-label-lg text-neutral-900">
							Newsletters ativas
						</span>
					</a>
				</div>
			</div>

			<div className="h-4" />

			<section>
				<h2 className="font-display font-bold text-title-xl text-primary-600 mb-4">
					Últimas leituras
				</h2>

				{isEmpty ? (
					<div className="bg-neutral-50 border border-primary-100 rounded-lg px-6 py-12 flex flex-col items-center text-center gap-3">
						<div className="size-14 rounded-full bg-white border border-primary-100 inline-flex items-center justify-center">
							<Icon name="book" className="size-7 text-primary-600" />
						</div>
						<h3 className="font-display font-bold text-title-md text-primary-600">
							Você ainda não leu nenhum artigo
						</h3>
						<p className="font-body text-body-md text-neutral-700 max-w-md">
							Explore o portal e comece agora. Seus artigos lidos aparecem aqui
							automaticamente.
						</p>
						<a
							href="/home"
							className="mt-3 inline-flex items-center gap-2 h-10 pl-5 pr-4 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-md transition-colors"
						>
							Explorar conteúdos
							<Icon name="arrow-forward" className="size-5" />
						</a>
					</div>
				) : (
					<div className="flex flex-col">
						{RECENT_NEWS.map((r, i) => (
							<RecentNewsItem
								key={i}
								category={r.category}
								title={r.title}
								when={r.when}
								href="/conteudo"
								isLast={i === RECENT_NEWS.length - 1}
							/>
						))}
					</div>
				)}
			</section>
		</div>
	)
}

function PerfilPane({ pct, missing }: { pct: number; missing: number }) {
	return (
		<div className="flex flex-col gap-6">
			<header className="flex flex-col gap-1">
				<h2 className="font-display font-bold text-title-xl text-primary-600">Perfil</h2>
				<p className="font-body text-body-md text-neutral-600">
					{pct}% completo — {missing} campos restantes.
				</p>
			</header>

			<div className="flex flex-col gap-2">
				<h3 className="font-display font-bold text-title-md text-primary-600">
					Foto de perfil{' '}
					<span className="font-body font-normal text-neutral-950">(Opcional)</span>
				</h3>
				<div className="bg-neutral-50/60 border-2 border-dashed border-neutral-100 rounded-lg p-6 flex items-center gap-4">
					<div className="size-16 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
						<span className="font-body font-semibold text-headline-sm text-primary-600 leading-none">
							{USER_INITIALS}
						</span>
					</div>
					<div className="flex-1 min-w-0 flex flex-col gap-1">
						<p className="font-body font-bold text-label-lg text-primary-600">
							Arraste uma imagem ou{' '}
							<a href="#" className="text-secondary-950 hover:underline">
								procure nos seus arquivos
							</a>
						</p>
						<p className="font-body text-body-md text-neutral-600">JPG ou PNG, máx. 2 MB.</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<ProfileBox
					icon="account-circle"
					title="Dados pessoais"
					description="Informações de identificação da sua conta"
					fields={[PERFIL_CAMPOS.nome, PERFIL_CAMPOS.email, PERFIL_CAMPOS.telefone]}
					href="?tab=perfil&drawer=dados-pessoais"
					cta="Atualizar"
					chip="Complete seu Perfil"
					incomplete
				/>
				<ProfileBox
					icon="business-center"
					title="Dados profissionais"
					description="Define suas recomendações de conteúdo e newsletter"
					fields={[PERFIL_CAMPOS.empresa, PERFIL_CAMPOS.cargo, PERFIL_CAMPOS.setor]}
					href="?tab=perfil&drawer=dados-profissionais"
					cta="Atualizar"
				/>
				<ProfileBox
					icon="location"
					title="Dados Demográficos"
					description="Solicitado apenas quando você baixa materiais"
					fields={['CPF / CNPJ', 'Cidade, UF', 'Endereço']}
					href="?tab=perfil&drawer=dados-fiscais"
					cta="Preencher"
					incomplete
					placeholder
					chip="Preencha e personalize sua experiência"
				/>
			</div>
		</div>
	)
}

function NewsletterPane() {
	const totalNl = NEWSLETTERS.length
	const activeNl = NEWSLETTERS.filter((n) => n.checked).length

	return (
		<div className="flex flex-col gap-6">
			<header className="flex flex-col gap-1">
				<h2 className="font-display font-bold text-title-xl text-primary-600">Newsletter</h2>
				<p className="font-body text-body-md text-neutral-600">
					Escolha o que deseja receber. Suas alterações são salvas automaticamente.
				</p>
			</header>

			<div className="bg-neutral-50 rounded-lg px-6 py-4">
				<p className="font-body font-semibold text-body-md text-primary-600">
					{activeNl} newsletters ativas de {totalNl} opções disponíveis
				</p>
			</div>

			<div className="flex flex-col">
				{NEWSLETTERS.map((nl, i) => (
					<NewsletterItem
						key={i}
						id={`nl-v3-${i}`}
						title={nl.title}
						desc={nl.desc}
						checked={nl.checked}
						isLast={i === NEWSLETTERS.length - 1}
					/>
				))}
			</div>
		</div>
	)
}

function DownloadsPane() {
	const [params] = useSearchParams()
	const pageRaw = Number(params.get('page') ?? 1)
	const totalPages = Math.max(1, Math.ceil(DOWNLOADS.length / PER_PAGE))
	const page = Math.min(Math.max(1, pageRaw), totalPages)
	const offset = (page - 1) * PER_PAGE
	const slice = DOWNLOADS.slice(offset, offset + PER_PAGE)

	return (
		<div className="flex flex-col gap-6">
			<header className="flex flex-col gap-1">
				<h2 className="font-display font-bold text-title-xl text-primary-600">
					Meus downloads
				</h2>
				<p className="font-body text-body-md text-neutral-600">
					Baixe novamente qualquer material a qualquer momento.
				</p>
			</header>

			<div className="flex flex-col">
				{slice.map((d, i) => (
					<DownloadItem
						key={`${page}-${i}`}
						icon={d.icon}
						title={d.title}
						date={d.date}
						size={d.size}
						titleHref="/conteudo"
						fileHref="#"
						disabled={d.disabled}
						isLast={i === slice.length - 1}
					/>
				))}
			</div>

			{totalPages > 1 ? (
				<div className="pt-4">
					<Pagination
						current={page}
						total={totalPages}
						baseHref="/dashboard-perfil-v3?tab=downloads"
					/>
				</div>
			) : null}
		</div>
	)
}

function ContaPane() {
	return (
		<div className="flex flex-col gap-10">
			<header className="flex flex-col gap-1">
				<h2 className="font-display font-bold text-title-xl text-primary-600">Minha Conta</h2>
				<p className="font-body text-body-md text-neutral-600">
					Gerenciamento de acesso, sessões e dados da sua Conta Informa.
				</p>
			</header>

			<section>
				<h3 className="font-display font-bold text-title-lg text-primary-600 mb-4">
					Método de acesso
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<AccessMethodCard
						icon="mail"
						name="E-mail e senha"
						chip="Ativo"
						detail={USER_EMAIL}
						cta="Alterar senha"
					/>
					<AccessMethodCard
						icon="linkedin"
						name="LinkedIn"
						detail="Conecte seu LinkedIn para entrar sem senha"
						cta="Conectar"
					/>
					<AccessMethodCard
						icon="google"
						name="Google"
						detail="Conecte seu Google para entrar sem senha"
						cta="Conectar"
					/>
				</div>
			</section>

			<section>
				<h3 className="font-display font-bold text-title-lg text-primary-600 mb-4">
					Sessões ativas
				</h3>
				<div className="flex flex-col">
					{SESSIONS.map((s, i) => (
						<SessionRow
							key={i}
							device={s.device}
							browser={s.browser}
							location={s.location}
							last={s.last}
							current={s.current}
							isLast={i === SESSIONS.length - 1}
						/>
					))}
				</div>
			</section>

			<section>
				<header className="mb-4">
					<h3 className="font-display font-bold text-title-lg text-primary-600">
						Privacidade &amp; LGPD
					</h3>
					<p className="font-body text-body-md text-neutral-600 mt-1">
						Você tem controle total sobre seus dados conforme a LGPD. Todas as alterações são
						registradas.
					</p>
				</header>
				<div className="flex flex-col">
					<GeneralItem
						icon="download"
						title="Baixar meus dados"
						desc="Faça o download de uma cópia de seus dados a qualquer momento."
						href="/meus-dados"
					/>
					<GeneralItem
						icon="delete"
						title="Excluir minha conta"
						desc="Direito ao esquecimento. Exclusão imediata e irreversível."
						href="/excluir-conta"
						danger
						isLast
					/>
				</div>
			</section>
		</div>
	)
}

function PerfilDrawer({ drawer }: { drawer: Drawer }) {
	const cfg = buildDrawerConfig(drawer)

	return (
		<Drawer
			open
			title={cfg.title}
			closeHref="/dashboard-perfil-v3?tab=perfil"
			cancelHref="/dashboard-perfil-v3?tab=perfil"
			saveHref="/dashboard-perfil-v3?tab=perfil&state=saved"
		>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
					columnGap: '16px',
					rowGap: '24px',
					width: '100%',
				}}
			>
				{cfg.fields.map((f, i) => (
					<DrawerField key={i} field={f} />
				))}
			</div>
		</Drawer>
	)
}

interface DrawerFieldDef {
	label: string
	value: string
	type?: 'text' | 'email' | 'select'
	options?: string[]
	placeholder?: string
	disabled?: boolean
	required?: boolean
	colSpan?: number
	help?: string
}

function DrawerField({ field }: { field: DrawerFieldDef }) {
	const {
		label,
		value,
		type = 'text',
		options = [],
		placeholder = '',
		disabled = false,
		required = false,
		colSpan = 12,
		help,
	} = field

	const span = Math.min(12, Math.max(1, colSpan))

	return (
		<div className="flex flex-col" style={{ gridColumn: `span ${span} / span ${span}`, minWidth: 0 }}>
			<label
				className={`font-body font-semibold text-label-lg ${disabled ? 'text-neutral-500' : 'text-neutral-950'} px-1 pb-1`}
			>
				{label}
				{required ? <span aria-hidden="true">*</span> : null}
			</label>
			{type === 'select' ? (
				<div className="relative bg-white border border-neutral-100 focus-within:border-secondary-950 flex h-10 items-center rounded-sm w-full">
					<select
						required={required}
						defaultValue={value}
						className={`flex-1 w-full h-full pl-3 pr-8 bg-transparent text-body-lg font-body ${value === '' ? 'text-neutral-500' : 'text-primary-600'} focus:text-primary-600 focus:outline-none appearance-none`}
					>
						{placeholder ? (
							<option value="">{placeholder}</option>
						) : null}
						{options.map((opt) => (
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
			) : (
				<div
					className={`${disabled ? 'bg-neutral-50' : 'bg-white'} border border-neutral-100 ${disabled ? '' : 'focus-within:border-secondary-950'} flex h-10 items-center rounded-sm w-full`}
				>
					<input
						type={type}
						defaultValue={value}
						placeholder={placeholder}
						required={required}
						disabled={disabled}
						className={`flex-1 w-full h-full px-3 bg-transparent text-body-lg font-body ${disabled ? 'text-neutral-500 cursor-not-allowed' : 'text-primary-600'} placeholder:text-neutral-400 focus:outline-none`}
					/>
				</div>
			)}
			{help ? (
				<p className="mt-1 px-1 font-body text-label-md text-neutral-700">{help}</p>
			) : null}
		</div>
	)
}

function buildDrawerConfig(drawer: Drawer): { title: string; fields: DrawerFieldDef[] } {
	if (drawer === 'dados-pessoais') {
		return {
			title: 'Dados pessoais',
			fields: [
				{ label: 'Nome completo', value: PERFIL_CAMPOS.nome, required: true },
				{
					label: 'E-mail corporativo',
					value: PERFIL_CAMPOS.email,
					type: 'email',
					disabled: true,
					required: true,
				},
				{ label: 'Telefone', value: PERFIL_CAMPOS.telefone, required: true },
				{
					label: 'Data de nascimento',
					value: PERFIL_CAMPOS.nascimento,
					placeholder: 'dd/mm/aaaa',
					colSpan: 6,
				},
				{
					label: 'Gênero',
					value: PERFIL_CAMPOS.genero,
					type: 'select',
					options: OPCOES_GENERO,
					placeholder: 'Selecione',
					colSpan: 6,
				},
			],
		}
	}
	if (drawer === 'dados-profissionais') {
		return {
			title: 'Dados profissionais',
			fields: [
				{ label: 'Empresa', value: PERFIL_CAMPOS.empresa, required: true },
				{
					label: 'Cargo',
					value: PERFIL_CAMPOS.cargo,
					type: 'select',
					options: OPCOES_CARGO,
					placeholder: 'Selecione seu cargo',
					required: true,
				},
				{
					label: 'Setor',
					value: PERFIL_CAMPOS.setor,
					type: 'select',
					options: OPCOES_SETOR,
					placeholder: 'Selecione o setor principal',
					required: true,
				},
			],
		}
	}
	return {
		title: 'Dados Demográficos',
		fields: [
			{ label: 'CPF / CNPJ', value: PERFIL_CAMPOS.cpf, placeholder: '000.000.000-00' },
			{
				label: 'CEP',
				value: PERFIL_CAMPOS.cep,
				placeholder: '00000-000',
				help: 'Preenche automaticamente país, estado, cidade e endereço.',
			},
			{
				label: 'País',
				value: PERFIL_CAMPOS.pais,
				type: 'select',
				options: OPCOES_PAIS,
			},
			{ label: 'Estado', value: PERFIL_CAMPOS.estado, placeholder: 'UF' },
			{ label: 'Cidade', value: PERFIL_CAMPOS.cidade },
			{ label: 'Endereço', value: PERFIL_CAMPOS.endereco, colSpan: 9 },
			{ label: 'Número', value: PERFIL_CAMPOS.numero, colSpan: 3, placeholder: 'Nº' },
			{
				label: 'Complemento',
				value: PERFIL_CAMPOS.complemento,
				placeholder: 'Apto, sala, bloco...',
			},
		],
	}
}
