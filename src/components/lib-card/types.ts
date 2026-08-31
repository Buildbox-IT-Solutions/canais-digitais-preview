import type { Material } from '~/mocks/biblioteca'

export interface ILibCardProps {
	material: Material
	/**
	 * Estado `Expanded=On` do Figma — revela o SidePanel (lead + ActionBar) abaixo do
	 * card. Controlado: quem decide é a seção/grade, não o card, porque só ela sabe que
	 * abrir um fecha os outros.
	 */
	aberto?: boolean
	/** Alternância pedida pelo clique no card fechado. */
	onAbertoChange?: (aberto: boolean) => void
	/**
	 * Cruzamento de `material.requerCadastroCompleto` com o gate do usuário — vem pronto
	 * de `estaBloqueado()`, o card não conhece o gate.
	 */
	bloqueado?: boolean
	/** Clique em "Baixar" com o material bloqueado — abre o modal de incentivo. */
	onBloqueado?: (material: Material) => void
	/** O consumidor é quem dá largura ao card — ver o bloco de doc do componente. */
	className?: string
}
