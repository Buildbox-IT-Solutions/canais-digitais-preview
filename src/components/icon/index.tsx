import { twMerge } from 'tailwind-merge'
import { ALL_ICON_PATHS } from './paths'
import type { IIconProps } from './types'

/**
 * Componente: Icon — wrapper SVG. viewBox 0 0 24 24, fill currentColor.
 * Paths em ./paths.ts (Material Icons filled + brand icons).
 */
export function Icon({ name, className, title }: IIconProps) {
	const path = ALL_ICON_PATHS[name]
	return (
		<svg
			className={twMerge('size-6', className)}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden={title ? undefined : true}
			role={title ? 'img' : undefined}
		>
			{title ? <title>{title}</title> : null}
			<path d={path} />
		</svg>
	)
}
