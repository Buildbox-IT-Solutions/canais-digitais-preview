import type { CategoriaColor } from '~/components/categoria/types'

export interface IWebstoriesSectionItem {
	seed: string
	color: CategoriaColor
	label: string
	title: string
}

export interface IWebstoriesSectionProps {
	items: IWebstoriesSectionItem[]
	className?: string
}
