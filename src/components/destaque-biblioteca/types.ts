import type { LibraryGate, Material } from '~/mocks/biblioteca'

export interface IDestaqueBibliotecaProps {
	/** O material mais recente — quem escolhe é `materialEmDestaque()`, não este componente. */
	material: Material
	/**
	 * Gate do usuário; o componente cruza com o material via `estaBloqueado()` para
	 * decidir o cadeado no badge E o destino do clique em "Baixar" — os dois sinais saem
	 * do mesmo cálculo, nunca de flags separadas.
	 */
	gate: LibraryGate
	/** Clique em "Baixar" com o material liberado. Repassado à `LibActionBar`. */
	onBaixar?: (material: Material) => void
	/** Clique em "Baixar" com o material bloqueado — abre o modal de incentivo. */
	onBloqueado?: (material: Material) => void
	className?: string
}
