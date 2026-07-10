import type { IconName } from '~/components/icon/paths'

export interface IIncentiveBannerProps {
	open: boolean
	icon: IconName
	title: string
	titleHighlight: string
	description: string
	/** URL da textura decorativa de fundo (20% opacidade). Sem imagem, fica só o gradiente. */
	backgroundImage?: string
	onCreateAccount: () => void
	onLogin: () => void
	onDismiss: () => void
}
