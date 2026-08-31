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
	 * Selo sobre a MÍDIA, canto superior direito com inset de 16px (Figma `CardHighlight`
	 * 8480:3299 — badge em x=991/y=16 num card de 1080). Substituiu, em 2026-08-31, um
	 * slot `badge` que punha o selo ao lado da categoria: o Figma do destaque da
	 * Biblioteca moveu o selo para cima da imagem, e manter os dois slots deixaria um sem
	 * consumidor.
	 *
	 * ⚠️ Divide o canto com o toggle de favoritar da mídia (`contentId`, em `top-2
	 * right-2`). Nenhum design usa os dois juntos; se algum passar a usar, um dos dois
	 * precisa trocar de canto.
	 */
	mediaBadge?: ReactNode
	/**
	 * Barra de ações ancorada no RODAPÉ da coluna de texto (Figma `CardHighlight`: a
	 * ActionBar fica a 24px da base, com `justify-between` separando-a do bloco de
	 * texto). Em `boxed` é irmã do conteúdo, para o `justify-between` do painel poder
	 * empurrá-la para baixo; nas outras variantes ela entra no fim da própria coluna de
	 * texto.
	 */
	actions?: ReactNode
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
