export interface IBannerNewsletterProps {
	image: string
	title: string
	description: string
	ctaLabel: string
	ctaHref: string
	onCtaClick?: () => void
	className?: string
}
