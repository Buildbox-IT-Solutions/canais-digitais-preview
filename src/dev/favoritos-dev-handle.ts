// PROVISÓRIO — sai quando o Handoff Tour entrar.
// Expõe a store de favoritos em `window.__favoritosDev`, só para teste manual via
// console (ver docs/favoritos/00-mapa.md). Mesmo espírito de src/dev/scenario-store.ts:
// nenhuma UI própria, nenhuma dependência de produto neste módulo.
import { desfavoritar, favoritar, isFavorito, listarFavoritos } from '~/lib/favoritos-store'

declare global {
	interface Window {
		__favoritosDev?: {
			isFavorito: typeof isFavorito
			favoritar: typeof favoritar
			desfavoritar: typeof desfavoritar
			listarFavoritos: typeof listarFavoritos
		}
	}
}

if (import.meta.env.DEV) {
	window.__favoritosDev = { isFavorito, favoritar, desfavoritar, listarFavoritos }
}
