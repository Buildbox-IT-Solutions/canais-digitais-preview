import { useSearchParams } from 'react-router'
import { twMerge } from 'tailwind-merge'
import { Button } from '~/components/button'
import { ComingSoon } from '~/components/coming-soon'
import {
	DashboardHeader,
	type DashboardSectionId,
} from '~/components/dashboard-header'
import { FormField } from '~/components/form-field'
import { FormSelect } from '~/components/form-select'
import { Icon } from '~/components/icon'
import { SessionRow } from '~/components/session-row'

type Section = DashboardSectionId
type PerfilTab = 'basico' | 'prof' | 'fiscal' | 'demo'

const SECTIONS: Section[] = [
	'visao',
	'biblio',
	'favoritos',
	'arquivos',
	'newsletters',
	'perfil',
	'conta',
]
const PERFIL_TABS: PerfilTab[] = ['basico', 'prof', 'fiscal', 'demo']

const USER_NAME = 'Ana Souza'
const USER_EMAIL = 'ana.souza@informa.com'
const USER_INITIALS = 'AS'

const CAMPOS = {
	nome: USER_NAME,
	email: USER_EMAIL,
	telefone: '+55 (11) 98765-4321',
	senha: '********',
	empresa: 'Informa Markets Brasil',
	cargo: 'Gerente',
	setor: 'Varejo & E-commerce',
	foto: '',
	cpf: '',
	pais: 'Brasil',
	estado: '',
	cidade: '',
	nascimento: '',
	genero: '',
}

const TOTAL_FIELDS = Object.keys(CAMPOS).length
const FILLED = Object.values(CAMPOS).filter((v) => v !== '').length
const PCT = Math.round((FILLED / TOTAL_FIELDS) * 100)

/**
 * Tela: Dashboard (Área logada) — v2.0
 * Hub com 7 sub-seções via ?section=: visao | biblio | favoritos | arquivos |
 * newsletters | perfil | conta
 */
export default function DashboardScreen() {
	const [params] = useSearchParams()
	const sectionParam = params.get('section') ?? 'visao'
	const section = (SECTIONS.includes(sectionParam as Section)
		? sectionParam
		: 'visao') as Section

	return (
		<main className="min-h-screen bg-neutral-50/40 flex flex-col">
			<DashboardHeader
				activeSection={section}
				headerProps={{
					userLoggedIn: true,
					userName: USER_NAME,
					userEmail: USER_EMAIL,
					userInitials: USER_INITIALS,
				}}
				sections={[
					{ id: 'visao', label: 'Visão geral', icon: 'dashboard', href: '?section=visao' },
					{ id: 'biblio', label: 'Biblioteca', icon: 'book', href: '?section=biblio' },
					{ id: 'favoritos', label: 'Favoritos', icon: 'bookmark', href: '?section=favoritos' },
					{ id: 'arquivos', label: 'Arquivos', icon: 'folder', href: '?section=arquivos' },
					{ id: 'newsletters', label: 'Newsletters', icon: 'mail', href: '?section=newsletters' },
					{ id: 'perfil', label: 'Perfil', icon: 'account-circle', href: '?section=perfil' },
					{ id: 'conta', label: 'Conta', icon: 'settings', href: '?section=conta' },
				]}
			/>

			{section === 'visao' ? <VisaoSection /> : null}
			{section === 'biblio' ? <BiblioSection /> : null}
			{section === 'favoritos' ? <FavoritosSection /> : null}
			{section === 'arquivos' ? <ArquivosSection /> : null}
			{section === 'newsletters' ? <NewslettersSection /> : null}
			{section === 'perfil' ? <PerfilSection /> : null}
			{section === 'conta' ? <ContaSection /> : null}
		</main>
	)
}

function VisaoSection() {
	const firstName = USER_NAME.split(' ')[0]
	const dataHoje = formatToday()

	return (
		<div className="max-w-screen-xl mx-auto w-full px-4 lg:px-6 pt-10 pb-12 flex flex-col">
			<div className="mb-6">
				<div className="font-body font-semibold text-label-md uppercase tracking-wider text-neutral-500 mb-2">
					{dataHoje}
				</div>
				<h1 className="font-display font-bold text-headline-lg leading-tight tracking-tight text-primary-600">
					Bom dia, {firstName}
					<span className="text-coral">.</span>
				</h1>
			</div>

			{PCT < 100 ? (
				<div className="flex items-center gap-4 p-4 rounded-lg bg-neutral-50 border border-neutral-100 mb-10">
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-3 mb-2">
							<span className="font-body font-bold text-title-sm text-primary-600">
								Perfil {PCT}% completo
							</span>
							<span className="font-body text-body-sm text-neutral-700">
								Faltam {TOTAL_FIELDS - FILLED} campos
							</span>
						</div>
						<div className="h-[3px] rounded-full bg-neutral-200 overflow-hidden max-w-md">
							<div className="h-full rounded-full bg-coral" style={{ width: `${PCT}%` }} />
						</div>
					</div>
					<a
						href="?section=perfil"
						className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full border-[1.5px] border-primary-600 text-primary-600 hover:bg-white font-body font-bold text-label-lg transition-colors shrink-0"
					>
						Completar
						<Icon name="arrow-forward" className="size-4" />
					</a>
				</div>
			) : (
				<div className="mb-10" />
			)}

			<div>
				<div className="flex items-baseline justify-between mb-5">
					<h3 className="font-display font-bold text-title-xl text-primary-600">
						Leituras em andamento
					</h3>
					<a
						href="?section=favoritos"
						className="font-body font-bold text-label-lg uppercase tracking-wider text-primary-600 hover:underline"
					>
						Ver tudo
					</a>
				</div>
				<div className="flex flex-col divide-y divide-neutral-100">
					{READINGS.map((a, i) => (
						<a
							key={i}
							href="/conteudo"
							className="flex items-center gap-4 py-4 hover:bg-neutral-50/50 transition-colors group"
						>
							<div className="flex-1 min-w-0">
								<div className="font-display font-bold text-title-md leading-tight text-primary-600 line-clamp-1 group-hover:text-secondary-950 transition-colors">
									{a.title}
								</div>
								<div className="flex items-center gap-3 mt-2">
									<span
										className={twMerge(
											'inline-flex items-center rounded-xs text-white px-2 py-0.5 font-body font-bold text-label-sm uppercase tracking-wider',
											a.chipBg,
										)}
									>
										{a.chip}
									</span>
									<div className="flex items-center gap-2 flex-1 max-w-[200px]">
										<div className="flex-1 h-[3px] rounded-full bg-neutral-100 overflow-hidden">
											<div
												className="h-full rounded-full bg-coral"
												style={{ width: `${a.p}%` }}
											/>
										</div>
										<span className="font-body font-semibold text-label-sm text-neutral-500">
											{a.p}%
										</span>
									</div>
									<span className="font-body text-body-sm text-neutral-500">{a.when}</span>
								</div>
							</div>
							<Icon
								name="chevron-right"
								className="size-4 text-neutral-300 group-hover:text-primary-600 transition-colors shrink-0"
							/>
						</a>
					))}
				</div>
			</div>
		</div>
	)
}

const READINGS = [
	{
		title:
			'A nova lógica do varejo: como grandes redes brasileiras estão redesenhando a jornada física',
		p: 68,
		chip: 'Varejo',
		chipBg: 'bg-mint',
		when: '4 min restantes',
	},
	{
		title: 'ESG no B2B: o que os compradores realmente cobram agora',
		p: 32,
		chip: 'ESG',
		chipBg: 'bg-secondary-500',
		when: 'Parou há 3 dias',
	},
	{
		title: 'Indústria brasileira registra maior alta mensal desde 2022',
		p: 18,
		chip: 'Indústria',
		chipBg: 'bg-primary-600',
		when: 'Parou há 1 semana',
	},
]

function BiblioSection() {
	return (
		<div className="max-w-screen-xl mx-auto w-full px-4 lg:px-6 py-16">
			<ComingSoon
				chip="Biblioteca premium"
				icon="book"
				title="Biblioteca em breve"
				description="Estamos finalizando a curadoria de whitepapers, e-books e relatórios da Informa Markets. Avisaremos por e-mail quando abrirmos o acesso para você."
				ctaLabel="Avisar quando lançar"
			/>
		</div>
	)
}

function FavoritosSection() {
	return (
		<div className="max-w-screen-xl mx-auto w-full px-4 lg:px-6 py-16">
			<ComingSoon
				chip="Favoritos"
				icon="bookmark"
				title="Favoritos em breve"
				description="Em breve você poderá salvar matérias para ler depois, organizadas em coleções e sincronizadas em todos os dispositivos."
				ctaLabel="Avisar quando lançar"
			/>
		</div>
	)
}

const FILES = [
	{
		title: 'Automação industrial: um guia para decisores',
		tipo: 'E-book',
		chipBg: 'bg-primary-600',
		size: '8.7 MB',
		date: '18/04/2026',
	},
	{
		title: 'Embalagens inteligentes e o novo consumidor',
		tipo: 'Whitepaper',
		chipBg: 'bg-coral',
		size: '3.4 MB',
		date: '02/04/2026',
	},
]

function ArquivosSection() {
	return (
		<div className="max-w-screen-xl mx-auto w-full px-4 lg:px-6 pt-10 pb-12">
			<div className="mb-8">
				<h2 className="font-display font-bold text-headline-lg text-primary-600 tracking-tight">
					Seus downloads<span className="text-coral">.</span>
				</h2>
				<p className="font-body text-body-lg text-neutral-700 mt-2">2 materiais baixados.</p>
			</div>

			<div className="bg-white rounded-xl shadow-lg overflow-hidden">
				<div
					className="grid gap-4 px-6 py-4 border-b border-neutral-50 font-body font-bold text-label-md uppercase tracking-wider text-neutral-500"
					style={{ gridTemplateColumns: '1fr 140px 120px 140px 60px' }}
				>
					<span>Nome</span>
					<span>Tipo</span>
					<span>Tamanho</span>
					<span>Baixado em</span>
					<span />
				</div>
				{FILES.map((f, i) => (
					<div
						key={i}
						className={twMerge(
							'grid gap-4 px-6 py-5 items-center',
							i === 0 && 'border-b border-neutral-50',
						)}
						style={{ gridTemplateColumns: '1fr 140px 120px 140px 60px' }}
					>
						<div className="flex items-center gap-3.5 min-w-0">
							<div className="size-11 rounded-sm bg-neutral-50 inline-flex items-center justify-center text-primary-600 shrink-0">
								<Icon name="description" className="size-6" />
							</div>
							<span className="font-display font-bold text-title-md text-primary-600 truncate">
								{f.title}
							</span>
						</div>
						<span
							className={twMerge(
								'inline-flex w-fit items-center rounded-xs text-white px-2 py-1 font-body font-bold text-label-sm uppercase tracking-wider',
								f.chipBg,
							)}
						>
							{f.tipo}
						</span>
						<span className="font-body text-body-md text-neutral-900">{f.size}</span>
						<span className="font-body text-body-md text-neutral-900">{f.date}</span>
						<button
							type="button"
							className="inline-flex items-center justify-center size-10 rounded-full text-primary-600 hover:bg-neutral-50 transition-colors"
							aria-label="Baixar novamente"
						>
							<Icon name="download" className="size-5" />
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

const NEWSLETTERS = [
	{ id: 'capa', title: 'Manchete do dia', desc: 'As três notícias que definem a pauta, todo dia 7h.', freq: 'Diária', on: true },
	{ id: 'varejo', title: 'Varejo & Consumo', desc: 'Grandes redes, omnichannel, comportamento de compra.', freq: 'Semanal', on: true },
	{ id: 'industria', title: 'Indústria & Manufatura', desc: 'Automação, cadeias, indicadores industriais.', freq: 'Semanal', on: false },
	{ id: 'esg', title: 'ESG no B2B', desc: 'Métricas, regulação e o que os compradores cobram.', freq: 'Quinzenal', on: true },
	{ id: 'feiras', title: 'Agenda de feiras', desc: 'Cosmoprof, Fispal, Hospitalar, Feimec, FESPA — datas e destaques.', freq: 'Mensal', on: false },
	{ id: 'patroc', title: 'Leituras patrocinadas', desc: 'Conteúdo selecionado de parceiros e anunciantes.', freq: 'Opcional', on: false },
]

function NewslettersSection() {
	return (
		<div className="max-w-screen-xl mx-auto w-full px-4 lg:px-6 pt-10 pb-12">
			<div className="mb-8">
				<h2 className="font-display font-bold text-headline-lg text-primary-600 tracking-tight">
					Suas newsletters<span className="text-coral">.</span>
				</h2>
				<p className="font-body text-body-lg text-neutral-700 mt-2 max-w-2xl">
					Ative os setores que te interessam. Opt-in separado das notificações da conta.
				</p>
			</div>

			<div className="bg-white rounded-xl shadow-lg overflow-hidden">
				{NEWSLETTERS.map((n, i) => (
					<label
						key={n.id}
						className={twMerge(
							'flex items-center gap-5 px-6 py-4 cursor-pointer group',
							i < NEWSLETTERS.length - 1 && 'border-b border-neutral-50',
						)}
					>
						<input
							type="checkbox"
							defaultChecked={n.on}
							className="absolute opacity-0 pointer-events-none"
						/>
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2.5 mb-1">
								<h4 className="font-display font-bold text-title-md text-primary-600">
									{n.title}
								</h4>
								<span className="inline-block rounded-xs bg-neutral-50 text-neutral-700 px-2 py-0.5 font-body font-bold text-label-sm uppercase tracking-wider">
									{n.freq}
								</span>
							</div>
							<p className="font-body text-body-sm text-neutral-700">{n.desc}</p>
						</div>
						<span className="relative inline-block w-11 h-6 rounded-full shrink-0 transition-colors bg-neutral-100 group-has-[:checked]:bg-primary-600">
							<span className="absolute top-[3px] left-[3px] size-[18px] rounded-full bg-white shadow-md transition-[left] group-has-[:checked]:left-[23px]" />
						</span>
					</label>
				))}
			</div>
		</div>
	)
}

function PerfilSection() {
	const [params] = useSearchParams()
	const tabParam = params.get('tab') ?? 'basico'
	const tab = (PERFIL_TABS.includes(tabParam as PerfilTab) ? tabParam : 'basico') as PerfilTab

	const tabs = [
		{ id: 'basico' as const, label: 'Identidade básica', fields: 4, filled: 4 },
		{ id: 'prof' as const, label: 'Perfil profissional', fields: 4, filled: 3 },
		{ id: 'fiscal' as const, label: 'Dados fiscais', fields: 4, filled: 1 },
		{ id: 'demo' as const, label: 'Demográfico', fields: 2, filled: 0 },
	]

	return (
		<div className="max-w-screen-xl mx-auto w-full px-4 lg:px-6 pt-10 pb-12">
			<div className="mb-8">
				<h2 className="font-display font-bold text-headline-lg text-primary-600 tracking-tight">
					Meu perfil<span className="text-coral">.</span>
				</h2>
				<p className="font-body text-body-lg text-neutral-700 mt-2">
					{PCT}% completo — {TOTAL_FIELDS - FILLED} campos restantes.
				</p>
			</div>

			<div className="grid gap-10" style={{ gridTemplateColumns: '220px 1fr' }}>
				<nav className="flex flex-col gap-0.5 sticky top-16 self-start">
					{tabs.map((t) => {
						const on = tab === t.id
						const done = t.filled === t.fields
						return (
							<a
								key={t.id}
								href={`?section=perfil&tab=${t.id}`}
								className={twMerge(
									'flex items-center justify-between px-3 py-2.5 rounded-sm transition-colors',
									on ? 'bg-neutral-50 font-bold' : 'hover:bg-neutral-50/60 font-semibold',
								)}
							>
								<span className="font-body text-title-sm text-primary-600">{t.label}</span>
								{done ? (
									<Icon name="check" className="size-4 text-mint shrink-0" />
								) : (
									<span className="font-body text-label-sm text-neutral-500">
										{t.filled}/{t.fields}
									</span>
								)}
							</a>
						)
					})}
				</nav>

				<div>
					{tab === 'basico' ? <PerfilBasico /> : null}
					{tab === 'prof' ? <PerfilProfissional /> : null}
					{tab === 'fiscal' ? <PerfilFiscal /> : null}
					{tab === 'demo' ? <PerfilDemo /> : null}

					<div className="flex items-center justify-end gap-2.5 mt-7 pt-5 border-t border-neutral-100">
						<Button label="Cancelar" href="?section=visao" type="ghost" size="medium" />
						<Button label="Salvar alterações" href="#" type="filled" size="medium" icon="arrow-right" />
					</div>
				</div>
			</div>
		</div>
	)
}

function PerfilBasico() {
	return (
		<>
			<h3 className="font-display font-bold text-title-xl text-primary-600 mb-2">
				Identidade básica
			</h3>
			<p className="font-body text-body-md text-neutral-700 mb-8">
				Dados para identificação e comunicações essenciais.
			</p>
			<div className="grid grid-cols-2 gap-5">
				<div className="col-span-2">
					<FormField label="Nome completo" placeholder={CAMPOS.nome} required />
				</div>
				<FormField label="E-mail" type="email" placeholder={CAMPOS.email} required />
				<FormField label="Telefone" type="tel" placeholder={CAMPOS.telefone} required />
				<div className="col-span-2">
					<FormField label="Senha" placeholder="••••••••" required />
					<p className="mt-1.5 px-1 font-body text-label-md text-neutral-500">
						Mín. 8 caracteres com letras e números.
					</p>
				</div>
			</div>
		</>
	)
}

function PerfilProfissional() {
	return (
		<>
			<h3 className="font-display font-bold text-title-xl text-primary-600 mb-2">
				Perfil profissional
			</h3>
			<p className="font-body text-body-md text-neutral-700 mb-8">
				Usado para recomendar feiras, matérias e materiais do seu setor.
			</p>
			<div className="grid grid-cols-2 gap-5">
				<FormField label="Empresa" placeholder={CAMPOS.empresa} required />
				<FormSelect label="Cargo" value={CAMPOS.cargo} required />
				<div className="col-span-2">
					<FormSelect label="Setor" value={CAMPOS.setor} required />
				</div>

				<div className="col-span-2">
					<div className="flex gap-0.5 items-center pb-1 px-1">
						<span className="font-body font-semibold text-label-lg text-neutral-950">
							Foto de perfil
						</span>
						<span className="font-body text-label-md text-neutral-500 pl-1">opcional</span>
					</div>
					<div className="flex items-center gap-4 p-4 rounded-sm border-[1.5px] border-dashed border-neutral-100 bg-neutral-50/50">
						<span className="inline-flex items-center justify-center size-14 rounded-full bg-primary-600 font-display font-bold text-title-lg text-white shrink-0">
							{USER_INITIALS}
						</span>
						<div className="flex-1 min-w-0">
							<div className="font-body font-semibold text-title-sm text-primary-600">
								Arraste uma imagem ou{' '}
								<a href="#" className="text-secondary-950 underline">
									procure no seu computador
								</a>
							</div>
							<div className="font-body text-label-md text-neutral-500 mt-1">
								JPG ou PNG, até 2 MB.
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

function PerfilFiscal() {
	return (
		<>
			<h3 className="font-display font-bold text-title-xl text-primary-600 mb-2">
				Dados fiscais
			</h3>
			<p className="font-body text-body-md text-neutral-700 mb-8">
				Necessários para download de certificados e emissão de NFs.
			</p>
			<div className="grid grid-cols-2 gap-5">
				<FormField label="CPF / CNPJ" placeholder="000.000.000-00" />
				<FormSelect label="País" value={CAMPOS.pais} />
				<FormSelect label="Estado" value={CAMPOS.estado} />
				<FormField label="Cidade" />
			</div>
		</>
	)
}

function PerfilDemo() {
	return (
		<>
			<h3 className="font-display font-bold text-title-xl text-primary-600 mb-2">
				Dados demográficos
			</h3>
			<p className="font-body text-body-md text-neutral-700 mb-8">
				Opcional. Usado apenas para estatísticas agregadas.
			</p>
			<div className="grid grid-cols-2 gap-5">
				<FormField label="Data de nascimento" placeholder="DD/MM/AAAA" />
				<FormSelect label="Gênero" value={CAMPOS.genero} />
			</div>
		</>
	)
}

const SESSIONS_DASH = [
	{ device: 'MacBook Pro 14"', browser: 'Chrome 128', location: 'São Paulo, BR', last: 'Agora mesmo', current: true },
	{ device: 'iPhone 15', browser: 'Safari Mobile', location: 'São Paulo, BR', last: 'há 2 horas', current: false },
	{ device: 'Windows 11', browser: 'Edge 127', location: 'Rio de Janeiro, BR', last: 'há 3 dias', current: false },
]

function ContaSection() {
	return (
		<div className="max-w-screen-xl mx-auto w-full px-4 lg:px-6 pt-10 pb-12 flex flex-col">
			<div className="mb-8">
				<h2 className="font-display font-bold text-headline-lg text-primary-600 tracking-tight">
					Conta &amp; segurança<span className="text-coral">.</span>
				</h2>
			</div>

			<section className="bg-white rounded-xl shadow-lg p-7">
				<h3 className="font-display font-bold text-title-xl text-primary-600 mb-5">
					Método de acesso
				</h3>
				<div
					className="grid gap-3.5"
					style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
				>
					{ACCESS_METHODS.map((m) => (
						<div key={m.label} className="border border-neutral-50 rounded-sm p-4">
							<div className="flex items-center gap-3 mb-2.5">
								<Icon name={m.icon} className="size-5 text-primary-600" />
								<span className="font-body font-bold text-title-sm text-primary-600">
									{m.label}
								</span>
							</div>
							<div className="font-body text-body-md text-neutral-900 mb-3 min-h-[20px]">
								{m.value}
							</div>
							<a
								href="#"
								className={twMerge(
									'font-body font-bold text-label-lg uppercase tracking-wider hover:underline',
									m.color,
								)}
							>
								{m.status}
							</a>
						</div>
					))}
				</div>
				<div className="flex gap-2.5 mt-5">
					<Button
						label="Alterar senha"
						href="/redefine-senha"
						type="outlined"
						size="medium"
					/>
					<Button
						label="Ativar verificação em 2 etapas"
						href="#"
						type="outlined"
						size="medium"
					/>
				</div>
			</section>

			<section className="bg-white rounded-xl shadow-lg p-7 mt-6">
				<div className="flex items-center justify-between mb-4">
					<h3 className="font-display font-bold text-title-xl text-primary-600">
						Sessões ativas
					</h3>
					<a
						href="#"
						className="inline-flex items-center gap-1.5 font-body font-bold text-label-lg uppercase tracking-wider text-coral hover:underline"
					>
						<Icon name="logout" className="size-4" />
						Encerrar todas as outras
					</a>
				</div>
				{SESSIONS_DASH.map((s, i) => (
					<SessionRow
						key={i}
						device={s.device}
						browser={s.browser}
						location={s.location}
						last={s.last}
						current={s.current}
						isLast={i === SESSIONS_DASH.length - 1}
					/>
				))}
			</section>

			<section className="mt-10 pt-8 border-t border-neutral-100">
				<h3 className="font-display font-bold text-title-xl text-primary-600 mb-2">
					Privacidade &amp; LGPD
				</h3>
				<p className="font-body text-body-md text-neutral-700 mb-4">
					Controle total sobre seus dados. Todas as alterações são registradas.
				</p>
				<div className="flex flex-col gap-2">
					{LGPD_LINKS.map((a) => (
						<a
							key={a.label}
							href={a.href}
							className="flex items-center gap-3.5 p-3.5 rounded-sm hover:bg-neutral-50/60 transition-colors"
						>
							<Icon
								name={a.icon}
								className={`size-5 ${a.danger ? 'text-coral' : 'text-primary-600'}`}
							/>
							<div className="flex-1 min-w-0">
								<div
									className={`font-body font-bold text-title-sm ${a.danger ? 'text-coral' : 'text-primary-600'}`}
								>
									{a.label}
								</div>
								<div className="font-body text-body-sm text-neutral-700 mt-0.5">{a.desc}</div>
							</div>
							<Icon name="chevron-right" className="size-4 text-neutral-400" />
						</a>
					))}
				</div>
			</section>
		</div>
	)
}

const ACCESS_METHODS: Array<{
	icon: 'mail' | 'linkedin' | 'google-mono'
	label: string
	value: string
	status: string
	color: string
}> = [
	{
		icon: 'mail',
		label: 'E-mail e senha',
		value: USER_EMAIL,
		status: 'Ativo',
		color: 'text-mint',
	},
	{
		icon: 'linkedin',
		label: 'LinkedIn',
		value: 'Não conectado',
		status: 'Conectar',
		color: 'text-secondary-950',
	},
	{
		icon: 'google-mono',
		label: 'Google',
		value: 'Não conectado',
		status: 'Conectar',
		color: 'text-secondary-950',
	},
]

const LGPD_LINKS: Array<{
	icon: 'download' | 'history' | 'delete'
	label: string
	desc: string
	danger: boolean
	href: string
}> = [
	{
		icon: 'download',
		label: 'Baixar meus dados',
		desc: 'Receba em até 15 dias um arquivo com tudo que coletamos.',
		danger: false,
		href: '/meus-dados',
	},
	{
		icon: 'history',
		label: 'Histórico de consentimentos',
		desc: 'Veja quando aceitou Termos, Privacidade e Opt-ins.',
		danger: false,
		href: '/consentimentos',
	},
	{
		icon: 'delete',
		label: 'Excluir minha conta',
		desc: 'Direito ao esquecimento. Processamos em até 30 dias.',
		danger: true,
		href: '/excluir-conta',
	},
]

function formatToday(): string {
	const diasSemana = [
		'Domingo',
		'Segunda-feira',
		'Terça-feira',
		'Quarta-feira',
		'Quinta-feira',
		'Sexta-feira',
		'Sábado',
	]
	const meses = [
		'janeiro',
		'fevereiro',
		'março',
		'abril',
		'maio',
		'junho',
		'julho',
		'agosto',
		'setembro',
		'outubro',
		'novembro',
		'dezembro',
	]
	const d = new Date()
	return `${diasSemana[d.getDay()]}, ${d.getDate()} de ${meses[d.getMonth()]}`
}
