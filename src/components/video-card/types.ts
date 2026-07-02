import type { INewsCardProps, NewsCardSize } from '~/components/news-card/types'

/** Video Card tem um size extra (xsmall, só horizontal) além dos do NewsCard. */
export type VideoCardSize = NewsCardSize | 'xsmall'

export interface IVideoCardProps extends Omit<INewsCardProps, 'size' | 'mediaOverlay'> {
	size?: VideoCardSize
}
