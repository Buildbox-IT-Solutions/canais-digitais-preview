import type { CategoriaColor } from '~/components/categoria/types'

export interface IWebstoryCardProps {
	title: string
	image: string
	label: string
	color: CategoriaColor
	href?: string
	className?: string
}
