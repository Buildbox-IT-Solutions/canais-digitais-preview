/**
 * Lê o valor computado real de uma classe Tailwind no navegador — usado pelas
 * foundations sem token customizado no @theme (radius, elevação, container,
 * state layers), que só existem como escala nativa do Tailwind. Gera o valor
 * a partir do CSS compilado de verdade, em vez de uma tabela escrita à mão.
 */
export function probeComputedStyle(className: string, prop: string): string {
	if (typeof document === 'undefined') return ''

	const el = document.createElement('div')
	el.className = className
	el.style.position = 'absolute'
	el.style.visibility = 'hidden'
	el.style.pointerEvents = 'none'
	document.body.appendChild(el)
	const value = getComputedStyle(el).getPropertyValue(prop)
	document.body.removeChild(el)
	return value
}
