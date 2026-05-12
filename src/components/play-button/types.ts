export type PlayButtonSize = 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall'
export type PlayButtonAs = 'button' | 'div'
export type PlayButtonType = 'play' | 'pause'

export interface IPlayButtonProps {
	size?: PlayButtonSize
	as?: PlayButtonAs
	type?: PlayButtonType
	disabled?: boolean
	onClick?: () => void
	className?: string
}
