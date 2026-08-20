import { twMerge } from '~/lib/tw-merge'
import { BRAND_ICON_PATHS, MATERIAL_ICON_PATHS } from './paths'
import type { IIconProps } from './types'

/**
 * Componente: Icon — wrapper SVG.
 * Ícones Material vêm do Material Symbols Outlined (viewBox `0 -960 960 960`,
 * ver paths.ts); brand icons são SVGs oficiais de cada marca (viewBox
 * `0 0 24 24`).
 */

function isMaterialIcon(name: string): name is keyof typeof MATERIAL_ICON_PATHS {
	return name in MATERIAL_ICON_PATHS
}

export function Icon({ name, className, title }: IIconProps) {
	const cls = twMerge('size-6', className)
	const isLabelled = Boolean(title)
	const isMaterial = isMaterialIcon(name)
	const path = isMaterial ? MATERIAL_ICON_PATHS[name] : BRAND_ICON_PATHS[name]

	return (
		<svg
			className={cls}
			viewBox={isMaterial ? '0 -960 960 960' : '0 0 24 24'}
			fill="currentColor"
			aria-hidden={isLabelled ? undefined : true}
			role={isLabelled ? 'img' : undefined}
		>
			{title ? <title>{title}</title> : null}
			<path d={path} />
		</svg>
	)
}
