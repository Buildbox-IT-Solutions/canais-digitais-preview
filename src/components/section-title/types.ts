export type SectionTitleColor =
	| 'primary-600'
	| 'secondary-950'
	| 'secondary-500'
	| 'lavander'
	| 'coral'
	| 'saffron'
	| 'mint'
	| 'neutral-950'
	| 'white'

export interface ISectionTitleProps {
	label: string
	color?: SectionTitleColor
	href?: string
	uppercase?: boolean
	className?: string
}
