import type { ReactNode } from 'react'

export interface ILibCarouselProps {
	/** Itens do trilho — devem ser `<li>`, o carrossel renderiza a `<ul>`. */
	children: ReactNode
	/** Nome acessível do trilho, ex.: "Novidades para você". */
	ariaLabel: string
	className?: string
}
