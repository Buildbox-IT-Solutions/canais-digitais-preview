import { useEffect, useRef, useState, type TouchEvent as ReactTouchEvent } from 'react'
import { twMerge } from '~/lib/tw-merge'
import type { IBottomSheetProps } from './types'

/**
 * Componente: Bottom Sheet — painel modal que sobe da base da tela.
 * Par vertical do Drawer (que desliza da direita): backdrop escurecido, cantos
 * superiores arredondados, handle, altura pelo conteúdo. Diferente dos demais
 * overlays do projeto, implementa o comportamento completo de diálogo modal:
 * focus trap, scroll lock do body, swipe-to-dismiss, Esc/backdrop e retorno de
 * foco ao trigger. Respeita o safe-area inset inferior (notch/barra de gestos).
 * Tokens: --color-primary-950, --color-white, --color-neutral-200, --animate-slide-up
 */

/** Arraste vertical (px) a partir do qual soltar confirma o fechamento. */
const CLOSE_THRESHOLD = 80

const FOCUSABLE =
	'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function BottomSheet({
	open,
	onClose,
	id,
	labelledById,
	ariaLabel,
	children,
	className,
}: IBottomSheetProps) {
	const panelRef = useRef<HTMLDivElement>(null)
	const previouslyFocused = useRef<HTMLElement | null>(null)
	const dragStartY = useRef<number | null>(null)
	const hasDragged = useRef(false)
	const [dragY, setDragY] = useState(0)
	const [dragging, setDragging] = useState(false)

	// Foco inicial + trap + Esc + scroll lock + retorno de foco. Tudo enquanto aberto.
	useEffect(() => {
		if (!open) return
		previouslyFocused.current = document.activeElement as HTMLElement | null
		hasDragged.current = false

		const panel = panelRef.current
		panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		function onKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				e.preventDefault()
				onClose()
				return
			}
			if (e.key !== 'Tab' || !panel) return
			const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
				(el) => el.offsetParent !== null,
			)
			if (items.length === 0) return
			const first = items[0]
			const last = items[items.length - 1]
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault()
				last.focus()
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault()
				first.focus()
			}
		}

		document.addEventListener('keydown', onKeyDown)
		return () => {
			document.removeEventListener('keydown', onKeyDown)
			document.body.style.overflow = prevOverflow
			previouslyFocused.current?.focus()
		}
	}, [open, onClose])

	if (!open) return null

	function onTouchStart(e: ReactTouchEvent<HTMLDivElement>) {
		dragStartY.current = e.touches[0].clientY
		hasDragged.current = true
		setDragging(true)
	}
	function onTouchMove(e: ReactTouchEvent<HTMLDivElement>) {
		if (dragStartY.current === null) return
		const delta = e.touches[0].clientY - dragStartY.current
		setDragY(delta > 0 ? delta : 0)
	}
	function onTouchEnd() {
		setDragging(false)
		dragStartY.current = null
		if (dragY > CLOSE_THRESHOLD) {
			onClose()
			return
		}
		setDragY(0)
	}

	return (
		<div
			id={id}
			role="dialog"
			aria-modal="true"
			aria-labelledby={labelledById}
			aria-label={labelledById ? undefined : ariaLabel}
			className="fixed inset-0 z-50"
		>
			<button
				type="button"
				aria-label="Fechar"
				onClick={onClose}
				className="absolute inset-0 h-full w-full cursor-pointer bg-primary-950/[.32] animate-fade-in"
			/>

			<div
				ref={panelRef}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
				style={dragging || dragY ? { transform: `translateY(${dragY}px)` } : undefined}
				className={twMerge(
					'absolute inset-x-0 bottom-0 flex flex-col items-stretch rounded-t-2xl bg-white shadow-xl will-change-transform',
					'px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]',
					hasDragged.current ? '' : 'animate-slide-up',
					dragging ? '' : 'transition-transform duration-300 ease-out',
					className,
				)}
			>
				<span
					className="mx-auto mb-4 h-1.5 w-10 shrink-0 rounded-full bg-neutral-200"
					aria-hidden="true"
				/>
				{children}
			</div>
		</div>
	)
}
