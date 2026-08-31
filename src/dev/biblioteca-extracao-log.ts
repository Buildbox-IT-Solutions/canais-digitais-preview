// PROVISÓRIO — relatório da extração do acervo, para a discussão de taxonomia.
// Não importar fora de src/screens/biblioteca-exclusiva.
import { CATEGORIAS_PORTAL, MATERIAIS } from '~/mocks/biblioteca'

/**
 * Imprime no console o balanço da extração de
 * https://www.foodconnection.com.br/materiais-de-download/ (3 primeiras páginas,
 * 2026-08-30). Existe porque a contagem de categorias inferidas é dado que o Pedro leva
 * para a discussão de taxonomia com o tech lead — não é diagnóstico de bug.
 *
 * As contagens de "inferido" foram conferidas contra os comentários do próprio mock. Se
 * o acervo for reextraído, reconferir.
 */
const CATEGORIA_INFERIDA = 24
const TIPO_INFERIDO = 8
const CAPAS_REMOTAS = true

let jaImprimiu = false

export function relatarExtracao(): void {
	if (jaImprimiu || !import.meta.env.DEV) return
	jaImprimiu = true

	const total = MATERIAIS.length
	const semLead = MATERIAIS.filter((m) => m.sinopse === '').length
	const semTexto = MATERIAIS.filter((m) => !m.sinopse && !m.primeiroParagrafo).length

	console.groupCollapsed(`[biblioteca] acervo extraído de foodconnection.com.br — ${total} materiais`)
	console.warn(
		`TAXONOMIA — ${CATEGORIA_INFERIDA} de ${total} itens (${Math.round((CATEGORIA_INFERIDA / total) * 100)}%) tiveram a CATEGORIA INFERIDA pelo tema do título.\n` +
			`Só ${total - CATEGORIA_INFERIDA} vivem sob um caminho de categoria editorial (/proteina-animal/, /ingredientes/, /sustentabilidade/).\n` +
			'Os outros vivem sob /materiais-de-download/ (o container do acervo) ou /eventos/<feira>/ — e o cabeçalho da própria página exibe "Materiais de Download" no lugar da categoria.\n' +
			'→ Na fonte, o container VIROU a categoria. Este é o número para a discussão com o tech lead.',
	)
	console.info(
		`TIPO — ${TIPO_INFERIDO} de ${total} itens sem sufixo no título; tipo inferido com default 'ebook' (cada um comentado no mock).\n` +
			"1 item traz o sufixo [Pesquisa], que não existe em MaterialType — mapeado para 'whitepaper'.",
	)
	console.info(
		`CAPAS — abordagem usada: ${CAPAS_REMOTAS ? 'URLs remotas do CloudFront do portal' : 'cópias locais em /public'}.\n` +
			'Hotlink testado com e sem Referer: HTTP 200, sem bloqueio — nenhuma imagem foi copiada para /public.',
	)
	console.info(
		`LEAD — ${semLead} de ${total} materiais não têm lead na fonte; todos os ${semLead} caem no primeiro parágrafo do post (anotação do Figma). Materiais sem nenhum texto: ${semTexto}.`,
	)
	console.info(
		`SIMULADO (não existe na fonte) — baixado: ${MATERIAIS.filter((m) => m.baixado).length} · indisponível: ${MATERIAIS.filter((m) => !m.disponivel).length} · exige cadastro completo: ${MATERIAIS.filter((m) => m.requerCadastroCompleto).length} · MAIS_ACESSADOS_IDS · HISTORICO_DOWNLOADS.`,
	)
	console.info(
		'CATEGORIAS do portal:',
		CATEGORIAS_PORTAL.map((c) => `${c.label}=${MATERIAIS.filter((m) => m.categoria === c.label).length}`).join(' · '),
	)
	console.groupEnd()
}
