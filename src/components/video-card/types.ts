import type { ICategoriaProps } from '~/components/categoria/types'

export type VideoCardSize = 'lg' | 'sm' | 'xs'
export type VideoCardOrientation = 'vertical' | 'horizontal'

export interface IVideoCardProps {
	title: string
	image: string
	href?: string
	size?: VideoCardSize
	orientation?: VideoCardOrientation
	categoria?: Pick<ICategoriaProps, 'label' | 'color' | 'href'>
	lead?: string
	className?: string
}
