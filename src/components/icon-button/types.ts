import type { IconName } from '~/components/icon/types'

export type IconButtonType = 'filled' | 'outlined' | 'ghost'
export type IconButtonSize = 'large' | 'medium' | 'small'

export interface IIconButtonProps {
	icon: IconName
	label: string
	type?: IconButtonType
	size?: IconButtonSize
	href?: string
	/** Só faz sentido com `href` externo (ex.: wa.me) — abre em nova aba. */
	target?: '_blank'
	disabled?: boolean
	onClick?: () => void
	ariaHasPopup?: 'menu' | 'dialog' | 'listbox' | 'true'
	ariaExpanded?: boolean
	ariaControls?: string
	/** Só se aplica ao branch `<button>` (sem `href`) — usado pelo componente Toggle. */
	ariaPressed?: boolean
	className?: string
}
