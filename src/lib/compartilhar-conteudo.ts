import { toast } from './toast-store'

/**
 * Extraído de ReadListItem — agora usado por qualquer lista de conteúdo que precise
 * de uma ação "Compartilhar" (Últimas leituras, Favoritos). Web Share API nativa
 * quando disponível; sem suporte, copia o link e avisa por toast.
 */
export async function compartilharConteudo(title: string, href: string): Promise<void> {
	const url = new URL(href, window.location.origin).toString()

	if (navigator.share) {
		try {
			await navigator.share({ title, url })
		} catch {
			// usuário cancelou o compartilhamento nativo — não é um erro
		}
		return
	}

	try {
		await navigator.clipboard.writeText(url)
		toast.success('Link copiado.')
	} catch {
		toast.error('Não foi possível copiar o link.')
	}
}
