/**
 * Fonte da verdade dos favoritos deste protótipo — mesmo padrão de store manual
 * (listeners + emit + useSyncExternalStore) usado em src/dev/scenario-store.ts.
 *
 * localStorage aqui representa o back-end: neste protótipo não há servidor, então
 * o navegador guarda o que seria persistido na conta do usuário. Na implementação
 * real, quem guarda favoritos é a conta do usuário (banco de dados), não o
 * navegador — este módulo inteiro é a costura que essa implementação substitui.
 */
import { useSyncExternalStore } from 'react'
import { FAVORITOS_SEED, resolveFavoritos, type FavoritoItem } from '~/mocks/favoritos'
import { getPortalAtual, portalTemSeed } from './portal-atual'

const STORAGE_PREFIX = 'cd_favoritos_'

interface StoredFavorito {
	id: string
	savedAt: string // ISO 8601
	disponivel?: boolean
}

type Listener = () => void

let listeners: Listener[] = []

// Cache do array bruto (não resolvido) atualmente persistido — usado tanto para
// leitura rápida quanto como chave de invalidação do cache de itens resolvidos
// abaixo (useSyncExternalStore exige que getSnapshot devolva a MESMA referência
// enquanto nada mudou, senão entra em loop de re-render).
let rawCache: StoredFavorito[] | null = null
let rawCachePortal: string | null = null

let resolvedCache: FavoritoItem[] | null = null
let resolvedCacheFor: StoredFavorito[] | null = null

function storageKey(portal: string): string {
	return `${STORAGE_PREFIX}${portal}`
}

function readFromStorage(portal: string): StoredFavorito[] {
	const raw = localStorage.getItem(storageKey(portal))
	if (raw === null) {
		// Nada persistido ainda pra este portal. Só o portal padrão recebe a seed —
		// outros portais conhecidos começam vazios de propósito (ver portal-atual.ts).
		if (!portalTemSeed(portal)) return []
		const seeded: StoredFavorito[] = FAVORITOS_SEED.map((entry) => ({
			id: entry.articleId,
			savedAt: entry.savedAt,
			disponivel: entry.disponivel ?? true,
		}))
		localStorage.setItem(storageKey(portal), JSON.stringify(seeded))
		return seeded
	}
	try {
		const parsed = JSON.parse(raw)
		return Array.isArray(parsed) ? parsed : []
	} catch {
		return []
	}
}

function load(): StoredFavorito[] {
	const portal = getPortalAtual()
	if (rawCache === null || rawCachePortal !== portal) {
		rawCache = readFromStorage(portal)
		rawCachePortal = portal
	}
	return rawCache
}

function persist(next: StoredFavorito[]): void {
	const portal = getPortalAtual()
	rawCache = next
	rawCachePortal = portal
	localStorage.setItem(storageKey(portal), JSON.stringify(next))
	emit()
}

function emit(): void {
	for (const listener of listeners) listener()
}

export function subscribe(listener: Listener): () => void {
	listeners = [...listeners, listener]
	return () => {
		listeners = listeners.filter((l) => l !== listener)
	}
}

// Guard comum às 3 funções abaixo: id vazio nunca toca `load()`/`persist()` — ou
// seja, nunca lê nem escreve localStorage. Protege o caso de NewsCard chamar o hook
// sem contentId (ver src/lib/use-favorito-toggle.ts).
export function isFavorito(id: string): boolean {
	if (!id) return false
	return load().some((f) => f.id === id)
}

export function favoritar(id: string): void {
	if (!id) return
	const current = load()
	if (current.some((f) => f.id === id)) return
	// Favoritar é sempre uma ação sobre conteúdo acessível agora — `disponivel: true`
	// explícito (a flag só vira false depois, quando o post sai do ar).
	persist([...current, { id, savedAt: new Date().toISOString(), disponivel: true }])
}

export function desfavoritar(id: string): void {
	if (!id) return
	const current = load()
	if (!current.some((f) => f.id === id)) return
	persist(current.filter((f) => f.id !== id))
}

/**
 * true se já existe QUALQUER registro persistido pra este portal, mesmo que a lista
 * esteja vazia agora (usuário removeu tudo). false = nunca favoritou nada neste portal
 * — distinção usada pra escolher a copy certa do estado vazio (primeira visita vs.
 * lista esvaziada). Não conta como "existir" a seed do portal padrão nunca lida:
 * a seed já persiste no primeiro `load()`, então a partir daí este portal sempre
 * retorna true — é o comportamento esperado (ele teve favoritos desde o início).
 */
export function existeHistoricoDeFavoritos(): boolean {
	return localStorage.getItem(storageKey(getPortalAtual())) !== null
}

/**
 * Itens do portal atual, resolvidos contra o ARTICLE_POOL, mais recente primeiro —
 * inclui os indisponíveis (`disponivel: false`) nas suas posições reais de data,
 * nunca agrupados à parte nem removidos da lista.
 */
export function listarFavoritos(): FavoritoItem[] {
	const raw = load()
	// Cacheia o resultado resolvido enquanto o array bruto não mudar de referência —
	// necessário pra useSyncExternalStore não re-renderizar infinitamente.
	if (resolvedCache !== null && resolvedCacheFor === raw) {
		return resolvedCache
	}
	const ordenado = [...raw].sort(
		(a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime(),
	)
	resolvedCache = resolveFavoritos(
		ordenado.map((f) => ({ articleId: f.id, savedAt: f.savedAt, disponivel: f.disponivel })),
	)
	resolvedCacheFor = raw
	return resolvedCache
}

export function useFavorito(id: string): boolean {
	return useSyncExternalStore(subscribe, () => isFavorito(id))
}

export function useFavoritos(): FavoritoItem[] {
	return useSyncExternalStore(subscribe, listarFavoritos)
}
