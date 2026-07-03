import type { ReactNode } from 'react'
import type { IconName } from '~/components/icon/paths'

export type DialogIconTone = 'primary' | 'secondary' | 'danger' | 'warning' | 'success'
export type DialogSize = 'sm' | 'md' | 'lg'

export interface DialogAction {
	label: string
	href?: string
	onClick?: () => void
	type?: 'button' | 'submit'
	form?: string
	icon?: IconName
	iconPosition?: 'leading' | 'trailing'
}

export interface IDialogProps {
	open?: boolean
	size?: DialogSize
	closeHref?: string
	onClose?: () => void
	labelledById?: string
	icon?: { name: IconName; tone?: DialogIconTone }
	eyebrow?: ReactNode
	title: string
	description?: ReactNode
	children?: ReactNode
	primary?: DialogAction
	secondary?: DialogAction
	destructive?: boolean
	bottomLink?: ReactNode
}
