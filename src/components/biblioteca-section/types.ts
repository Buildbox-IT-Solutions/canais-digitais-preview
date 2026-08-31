import type { Material } from '~/mocks/biblioteca'

export interface IBibliotecaSectionProps {
	/** Os 12 materiais mais recentes — quem escolhe é a tela, não o componente. */
	materiais: Material[]
	/** Destino do título e do "ver todos". Default: a aba da área logada. */
	href?: string
	className?: string
}
