export type AlertType = 'success' | 'error' | 'warning' | 'info'

export interface IAlertProps {
	type?: AlertType
	title?: string
	message: string
	className?: string
}
