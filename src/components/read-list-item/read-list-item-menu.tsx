import { useEffect, useId, useRef, useState } from 'react'
import { BottomSheet } from '~/components/bottom-sheet'
import { DropdownMenu } from '~/components/dropdown-menu'
import { Icon } from '~/components/icon'
import type { IconName } from '~/components/icon/types'
import { IconButton } from '~/components/icon-button'
import { MenuListItem } from '~/components/menu-list-item'
import { useClickAwayAndEscape } from '~/lib/use-click-away-and-escape'
import { useMediaQuery } from '~/lib/use-media-query'

export interface ReadListItemMenuAction {
	label: string
	icon: IconName
	onClick: () => void
}

/**
 * Menu de ações do ReadListItem — dropdown ancorado no desktop (≥1024px, mesmo
 * breakpoint do UserMenu do header), bottom sheet no mobile. As ações vêm de quem
 * chama (Últimas leituras e Favoritos têm conjuntos diferentes, inclusive variando
 * por item — ver dashboard-perfil-v4) — este componente não sabe o que cada uma faz.
 */
export function ReadListItemMenu({
	title,
	actions,
	triggerClassName,
}: {
	title: string
	actions: ReadListItemMenuAction[]
	triggerClassName?: string
}) {
	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery('(min-width: 1024px)')
	const containerRef = useRef<HTMLDivElement>(null)
	const panelId = useId()

	useClickAwayAndEscape(containerRef, containerRef, open && isDesktop, () => setOpen(false))

	useEffect(() => {
		setOpen(false)
	}, [isDesktop])

	function runAndClose(action: () => void) {
		setOpen(false)
		action()
	}

	const menuItems = (
		<>
			{actions.map((action) => (
				<MenuListItem
					key={action.label}
					label={action.label}
					density="compact"
					leading={<Icon name={action.icon} className="size-5" />}
					onClick={() => runAndClose(action.onClick)}
				/>
			))}
		</>
	)

	return (
		<div ref={containerRef} className="relative">
			<IconButton
				icon="more-vert"
				label={`Mais ações para "${title}"`}
				className={triggerClassName}
				ariaHasPopup="menu"
				ariaExpanded={open}
				ariaControls={open ? panelId : undefined}
				onClick={() => setOpen((v) => !v)}
			/>

			{open && isDesktop ? (
				<div id={panelId} className="absolute right-0 top-full z-50 mt-2 origin-top-right animate-fade-up-sm">
					<DropdownMenu tone="white" width="w-80" className="py-2">
						{menuItems}
					</DropdownMenu>
				</div>
			) : null}

			<BottomSheet
				open={open && !isDesktop}
				onClose={() => setOpen(false)}
				id={panelId}
				ariaLabel={`Mais ações para "${title}"`}
			>
				{menuItems}
			</BottomSheet>
		</div>
	)
}
