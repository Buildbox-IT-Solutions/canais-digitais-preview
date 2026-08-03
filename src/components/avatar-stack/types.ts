export interface IAvatarStackAuthor {
	name: string
	avatarUrl: string
}

export interface IAvatarStackProps {
	authors: IAvatarStackAuthor[]
	className?: string
}
