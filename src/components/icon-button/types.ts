import type { IconName } from '~/components/icon/types'

export type IconButtonType = 'filled' | 'outlined' | 'ghost'
export type IconButtonSize = 'large' | 'medium' | 'small'

export interface IIconButtonProps {
	icon: IconName
	label: string
	type?: IconButtonType
	size?: IconButtonSize
	href?: string
	disabled?: boolean
	onClick?: () => void
	ariaHasPopup?: 'menu' | 'dialog' | 'listbox' | 'true'
	ariaExpanded?: boolean
	ariaControls?: string
	className?: string
}
