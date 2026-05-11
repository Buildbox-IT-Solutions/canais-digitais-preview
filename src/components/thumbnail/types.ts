import type { ReactNode } from 'react'

export type ThumbnailRatio = 'video' | 'photo' | 'square'

export interface IThumbnailProps {
	src: string
	alt: string
	href?: string
	ratio?: ThumbnailRatio
	radius?: boolean
	overlay?: ReactNode
	className?: string
}
