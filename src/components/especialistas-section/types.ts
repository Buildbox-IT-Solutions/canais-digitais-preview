export interface IEspecialistasSectionItem {
	img: string
	name: string
	role: string
	quote: string
}

export interface IEspecialistasSectionProps {
	items: IEspecialistasSectionItem[]
	className?: string
}
