/**
 * Identificador do portal/canal digital atual.
 *
 * No WordPress (implementação real), isso vem do contexto do site multissite —
 * cada portal roda numa instalação/blog separado e o identificador é resolvido
 * pelo próprio WP a partir do domínio/blog ativo, sem nenhum código de aplicação
 * precisando declará-lo. Este módulo é a costura provisória que a implementação
 * real substitui.
 *
 * Pra dar pra demonstrar a troca de portal no protótipo de aprovação sem precisar
 * editar código, o id aceita ser sobrescrito por `?portal=` na querystring — mesma
 * convenção de `?logado=true` (src/lib/use-logado.ts) e `?cenario=` (src/dev). Só os
 * ids da whitelist abaixo são aceitos; qualquer outro valor (ou ausência do
 * parâmetro) cai no padrão hard-coded. `getPortalAtual` é uma função comum (não um
 * hook) porque é chamada de dentro de favoritos-store.ts, fora de componente React —
 * por isso lê `window.location.search` direto, em vez de `useSearchParams()`.
 */
const PORTAL_ATUAL_ID = 'food-connection'

/**
 * Segundo portal conhecido, deliberadamente sem seed de favoritos — existe só pra
 * provar o isolamento por portal (`?portal=saude-business` chega numa lista vazia).
 */
const PORTAL_SEM_SEED_ID = 'saude-business'

const KNOWN_PORTAL_IDS: readonly string[] = [PORTAL_ATUAL_ID, PORTAL_SEM_SEED_ID]

export function getPortalAtual(): string {
	const fromQuery = new URLSearchParams(window.location.search).get('portal')
	if (fromQuery && KNOWN_PORTAL_IDS.includes(fromQuery)) return fromQuery
	return PORTAL_ATUAL_ID
}

/**
 * true se este portal deve receber a seed de favoritos na primeira carga (nenhum
 * dado persistido ainda). Só o portal padrão tem seed — o segundo portal conhecido
 * existe justamente pra simular "nenhum favorito salvo ainda". Consumido só por
 * favoritos-store — não é um conceito de UI.
 */
export function portalTemSeed(portal: string): boolean {
	return portal === PORTAL_ATUAL_ID
}
