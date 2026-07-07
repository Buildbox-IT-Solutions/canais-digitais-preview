export interface IEspecialista {
	img: string
	name: string
	role: string
	quote: string
}

export interface IEspecialistasSectionProps {
	items: IEspecialista[]
	className?: string
}
