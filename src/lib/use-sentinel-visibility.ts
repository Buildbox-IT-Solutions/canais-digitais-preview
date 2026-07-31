import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

/**
 * Observa se o elemento do `ref` está visível na viewport. Usado pelas duas
 * variantes de TOC pra saber quando o Estado B (flutuante) deve aparecer —
 * ou seja, quando o bloco do Estado A (sentinela) saiu da tela.
 */
export function useSentinelVisibility(ref: RefObject<HTMLElement | null>, enabled: boolean): boolean {
	const [visible, setVisible] = useState(true)

	useEffect(() => {
		if (!enabled || !ref.current) return

		const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 })
		observer.observe(ref.current)
		return () => observer.disconnect()
	}, [ref, enabled])

	return visible
}
