import type { ReactNode } from 'react'

export interface IDrawerProps {
	open: boolean
	title: string
	children: ReactNode
	onClose?: () => void
	onCancel?: () => void
	onSave?: () => void
	closeHref?: string
	cancelHref?: string
	saveHref?: string
	saveDisabled?: boolean
	saveLabel?: string
	cancelLabel?: string
	className?: string
}
