import { twMerge } from 'tailwind-merge'
import { Icon } from '~/components/icon'
import type { IconTileTone, IIconTileProps } from './types'

/**
 * Componente: Icon Tile — quadrado 48×48 com ícone 24px
 * Usado em session-row, general-item, stat-card, download-item.
 * Tokens: --color-neutral-50, --color-primary-600, --color-neutral-200, red-100/700 (Tailwind default)
 */

const TONE_CLASSES: Record<IconTileTone, string> = {
	neutral: 'bg-neutral-50 text-primary-600',
	danger: 'bg-red-100 text-red-700',
	disabled: 'bg-neutral-50 text-neutral-200',
}

export function IconTile({ icon, tone = 'neutral', className }: IIconTileProps) {
	return (
		<div
			className={twMerge(
				'inline-flex items-center justify-center size-12 rounded-lg shrink-0',
				TONE_CLASSES[tone],
				className,
			)}
		>
			<Icon name={icon} className="size-6" />
		</div>
	)
}
