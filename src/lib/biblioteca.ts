/**
 * Regras de negócio da Biblioteca exclusiva.
 *
 * Tudo o que decide QUAIS materiais aparecem, em QUE ordem, sob QUAL título e o que
 * está bloqueado vive aqui — a tela (src/screens/biblioteca-exclusiva) só renderiza o
 * resultado. O back-end WordPress reimplementa estas funções; a tela é referência
 * visual, este arquivo é a referência de comportamento.
 */
import {
	CATEGORIAS_PORTAL,
	HISTORICO_DOWNLOADS,
	MAIS_ACESSADOS_IDS,
	MATERIAIS,
	type CategoriaPortal,
	type DownloadRegistrado,
	type LibraryGate,
	type Material,
	type PerfilBiblioteca,
} from '~/mocks/biblioteca'

/** Teto de itens por carrossel de seção. Acima disso, só a grade do tema. */
export const TETO_SECAO = 12

/** Itens por página da grade. A grade é o único lugar com o acervo completo. */
export const POR_PAGINA = 20

/** Janela do fallback (b) de recomendação: downloads dos últimos N dias. */
export const JANELA_DOWNLOAD_DIAS = 90

const DIA_MS = 24 * 60 * 60 * 1000

/** Slug do chip "Todos" — não é um tema, é a ausência de filtro. */
export const TEMA_TODOS = 'todos'

// ---------------------------------------------------------------------------
// Conteúdo do material
// ---------------------------------------------------------------------------

/**
 * Texto do SidePanel do LibCard aberto.
 *
 * Anotação do Figma: "1. Lead do post / 2. Se não tiver Lead, mostra o primeiro
 * parágrafo do post". Os dois campos vêm da fonte real, então **a Biblioteca não tem
 * estado de 'sinopse ausente'** — 9 dos 30 materiais não têm lead, e todos os 9 têm
 * primeiro parágrafo. **Para o back-end: a queda para o primeiro parágrafo é a regra,
 * não um remendo; nunca renderize o painel vazio.**
 */
export function leadDoMaterial(material: Material): string {
	return material.sinopse || material.primeiroParagrafo
}

// ---------------------------------------------------------------------------
// Gate — por material, não global
// ---------------------------------------------------------------------------

/**
 * O material está trancado para este usuário?
 *
 * Duas condições, ambas necessárias: o material exige cadastro completo E o usuário
 * ainda não desbloqueou. Material com `requerCadastroCompleto: false` baixa direto,
 * mesmo com o cadastro pela metade — é o "ALGUNS materiais são bloqueados" da anotação.
 *
 * Material indisponível NÃO é material bloqueado: são eixos independentes. Indisponível
 * é sobre o acervo (despublicado), bloqueado é sobre o usuário (cadastro).
 */
export function estaBloqueado(material: Material, gate: LibraryGate): boolean {
	return material.requerCadastroCompleto && !gate.desbloqueado
}

// ---------------------------------------------------------------------------
// Temas
// ---------------------------------------------------------------------------

export function temaPorSlug(slug: string | null): CategoriaPortal | null {
	if (!slug || slug === TEMA_TODOS) return null
	return CATEGORIAS_PORTAL.find((c) => c.slug === slug) ?? null
}

export function corDaCategoria(label: string): CategoriaPortal['color'] {
	return CATEGORIAS_PORTAL.find((c) => c.label === label)?.color ?? 'primary-600'
}

export function slugDaCategoria(label: string): string {
	return CATEGORIAS_PORTAL.find((c) => c.label === label)?.slug ?? TEMA_TODOS
}

/**
 * Categorias que têm ao menos um material — as únicas que viram filtro.
 *
 * Uma categoria vazia como filtro é um beco: o único destino dela é o estado vazio.
 * `Embalagens` existe na taxonomia do portal e fica de fora daqui enquanto não tiver
 * acervo. **Consequência: o estado vazio da grade deixa de ser alcançável pela
 * FilterBar** — ele continua existindo para link direto/compartilhado de uma categoria
 * que ficou sem conteúdo depois (é justamente o cenário `acervo-vazio`).
 */
export function categoriasComAcervo(): CategoriaPortal[] {
	return CATEGORIAS_PORTAL.filter((c) => MATERIAIS.some((m) => m.categoria === c.label))
}

/** Quantos materiais cada tema tem — alimenta o contador da grade. */
export function contarPorTema(slug: string): number {
	const tema = temaPorSlug(slug)
	if (!tema) return MATERIAIS.length
	return MATERIAIS.filter((m) => m.categoria === tema.label).length
}

// ---------------------------------------------------------------------------
// Ordenação e recortes
// ---------------------------------------------------------------------------

/** Cronológica decrescente por `publicadoEm`. Nunca muta o array recebido. */
export function ordenarPorData(materiais: Material[]): Material[] {
	return [...materiais].sort(
		(a, b) => new Date(b.publicadoEm).getTime() - new Date(a.publicadoEm).getTime(),
	)
}

/**
 * Grade de um tema — cronológica decrescente, acervo COMPLETO daquela categoria (sem
 * teto: a grade é o único lugar que mostra tudo). `TEMA_TODOS`/slug desconhecido devolve
 * o acervo inteiro; tema real sem material devolve [] (estado vazio).
 */
export function materiaisPorTema(slug: string | null): Material[] {
	const tema = temaPorSlug(slug)
	if (!tema) return ordenarPorData(MATERIAIS)
	return ordenarPorData(MATERIAIS.filter((m) => m.categoria === tema.label))
}

export interface PaginaGrade {
	itens: Material[]
	pagina: number
	totalPaginas: number
	total: number
}

/** Paginação da grade — 20 por página, página fora de faixa é presa nos limites. */
export function paginarGrade(materiais: Material[], paginaPedida: number): PaginaGrade {
	const total = materiais.length
	const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA))
	const pagina = Math.min(Math.max(1, paginaPedida), totalPaginas)
	const offset = (pagina - 1) * POR_PAGINA
	return { itens: materiais.slice(offset, offset + POR_PAGINA), pagina, totalPaginas, total }
}

/**
 * Destaque do topo: os 3 materiais mais recentes (anotação "Destaque com os 3 itens
 * mais recentes"). Indisponíveis ficam de fora — o destaque é convite a baixar, e
 * convidar para o que não existe mais é o pior lugar possível para essa falha.
 */
export const TOTAL_DESTAQUE = 3

export function materiaisEmDestaque(): Material[] {
	return ordenarPorData(MATERIAIS.filter((m) => m.disponivel)).slice(0, TOTAL_DESTAQUE)
}

/**
 * Os N materiais mais recentes. Alimenta a seção "Novidades para você" da aba e a vitrine
 * da home ("os 12 'Materiais de download' mais recentes", na anotação do Figma) — são o
 * mesmo recorte, e por isso a mesma função.
 *
 * **Indisponível fica de fora**: material despublicado não é novidade, e anunciar como
 * recente algo que não dá para baixar é a pior forma de gastar a atenção do leitor. O
 * estado "Indisponível" do card continua alcançável filtrando por categoria — e os
 * materiais marcados assim vivem, de propósito, em categorias que não aparecem aqui.
 */
export function materiaisMaisRecentes(limite: number = TETO_SECAO): Material[] {
	return ordenarPorData(MATERIAIS.filter((m) => m.disponivel)).slice(0, limite)
}

// ---------------------------------------------------------------------------
// Seções da página inicial
// ---------------------------------------------------------------------------

/**
 * Qual elo da cadeia de fallback produziu a seção "Para o seu setor". O back-end precisa
 * dos três: no elo (c) o TÍTULO da seção muda, não só o conteúdo.
 *
 * As seções não têm texto de apoio (decisão do Pedro em 2026-08-30, conferida contra o
 * layout) — então a origem da recomendação **não é mais explicada ao leitor**. Ela segue
 * disponível aqui em `origem`, para o back-end e para a doc. Ver ds/achados.md.
 */
export type OrigemRecomendacao = 'subsetor' | 'historico' | 'popularidade'

export interface SecaoBiblioteca {
	id: string
	titulo: string
	materiais: Material[]
	/** Tema alcançado pelo "ver todos" da seção. `null` quando a seção não é de um tema. */
	temaSlug: string | null
}

export interface Recomendacao extends SecaoBiblioteca {
	origem: OrigemRecomendacao
}

export interface OpcoesRecomendacao {
	/** Referência da janela de 90 dias. Injetável para o cenário ficar determinístico. */
	agora?: Date
	/**
	 * Histórico de download considerado no elo (b). Injetável porque o cenário
	 * `subsetor-outro` é definido como "subsetor 'outro' SEM histórico de download" — sem
	 * poder passar `[]` aqui, ele nunca chegaria ao elo (c).
	 */
	historico?: DownloadRegistrado[]
}

/**
 * Cadeia de fallback OBRIGATÓRIA, avaliada em ordem — cada elo só é consultado se o
 * anterior não produziu material nenhum:
 *
 *   a) subsetor declarado no perfil, desde que exista e seja diferente de 'outro'
 *   b) categorias dos materiais já baixados nos últimos 90 dias
 *   c) mais acessados do portal — e SÓ neste caso o título da seção muda
 *
 * Um elo que existe mas não devolve material (subsetor declarado cuja categoria está sem
 * acervo) cai para o próximo: a seção nunca aparece vazia.
 */
export function resolverRecomendacao(
	perfil: PerfilBiblioteca,
	{ agora = new Date(), historico = HISTORICO_DOWNLOADS }: OpcoesRecomendacao = {},
): Recomendacao {
	// (a) subsetor declarado
	const temaSubsetor = temaPorSlug(perfil.subsetor)
	if (perfil.subsetor !== 'outro' && temaSubsetor) {
		const itens = materiaisPorTema(temaSubsetor.slug).slice(0, TETO_SECAO)
		if (itens.length > 0) {
			return {
				id: 'para-seu-setor',
				origem: 'subsetor',
				titulo: 'Para o seu setor',
				materiais: itens,
				temaSlug: temaSubsetor.slug,
			}
		}
	}

	// (b) categorias baixadas nos últimos 90 dias
	const limite = agora.getTime() - JANELA_DOWNLOAD_DIAS * DIA_MS
	const categoriasRecentes: string[] = []
	for (const reg of historico) {
		if (new Date(reg.baixadoEm).getTime() < limite) continue
		const material = MATERIAIS.find((m) => m.id === reg.materialId)
		if (material && !categoriasRecentes.includes(material.categoria)) {
			categoriasRecentes.push(material.categoria)
		}
	}
	if (categoriasRecentes.length > 0) {
		// Exclui o que já foi baixado — recomendar de volta o material que originou a
		// recomendação seria ruído; o histórico é o SINAL, não o resultado.
		const baixadosRecentes = new Set(historico.map((r) => r.materialId))
		const itens = ordenarPorData(
			MATERIAIS.filter(
				(m) => categoriasRecentes.includes(m.categoria) && !baixadosRecentes.has(m.id),
			),
		).slice(0, TETO_SECAO)
		if (itens.length > 0) {
			return {
				id: 'para-seu-setor',
				origem: 'historico',
				titulo: 'Para o seu setor',
				materiais: itens,
				// Mais de uma categoria não vira um tema só — sem "ver todos" de tema único.
				temaSlug: categoriasRecentes.length === 1 ? slugDaCategoria(categoriasRecentes[0]) : null,
			}
		}
	}

	// (c) mais acessados do portal — único elo que RENOMEIA a seção
	return {
		id: 'para-seu-setor',
		origem: 'popularidade',
		titulo: 'Mais acessados do portal',
		materiais: maisAcessados(),
		temaSlug: null,
	}
}

function maisAcessados(): Material[] {
	return MAIS_ACESSADOS_IDS.map((id) => MATERIAIS.find((m) => m.id === id))
		.filter((m): m is Material => Boolean(m))
		.slice(0, TETO_SECAO)
}

/**
 * As seções da página inicial da aba, na ordem em que aparecem.
 *
 * São TRÊS, como no Figma — e a anotação diz o que elas são: "Seções da página inicial
 * são sugestões para o leitor". Todas as três são recorte editorial, nenhuma é o acervo
 * completo (esse só existe na grade de um tema).
 *
 *   1. Novidades para você      — cronológica decrescente, só disponíveis
 *   2. Para o seu setor        — cadeia de fallback (a)→(b)→(c)
 *   3. Mais acessados do portal — popularidade
 *
 * A terceira é SUPRIMIDA quando a segunda já caiu no elo (c): as duas mostrariam a mesma
 * lista sob o mesmo título. É o único caso em que a aba tem duas seções em vez de três.
 */
export function secoesDaBiblioteca(
	perfil: PerfilBiblioteca,
	opcoes: OpcoesRecomendacao = {},
): SecaoBiblioteca[] {
	const recomendacao = resolverRecomendacao(perfil, opcoes)

	const novos: SecaoBiblioteca = {
		id: 'novidades',
		titulo: 'Novidades para você',
		materiais: materiaisMaisRecentes(),
		temaSlug: null,
	}

	const populares: SecaoBiblioteca = {
		id: 'mais-acessados',
		titulo: 'Mais acessados do portal',
		materiais: maisAcessados(),
		temaSlug: null,
	}

	return recomendacao.origem === 'popularidade'
		? [novos, recomendacao]
		: [novos, recomendacao, populares]
}
