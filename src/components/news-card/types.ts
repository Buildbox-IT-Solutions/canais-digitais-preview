import type { ReactNode } from 'react'
import type { ICategoriaProps } from '~/components/categoria/types'
import type { ThumbnailRatio } from '~/components/thumbnail/types'

export type NewsCardSize = 'xlarge' | 'large' | 'medium' | 'small'
export type NewsCardOrientation = 'vertical' | 'horizontal'

export interface INewsCardProps {
	title: string
	/** Sem imagem, o card renderiza só categoria + título + descrição (bool "Image" do Figma). */
	image?: string
	href?: string
	/**
	 * Id do conteúdo, usado só para ligar o toggle de favoritar. Sem essa prop, o
	 * card renderiza exatamente como antes da feature Favoritos — sem toggle.
	 */
	contentId?: string
	size?: NewsCardSize
	orientation?: NewsCardOrientation
	categoria?: Pick<ICategoriaProps, 'label' | 'color' | 'href' | 'chip'>
	/**
	 * Slot à ESQUERDA da categoria, na mesma linha (`Frame 3` do Figma, gap 12px). Criado
	 * para o Destaque da Biblioteca exclusiva, que precisa do badge de tipo/cadeado ao
	 * lado da categoria. Sem ele o card renderiza exatamente como antes — a linha só
	 * existe quando `badge` vem.
	 */
	badge?: ReactNode
	lead?: string
	author?: string
	authorHref?: string
	/** Overlay injetado na Thumbnail (usado pelo VideoCard para o PlayButton). */
	mediaOverlay?: ReactNode
	/** Sobrescreve as classes do wrapper de mídia no layout horizontal (escape hatch de largura). */
	mediaClassName?: string
	/** Proporção da Thumbnail — default `video` (16:9). Ex.: `photo` (3:2) na lista compacta de CategoryColumn. */
	mediaRatio?: ThumbnailRatio
	/** Escape hatch pro título — ex.: `line-clamp-4` onde não há categoria/lead sobrando espaço vertical. */
	titleClassName?: string
	/** Escape hatch pro lead — simétrico ao `titleClassName` (ex.: `line-clamp-3`). */
	leadClassName?: string
	/**
	 * Moldura própria: borda + `rounded-lg`, conteúdo com padding e mídia sangrando
	 * até a borda do card ("News Card 2.0 / Boxed" no Figma). Em `orientation="horizontal"`
	 * o card vira split 50/50 que empilha abaixo de `lg:`.
	 */
	boxed?: boolean
	/** Patrocinador ("News Card 2.0 / Patrocinado"): SponsorLine ancorada no rodapé do card. */
	sponsor?: { company: string; href?: string }
	className?: string
}
