import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { toast } from '~/lib/toast-store'
import { useScenarios } from '~/dev/use-scenarios'
import type { ScenarioAxis } from '~/dev/scenario-store'
import { DashboardTabs } from '~/components/dashboard-tabs'
import { DashboardWelcome } from '~/components/dashboard-welcome'
import { DestaqueBiblioteca } from '~/components/destaque-biblioteca'
import { FilterBar } from '~/components/filter-bar'
import { FooterDesktop } from '~/components/footer-desktop'
import { HeaderDesktop } from '~/components/header-desktop'
import { Icon } from '~/components/icon'
import { IncentiveDownloadDialog } from '~/components/incentive-download-dialog'
import { LibCard } from '~/components/lib-card'
import { LibCarousel } from '~/components/lib-carousel'
import { Pagination } from '~/components/pagination'
import { StatusRing } from '~/components/status-ring'
import { relatarExtracao } from '~/dev/biblioteca-extracao-log'
import {
	persistirDesbloqueio,
	resetarDesbloqueioParaRevisao,
	resolverGate,
	useLatchDesbloqueio,
} from '~/lib/biblioteca-gate-store'
import {
	TEMA_TODOS,
	categoriasComAcervo,
	estaBloqueado,
	materialEmDestaque,
	materiaisPorTema,
	paginarGrade,
	secoesDaBiblioteca,
	temaPorSlug,
	type SecaoBiblioteca,
} from '~/lib/biblioteca'
import {
	PERFIL_BIBLIOTECA,
	type LibraryGate,
	type Material,
	type PerfilBiblioteca,
} from '~/mocks/biblioteca'

const BASE_HREF = '/biblioteca-exclusiva'

/**
 * Sangria do trilho e da barra de filtros até a borda da tela, abaixo de `lg`.
 *
 * O container da página é `px-4 lg:px-6`. No mobile, parar no `px-4` deixa uma faixa
 * branca de 16px à direita do card cortado, e aí o corte lê como defeito em vez de
 * convite a rolar. Acima de `lg` a borda do container JÁ é o limite visual da página
 * (o conteúdo é centrado em `max-w-screen-xl`), então lá não há o que sangrar.
 *
 * Margem negativa E largura explícita: margem negativa sozinha não alarga elemento de
 * largura travada, e tanto o trilho quanto a FilterBar são `w-full`. A margem só à
 * DIREITA — à esquerda o alinhamento com o título da seção é o que segura a leitura.
 *
 * **Não confundir com a regra de recorte do `LibCarousel`** (2026-08-31): lá o trilho é
 * recortado no padding do container e o padding fica visível, porque o painel da home tem
 * um box com fundo próprio e o card morrendo na borda dele lia errado. Aqui não há box
 * nenhum — abaixo de `lg` a borda do container É a borda da tela, e o padding de 16px
 * viraria uma faixa branca sem função. Acima de `lg` esta sangria não existe e vale a
 * regra do componente. 🔴 A confirmar com o Pedro: se a referência do MEC também deve
 * valer no mobile, é só apagar esta constante — nada mais depende dela.
 */
const SANGRIA_MOBILE = '-mr-4 w-[calc(100%+var(--spacing)*4)] lg:mr-0 lg:w-full'
const PERFIL_HREF = '/dashboard-perfil-v4?tab=perfil'

const USER_NAME = 'Mariana Albuquerque'
const USER_EMAIL = 'mariana.albuquerque@empresa.com.br'
const USER_INITIALS = 'MA'

/**
 * Tema do cenário `acervo-vazio`: "Embalagens" é categoria REAL do portal sem nenhum
 * material nas 3 primeiras páginas do acervo. O estado vazio não é simulado — é o
 * resultado honesto de filtrar por ela.
 */
const TEMA_SEM_ACERVO = 'embalagens'

type Cenario = 'perfil-incompleto' | 'perfil-completo' | 'subsetor-outro' | 'acervo-vazio'

/**
 * Eixo único de cenário desta tela. Um eixo só porque as quatro opções são estados
 * mutuamente exclusivos do mesmo assunto (quem é o usuário e o que ele vê), não
 * dimensões que se acumulam.
 *
 * `acervo-vazio` também mexe no `?tema=` — `clears` não dá conta disso (só remove
 * parâmetros), então quem reescreve é o efeito lá embaixo.
 */
const CENARIOS: { value: Cenario; label: string }[] = [
	{ value: 'perfil-incompleto', label: 'Perfil incompleto' },
	{ value: 'perfil-completo', label: 'Perfil completo' },
	{ value: 'subsetor-outro', label: "Subsetor 'outro'" },
	{ value: 'acervo-vazio', label: 'Acervo vazio' },
]

/** `subsetor-outro` é o único que muda o PERFIL; os outros mudam só o gate. */
function perfilDoCenario(cenario: Cenario): PerfilBiblioteca {
	if (cenario === 'subsetor-outro') {
		return { ...PERFIL_BIBLIOTECA, subsetor: 'outro', subsetorLabel: 'Outro', camposFaltantes: [] }
	}
	if (cenario === 'perfil-incompleto') return PERFIL_BIBLIOTECA
	return { ...PERFIL_BIBLIOTECA, camposFaltantes: [] }
}

/**
 * Tela: Biblioteca exclusiva — acervo de materiais da área logada.
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=8263-35669
 *
 * Rota própria (não modal), irmã das outras abas da área logada. As demais vivem como
 * `?tab=` dentro de /dashboard-perfil-v4; esta tem rota porque o filtro por tema e a
 * paginação da grade já ocupam a querystring. **Para o back-end: a Biblioteca é uma
 * rota, as outras cinco abas não são.**
 *
 * Estrutura (Figma 8263:35669): headline → Destaque (3 mais recentes, carrossel
 * automático) → FilterBar → 3 seções de carrossel. **Não há banner de bloqueio no topo**:
 * o bloqueio vive no cadeado do badge de cada card e no modal de incentivo ao clicar em
 * "Baixar" (decisão do Pedro em 2026-08-30, ver ds/achados.md).
 *
 * URL:
 *   ?tema=<slug>   filtro — ausente ou 'todos' = Destaque + seções
 *   ?page=N        paginação da grade filtrada
 *   ?cenario=      cenário de revisão (ScenarioBar)
 */
export default function BibliotecaExclusivaScreen() {
	const [params, setSearchParams] = useSearchParams()
	const navigate = useNavigate()

	// Balanço da extração no console (só em DEV) — a contagem de categorias inferidas é
	// dado para a discussão de taxonomia, não diagnóstico.
	useEffect(() => {
		relatarExtracao()
	}, [])

	const cenarioParam = params.get('cenario')
	const cenario: Cenario = CENARIOS.some((c) => c.value === cenarioParam)
		? (cenarioParam as Cenario)
		: 'perfil-incompleto'

	const axes: ScenarioAxis[] = [
		{
			param: 'cenario',
			label: 'Cenário',
			options: CENARIOS,
			value: cenario,
			defaultValue: 'perfil-incompleto',
			// Sair de `acervo-vazio` precisa soltar o `?tema=` que ele forçou, senão o
			// próximo cenário abriria preso em Embalagens. E trocar de cenário sempre
			// invalida a página da grade.
			clears: ['tema', 'page'],
		},
	]
	useScenarios(axes)

	const perfil = perfilDoCenario(cenario)

	// ── Gate ────────────────────────────────────────────────────────────────────
	// Resolvido de forma SÍNCRONA no render: `resolverGate` já devolve desbloqueado=true
	// no primeiro paint de um cadastro completo. Se dependesse do efeito abaixo, o
	// cadeado dos cards apareceria e sumiria a cada carga.
	const latch = useLatchDesbloqueio()
	// `perfil-incompleto` declara um usuário que NUNCA desbloqueou, então ignora o latch
	// persistido no navegador de quem revisa — senão o cenário viria já desbloqueado pra
	// quem visitou `perfil-completo` antes.
	const latchEfetivo = cenario === 'perfil-incompleto' ? false : latch
	const gate: LibraryGate = resolverGate(perfil.camposFaltantes, latchEfetivo)

	// O efeito só PERSISTE o que a regra já decidiu.
	useEffect(() => {
		if (gate.desbloqueado) persistirDesbloqueio()
	}, [gate.desbloqueado])

	// Artifício de protótipo, sem equivalente no produto — ver o store.
	useEffect(() => {
		if (cenario === 'perfil-incompleto') resetarDesbloqueioParaRevisao()
	}, [cenario])

	// ── Modal de incentivo ──────────────────────────────────────────────────────
	// "Ao clicar em baixar ele deve ver um modal incentivando completar as informações
	// para baixar. O clique do modal leva para a aba Meu perfil." — a anotação.
	const [materialBloqueado, setMaterialBloqueado] = useState<Material | null>(null)

	function baixar(material: Material) {
		toast.success('Download iniciado.', {
			action: {
				label: 'Abrir material',
				onClick: () => window.open(material.arquivoUrl, '_blank', 'noopener'),
			},
		})
	}

	// ── Tema ativo ──────────────────────────────────────────────────────────────
	const temaParam = params.get('tema')
	const temaValido = temaParam && temaPorSlug(temaParam) ? temaParam : TEMA_TODOS

	// `acervo-vazio` só existe como tema filtrado. Reescreve a URL (replace, sem empilhar
	// histórico) pra ela continuar dizendo a verdade e continuar compartilhável.
	useEffect(() => {
		if (cenario !== 'acervo-vazio' || temaParam === TEMA_SEM_ACERVO) return
		const next = new URLSearchParams(params)
		next.set('tema', TEMA_SEM_ACERVO)
		next.delete('page')
		setSearchParams(next, { replace: true })
	}, [cenario, temaParam])

	const tema = temaPorSlug(temaValido)

	// Acervo inteiro indisponível deixaria o destaque sem material — a tela segue sem ele.
	const destaque = materialEmDestaque()

	function hrefDoTema(slug: string): string {
		const next = new URLSearchParams(params)
		// Trocar de tema zera a paginação — manter ?page=3 ao entrar num tema de 4 itens
		// cairia numa página que não existe.
		next.delete('page')
		if (slug === TEMA_TODOS) next.delete('tema')
		else next.set('tema', slug)
		const qs = next.toString()
		return qs ? `${BASE_HREF}?${qs}` : BASE_HREF
	}

	// Categoria sem material não vira filtro — clicar nela só levaria ao estado vazio.
	const filtros = [
		{ slug: TEMA_TODOS, label: 'Todos' },
		...categoriasComAcervo().map((c) => ({ slug: c.slug, label: c.label })),
	]

	return (
		<main className="flex min-h-screen flex-col bg-white">
			<HeaderDesktop
				userLoggedIn
				userName={USER_NAME}
				userEmail={USER_EMAIL}
				userInitials={USER_INITIALS}
			/>

			<div className="mx-auto w-full max-w-screen-xl px-4 pt-10 pb-6 lg:px-6">
				<DashboardWelcome
					firstName="Mariana"
					email={USER_EMAIL}
					initials={USER_INITIALS}
					logoutHref="/"
				/>
			</div>

			<div className="mx-auto w-full max-w-screen-xl px-4 pt-4 lg:px-6">
				<DashboardTabs active="biblioteca" baseHref="/dashboard-perfil-v4" />
			</div>

			<div className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-10 lg:px-6">
				<div className="flex flex-col gap-8">
					<header className="flex flex-col gap-1">
						<h1 className="font-display font-bold text-title-xl text-primary-600">
							Biblioteca exclusiva
						</h1>
						<p className="font-body text-body-md text-neutral-600">
							E-books, whitepapers e infográficos do portal, reunidos num só lugar.
						</p>
					</header>

					{/* Destaque só na página inicial da aba: filtrado por tema, ele repetiria
					    material que a grade logo abaixo já lista. */}
					{tema || !destaque ? null : (
						<DestaqueBiblioteca
							material={destaque}
							gate={gate}
							onBaixar={baixar}
							onBloqueado={setMaterialBloqueado}
						/>
					)}

					<FilterBar
						itens={filtros}
						ativo={temaValido}
						onSelecionar={(slug) => navigate(hrefDoTema(slug))}
						className={SANGRIA_MOBILE}
					/>

					{tema ? (
						<GradeDoTema
							temaLabel={tema.label}
							temaSlug={tema.slug}
							gate={gate}
							hrefTodos={hrefDoTema(TEMA_TODOS)}
							onBaixar={baixar}
							onBloqueado={setMaterialBloqueado}
						/>
					) : (
						<Secoes
							perfil={perfil}
							cenario={cenario}
							gate={gate}
							onBaixar={baixar}
							onBloqueado={setMaterialBloqueado}
						/>
					)}
				</div>
			</div>

			<FooterDesktop />

			{/* Reusa o modal de incentivo do download público, com a copy trocada: aqui o
			    usuário JÁ tem conta, o que falta é completar o cadastro. Só uma ação —
			    `onLogin` fica de fora, "Entrar" não faz sentido para quem já está logado. */}
			<IncentiveDownloadDialog
				open={materialBloqueado !== null}
				icon="lock"
				title={
					<>
						Complete seu cadastro para <b>baixar</b>
					</>
				}
				body={`Faltam ${gate.camposFaltantes.length} ${gate.camposFaltantes.length === 1 ? 'campo' : 'campos'} no seu perfil para liberar os downloads da Biblioteca exclusiva.`}
				primaryLabel="Completar perfil"
				onCreateAccount={() => navigate(PERFIL_HREF)}
				onDismiss={() => setMaterialBloqueado(null)}
			/>
		</main>
	)
}

// ---------------------------------------------------------------------------
// Página inicial da aba (?tema ausente)
// ---------------------------------------------------------------------------

function Secoes({
	perfil,
	cenario,
	gate,
	onBaixar,
	onBloqueado,
}: {
	perfil: PerfilBiblioteca
	cenario: Cenario
	gate: LibraryGate
	onBaixar: (m: Material) => void
	onBloqueado: (m: Material) => void
}) {
	// `subsetor-outro` é definido como "subsetor 'outro' SEM histórico de download" — o
	// histórico vazio é o que força a cadeia a percorrer (a) → (b) → (c).
	const secoes = secoesDaBiblioteca(perfil, cenario === 'subsetor-outro' ? { historico: [] } : {})

	return (
		<div className="flex flex-col gap-10">
			{secoes.map((secao) => (
				<Secao
					key={secao.id}
					secao={secao}
					gate={gate}
					onBaixar={onBaixar}
					onBloqueado={onBloqueado}
				/>
			))}
		</div>
	)
}

function Secao({
	secao,
	gate,
	onBaixar,
	onBloqueado,
}: {
	secao: SecaoBiblioteca
	gate: LibraryGate
	onBaixar: (m: Material) => void
	onBloqueado: (m: Material) => void
}) {
	// Um card aberto por seção, no máximo: duas expansões simultâneas no mesmo trilho
	// empurrariam o conteúdo duas vezes.
	const [abertoId, setAbertoId] = useState<string | null>(null)

	return (
		<section className="flex flex-col gap-4">
			{/* Só o título: as seções não têm texto de apoio. */}
			<h2
				data-handoff={secao.id === 'para-seu-setor' ? 'secao-para-seu-setor' : undefined}
				className="font-display font-semibold text-title-lg text-primary-600"
			>
				{secao.titulo}
			</h2>

			<LibCarousel ariaLabel={secao.titulo} className={SANGRIA_MOBILE}>
				{secao.materiais.map((m) => {
					const aberto = abertoId === m.id
					return (
						// A largura vive aqui, não no card, e vem da fórmula do trilho
						// (`--lib-card`) — ver LibCarousel. Ela NÃO muda ao abrir: o card
						// expandido cresce só em altura e sangra para a calha, então nenhum
						// vizinho se desloca.
						<li key={m.id} className="flex min-w-0 shrink-0 grow-0 basis-[var(--lib-card)] snap-start">
							<LibCard
								material={m}
								bloqueado={estaBloqueado(m, gate)}
								aberto={aberto}
								onAbertoChange={(next) => setAbertoId(next ? m.id : null)}
								onBaixar={onBaixar}
								onBloqueado={onBloqueado}
							/>
						</li>
					)
				})}
			</LibCarousel>
		</section>
	)
}

// ---------------------------------------------------------------------------
// Grade de um tema (?tema=<slug>)
// ---------------------------------------------------------------------------

function GradeDoTema({
	temaLabel,
	temaSlug,
	gate,
	hrefTodos,
	onBaixar,
	onBloqueado,
}: {
	temaLabel: string
	temaSlug: string
	gate: LibraryGate
	hrefTodos: string
	onBaixar: (m: Material) => void
	onBloqueado: (m: Material) => void
}) {
	const [params] = useSearchParams()
	const { itens, pagina, totalPaginas, total } = paginarGrade(
		materiaisPorTema(temaSlug),
		Number(params.get('page') ?? 1),
	)

	// Um card aberto por vez, como no trilho: duas expansões na mesma grade
	// reorganizariam as linhas duas vezes a cada clique.
	const [abertoId, setAbertoId] = useState<string | null>(null)

	// baseHref da Pagination precisa carregar o ?tema= — sem ele a página 2 voltaria pro
	// acervo inteiro.
	const baseHref = `${BASE_HREF}?tema=${temaSlug}`

	if (total === 0) {
		return (
			<section className="flex flex-col gap-4">
				<h2 className="font-display font-semibold text-title-lg text-primary-600">{temaLabel}</h2>
				<div
					data-handoff="acervo-vazio"
					className="flex flex-col items-center gap-4 py-12 text-center"
				>
					<StatusRing accent="primary" icon="folder" size="sm" />
					<h3 className="font-display font-bold text-title-xl text-primary-600">
						Nenhum material em {temaLabel} ainda
					</h3>
					<p className="max-w-md font-body text-body-md text-neutral-700">
						Este tema ainda não tem material publicado. Volte ao acervo completo ou escolha outra
						categoria acima.
					</p>
					<a
						href={hrefTodos}
						className="mt-2 inline-flex h-10 items-center gap-2 rounded-full border-[1.5px] border-primary-600 pr-4 pl-5 font-body font-bold text-body-md text-primary-600 transition-colors hover:bg-neutral-50"
					>
						Ver todo o acervo
						<Icon name="arrow-forward" className="size-5" />
					</a>
				</div>
			</section>
		)
	}

	return (
		<section className="flex flex-col gap-6">
			<header className="flex flex-col gap-1">
				{/* Contador do acervo do tema, não da página. */}
				<h2 className="font-display font-semibold text-title-lg text-primary-600">
					{total} {total === 1 ? 'material' : 'materiais'} em {temaLabel}
				</h2>
				{totalPaginas > 1 ? (
					<p className="font-body text-body-md text-neutral-600">
						Página {pagina} de {totalPaginas}
					</p>
				) : null}
			</header>

			{/* 4 por linha no desktop, 2 no tablet, 1 no mobile. Colunas explícitas
			    (`grid-cols-4`) e não `auto-fill`: com `auto-fill` a última linha incompleta
			    reflui e as capas mudam de largura entre as linhas.

			    `items-start` para o card aberto crescer só na própria célula, sem esticar
			    os vizinhos da linha junto com ele.

			    Abrir NÃO muda o tamanho de nada: o card expandido empilha o painel embaixo
			    e sangra para a calha, então a célula continua com a mesma largura. Mesma
			    interação do trilho — ver LibCard. */}
			<ul className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{itens.map((m) => {
					const aberto = abertoId === m.id
					return (
						<li key={m.id} className="min-w-0">
							<LibCard
								material={m}
								bloqueado={estaBloqueado(m, gate)}
								aberto={aberto}
								onAbertoChange={(next) => setAbertoId(next ? m.id : null)}
								onBaixar={onBaixar}
								onBloqueado={onBloqueado}
							/>
						</li>
					)
				})}
			</ul>

			{totalPaginas > 1 ? (
				<Pagination current={pagina} total={totalPaginas} baseHref={baseHref} />
			) : null}
		</section>
	)
}
