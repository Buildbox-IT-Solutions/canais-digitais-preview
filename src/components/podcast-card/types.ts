export interface IPodcastCardProps {
	category: string
	title: string
	image: string
	href?: string
	/** Quando presente, renderiza wrapper bordado + linha de patrocinador. */
	sponsor?: string
	sponsorHref?: string
	className?: string
}
