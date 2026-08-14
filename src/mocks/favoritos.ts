import type { Article } from './articles'
import { picsumSrc } from './articles'
import { ARTICLES_BY_ID } from './leituras'

// Mesmo padrão de src/mocks/leituras.ts: a seed guarda só o id do artigo e a data de
// salvamento, resolvendo contra o ARTICLE_POOL (via ARTICLES_BY_ID, reexportado de
// leituras.ts) no momento da leitura — sem duplicar uma segunda lista de artigos.

export interface FavoritoEntry {
	articleId: string
	savedAt: string // ISO 8601
	/**
	 * false = conteúdo indisponível (despublicado, excluído ou com acesso restrito).
	 * Default: true. No WordPress essa informação vem do status do post — aqui é
	 * mockada na própria entrada do favorito, nunca na ausência do artigo: o item
	 * indisponível continua existindo e precisa renderizar título/categoria
	 * normalmente, só marcado como indisponível.
	 */
	disponivel?: boolean
}

export interface FavoritoItem extends Article {
	savedAt: string
	image?: string
	disponivel: boolean
}

const DAY_MS = 24 * 60 * 60 * 1000
const HOUR_MS = 60 * 60 * 1000

function isoAgo(days: number, hours = 0): string {
	return new Date(Date.now() - days * DAY_MS - hours * HOUR_MS).toISOString()
}

// 25 itens, todos resolvíveis contra ARTICLE_POOL (cobrindo hoje/ontem/dias/semanas/
// +30 dias no mesmo ano e em ano anterior — todas as faixas de formatarDataLeitura).
// 2 deles (`last3`, `404c`) têm `disponivel: false`: apontam pra artigos que existem
// de verdade no pool — o item indisponível nunca desaparece da lista, só fica
// marcado. As datas já ficam distribuídas nas posições reais (não agrupadas no
// fim), então a ordenação por data em favoritos-store.ts já resolve isso sozinha.
export const FAVORITOS_SEED: FavoritoEntry[] = [
	{ articleId: 'home-hero', savedAt: isoAgo(0, 0.5) }, // hoje
	{ articleId: 'home-h2', savedAt: isoAgo(0, 10) }, // hoje
	{ articleId: 'home-h3', savedAt: isoAgo(1) }, // ontem
	{ articleId: 'last3', savedAt: isoAgo(2), disponivel: false }, // indisponível
	{ articleId: 'nwp1', savedAt: isoAgo(2) }, // há 2 dias
	{ articleId: 'nwp2', savedAt: isoAgo(4) }, // há 4 dias
	{ articleId: 'home-text1', savedAt: isoAgo(6) }, // há 6 dias
	{ articleId: 'home-text2', savedAt: isoAgo(7) }, // há 1 semana
	{ articleId: 'home-hp1', savedAt: isoAgo(14) }, // há 2 semanas
	{ articleId: 'home-h5', savedAt: isoAgo(21) }, // há 3 semanas
	{ articleId: 'home-h6', savedAt: isoAgo(29) }, // há 4 semanas
	{ articleId: 'ing1', savedAt: isoAgo(30) }, // +30 dias, mesmo ano
	{ articleId: 'ing2', savedAt: isoAgo(45) },
	{ articleId: '404c', savedAt: isoAgo(50), disponivel: false }, // indisponível
	{ articleId: 'ing3', savedAt: isoAgo(60) },
	{ articleId: 'ing4', savedAt: isoAgo(90) },
	{ articleId: 'fs1', savedAt: isoAgo(120) },
	{ articleId: 'fs2', savedAt: isoAgo(150) },
	{ articleId: 'fs3', savedAt: isoAgo(200) },
	{ articleId: 'fs4', savedAt: isoAgo(220) },
	{ articleId: 'prot1', savedAt: isoAgo(250) }, // +30 dias, ano anterior
	{ articleId: 'prot2', savedAt: isoAgo(300) },
	{ articleId: 'prot3', savedAt: isoAgo(400) },
	{ articleId: 'prot4', savedAt: isoAgo(430) },
	{ articleId: 'fispal1', savedAt: isoAgo(500) },
]

export function resolveFavoritos(entries: FavoritoEntry[]): FavoritoItem[] {
	return entries.reduce<FavoritoItem[]>((resolved, entry) => {
		const article = ARTICLES_BY_ID[entry.articleId]
		if (!article) {
			// Isto é diferente de "conteúdo indisponível" (`disponivel: false` acima, que
			// sempre tem um artigo real por trás). Um articleId que não existe em
			// ARTICLES_BY_ID é bug do mock/seed — nunca um estado de produto — então
			// avisamos alto em vez de simplesmente sumir com o item da lista.
			if (import.meta.env.DEV) {
				console.warn(
					`[favoritos] articleId "${entry.articleId}" não existe em ARTICLES_BY_ID — ` +
						'favorito órfão (bug no mock/seed). Item omitido da lista. Se a intenção era ' +
						'simular conteúdo indisponível, use `disponivel: false` numa entrada que ' +
						'aponte pra um artigo existente, em vez de um id inexistente.',
				)
			}
			return resolved
		}
		resolved.push({
			...article,
			savedAt: entry.savedAt,
			image: picsumSrc(article.seed, 416, 234),
			disponivel: entry.disponivel ?? true,
		})
		return resolved
	}, [])
}
