import type { ReactNode } from 'react'

export type ButtonType = 'filled' | 'outlined' | 'ghost'
export type ButtonTone = 'default' | 'inverse'
export type ButtonSize = 'large' | 'medium' | 'small'
export type ButtonIcon = 'none' | 'arrow-right' | 'plus'

export interface IButtonProps {
	label: string
	href?: string
	type?: ButtonType
	/** Para uso sobre fundo escuro/colorido (ex.: banners com gradient). Default: 'default'. */
	tone?: ButtonTone
	size?: ButtonSize
	icon?: ButtonIcon | ReactNode
	disabled?: boolean
	onClick?: () => void
	className?: string
}
