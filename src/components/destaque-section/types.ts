import type { Article } from '~/mocks/articles'

export interface IDestaqueSectionProps {
	hero: Article
	top2: Article
	top3: Article
	/** 3 itens, sem imagem (coluna de texto do desktop). */
	heroText: Article[]
	/** 3 itens; o primeiro vira o card "Patrocinado" no mobile. */
	heroBottom: Article[]
	className?: string
}
