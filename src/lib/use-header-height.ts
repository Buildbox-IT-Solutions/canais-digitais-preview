import { useEffect, useState } from 'react'

/**
 * Altura atual (px) do `<header>` sticky do topo da página, via
 * ResizeObserver — só muda quando o header alterna Expanded/Compact (ver
 * `useCompactOnScroll` em header-desktop/index.tsx) ou de breakpoint, não a
 * cada frame de scroll. `document.querySelector('header')` porque o header
 * é um landmark único por página e vive como irmão (não pai/filho) de quem
 * usa este hook — não dá pra repassar a ref por props sem acoplar as duas
 * árvores.
 */
export function useHeaderHeight(): number {
	const [height, setHeight] = useState(0)

	useEffect(() => {
		const header = document.querySelector('header')
		if (!header) return

		const observer = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height))
		observer.observe(header)
		return () => observer.disconnect()
	}, [])

	return height
}
