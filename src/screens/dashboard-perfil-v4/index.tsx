import { useSearchParams } from 'react-router'
import { useMediaQuery } from '~/lib/use-media-query'
import { DashboardTabsV4 } from '~/components/dashboard-tabs-v4'
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
import { StatusRing } from '~/components/status-ring'
import { Toast } from '~/components/toast'
import {
	DOWNLOADS,
	NEWSLETTERS,
	OPCOES_CARGO,
	OPCOES_GENERO,
	OPCOES_PAIS,
	OPCOES_SETOR,
	PERFIL_CAMPOS,
	PERFIL_CAMPOS_COMPLETO,
	type PerfilCampos,
	RECENT_NEWS,
} from '~/mocks/dashboard-perfil'

type Tab = 'perfil' | 'ultimas' | 'newsletter' | 'downloads'
type Drawer = 'dados-pessoais' | 'dados-profissionais' | 'dados-fiscais'

const TABS: Tab[] = ['perfil', 'ultimas', 'newsletter', 'downloads']
const DRAWERS: Drawer[] = ['dados-pessoais', 'dados-profissionais', 'dados-fiscais']

const BASE_HREF = '/dashboard-perfil-v4'

const USER_NAME = 'Mariana Albuquerque'
const USER_EMAIL = 'mariana.albuquerque@empresa.com.br'
const USER_INITIALS = 'MA'

const PER_PAGE = 10

/**
 * Tela: Dashboard de Perfil v4 — modelo tabbed (deriva de dashboard-perfil-v3)
 * Abas MVP: Meu Perfil (padrão) + Downloads; Últimas leituras / Favoritos / Newsletter como "Em breve".
 * "Minha Conta" removida: Baixar dados + Excluir conta vivem na aba Perfil (seção LGPD);
 * Alterar senha no DashboardWelcome. Sessões e login social saíram (fora de escopo do MVP).
 * Drawer overlay em perfil: ?drawer=dados-pessoais|dados-profissionais|dados-fiscais
 * Estados: ?state=saved (toast) | empty (novo usuário) | completo (perfil 100%).
 * Switcher de cenários (ScenarioNav) fixo no rodapé para o cliente navegar sem editar URL.
 */
export default function DashboardPerfilV4Screen() {
	const [params] = useSearchParams()

	const tabParam = params.get('tab') ?? 'perfil'
	const tab = (TABS.includes(tabParam as Tab) ? tabParam : 'perfil') as Tab

	const drawerParam = params.get('drawer')
	const drawer = (DRAWERS.includes(drawerParam as Drawer) && tab === 'perfil'
		? drawerParam
		: null) as Drawer | null

	const state = params.get('state')
	const isSaved = state === 'saved'
	const isEmpty = state === 'empty'
	const isCompleto = state === 'completo'

	// "Engajado" (?state=completo): perfil todo preenchido; a tela suprime o andaime
	// de completude (banner de progresso, badges e infos de % restantes).
	const campos = isCompleto ? PERFIL_CAMPOS_COMPLETO : PERFIL_CAMPOS
	const totalFields = Object.keys(campos).length
	const filledFields = Object.values(campos).filter((v) => v !== '').length
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
				<DashboardTabsV4 active={tab} baseHref={BASE_HREF} />
			</div>

			<div className="flex-1 max-w-screen-xl mx-auto w-full px-4 lg:px-6 py-10">
				{tab === 'perfil' ? (
					<PerfilPane pct={pct} missing={missing} complete={isCompleto} campos={campos} />
				) : null}
				{tab === 'ultimas' ? <UltimasPane isEmpty={isEmpty} /> : null}
				{tab === 'newsletter' ? <NewsletterPane /> : null}
				{tab === 'downloads' ? <DownloadsPane isEmpty={isEmpty} /> : null}
			</div>

			<FooterDesktop />

			{drawer ? <PerfilDrawer drawer={drawer} /> : null}

			{isSaved ? (
				<div className="fixed bottom-24 right-6 z-50">
					<Toast type="success" message="Alterações salvas." />
				</div>
			) : null}
			<ScenarioNav tab={tab} state={state} />
		</main>
	)
}

/**
 * Switcher de cenários (estilo "tweaks"/dev-nav) fixo no rodapé — cada botão leva
 * à aba + estado do cenário, para o cliente demonstrar sem digitar URL.
 */
function ScenarioNav({ tab, state }: { tab: Tab; state: string | null }) {
	const items = [
		{
			label: 'Perfil incompleto',
			href: `${BASE_HREF}?tab=perfil`,
			active: tab === 'perfil' && state !== 'completo',
		},
		{
			label: 'Perfil completo',
			href: `${BASE_HREF}?tab=perfil&state=completo`,
			active: tab === 'perfil' && state === 'completo',
		},
		{
			label: 'Download vazio',
			href: `${BASE_HREF}?tab=downloads&state=empty`,
			active: tab === 'downloads' && state === 'empty',
		},
	]
	return (
		<div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap gap-1.5 justify-center max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-sm border border-neutral-100 rounded-full px-3 py-1.5 shadow-md z-50 font-body text-label-md">
			<span className="text-neutral-500 self-center pr-1">Cenários:</span>
			{items.map((it) => (
				<a
					key={it.label}
					href={it.href}
					className={`px-2.5 py-1 rounded-full transition-colors ${
						it.active ? 'bg-primary-600 text-white' : 'text-neutral-700 hover:bg-neutral-50'
					}`}
				>
					{it.label}
				</a>
			))}
		</div>
	)
}

function ProfileMetrics({ pct, missing }: { pct: number; missing: number }) {
	const R = 60
	const CIRC = 2 * Math.PI * R
	const arc = (pct / 100) * CIRC

	return (
		<div className="bg-mint-light rounded-lg p-6 lg:pl-8 lg:pr-12 lg:py-8 flex flex-col items-center text-center gap-6 lg:flex-row lg:items-center lg:text-left lg:gap-8">
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
			<div className="flex-1 min-w-0 flex flex-col items-center lg:items-start gap-4">
				<h2 className="font-display font-bold text-headline-sm text-primary-600 leading-tight">
					Receba conteúdos mais relevantes para você
				</h2>
				<p className="font-body text-body-md text-primary-600">
					<strong className="font-bold">Faltam {missing} campos para chegar a 100%</strong>. Cada
					informação afina o que chega até você em conteúdos, newsletters e eventos.
				</p>
				<a
					href="?tab=perfil&drawer=dados-pessoais"
					className="inline-flex items-center gap-2 h-8 pl-4 pr-3 rounded-full bg-primary-600 text-white hover:bg-secondary-950 transition-colors font-body font-bold text-body-md w-fit"
				>
					Completar perfil
					<Icon name="arrow-forward" className="size-5" />
				</a>
			</div>
		</div>
	)
}

function UltimasPane({ isEmpty }: { isEmpty: boolean }) {
	return (
		<section className="flex flex-col gap-6">
			<header className="flex flex-col gap-1">
				<h2 className="font-display font-bold text-title-xl text-primary-600">Últimas leituras</h2>
				<p className="font-body text-body-md text-neutral-600">
					Os artigos que você abriu aparecem aqui automaticamente.
				</p>
			</header>

			{isEmpty ? (
				<div className="flex flex-col items-center text-center gap-4 py-12">
					<StatusRing accent="primary" icon="book" size="sm" />
					<h3 className="font-display font-bold text-title-xl text-primary-600">
						Você ainda não leu nenhum artigo
					</h3>
					<p className="font-body text-body-md text-neutral-700 max-w-md">
						Explore o portal e comece agora. Seus artigos lidos aparecem aqui automaticamente.
					</p>
					<a
						href="/home"
						className="mt-2 inline-flex items-center gap-2 h-10 pl-5 pr-4 rounded-full border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 font-body font-bold text-body-md transition-colors"
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
	)
}

function PerfilPane({
	pct,
	missing,
	complete,
	campos,
}: {
	pct: number
	missing: number
	complete: boolean
	campos: PerfilCampos
}) {
	// No estado "completo" a box Demográficos mostra valores reais; caso contrário,
	// os rótulos-placeholder de campos a preencher.
	const demograficoFields = complete
		? [campos.cpf, `${campos.cidade}, ${campos.estado}`, campos.endereco]
		: ['CPF / CNPJ', 'Cidade, UF', 'Endereço']

	return (
		<div className="flex flex-col gap-10">
			{/* Banner de progresso: some no perfil completo (andaime de completude). */}
			{!complete ? <ProfileMetrics pct={pct} missing={missing} /> : null}

			<div className="flex flex-col gap-6">
				<header className="flex flex-col gap-1">
					<h2 className="font-display font-bold text-title-xl text-primary-600">Perfil</h2>
					{!complete ? (
						<p className="font-body text-body-md text-neutral-600">
							{pct}% completo — {missing} campos restantes.
						</p>
					) : null}
				</header>

				<div className="flex flex-col gap-2">
					<h3 className="font-display font-bold text-title-md text-primary-600">
						Foto de perfil{' '}
						<span className="font-body font-normal text-neutral-950">(Opcional)</span>
					</h3>
					<div className="bg-neutral-50/60 border-2 border-dashed border-neutral-100 rounded-lg p-4 lg:p-6 flex items-center gap-4">
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
						fields={[campos.nome, campos.email, campos.telefone]}
						href="?tab=perfil&drawer=dados-pessoais"
						cta="Atualizar"
						chip="Complete seu Perfil"
						incomplete={!complete}
					/>
					<ProfileBox
						icon="business-center"
						title="Dados profissionais"
						description="Define suas recomendações de conteúdo e newsletter"
						fields={[campos.empresa, campos.cargo, campos.setor]}
						href="?tab=perfil&drawer=dados-profissionais"
						cta="Atualizar"
					/>
					<ProfileBox
						icon="location"
						title="Dados Demográficos"
						description="Solicitado apenas quando você baixa materiais"
						fields={demograficoFields}
						href="?tab=perfil&drawer=dados-fiscais"
						cta={complete ? 'Atualizar' : 'Preencher'}
						incomplete={!complete}
						placeholder={!complete}
						chip="Preencha e personalize sua experiência"
					/>
				</div>
			</div>

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
						id={`nl-v4-${i}`}
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

function DownloadsPane({ isEmpty }: { isEmpty: boolean }) {
	const [params] = useSearchParams()
	const pageRaw = Number(params.get('page') ?? 1)
	const totalPages = Math.max(1, Math.ceil(DOWNLOADS.length / PER_PAGE))
	const page = Math.min(Math.max(1, pageRaw), totalPages)
	const offset = (page - 1) * PER_PAGE
	const slice = DOWNLOADS.slice(offset, offset + PER_PAGE)

	return (
		<div className="flex flex-col gap-6">
			<header className="flex flex-col gap-1">
				<h2 className="font-display font-bold text-title-xl text-primary-600">Meus downloads</h2>
				{!isEmpty ? (
					<p className="font-body text-body-md text-neutral-600">
						Baixe novamente qualquer material a qualquer momento.
					</p>
				) : null}
			</header>

			{isEmpty ? (
				<div className="flex flex-col items-center text-center gap-4 py-12">
					<StatusRing accent="primary" icon="folder" size="sm" />
					<h3 className="font-display font-bold text-title-xl text-primary-600">
						Você ainda não baixou nenhum material
					</h3>
					<p className="font-body text-body-md text-neutral-700 max-w-md">
						Baixe e-books, guias e relatórios do portal — eles ficam salvos aqui para você
						acessar quando quiser.
					</p>
					<a
						href="/home"
						className="mt-2 inline-flex items-center gap-2 h-10 pl-5 pr-4 rounded-full border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 font-body font-bold text-body-md transition-colors"
					>
						Explorar conteúdos
						<Icon name="arrow-forward" className="size-5" />
					</a>
				</div>
			) : (
				<>
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
								baseHref={`${BASE_HREF}?tab=downloads`}
							/>
						</div>
					) : null}
				</>
			)}
		</div>
	)
}

function PerfilDrawer({ drawer }: { drawer: Drawer }) {
	const cfg = buildDrawerConfig(drawer)
	// Abaixo de sm (640px) todo campo ocupa a largura toda; de sm pra cima os
	// pares (colSpan 6/6, 9/3) voltam lado a lado. O grid é inline-style, então
	// o clamp é por JS (Tailwind não alcança inline styles nem classe dinâmica).
	const isWide = useMediaQuery('(min-width: 640px)')

	return (
		<Drawer
			open
			title={cfg.title}
			closeHref={`${BASE_HREF}?tab=perfil`}
			cancelHref={`${BASE_HREF}?tab=perfil`}
			saveHref={`${BASE_HREF}?tab=perfil&state=saved`}
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
					<DrawerField key={i} field={f} isWide={isWide} />
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

function DrawerField({ field, isWide }: { field: DrawerFieldDef; isWide: boolean }) {
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
	const eff = isWide ? span : 12

	return (
		<div className="flex flex-col" style={{ gridColumn: `span ${eff} / span ${eff}`, minWidth: 0 }}>
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
						{placeholder ? <option value="">{placeholder}</option> : null}
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
			{help ? <p className="mt-1 px-1 font-body text-label-md text-neutral-700">{help}</p> : null}
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
