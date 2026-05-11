export type AvatarShape = 'rounded' | 'squared'

export interface IAvatarProps {
	src: string
	alt: string
	shape?: AvatarShape
	className?: string
}
