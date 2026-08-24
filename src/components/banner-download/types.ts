export interface IBannerDownloadProps {
	title: string
	description: string
	ctaLabel: string
	ctaHref: string
	/** Nome sugerido do arquivo. Presente ⇒ a âncora ganha `download` e o clique baixa
	 *  em vez de navegar. Ausente ⇒ link normal. */
	ctaDownload?: string
	onCtaClick?: () => void
	orientation?: 'horizontal' | 'vertical'
	photoSrc?: string
	/** Âncora de rolagem — usada no retorno pós-login para trazer o CTA à vista. */
	id?: string
	className?: string
}
