import type { LibraryGate, Material } from '~/mocks/biblioteca'

export interface IDestaqueBibliotecaProps {
	/** Os 3 mais recentes — quem escolhe é `materiaisEmDestaque()`, não este componente. */
	materiais: Material[]
	/**
	 * Gate do usuário; o componente cruza com cada material via `estaBloqueado()` só pra
	 * decidir o cadeado no badge. Não há ação de baixar aqui — ver o bloco de doc.
	 */
	gate: LibraryGate
	className?: string
}
