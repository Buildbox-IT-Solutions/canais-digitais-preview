import type { IconName } from '~/components/icon/paths'

export type StatusRingAccent = 'primary' | 'mint' | 'neutral' | 'danger'
export type StatusRingSize = 'md' | 'sm'

export interface IStatusRingProps {
	accent: StatusRingAccent
	icon: IconName
	size?: StatusRingSize
	className?: string
}
