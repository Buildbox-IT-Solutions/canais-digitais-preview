import type { ReactNode } from 'react'

export type MenuListItemDensity = 'default' | 'compact'

export interface IMenuListItemProps {
	label: string
	href?: string
	onClick?: () => void
	density?: MenuListItemDensity
	leading?: ReactNode
	trailing?: ReactNode
	className?: string
}
