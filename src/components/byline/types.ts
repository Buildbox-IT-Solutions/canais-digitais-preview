export type BylineSize = 'md' | 'sm'

export interface IBylineProps {
	author: string
	href?: string
	size?: BylineSize
	className?: string
}
