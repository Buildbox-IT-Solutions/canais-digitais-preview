export type LinkButtonSize = 'xl' | 'lg' | 'md' | 'sm'

export interface ILinkButtonProps {
	label: string
	href: string
	size?: LinkButtonSize
	className?: string
}
