import type { Material } from '~/mocks/biblioteca'

export interface IBibliotecaSectionProps {
	/** Os 12 materiais mais recentes — quem escolhe é a tela, não o componente. */
	materiais: Material[]
	/** Destino do título e do "ver todos". Default: a aba da área logada. */
	href?: string
	/**
	 * Trava o "Baixar" dos cards: em vez de baixar o arquivo, chama `onBloqueado`. Na home
	 * quem liga isso é a sessão (`!logado`) — sem conta não se baixa material, a mesma
	 * regra que a `DownloadSection` sempre aplicou no banner que esta seção propõe
	 * substituir.
	 */
	bloqueado?: boolean
	/** Clique em "Baixar" com o download travado — na home, abre o incentivo de cadastro. */
	onBloqueado?: (material: Material) => void
	className?: string
}
