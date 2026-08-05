import type { ComponentType, SVGProps } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { MATERIAL_ICONS } from './material-icons'
import { BRAND_ICON_PATHS, MATERIAL_ICON_EXCEPTIONS } from './paths'
import type { IIconProps } from './types'

/**
 * Componente: Icon — wrapper SVG. viewBox 0 0 24 24 (implícito nos ícones do
 * pacote), fill currentColor.
 * Ícones Material vêm de @material-icons/svg (ver material-icons.ts); exceções
 * hand-rolled e brand icons vêm de paths.ts.
 */

/**
 * `*.svg` (src/types/svg.d.ts) tipa o componente gerado pelo svgr como
 * `React.FC<React.SVGProps<SVGElement>>`, que não inclui `title` — mas
 * `svgrOptions.titleProp: true` (vite.config.ts) faz o svgr aceitar e
 * renderizar essa prop em tempo de execução. Cast local para refletir isso
 * sem alterar a declaração de tipo global do `*.svg`.
 */
type MaterialIconComponent = ComponentType<SVGProps<SVGElement> & { title?: string }>

function isPackagedMaterialIcon(name: string): name is keyof typeof MATERIAL_ICONS {
	return name in MATERIAL_ICONS
}

function isMaterialException(name: string): name is keyof typeof MATERIAL_ICON_EXCEPTIONS {
	return name in MATERIAL_ICON_EXCEPTIONS
}

export function Icon({ name, className, title }: IIconProps) {
	const cls = twMerge('size-6', className)
	const isLabelled = Boolean(title)

	if (isPackagedMaterialIcon(name)) {
		const MaterialIcon = MATERIAL_ICONS[name] as MaterialIconComponent
		return (
			<MaterialIcon
				className={cls}
				fill="currentColor"
				title={title}
				aria-hidden={isLabelled ? undefined : true}
				role={isLabelled ? 'img' : undefined}
			/>
		)
	}

	const path = isMaterialException(name) ? MATERIAL_ICON_EXCEPTIONS[name] : BRAND_ICON_PATHS[name]
	return (
		<svg
			className={cls}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden={isLabelled ? undefined : true}
			role={isLabelled ? 'img' : undefined}
		>
			{title ? <title>{title}</title> : null}
			<path d={path} />
		</svg>
	)
}
