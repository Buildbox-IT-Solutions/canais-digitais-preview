export interface IAccessInviteProps {
	/** id aplicado no `<h2>` do título, para rotular o popover/sheet via aria-labelledby. */
	titleId?: string
	/**
	 * Densidade por contexto:
	 * - `sheet` (padrão): título maior e botões `large` — alvo de toque no mobile.
	 * - `popover`: título e botões compactos (`small`) para o dropdown do desktop.
	 */
	variant?: 'sheet' | 'popover'
	className?: string
}
