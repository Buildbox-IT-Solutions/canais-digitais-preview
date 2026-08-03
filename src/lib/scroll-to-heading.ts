import { prefersReducedMotion } from './prefers-reduced-motion'

/** Rola até o heading e atualiza a URL (#id) — compartilhado entre as três opções de TOC. */
export function scrollToHeading(id: string): void {
	document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
	window.history.replaceState(null, '', `#${id}`)
}
