export interface IWidgetPodcastItem {
	category: string
	title: string
	image: string
	sponsor?: string
	sponsorHref?: string
}

export interface IWidgetPodcastProps {
	items: IWidgetPodcastItem[]
	allEpisodesHref?: string
	className?: string
}
