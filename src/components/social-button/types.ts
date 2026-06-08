export type SocialProvider = 'linkedin' | 'google'

export interface ISocialButtonProps {
	provider: SocialProvider
	href?: string
	label?: string
	onClick?: () => void
	/**
	 * Variante apenas-ícone (sem rótulo) — usada nos modais de Login/Cadastro v2,
	 * com botões lado a lado e borda neutra. Default: false.
	 */
	iconOnly?: boolean
	className?: string
}
