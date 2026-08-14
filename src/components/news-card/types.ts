import type { ReactNode } from 'react'
import type { ICategoriaProps } from '~/components/categoria/types'
import type { ThumbnailRatio } from '~/components/thumbnail/types'

export type NewsCardSize = 'large' | 'medium' | 'small'
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
	className?: string
}
