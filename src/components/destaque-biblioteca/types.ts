import type { LibraryGate, Material } from '~/mocks/biblioteca'

export interface IDestaqueBibliotecaProps {
	/** O material mais recente — quem escolhe é `materialEmDestaque()`, não este componente. */
	material: Material
	/**
	 * Gate do usuário; o componente cruza com o material via `estaBloqueado()` só pra
	 * decidir o cadeado no badge. Não há ação de baixar aqui — ver o bloco de doc.
	 */
	gate: LibraryGate
	className?: string
}
