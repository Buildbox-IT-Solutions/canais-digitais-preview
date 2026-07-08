import type { VideoArticle } from '~/mocks/articles'

export interface IVideosSectionProps {
	title?: string
	/** 2 a 4 itens (regra de negócio) — items[0] vira o hero no desktop. */
	items: VideoArticle[]
	categoriaHref?: string
	contentHref?: string
	className?: string
}
