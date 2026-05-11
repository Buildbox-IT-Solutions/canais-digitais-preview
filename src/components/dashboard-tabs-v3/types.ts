export type DashboardTabId = 'geral' | 'perfil' | 'newsletter' | 'downloads' | 'favoritos' | 'conta'

export interface DashboardTab {
	id: DashboardTabId
	label: string
	disabled?: boolean
	chip?: string
	href?: string
}

export interface IDashboardTabsV3Props {
	active?: DashboardTabId
	tabs?: DashboardTab[]
	baseHref?: string
	queryExtra?: string
	className?: string
}
