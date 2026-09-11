export type LinkButtonSize = 'xl' | 'lg' | 'md' | 'sm'

export interface ILinkButtonProps {
	label: string
	/**
	 * Destino da navegação. Sem `href`, o componente renderiza `<button>` — use com
	 * `onClick` para ações que acontecem na própria página (dispensar um aviso, por
	 * exemplo). Mesma convenção de `Button` e `IconButton`.
	 */
	href?: string
	/** Ação na própria página. Sem `href`, é o que o `<button>` dispara. */
	onClick?: () => void
	size?: LinkButtonSize
	className?: string
}
