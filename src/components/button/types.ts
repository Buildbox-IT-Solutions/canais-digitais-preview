import type { ReactNode } from 'react'

export type ButtonType = 'filled' | 'outlined' | 'ghost'
export type ButtonSize = 'large' | 'medium' | 'small'
export type ButtonIcon = 'none' | 'arrow-right' | 'plus'

export interface IButtonProps {
	label: string
	href?: string
	type?: ButtonType
	size?: ButtonSize
	icon?: ButtonIcon | ReactNode
	disabled?: boolean
	onClick?: () => void
	className?: string
}
