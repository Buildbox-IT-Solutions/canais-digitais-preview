export type PodcastMetaSize = 'md' | 'sm'

export interface IPodcastMetaProps {
	time: string
	author: string
	href?: string
	size?: PodcastMetaSize
	className?: string
}
