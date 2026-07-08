import type { Article } from '~/mocks/articles'

export type CategoryColumnColor = 'mint' | 'primary-600'

export interface ICategoryColumnProps {
	color: CategoryColumnColor
	label: string
	boxedTitle: string
	boxedSeed: string
	list: Article[]
	className?: string
}
