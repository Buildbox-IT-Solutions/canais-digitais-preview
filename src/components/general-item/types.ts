export type GeneralItemIcon = 'download' | 'history' | 'delete'

export interface IGeneralItemProps {
	icon: GeneralItemIcon
	title: string
	desc: string
	href?: string
	danger?: boolean
	isLast?: boolean
	className?: string
}
