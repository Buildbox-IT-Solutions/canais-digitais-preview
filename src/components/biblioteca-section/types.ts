import type { Material } from '~/mocks/biblioteca'

export interface IBibliotecaSectionProps {
	/** Os 12 materiais mais recentes — quem escolhe é a tela, não o componente. */
	materiais: Material[]
	/** Destino do título e do "ver todos". Default: a aba da área logada. */
	href?: string
	/**
	 * Trava o "Baixar" de um material: em vez de baixar o arquivo, chama `onBloqueado`.
	 * É POR MATERIAL, não um booleano da seção — os dois motivos de travar têm alcances
	 * diferentes:
	 *
	 * - **sem conta** trava tudo (regra do site: sem conta não se baixa material);
	 * - **cadastro incompleto** trava só os materiais que exigem cadastro completo, que é
	 *   a mesma regra da aba (`estaBloqueado`).
	 *
	 * Quem decide é a tela, que conhece sessão e gate; a seção só pergunta.
	 */
	bloqueado?: (material: Material) => boolean
	/** Clique em "Baixar" com o download travado — na home, abre o incentivo de cadastro. */
	onBloqueado?: (material: Material) => void
	className?: string
}
