export interface IBannerDownloadProps {
	title: string
	description: string
	ctaLabel: string
	ctaHref: string
	onCtaClick?: () => void
	orientation?: 'horizontal' | 'vertical'
	photoSrc?: string
	className?: string
}
