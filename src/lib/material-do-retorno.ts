import { getPostByParam } from '~/fixtures/posts'
import { MATERIAL_DESTAQUE_TITULO } from '~/mocks/downloads'
import type { SanitizedReturnTo } from './sanitize-return-to'

/**
 * Qual material o painel de desfecho da autenticação entrega.
 *
 * O `returnTo` preserva `?post=` (ver sanitize-return-to), então quem começou o fluxo numa
 * matéria leva o arquivo daquela matéria; quem começou na home leva o material em destaque.
 * Compartilhado entre login e confirmação de e-mail — os dois caminhos precisam nomear o
 * mesmo arquivo para a mesma origem.
 */
export function tituloDoMaterialDoRetorno(returnTo: SanitizedReturnTo): string {
	if (returnTo.path !== '/conteudo') return MATERIAL_DESTAQUE_TITULO
	const post = getPostByParam(new URLSearchParams(returnTo.query).get('post'))
	return post.download?.title ?? MATERIAL_DESTAQUE_TITULO
}
