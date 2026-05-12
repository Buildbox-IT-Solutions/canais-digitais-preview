export type AccessMethodIcon = 'mail' | 'linkedin' | 'google'

export interface IAccessMethodCardProps {
	icon: AccessMethodIcon
	name: string
	chip?: string
	detail: string
	cta?: string
	ctaHref?: string
	className?: string
}
