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
	/**
	 * No mobile (<lg), o dialog ocupa a tela cheia em vez de card centralizado.
	 * Default: false. Ver `Modal.mobileFullScreen`.
	 */
	mobileFullScreen?: boolean
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
