import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useMediaQuery } from '~/lib/use-media-query'
import { toast } from '~/lib/toast-store'
import { compartilharConteudo } from '~/lib/compartilhar-conteudo'
import { desfavoritar, favoritar, useFavorito, useFavoritos } from '~/lib/favoritos-store'
import { useScenarios } from '~/dev/use-scenarios'
import type { ScenarioDef } from '~/dev/scenario-store'
import { DashboardTabs } from '~/components/dashboard-tabs'
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
import { ReadListItem } from '~/components/read-list-item'
import type { ReadListItemMenuAction } from '~/components/read-list-item/read-list-item-menu'
import { ReadListItemSkeleton } from '~/components/read-list-item/read-list-item-skeleton'
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
} from '~/mocks/dashboard-perfil'
import type { FavoritoItem } from '~/mocks/favoritos'
import { READ_HISTORY, resolveReadHistory, type ReadHistoryItem } from '~/mocks/leituras'

type Tab = 'perfil' | 'ultimas' | 'newsletter' | 'downloads' | 'favoritos'
type Drawer = 'dados-pessoais' | 'dados-profissionais' | 'dados-fiscais'

const TABS: Tab[] = ['perfil', 'downloads', 'newsletter', 'ultimas', 'favoritos']
const DRAWERS: Drawer[] = ['dados-pessoais', 'dados-profissionais', 'dados-fiscais']

const BASE_HREF = '/dashboard-perfil-v4'

const USER_NAME = 'Mariana Albuquerque'
const USER_EMAIL = 'mariana.albuquerque@empresa.com.br'
const USER_INITIALS = 'MA'

const PER_PAGE = 10

// Registro único pra ScenarioBar (src/dev) — a única declaração dos cenários desta
// tela; a lógica de estado abaixo deriva dos mesmos ids, nunca duplica os literais.
const SCENARIOS: ScenarioDef[] = [
	{ id: 'perfil-incompleto', label: 'Incompleto', group: 'Perfil', tab: 'perfil', isDefault: true },
	{ id: 'perfil-completo', label: 'Completo', group: 'Perfil', tab: 'perfil' },
	{ id: 'downloads-padrao', label: 'Preenchido', group: 'Downloads', tab: 'downloads', isDefault: true },
	{ id: 'downloads-vazio', label: 'Vazio', group: 'Downloads', tab: 'downloads' },
	{ id: 'leituras-padrao', label: 'Preenchido', group: 'Leituras', tab: 'ultimas', isDefault: true },
	{ id: 'leituras-vazio', label: 'Vazio', group: 'Leituras', tab: 'ultimas' },
	{ id: 'leituras-carregando', label: 'Carregando', group: 'Leituras', tab: 'ultimas' },
	{ id: 'leituras-com-erro', label: 'Com erro', group: 'Leituras', tab: 'ultimas' },
	{ id: 'favoritos-padrao', label: 'Preenchido', group: 'Favoritos', tab: 'favoritos', isDefault: true },
	{ id: 'favoritos-vazio', label: 'Vazio', group: 'Favoritos', tab: 'favoritos' },
]

// TODO remover na próxima iteração — alias temporário pra links antigos com ?state=.
// `empty` era compartilhado entre Downloads e Últimas leituras, desambiguado só pelo
// ?tab= que acompanhava o link original.
function resolveLegacyState(state: string, tab: string | null): { cenario: string; tab: Tab } | null {
	if (state === 'completo') return { cenario: 'perfil-completo', tab: 'perfil' }
	if (state === 'saved') return { cenario: 'perfil-salvo', tab: 'perfil' }
	if (state === 'carregando') return { cenario: 'leituras-carregando', tab: 'ultimas' }
	if (state === 'erro') return { cenario: 'leituras-com-erro', tab: 'ultimas' }
	if (state === 'empty') {
		return tab === 'downloads'
			? { cenario: 'downloads-vazio', tab: 'downloads' }
			: { cenario: 'leituras-vazio', tab: 'ultimas' }
	}
	return null
}

/**
 * Tela: Dashboard de Perfil v4 — modelo tabbed (deriva de dashboard-perfil-v3)
 * Abas MVP: Meu Perfil (padrão) + Downloads + Newsletter + Últimas leituras; Favoritos como "Em breve".
 * "Minha Conta" removida: Baixar dados + Excluir conta vivem na aba Perfil (seção LGPD);
 * Alterar senha no DashboardWelcome. Sessões e login social saíram (fora de escopo do MVP).
 * Drawer overlay em perfil: ?drawer=dados-pessoais|dados-profissionais|dados-fiscais
 * Cenários (ver ScenarioBar): ?cenario=perfil-completo|downloads-vazio|leituras-vazio|
 * favoritos-vazio etc.
 */
export default function DashboardPerfilV4Screen() {
	const [params, setSearchParams] = useSearchParams()
	useScenarios(SCENARIOS)

	const cenarioParam = params.get('cenario')
	const legacyStateParam = params.get('state')
	const legacyResolved =
		!cenarioParam && legacyStateParam ? resolveLegacyState(legacyStateParam, params.get('tab')) : null

	const cenario = cenarioParam ?? legacyResolved?.cenario ?? null
	const activeScenario = SCENARIOS.find((s) => s.id === cenario) ?? null

	// ?tab= explícito sempre vence — o cenário só deriva a aba quando ?tab= está ausente
	// ou inválido. Isso cobre dois casos: link só com ?cenario= (dispensa ?tab= manual,
	// evita abrir a aba errada) e link editado à mão com os dois presentes (não perde a
	// aba pedida por causa do cenário).
	const explicitTabParam = params.get('tab')
	const tabParam =
		explicitTabParam && TABS.includes(explicitTabParam as Tab)
			? explicitTabParam
			: (activeScenario?.tab ?? legacyResolved?.tab ?? 'perfil')
	const tab = tabParam as Tab

	const drawerParam = params.get('drawer')
	const drawer = (DRAWERS.includes(drawerParam as Drawer) && tab === 'perfil'
		? drawerParam
		: null) as Drawer | null

	const isSaved = cenario === 'perfil-salvo'
	const isEmpty = cenario === 'downloads-vazio' || cenario === 'leituras-vazio'
	const isCompleto = cenario === 'perfil-completo'
	const isLoading = cenario === 'leituras-carregando'
	const isErro = cenario === 'leituras-com-erro'
	const favoritosForcedEmpty = cenario === 'favoritos-vazio'

	// Migra o link antigo assim que a tela monta: reescreve a URL pra ?cenario= (sem
	// empilhar no histórico) e avisa uma vez no console. Não bloqueia o primeiro
	// render — os booleans acima já usam `legacyResolved` de forma síncrona.
	useEffect(() => {
		if (cenarioParam || !legacyStateParam) return
		const resolved = resolveLegacyState(legacyStateParam, params.get('tab'))
		if (!resolved) return
		console.warn(
			`[dashboard-perfil-v4] ?state=${legacyStateParam} está obsoleto — use ?cenario=${resolved.cenario}.`,
		)
		const next = new URLSearchParams(params)
		next.delete('state')
		next.set('cenario', resolved.cenario)
		next.set('tab', resolved.tab)
		setSearchParams(next, { replace: true })
	}, [])

	// "Engajado" (?cenario=perfil-completo): perfil todo preenchido; a tela suprime o
	// andaime de completude (banner de progresso, badges e infos de % restantes).
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
				<DashboardTabs active={tab} baseHref={BASE_HREF} />
			</div>

			<div className="flex-1 max-w-screen-xl mx-auto w-full px-4 lg:px-6 py-10">
				{tab === 'perfil' ? (
					<PerfilPane pct={pct} missing={missing} complete={isCompleto} campos={campos} />
				) : null}
				{tab === 'ultimas' ? (
					<UltimasPane isEmpty={isEmpty} isLoading={isLoading} isErro={isErro} />
				) : null}
				{tab === 'newsletter' ? <NewsletterPane /> : null}
				{tab === 'downloads' ? <DownloadsPane isEmpty={isEmpty} /> : null}
				{tab === 'favoritos' ? <FavoritosPane forcedEmpty={favoritosForcedEmpty} /> : null}
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
					Complete seu perfil
				</h2>
				<p className="font-body text-body-md text-primary-600">
					<strong className="font-bold">Faltam {missing} campos para chegar a 100%</strong>. Mantenha
					seu cadastro atualizado para continuar recebendo conteúdos, newsletters e convites de
					eventos.
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

function UltimasPane({
	isEmpty,
	isLoading,
	isErro,
}: {
	isEmpty: boolean
	isLoading: boolean
	isErro: boolean
}) {
	const [params] = useSearchParams()
	const pageRaw = Number(params.get('page') ?? 1)

	// Filtro acontece aqui, antes da paginação: resolveReadHistory já descarta ids sem
	// artigo correspondente (despublicado/removido) — a contagem de páginas reflete só
	// o que sobra, nunca o histórico bruto.
	const resolved = resolveReadHistory(READ_HISTORY)
	const totalPages = Math.max(1, Math.ceil(resolved.length / PER_PAGE))
	const page = Math.min(Math.max(1, pageRaw), totalPages)
	const offset = (page - 1) * PER_PAGE
	const slice = resolved.slice(offset, offset + PER_PAGE)
	const isReallyEmpty = isEmpty || resolved.length === 0

	// Remoção otimista: só esconde localmente (sem refetch/reindexação da página) —
	// reconcilia sozinha ao trocar de página, já que aí a screen inteira remonta.
	const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set())
	const visibleSlice = slice.filter((item) => !hiddenIds.has(item.id))

	function handleRemove(id: string) {
		setHiddenIds((prev) => new Set(prev).add(id))
		toast.info('Removido de Últimas leituras.', {
			durationMs: 5000,
			action: {
				label: 'Desfazer',
				onClick: () => {
					setHiddenIds((prev) => {
						const next = new Set(prev)
						next.delete(id)
						return next
					})
				},
			},
		})
	}

	const headingRef = useRef<HTMLHeadingElement>(null)
	const listRef = useRef<HTMLDivElement>(null)

	// Troca de página: como a Pagination navega por <a href> (nova URL, não SPA), o
	// browser volta o scroll pro topo do documento por padrão — aqui devolvemos o
	// scroll pro topo da LISTA e o foco pro cabeçalho, pra não perder quem usa teclado.
	useEffect(() => {
		if (params.get('page') === null) return
		listRef.current?.scrollIntoView({ block: 'start' })
		headingRef.current?.focus()
	}, [])

	return (
		<section className="flex flex-col gap-6">
			<header className="flex flex-col gap-1">
				<h2
					ref={headingRef}
					tabIndex={-1}
					className="font-display font-bold text-title-xl text-primary-600 outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-secondary-950/35"
				>
					Últimas leituras
				</h2>
				<p className="font-body text-body-md text-neutral-600">
					Os artigos que você abriu aparecem aqui automaticamente.
				</p>
			</header>

			{isLoading ? (
				<ul className="flex flex-col">
					{Array.from({ length: 10 }, (_, i) => (
						<ReadListItemSkeleton key={i} isLast={i === 9} />
					))}
				</ul>
			) : isErro ? (
				<div className="flex flex-col items-center text-center gap-4 py-12">
					<p className="font-body text-body-md text-neutral-700 max-w-md">
						Não foi possível carregar suas últimas leituras.
					</p>
					<a
						href={`${BASE_HREF}?tab=ultimas`}
						className="inline-flex items-center gap-2 h-10 pl-5 pr-4 rounded-full border-[1.5px] border-primary-600 text-primary-600 hover:bg-neutral-50 font-body font-bold text-body-md transition-colors"
					>
						Tentar de novo
					</a>
				</div>
			) : isReallyEmpty ? (
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
				<div ref={listRef} className="flex flex-col gap-6">
					<ul className="flex flex-col">
						{visibleSlice.map((item, i) => (
							<UltimasListRow
								key={item.id}
								item={item}
								isLast={i === visibleSlice.length - 1}
								onRemove={handleRemove}
							/>
						))}
					</ul>

					{totalPages > 1 ? (
						<Pagination current={page} total={totalPages} baseHref={`${BASE_HREF}?tab=ultimas`} />
					) : null}
				</div>
			)}
		</section>
	)
}

// Uma linha de Últimas leituras — componente próprio (não inline no .map) porque
// "Salvar como favorito" precisa de hooks (useFavorito), e hooks não podem ser
// chamados dentro de um callback de array.
//
// Não usa useFavoritoToggle/useFavoritoAuthModal (o par usado em NewsCard/
// CategoryColumn/conteudo): aquele hook trava a ação atrás de `useLogado()`
// (`?logado=true` na URL) e abre o convite de criar conta se deslogado — faz
// sentido em conteúdo público, mas não aqui. Esta tela inteira É a área logada
// (chegar aqui já pressupõe login, mesmo sem guard de rota) — pedir pra "criar
// conta" dentro da própria conta não faz sentido nenhum. Mesmo raciocínio já
// usado em FavoritosListRow.handleRemove logo abaixo: ação direta na store +
// toast, sem gate de login.
function UltimasListRow({
	item,
	isLast,
	onRemove,
}: {
	item: ReadHistoryItem
	isLast: boolean
	onRemove: (id: string) => void
}) {
	const href = item.href ?? '/conteudo'
	const navigate = useNavigate()
	const pressed = useFavorito(item.id)

	function handleToggleFavorito() {
		if (pressed) {
			desfavoritar(item.id)
			toast.success('Removido dos favoritos.')
		} else {
			favoritar(item.id)
			toast.success('Adicionado aos seus Favoritos!', {
				action: { label: 'Ver', onClick: () => navigate(`${BASE_HREF}?tab=favoritos`) },
			})
		}
	}

	const actions: ReadListItemMenuAction[] = [
		{ label: 'Compartilhar', icon: 'share', onClick: () => compartilharConteudo(item.title, href) },
		{
			label: pressed ? 'Remover dos favoritos' : 'Salvar como favorito',
			icon: pressed ? 'favorite' : 'favorite-border',
			onClick: handleToggleFavorito,
		},
		{ label: 'Remover de últimas leituras', icon: 'delete-outline', onClick: () => onRemove(item.id) },
	]

	return (
		<ReadListItem
			category={item.category}
			categoryColor={item.categoryColor}
			title={item.title}
			href={href}
			readAt={item.readAt}
			image={item.image}
			isLast={isLast}
			menuActions={actions}
		/>
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
	const [items, setItems] = useState(NEWSLETTERS)
	const totalNl = items.length
	const activeNl = items.filter((n) => n.checked).length

	// Auto-save otimista: o switch muda de imediato e o toast confirma o "salvamento"
	// (mock, sem API real) — mesmo padrão descrito para as futuras preferências de
	// comunicação em figma-specs/_regras-de-negocio.md.
	function handleToggle(index: number, checked: boolean) {
		setItems((prev) => prev.map((item, i) => (i === index ? { ...item, checked } : item)))
		toast.success(checked ? 'Newsletter assinada.' : 'Newsletter cancelada.')
	}

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
				{items.map((nl, i) => (
					<NewsletterItem
						key={i}
						id={`nl-v4-${i}`}
						title={nl.title}
						desc={nl.desc}
						checked={nl.checked}
						isLast={i === items.length - 1}
						onChange={(checked) => handleToggle(i, checked)}
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

function FavoritosPane({ forcedEmpty }: { forcedEmpty: boolean }) {
	const [params] = useSearchParams()
	const pageRaw = Number(params.get('page') ?? 1)

	// useFavoritos() já devolve os itens do portal atual, resolvidos e ordenados por
	// data de salvamento (mais recente primeiro), indisponíveis inclusos nas
	// posições reais — a store é quem decide isso, não esta tela.
	const allItems = useFavoritos()
	const totalPages = Math.max(1, Math.ceil(allItems.length / PER_PAGE))
	const page = Math.min(Math.max(1, pageRaw), totalPages)
	const offset = (page - 1) * PER_PAGE
	const slice = allItems.slice(offset, offset + PER_PAGE)

	// Remoção otimista: mesmo padrão de UltimasPane.handleRemove (esconde na hora,
	// toast com "Desfazer" por 5s). Diferença: aqui existe uma store real por trás,
	// então só comitamos a remoção de verdade (desfavoritar) se a janela expirar sem
	// clique — desfazer só cancela o hide local, sem precisar recriar a entrada (o
	// que perderia o savedAt/disponivel originais, já que favoritar() sempre grava
	// a data de hoje).
	const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set())
	const visibleSlice = slice.filter((item) => !hiddenIds.has(item.id))

	function handleRemove(id: string) {
		setHiddenIds((prev) => new Set(prev).add(id))
		toast.info('Removido dos favoritos.', {
			durationMs: 5000,
			action: {
				label: 'Desfazer',
				onClick: () => {
					setHiddenIds((prev) => {
						const next = new Set(prev)
						next.delete(id)
						return next
					})
				},
			},
		})
		setTimeout(() => {
			setHiddenIds((current) => {
				if (current.has(id)) desfavoritar(id)
				return current
			})
		}, 5000)
	}

	// forcedEmpty (cenário favoritos-vazio no ScenarioBar) simula o vazio sem
	// precisar zerar a store de verdade — vence a contagem real de allItems.
	// Um único vazio pra tudo (nunca favoritou ou favoritou e removeu tudo,
	// mesma tela) — nada de "deste portal" na copy: é jargão interno (o usuário
	// não faz ideia de que existem outros portais), só confundiria.
	const isEmpty = forcedEmpty || allItems.length === 0

	return (
		<section className="flex flex-col gap-6">
			<header className="flex flex-col gap-1">
				<h2 className="font-display font-bold text-title-xl text-primary-600">Favoritos</h2>
				<p className="font-body text-body-md text-neutral-600">
					Os conteúdos que você salvar aparecem aqui.
				</p>
			</header>

			{isEmpty ? (
				<div className="flex flex-col items-center text-center gap-4 py-12">
					<StatusRing accent="primary" icon="favorite-border" size="sm" />
					<h3 className="font-display font-bold text-title-xl text-primary-600">
						Você ainda não tem favoritos
					</h3>
					<p className="font-body text-body-md text-neutral-700 max-w-md">
						Use o marcador nos cards para guardar conteúdos e encontrá-los aqui depois.
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
				<div className="flex flex-col gap-6">
					<ul className="flex flex-col">
						{visibleSlice.map((item, i) => (
							<FavoritosListRow
								key={item.id}
								item={item}
								isLast={i === visibleSlice.length - 1}
								onRemove={handleRemove}
							/>
						))}
					</ul>

					{totalPages > 1 ? (
						<Pagination current={page} total={totalPages} baseHref={`${BASE_HREF}?tab=favoritos`} />
					) : null}
				</div>
			)}
		</section>
	)
}

function FavoritosListRow({
	item,
	isLast,
	onRemove,
}: {
	item: FavoritoItem
	isLast: boolean
	onRemove: (id: string) => void
}) {
	const href = item.href ?? '/conteudo'

	// Item indisponível: só "Remover dos favoritos" — compartilhar link morto é pior
	// que não oferecer a ação.
	const actions: ReadListItemMenuAction[] = item.disponivel
		? [
				{ label: 'Compartilhar', icon: 'share', onClick: () => compartilharConteudo(item.title, href) },
				{ label: 'Remover dos favoritos', icon: 'delete-outline', onClick: () => onRemove(item.id) },
			]
		: [{ label: 'Remover dos favoritos', icon: 'delete-outline', onClick: () => onRemove(item.id) }]

	return (
		<ReadListItem
			category={item.category}
			categoryColor={item.categoryColor}
			title={item.title}
			href={href}
			readAt={item.savedAt}
			image={item.image}
			verbo="Salvo"
			indisponivel={!item.disponivel}
			isLast={isLast}
			menuActions={actions}
		/>
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
			saveHref={`${BASE_HREF}?tab=perfil&cenario=perfil-salvo`}
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
