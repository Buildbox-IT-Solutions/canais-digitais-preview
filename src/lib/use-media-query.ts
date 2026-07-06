import { useEffect, useState } from 'react'

/**
 * Hook: useMediaQuery — retorna `true` enquanto a media query casar.
 *
 * Usado para decidir a apresentação por viewport (ex.: popover ancorado no
 * desktop vs. bottom sheet no mobile). O breakpoint de referência do projeto é
 * `lg` (1024px), o mesmo do padding de página `px-4 lg:px-6`.
 */
export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(() =>
		typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
	)

	useEffect(() => {
		const mql = window.matchMedia(query)
		const onChange = () => setMatches(mql.matches)
		onChange()
		mql.addEventListener('change', onChange)
		return () => mql.removeEventListener('change', onChange)
	}, [query])

	return matches
}
