import type { Article } from '~/mocks/articles'

export interface IUltimaSecaoProps {
	title: string
	/** 4 itens. Ordem desktop: [0,1,2,3]. Ordem mobile (Figma 3046:37142): [0,1,3,2]. */
	articles: Article[]
	className?: string
}
