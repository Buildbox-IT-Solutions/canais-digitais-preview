/**
 * Componente: VideoCard
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=1678-20955
 * Variantes: idêntico ao NewsCard + PlayButton no overlay da thumb; size extra xsmall (H)
 * Tokens: herda do NewsCard
 */
import { NewsCard } from '~/components/news-card'
import { PlayButton } from '~/components/play-button'
import type { IVideoCardProps } from './types'
import type { NewsCardSize } from '~/components/news-card/types'

export function VideoCard({ size = 'large', ...props }: IVideoCardProps) {
	const playSize = size === 'xsmall' ? 'xsmall' : 'small'
	const newsSize: NewsCardSize = size === 'xsmall' ? 'small' : size
	return (
		<NewsCard
			{...props}
			size={newsSize}
			mediaOverlay={<PlayButton size={playSize} as="div" />}
		/>
	)
}
