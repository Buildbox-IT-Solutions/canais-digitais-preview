/**
 * Mock de material para download.
 *
 * O protótipo entrega um arquivo de verdade — o clique dispara um download real do
 * navegador, não um link morto — mas o arquivo é sempre o mesmo placeholder, servido
 * de `public/`. É o equivalente do `picsumSrc` para imagens: forma real, conteúdo falso.
 *
 * No produto final (WordPress/PHP) cada material tem sua própria URL; aqui só o nome
 * sugerido do arquivo varia por material, via `nomeArquivoDownload`.
 */

/** Título do material em destaque da home. Mora aqui porque duas telas precisam dele:
 *  a home (texto + nome do arquivo) e a confirmação de e-mail, cujo painel de sucesso
 *  baixa o mesmo material quando o retorno não aponta para um post específico. */
export const MATERIAL_DESTAQUE_TITULO = 'Como a rastreabilidade reduz custos e aumenta a margem de lucro'

/** URL do PDF de exemplo. Vive em `public/`, então é servida na raiz sem hash. */
export const ARQUIVO_EXEMPLO_URL = '/downloads/exemplo-food-connection.pdf'

/**
 * Nome sugerido do arquivo, derivado do título do material — vira o valor do atributo
 * `download` da âncora, que é o que o navegador usa como nome no disco.
 */
export function nomeArquivoDownload(titulo: string): string {
	const palavras = titulo
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.split('-')
		.filter(Boolean)

	// Corta na fronteira de palavra: um nome de arquivo terminado em "…margem-de-lu"
	// parece arquivo corrompido, e o usuário vê esse nome na pasta de downloads.
	let slug = ''
	for (const palavra of palavras) {
		const proximo = slug ? `${slug}-${palavra}` : palavra
		if (proximo.length > 60) break
		slug = proximo
	}

	return `${slug || 'material'}.pdf`
}
