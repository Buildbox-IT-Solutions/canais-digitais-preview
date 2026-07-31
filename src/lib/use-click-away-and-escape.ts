import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Fecha (`onClose`) ao clicar fora do `triggerRef`/`panelRef`, ou ao
 * pressionar Escape. Compartilhado entre as variantes de TOC que abrem o
 * painel por clique (Opção 1 e Opção 3) — a Opção 2 abre por hover e não usa.
 */
export function useClickAwayAndEscape(
	triggerRef: RefObject<HTMLElement | null>,
	panelRef: RefObject<HTMLElement | null>,
	enabled: boolean,
	onClose: () => void,
): void {
	useEffect(() => {
		if (!enabled) return

		function handleClickOutside(e: MouseEvent) {
			const target = e.target as Node
			if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return
			onClose()
		}
		function handleEscape(e: KeyboardEvent) {
			if (e.key === 'Escape') onClose()
		}

		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('keydown', handleEscape)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleEscape)
		}
	}, [triggerRef, panelRef, enabled, onClose])
}
