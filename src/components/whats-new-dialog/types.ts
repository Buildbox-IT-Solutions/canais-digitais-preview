export interface IWhatsNewDialogProps {
	open: boolean
	/** Fecha o modal — X, clique no scrim e "Pular" (em qualquer passo) chamam o mesmo callback. */
	onClose: () => void
	/** Passo inicial (0-indexed). Só para Storybook/testes — o fluxo real sempre abre no passo 0. Default: 0 */
	initialStep?: number
	className?: string
}
