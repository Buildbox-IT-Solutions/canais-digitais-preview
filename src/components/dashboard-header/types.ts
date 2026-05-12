import type { IconName } from '~/components/icon/paths'
import type { IHeaderDesktopProps } from '~/components/header-desktop/types'

export type DashboardSectionId =
	| 'visao'
	| 'biblio'
	| 'favoritos'
	| 'arquivos'
	| 'newsletters'
	| 'perfil'
	| 'conta'

export interface DashboardSection {
	id: DashboardSectionId
	label: string
	icon: IconName
	href: string
}

export interface IDashboardHeaderProps {
	headerProps?: IHeaderDesktopProps
	activeSection?: DashboardSectionId
	sections?: DashboardSection[]
	className?: string
}
