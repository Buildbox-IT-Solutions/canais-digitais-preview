import { toast } from './toast-store'

/**
 * Baixa um material e confirma DEPOIS que o arquivo terminou de ser transferido.
 *
 * Por que não basta `<a download>`: uma âncora com `download` entrega o arquivo ao
 * navegador e a página nunca fica sabendo quando — nem se — terminou. Não existe evento de
 * conclusão. Confirmar no clique seria afirmar um fim que o código não observou; com
 * material de alguns MB em conexão ruim, o aviso apareceria com o download ainda correndo.
 *
 * Para avisar depois, o próprio código precisa buscar os bytes: o `fetch` resolve quando o
 * corpo chegou inteiro, e só então o arquivo é salvo e o toast dispara. "Concluído" aqui
 * significa: bytes integralmente transferidos e entregues ao navegador para gravar.
 *
 * Isto NÃO é a exceção à regra "nunca faça fetch real" do CLAUDE.md. Aquela regra veta
 * integração com API e dado vindo de servidor — aqui não há API, endpoint nem dado mockado:
 * é a mecânica do próprio download, sobre um arquivo estático do mesmo domínio.
 *
 * O back-end não precisa reproduzir ESTE mecanismo. A regra que a doc declara é "confirmar
 * só depois de concluir"; como se detecta a conclusão é decisão de quem implementa. Em
 * WordPress o caminho usual é o token em cookie — o servidor marca um cookie ao terminar de
 * servir o arquivo e o cliente observa esse cookie.
 *
 * A âncora continua com `href` e `download` reais: sem JS, o clique baixa do jeito nativo,
 * só sem o aviso. É a degradação esperada, não um caminho quebrado.
 */
export async function baixarMaterial(url: string, nomeArquivo: string): Promise<void> {
	try {
		const resposta = await fetch(url)
		if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`)

		const blob = await resposta.blob()
		const objectUrl = URL.createObjectURL(blob)

		const ancora = document.createElement('a')
		ancora.href = objectUrl
		ancora.download = nomeArquivo
		document.body.appendChild(ancora)
		ancora.click()
		ancora.remove()

		// Revogar de forma síncrona cancela a gravação em alguns navegadores — o save ainda
		// está lendo a URL quando `click()` retorna. Solta no próximo tick.
		setTimeout(() => URL.revokeObjectURL(objectUrl), 0)

		toast.success('Material baixado.')
	} catch {
		toast.error('Não foi possível baixar o material.', {
			action: { label: 'Repetir', onClick: () => void baixarMaterial(url, nomeArquivo) },
		})
	}
}
