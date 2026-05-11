import type { IconName } from '~/components/icon/paths'

export interface IStatCardProps {
	icon: IconName
	label: string
	value: string | number
	href?: string
	className?: string
}
