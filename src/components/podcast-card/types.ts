export interface IPodcastCardProps {
	category: string
	title: string
	image: string
	/** Quando presente, renderiza wrapper bordado + linha de patrocinador. */
	sponsor?: string
	sponsorHref?: string
	className?: string
}
