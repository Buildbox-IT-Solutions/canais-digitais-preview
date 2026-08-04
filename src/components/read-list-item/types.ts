import type { CategoriaColor } from '~/components/categoria/types'

export interface IReadListItemProps {
	category: string
	categoryColor: CategoriaColor
	title: string
	href: string
	readAt: string
	image?: string
	isLast?: boolean
	className?: string
	onRemove?: () => void
}
