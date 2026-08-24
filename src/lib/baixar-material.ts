import { toast } from './toast-store'

/**
 * Baixa um material e confirma DEPOIS que o arquivo está gravado.
 *
 * Três definições de "concluído" foram tentadas aqui; só a terceira é honesta:
 *
 * 1. No clique — errado: `<a download>` entrega o arquivo ao navegador e a página nunca
 *    fica sabendo quando, nem se, terminou.
 * 2. Quando o `fetch` resolve — melhor, mas ainda cedo: os bytes chegaram à memória, e o
 *    navegador só então abre "onde salvar?". Se o usuário tem esse diálogo ligado, o
 *    aviso aparece POR CIMA dele, antes de existir arquivo em disco. E se ele cancelar,
 *    o aviso já mentiu.
 * 3. Quando a gravação termina — o que este arquivo faz.
 *
 * A File System Access API é o único caminho no navegador que devolve esse sinal:
 * `showSaveFilePicker()` resolve quando o usuário escolhe o destino, e `close()` resolve
 * com os bytes já gravados. Cancelar rejeita com `AbortError` — e aí não há confirmação
 * nenhuma, que é o correto: nada foi baixado.
 *
 * Sem essa API (Firefox, Safari) sobra a âncora, sem sinal de conclusão. A perda é menor
 * do que parece: são justamente os navegadores que gravam direto na pasta de downloads
 * sem perguntar, então o intervalo entre "bytes chegaram" e "arquivo em disco" é
 * imperceptível. O diálogo de destino, que é o que quebrava a promessa, vive no Chrome/
 * Edge — onde a API existe.
 *
 * O back-end não precisa reproduzir ESTE mecanismo. A regra que a doc declara é
 * "confirmar só depois de gravar"; como detectar isso é decisão de quem implementa. Em
 * WordPress o caminho usual é o token em cookie — o servidor marca um cookie ao terminar
 * de servir o arquivo e o cliente observa.
 */

/** Subconjunto da File System Access API que usamos — não está no lib.dom de todas as
 *  versões de TS, e só Chrome/Edge implementam. */
interface WritableFileStream {
	write(data: Blob): Promise<void>
	close(): Promise<void>
}
interface SaveFileHandle {
	createWritable(): Promise<WritableFileStream>
}
type ShowSaveFilePicker = (options: {
	suggestedName?: string
	types?: { description: string; accept: Record<string, string[]> }[]
}) => Promise<SaveFileHandle>

const TIPO_PDF = { description: 'PDF', accept: { 'application/pdf': ['.pdf'] } }

function avisarFalha(url: string, nomeArquivo: string): void {
	toast.error('Não foi possível baixar o material.', {
		action: { label: 'Repetir', onClick: () => void baixarMaterial(url, nomeArquivo) },
	})
}

async function buscarBlob(url: string): Promise<Blob> {
	const resposta = await fetch(url)
	if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`)
	return resposta.blob()
}

/** Caminho sem File System Access: âncora com blob. Grava, mas não avisa quando terminou. */
async function baixarPelaAncora(url: string, nomeArquivo: string): Promise<void> {
	const blob = await buscarBlob(url)
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
}

export async function baixarMaterial(url: string, nomeArquivo: string): Promise<void> {
	const abrirSeletor = (window as unknown as { showSaveFilePicker?: ShowSaveFilePicker })
		.showSaveFilePicker

	let destino: SaveFileHandle | null = null

	if (abrirSeletor) {
		try {
			// Antes do fetch, de propósito: o seletor exige ativação recente do usuário, e
			// esperar a rede no meio gastaria o gesto do clique.
			destino = await abrirSeletor({ suggestedName: nomeArquivo, types: [TIPO_PDF] })
		} catch (erro) {
			// Cancelou o diálogo: nada foi baixado, então nada a confirmar nem a reportar.
			if ((erro as DOMException)?.name === 'AbortError') return
			// Qualquer outra recusa (sem gesto válido, contexto restrito) cai na âncora.
			destino = null
		}
	}

	try {
		if (destino) {
			const blob = await buscarBlob(url)
			const stream = await destino.createWritable()
			await stream.write(blob)
			await stream.close() // resolve com os bytes já em disco
		} else {
			await baixarPelaAncora(url, nomeArquivo)
		}
		toast.success('Material baixado.')
	} catch {
		avisarFalha(url, nomeArquivo)
	}
}
