import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import type { INavItemProps } from './types'

/**
 * Componente: Nav Item
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=121-2360
 * Variantes: default | hover | active × com/sem dropdown
 * Tokens: --color-primary-100, --color-primary-600, --color-secondary-950, --color-neutral-50,
 *         --color-neutral-900
 */
export function NavItem({
	label,
	href,
	dropdown = false,
	active = false,
	dropdownItems,
	className,
}: INavItemProps) {
	const containerClasses = twMerge(
		'relative flex flex-col items-center transition-colors',
		active ? 'bg-primary-100' : 'group hover:bg-primary-100',
		className,
	)
	const linkPadding = dropdown ? 'gap-1 pl-3 pr-2' : 'px-3'
	const labelClasses = twMerge(
		'font-body font-bold text-label-lg whitespace-nowrap transition-colors',
		active ? 'text-secondary-950' : 'text-primary-600 group-hover:text-secondary-950',
	)
	const chevronClasses = twMerge(
		'size-5 transition-all',
		active
			? 'text-secondary-950 rotate-180'
			: 'text-primary-600 group-hover:text-secondary-950 group-hover:rotate-180',
	)
	const underlineClasses = twMerge(
		'h-1 w-full transition-colors',
		active ? 'bg-secondary-950' : 'group-hover:bg-secondary-950',
	)

	return (
		<div className={containerClasses}>
			<a href={href} className={`flex ${linkPadding} items-center min-h-8 pb-2 pt-3`}>
				<span className={labelClasses}>{label}</span>
				{dropdown ? <Icon name="arrow-drop-down" className={chevronClasses} /> : null}
			</a>
			<div className="flex flex-col h-1 items-start px-3 w-full">
				<div className={underlineClasses} />
			</div>
			{dropdown && dropdownItems && dropdownItems.length > 0 ? (
				<div className="absolute top-full left-0 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150">
					<div className="bg-neutral-50 flex items-start py-2 rounded-sm shadow-md w-[200px] mt-1">
						<div className="flex flex-1 flex-col items-start min-w-0">
							{dropdownItems.map((item) => (
								<a
									key={item.label}
									href={item.href}
									className="flex h-14 items-center px-3 py-2 w-full hover:bg-black/8 font-body font-semibold text-body-lg text-neutral-900"
								>
									{item.label}
								</a>
							))}
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}
