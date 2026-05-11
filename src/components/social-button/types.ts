export type SocialProvider = 'linkedin' | 'google'

export interface ISocialButtonProps {
	provider: SocialProvider
	href?: string
	label?: string
	onClick?: () => void
	className?: string
}
