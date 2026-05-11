export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface IToastProps {
	type?: ToastType
	message: string
	id?: string
	onDismiss?: () => void
	className?: string
}
