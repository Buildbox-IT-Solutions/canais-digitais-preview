export type DashboardTabId =
	| 'perfil'
	| 'conta'
	| 'ultimas'
	| 'favoritos'
	| 'newsletter'
	| 'downloads'

export interface DashboardTab {
	id: DashboardTabId
	label: string
	disabled?: boolean
	chip?: string
	href?: string
}

export interface IDashboardTabsV4Props {
	active?: DashboardTabId
	tabs?: DashboardTab[]
	baseHref?: string
	queryExtra?: string
	className?: string
}
