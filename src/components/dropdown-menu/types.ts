import type { ReactNode } from 'react'

export type DropdownMenuTone = 'neutral' | 'white'

export interface IDropdownMenuProps {
	children: ReactNode
	tone?: DropdownMenuTone
	width?: string
	className?: string
}
