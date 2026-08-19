export type DownloadItemIcon = 'picture-as-pdf' | 'docs' | 'image'

export interface IDownloadItemProps {
	icon: DownloadItemIcon
	title: string
	date?: string
	size?: string
	titleHref?: string
	fileHref?: string
	disabled?: boolean
	isLast?: boolean
	className?: string
}
