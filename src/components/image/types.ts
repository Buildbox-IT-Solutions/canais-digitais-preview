export type ImageRatio =
	| 'square'
	| '4-3'
	| '3-2'
	| 'video'
	| '21-9'
	| '3-4'
	| '2-3'
	| '9-16'
	| '9-21'

export interface IImageProps {
	src: string
	alt: string
	ratio?: ImageRatio
	className?: string
}
