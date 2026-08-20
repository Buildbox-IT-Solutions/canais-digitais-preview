export type ProfileBoxIcon = 'account-circle' | 'work' | 'location-on'

export interface IProfileBoxProps {
	icon: ProfileBoxIcon
	title: string
	description: string
	fields: string[]
	href?: string
	cta?: string
	incomplete?: boolean
	placeholder?: boolean
	chip?: string
	className?: string
}
