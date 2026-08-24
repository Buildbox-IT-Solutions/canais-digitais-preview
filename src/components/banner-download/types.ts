export interface IBannerDownloadProps {
	title: string
	description: string
	ctaLabel: string
	ctaHref: string
	/** Nome sugerido do arquivo. Presente ⇒ a âncora ganha `download` e o clique baixa
	 *  em vez de navegar. Ausente ⇒ link normal. */
	ctaDownload?: string
	onCtaClick?: () => void
	/** Chamado DEPOIS de o download começar, sem cancelar o clique. Para o aviso que
	 *  acompanha a ação (toast), não para interceptá-la — quem intercepta é `onCtaClick`. */
	onCtaDownload?: () => void
	orientation?: 'horizontal' | 'vertical'
	photoSrc?: string
	className?: string
}
