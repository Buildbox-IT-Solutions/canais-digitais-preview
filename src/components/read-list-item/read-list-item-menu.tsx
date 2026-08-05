import { useEffect, useId, useRef, useState } from 'react'
import { BottomSheet } from '~/components/bottom-sheet'
import { DropdownMenu } from '~/components/dropdown-menu'
import { Icon } from '~/components/icon'
import { IconButton } from '~/components/icon-button'
import { MenuListItem } from '~/components/menu-list-item'
import { useClickAwayAndEscape } from '~/lib/use-click-away-and-escape'
import { useMediaQuery } from '~/lib/use-media-query'

/**
 * Menu de ações do ReadListItem — dropdown ancorado no desktop (≥1024px, mesmo
 * breakpoint do UserMenu do header), bottom sheet no mobile. "Salvar como
 * favorito" ainda não tem ação — reservado pra próxima feature (favoritos).
 */
export function ReadListItemMenu({
	title,
	onShare,
	onRemove,
	triggerClassName,
}: {
	title: string
	onShare: () => void
	onRemove?: () => void
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

	function runAndClose(action?: () => void) {
		setOpen(false)
		action?.()
	}

	const menuItems = (
		<>
			<MenuListItem
				label="Compartilhar"
				density="compact"
				leading={<Icon name="share" className="size-5" />}
				onClick={() => runAndClose(onShare)}
			/>
			<MenuListItem
				label="Salvar como favorito"
				density="compact"
				leading={<Icon name="bookmark-border" className="size-5" />}
				onClick={() => setOpen(false)}
			/>
			<MenuListItem
				label="Remover de últimas leituras"
				density="compact"
				leading={<Icon name="delete-outline" className="size-5" />}
				onClick={() => runAndClose(onRemove)}
			/>
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
