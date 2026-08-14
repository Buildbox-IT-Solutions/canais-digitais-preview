import type { CategoriaColor } from '~/components/categoria/types'
import type { ReadListItemMenuAction } from './read-list-item-menu'

export interface IReadListItemProps {
	category: string
	categoryColor: CategoriaColor
	title: string
	href: string
	readAt: string
	image?: string
	isLast?: boolean
	className?: string
	/** Verbo do rótulo de data ("Lido"/"Salvo"...). Default 'Lido' — não muda Últimas leituras. */
	verbo?: string
	/**
	 * true = conteúdo indisponível (despublicado/excluído/restrito). Título perde o
	 * link (vira texto em tom apagado), imagem mantida com opacidade reduzida, data
	 * substituída por um Badge "Indisponível". O menu (⋮) continua funcional — não
	 * marcamos o item com aria-disabled pra não desabilitar esse botão também.
	 */
	indisponivel?: boolean
	/** Ações do menu "⋮" — vêm de quem chama (Últimas leituras e Favoritos diferem). */
	menuActions: ReadListItemMenuAction[]
}
