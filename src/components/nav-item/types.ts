export interface INavItemProps {
	label: string
	href: string
	dropdown?: boolean
	active?: boolean
	dropdownItems?: Array<{ label: string; href: string }>
	className?: string
}
