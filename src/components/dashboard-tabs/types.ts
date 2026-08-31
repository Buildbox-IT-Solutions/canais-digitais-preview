export type DashboardTabId =
	| 'perfil'
	| 'conta'
	| 'ultimas'
	| 'favoritos'
	| 'newsletter'
	| 'downloads'
	| 'biblioteca'

export interface DashboardTab {
	id: DashboardTabId
	label: string
	disabled?: boolean
	chip?: string
	href?: string
}

export interface IDashboardTabsProps {
	active?: DashboardTabId
	tabs?: DashboardTab[]
	baseHref?: string
	queryExtra?: string
	className?: string
}
