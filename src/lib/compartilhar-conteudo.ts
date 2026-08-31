import { toast } from './toast-store'

/**
 * Extraído de ReadListItem — agora usado por qualquer lista de conteúdo que precise de
 * uma ação "Compartilhar" (Últimas leituras, Favoritos, página de conteúdo, Biblioteca).
 * Web Share API nativa quando disponível; sem suporte, copia o link e avisa por toast.
 *
 * ## Quando o toast "Link copiado" aparece — e por quê não é escolha nossa
 *
 * A folha de compartilhamento é do SISTEMA, não do site: quem a abre é o navegador, via
 * `navigator.share`. Onde a API não existe, não há folha para abrir e o único caminho
 * honesto é copiar o link. Contextos sem Web Share que aparecem na revisão deste
 * protótipo: navegadores embutidos (o Simple Browser do VS Code, webviews de app),
 * Firefox no desktop, iframe sem `allow="web-share"` e origem sem HTTPS.
 *
 * **Este arquivo não mudou desde a feature de Favoritos** (PR #29). Se a folha nativa
 * aparecia antes e agora não, mudou o CONTEXTO de teste, não o código — o mesmo clique,
 * no mesmo build, abre a folha no Chrome/Safari em aba normal.
 *
 * ## O que mudou em 2026-08-31
 *
 * Cancelar a folha nativa (`AbortError`) e a folha NÃO ABRIR eram tratados igual: os dois
 * caíam no `catch` vazio, e a ação morria em silêncio. Agora só o cancelamento é silêncio
 * — cancelar é uma decisão do usuário, ele viu a folha. Qualquer outra falha (falta de
 * ativação do gesto, permissions-policy, iframe sem allow) cai no copiar, para o clique
 * nunca terminar em nada.
 */
export async function compartilharConteudo(title: string, href: string): Promise<void> {
	const url = new URL(href, window.location.origin).toString()
	const dados = { title, url }

	// `canShare` responde se ESTE payload é compartilhável; onde ele não existe, a
	// existência de `share` já basta (`?? true`).
	if (navigator.share && (navigator.canShare?.(dados) ?? true)) {
		try {
			await navigator.share(dados)
			return
		} catch (erro) {
			// Cancelou: o usuário viu a folha e desistiu. Não é falha, e copiar o link aqui
			// seria fazer o que ele acabou de recusar.
			if (erro instanceof DOMException && erro.name === 'AbortError') return
			// Qualquer outro erro: a folha não abriu. Segue para o copiar.
		}
	}

	try {
		await navigator.clipboard.writeText(url)
		toast.success('Link copiado.')
	} catch {
		toast.error('Não foi possível copiar o link.')
	}
}
