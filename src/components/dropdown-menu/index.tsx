import { twMerge } from '~/lib/tw-merge'
import type { DropdownMenuTone, IDropdownMenuProps } from './types'

/**
 * Componente: Dropdown Menu
 * Figma: Dropdown Menu — `1859:23264`
 * Variantes: tone (neutral | white)
 * Tokens: --color-neutral-50, --color-neutral-100, --color-white
 *
 * Shell de painel para qualquer dropdown. Compõe com MenuListItem. Tom
 * `neutral` (bg neutral-50, rounded-sm) é o usado nos submenus da nav-list
 * pill; `white` (bg white, rounded-lg, com border) é o do UserMenu logado.
 */
const TONE_CLASSES: Record<DropdownMenuTone, string> = {
	neutral: 'bg-neutral-50 rounded-sm shadow-md',
	white: 'bg-white rounded-lg shadow-lg border border-neutral-100',
}

export function DropdownMenu({
	children,
	tone = 'neutral',
	width = 'w-[200px]',
	className,
}: IDropdownMenuProps) {
	return (
		<div
			role="menu"
			className={twMerge('flex flex-col items-start py-2', width, TONE_CLASSES[tone], className)}
		>
			{children}
		</div>
	)
}
