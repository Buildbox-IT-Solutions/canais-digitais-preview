import type { ReactNode } from 'react'

export type BadgeTone = 'mint' | 'neutral' | 'coral' | 'secondary'
export type BadgeShape = 'square' | 'pill'

export interface IBadgeProps {
	label: string
	tone?: BadgeTone
	shape?: BadgeShape
	icon?: ReactNode
	className?: string
}
