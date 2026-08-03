/** Usado pra decidir `scrollIntoView({ behavior: ... })` nos componentes de TOC. */
export function prefersReducedMotion(): boolean {
	return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
