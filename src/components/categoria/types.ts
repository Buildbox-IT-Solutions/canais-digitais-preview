export type CategoriaColor =
	| 'coral'
	| 'mint'
	| 'saffron'
	| 'lavander'
	| 'secondary-950'
	| 'secondary-500'
	| 'primary-600'

export interface ICategoriaProps {
	label: string
	color: CategoriaColor
	chip?: boolean
	href?: string
	className?: string
}
