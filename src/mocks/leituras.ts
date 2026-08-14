import type { Article } from './articles'
import {
	FISPAL_LIST,
	FOOD_SERVICE_LIST,
	HOME_HERO,
	HOME_HERO_BOTTOM,
	HOME_HERO_TEXT,
	INGREDIENTES_LIST,
	LAST_SECTION,
	NEWS_PODCAST,
	NOT_FOUND_CARDS,
	PROTEINA_ANIMAL,
	VEJA_TAMBEM,
	picsumSrc,
} from './articles'

// Pool de artigos "publicados" — o histórico guarda só o id e resolve os dados aqui,
// na leitura. Um id sem correspondência (despublicado/removido) some da lista sozinho.
// Exportado para outros mocks (ex.: favoritos) resolverem contra o mesmo pool, em vez
// de declarar uma segunda lista de artigos.
export const ARTICLE_POOL: Article[] = [
	...HOME_HERO,
	...HOME_HERO_TEXT,
	...HOME_HERO_BOTTOM,
	...INGREDIENTES_LIST,
	...FOOD_SERVICE_LIST,
	...PROTEINA_ANIMAL,
	...FISPAL_LIST,
	...NEWS_PODCAST,
	...LAST_SECTION,
	...VEJA_TAMBEM,
	...NOT_FOUND_CARDS,
]

export const ARTICLES_BY_ID: Record<string, Article> = Object.fromEntries(
	ARTICLE_POOL.map((article) => [article.id, article]),
)

export interface ReadHistoryEntry {
	articleId: string
	readAt: string // ISO 8601
	noImage?: boolean // simula post sem imagem destacada
}

export interface ReadHistoryItem extends Article {
	readAt: string
	image?: string
}

const DAY_MS = 24 * 60 * 60 * 1000
const HOUR_MS = 60 * 60 * 1000

function isoAgo(days: number, hours = 0): string {
	return new Date(Date.now() - days * DAY_MS - hours * HOUR_MS).toISOString()
}

export const READ_HISTORY: ReadHistoryEntry[] = [
	{ articleId: 'home-hero', readAt: isoAgo(0, 0.2) },
	{ articleId: 'home-h2', readAt: isoAgo(0, 6) },
	{ articleId: 'home-h3', readAt: isoAgo(1) },
	{ articleId: 'nwp1', readAt: isoAgo(3) },
	{ articleId: 'nwp2', readAt: isoAgo(5), noImage: true },
	{ articleId: 'home-text3', readAt: isoAgo(6) },
	{ articleId: 'home-hp1', readAt: isoAgo(9) },
	{ articleId: 'home-h5', readAt: isoAgo(14) },
	{ articleId: 'home-h6', readAt: isoAgo(20) },
	{ articleId: 'ing1', readAt: isoAgo(29) },
	{ articleId: 'last2', readAt: isoAgo(35) },
	{ articleId: 'ing3', readAt: isoAgo(60), noImage: true },
	{ articleId: 'last3', readAt: isoAgo(95) },
	{ articleId: 'fs1', readAt: isoAgo(120) },
	{ articleId: 'fs2', readAt: isoAgo(150) },
	{ articleId: 'last4', readAt: isoAgo(200) },
	{ articleId: 'vt1', readAt: isoAgo(250) },
	{ articleId: 'prot1', readAt: isoAgo(300) },
	{ articleId: 'prot2', readAt: isoAgo(370) },
	{ articleId: 'prot3', readAt: isoAgo(400) },
	{ articleId: 'prot4', readAt: isoAgo(430) },
	{ articleId: 'fispal1', readAt: isoAgo(460) },
	{ articleId: 'fispal2', readAt: isoAgo(500) },
	// id sem correspondência em ARTICLES_BY_ID: simula matéria retirada por questão legal.
	{ articleId: 'materia-indisponivel', readAt: isoAgo(2) },
]

export function resolveReadHistory(entries: ReadHistoryEntry[]): ReadHistoryItem[] {
	return entries.reduce<ReadHistoryItem[]>((resolved, entry) => {
		const article = ARTICLES_BY_ID[entry.articleId]
		if (!article) return resolved
		resolved.push({
			...article,
			readAt: entry.readAt,
			image: entry.noImage ? undefined : picsumSrc(article.seed, 416, 234),
		})
		return resolved
	}, [])
}
