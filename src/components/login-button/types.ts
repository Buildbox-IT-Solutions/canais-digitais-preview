export interface ILoginButtonProps {
	logged?: boolean
	name?: string
	initials?: string
	avatar?: string | null
	href?: string
	onClick?: () => void
	className?: string
}
