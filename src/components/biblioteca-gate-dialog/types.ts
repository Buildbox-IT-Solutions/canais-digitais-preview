export interface IBibliotecaGateDialogProps {
	open: boolean
	/** Leva para a aba Meu perfil ("O clique do modal leva para a aba Meu perfil" — anotação). */
	onCompletarPerfil: () => void
	onDismiss: () => void
}
