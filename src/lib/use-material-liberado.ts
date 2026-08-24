import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router'
import { prefersReducedMotion } from './prefers-reduced-motion'
import { toast } from './toast-store'

/**
 * Retorno pós-login/cadastro com intenção de download (`?toast=material-liberado`).
 *
 * NÃO baixa sozinho. Traz o CTA à vista e avisa que o material está liberado — o clique
 * continua sendo do usuário. Arquivo que aterrissa na pasta de downloads sem ninguém ter
 * clicado naquela página surpreende, e o usuário não escolheu o momento.
 *
 * Substitui o `?toast=download-started`, que anunciava um download que nunca acontecia:
 * a página só carregava logada e o CTA continuava lá, esperando o mesmo clique de antes.
 * Aqui o aviso é verdadeiro — o material está liberado, e é só baixar.
 *
 * Dispara uma vez só: o ref sobrevive ao duplo-disparo do StrictMode (mesma instância),
 * mesmo padrão do `resumedRef` em lib/use-favorito-toggle.ts. E o parâmetro é removido da
 * URL depois, senão um F5 reavisaria e rolaria a página de novo.
 */
export function useMaterialLiberado(ancoraId: string): void {
	const [params, setSearchParams] = useSearchParams()
	const avisouRef = useRef(false)

	useEffect(() => {
		if (avisouRef.current) return
		if (params.get('toast') !== 'material-liberado') return
		avisouRef.current = true

		document.getElementById(ancoraId)?.scrollIntoView({
			behavior: prefersReducedMotion() ? 'auto' : 'smooth',
			block: 'center',
		})
		toast.success('Material liberado. É só baixar.')

		const next = new URLSearchParams(params)
		next.delete('toast')
		setSearchParams(next, { replace: true })
	}, [params, setSearchParams, ancoraId])
}
