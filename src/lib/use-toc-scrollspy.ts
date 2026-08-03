import { useEffect, useState } from 'react'
import type { Heading } from '~/types/post'

/**
 * Scrollspy: ativa a seção quando ela entra no terço superior da viewport.
 * Compartilhado entre as variantes de TableOfContents (Opção 1 e Opção 2).
 */
export function useTocScrollspy(headings: Heading[], enabled: boolean): string | null {
	const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null)

	useEffect(() => {
		if (!enabled) return

		const elements = headings
			.map((h) => document.getElementById(h.id))
			.filter((el): el is HTMLElement => el !== null)

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setActiveId(entry.target.id)
				})
			},
			{ rootMargin: '0px 0px -66% 0px', threshold: 0 },
		)

		elements.forEach((el) => observer.observe(el))
		return () => observer.disconnect()
	}, [headings, enabled])

	return activeId
}
