export interface IFilterBarItem {
	slug: string
	label: string
}

export interface IFilterBarProps {
	itens: IFilterBarItem[]
	/** Slug ativo. `'todos'` (ou ausente) = sem filtro. */
	ativo: string
	/** Chamado ao escolher um filtro. Quem navega/grava na URL é o consumidor. */
	onSelecionar: (slug: string) => void
	className?: string
}
