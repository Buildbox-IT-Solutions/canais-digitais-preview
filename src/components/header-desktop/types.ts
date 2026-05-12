export interface NavCategory {
	label: string
	href: string
	slug: string
	dropdown?: boolean
	dropdownItems?: Array<{ label: string; href: string }>
}

export interface IHeaderDesktopProps {
	categories?: NavCategory[]
	activeCategory?: string | null
	userLoggedIn?: boolean
	userName?: string
	userInitials?: string
	userAvatar?: string | null
	className?: string
}
