import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

/**
 * `true` depois que o topo do elemento do `ref` cruza acima do topo da
 * viewport (usuário rolou pra além dele). Scroll listener + rAF (mesmo
 * padrão de `useCompactOnScroll` em header-desktop/index.tsx) em vez de
 * `IntersectionObserver`: um `threshold: 0` só dispara callback quando a
 * razão de interseção muda — num salto grande de scroll o elemento pode
 * ir de "abaixo da viewport" pra "acima" sem nenhum frame intermediário
 * com interseção > 0, e o callback nunca dispara. Medir a posição direto
 * a cada scroll evita esse caso.
 */
export function useScrolledPast(ref: RefObject<HTMLElement | null>, enabled: boolean): boolean {
	const [past, setPast] = useState(false)

	useEffect(() => {
		if (!enabled) return

		let ticking = false
		function update() {
			setPast((ref.current?.getBoundingClientRect().top ?? 0) < 0)
			ticking = false
		}
		function onScroll() {
			if (!ticking) {
				requestAnimationFrame(update)
				ticking = true
			}
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		update()
		return () => window.removeEventListener('scroll', onScroll)
	}, [ref, enabled])

	return past
}
