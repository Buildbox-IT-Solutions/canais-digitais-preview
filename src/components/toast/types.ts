export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastAction {
	label: string
	onClick: () => void
}

export interface IToastProps {
	type?: ToastType
	message: string
	action?: ToastAction
	id?: string
	onDismiss?: () => void
	className?: string
}
