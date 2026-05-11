import type { IconName } from '~/components/icon/paths'

export type IconTileTone = 'neutral' | 'danger' | 'disabled'

export interface IIconTileProps {
	icon: IconName
	tone?: IconTileTone
	className?: string
}
