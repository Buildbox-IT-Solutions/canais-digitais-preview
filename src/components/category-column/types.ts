import type { Article } from '~/mocks/articles'

export type CategoryColumnColor = 'mint' | 'saffron' | 'primary-600'

export interface ICategoryColumnProps {
	color: CategoryColumnColor
	label: string
	boxedTitle: string
	boxedSeed: string
	/**
	 * Nome do patrocinador do card "boxed" — quando presente, renderiza o selo
	 * "Conteúdo Patrocinado" + este nome (canto superior esquerdo, ver index.tsx).
	 * Quando ausente, o card "boxed" não tem selo (variante não-patrocinada — ver
	 * Figma node 973:6783, onde o frame "Sponsor" desta instância vem oculto).
	 */
	boxedSponsorName?: string
	list: Article[]
	className?: string
}
