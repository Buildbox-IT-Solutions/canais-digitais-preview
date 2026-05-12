import { twMerge } from '~/lib/tw-merge'
import type { IMenuListItemProps } from './types'

/**
 * Componente: Menu List Item
 * Figma: Building Blocks / Menu list item — `1859:23314`
 * Variantes: density (default 56px = h-14 | compact 48px = h-12) × leading × trailing
 * Tokens: --color-neutral-900
 *
 * Linha de menu reutilizável. Usada em DropdownMenu (NavItem submenus) e
 * em qualquer outro list-of-items vertical. O hover usa o state-layer MD3
 * `bg-black/8` documentado no CLAUDE.md.
 */
const DENSITY_HEIGHT: Record<NonNullable<IMenuListItemProps['density']>, string> = {
	default: 'h-14',
	compact: 'h-12',
}

export function MenuListItem({
	label,
	href,
	onClick,
	density = 'default',
	leading,
	trailing,
	className,
}: IMenuListItemProps) {
	const classes = twMerge(
		'flex items-center gap-3 w-full px-3 py-2 hover:bg-black/8 transition-colors font-body font-semibold text-body-lg text-neutral-900',
		DENSITY_HEIGHT[density],
		className,
	)

	const content = (
		<>
			{leading ? <span className="inline-flex shrink-0 items-center">{leading}</span> : null}
			<span className="flex-1 min-w-0 truncate text-left">{label}</span>
			{trailing ? <span className="inline-flex shrink-0 items-center">{trailing}</span> : null}
		</>
	)

	if (href) {
		return (
			<a href={href} className={classes}>
				{content}
			</a>
		)
	}

	if (onClick) {
		return (
			<button type="button" onClick={onClick} className={classes}>
				{content}
			</button>
		)
	}

	return <span className={classes}>{content}</span>
}
