import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { Toast } from '~/components/toast'
import { dismissToast, getToasts, pauseAll, resumeAll, subscribeToasts, type ToastRecord } from '~/lib/toast-store'
import type { IToasterProps } from './types'

const COLLAPSE_OFFSET = 14
const EXPANDED_GAP = 12

/**
 * Componente: Toaster
 * Container global que empilha os toasts disparados via `toast.success(...)` /
 * `toast.error(...)` (ver `~/lib/toast-store`) — pilha colapsada estilo sonner (mais
 * nova na frente, anteriores "espiando" atrás), expande em lista no hover e pausa o
 * auto-dismiss enquanto expandida. Montado uma única vez na raiz do app (ver router.tsx).
 * Tokens: herdados do componente `Toast`.
 */
export function Toaster({ className }: IToasterProps) {
	const toasts = useSyncExternalStore(subscribeToasts, getToasts, getToasts)
	const [expanded, setExpanded] = useState(false)
	const [heights, setHeights] = useState<Record<number, number>>({})

	// [0] = toast mais nova (na frente); [1], [2]... = mais antigas (espiando atrás).
	const visible = useMemo(() => [...toasts].filter((t) => t.status === 'visible').reverse(), [toasts])

	const reportHeight = useCallback((id: number, height: number) => {
		setHeights((prev) => (prev[id] === height ? prev : { ...prev, [id]: height }))
	}, [])

	if (visible.length === 0) return null

	const frontHeight = heights[visible[0].id] ?? 0
	const containerHeight = expanded
		? visible.reduce((sum, t) => sum + (heights[t.id] ?? 0), 0) + (visible.length - 1) * EXPANDED_GAP
		: frontHeight + (visible.length - 1) * COLLAPSE_OFFSET

	let expandedOffset = 0

	return (
		<div
			className={twMerge('fixed bottom-6 right-6 z-50 w-[calc(100%-3rem)] max-w-[420px]', className)}
			style={{ height: containerHeight, transition: 'height 300ms ease-out' }}
			onMouseEnter={() => {
				setExpanded(true)
				pauseAll()
			}}
			onMouseLeave={() => {
				setExpanded(false)
				resumeAll()
			}}
		>
			{visible.map((t, index) => {
				const translateY = expanded ? -expandedOffset : -(index * COLLAPSE_OFFSET)
				if (expanded) expandedOffset += (heights[t.id] ?? 0) + EXPANDED_GAP
				const scale = expanded ? 1 : index === 0 ? 1 : index === 1 ? 0.95 : 0.9
				return (
					<ToasterSlot
						key={t.id}
						toast={t}
						translateY={translateY}
						scale={scale}
						zIndex={visible.length - index}
						onHeight={reportHeight}
					/>
				)
			})}
		</div>
	)
}

function ToasterSlot({
	toast: t,
	translateY,
	scale,
	zIndex,
	onHeight,
}: {
	toast: ToastRecord
	translateY: number
	scale: number
	zIndex: number
	onHeight: (id: number, height: number) => void
}) {
	const [entered, setEntered] = useState(false)
	const ref = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const raf = requestAnimationFrame(() => setEntered(true))
		return () => cancelAnimationFrame(raf)
	}, [])

	useEffect(() => {
		const el = ref.current
		if (!el) return
		const observer = new ResizeObserver((entries) => {
			const entry = entries[0]
			if (entry) onHeight(t.id, entry.contentRect.height)
		})
		observer.observe(el)
		return () => observer.disconnect()
	}, [t.id, onHeight])

	return (
		<div
			ref={ref}
			className={twMerge(
				'absolute inset-x-0 bottom-0 transition-all duration-300 ease-out',
				entered && !t.leaving ? 'opacity-100' : 'opacity-0',
			)}
			style={{
				transform: `translateY(${entered ? translateY : translateY + 8}px) scale(${scale})`,
				transformOrigin: 'bottom',
				zIndex,
			}}
		>
			<Toast
				type={t.type}
				message={t.message}
				action={
					t.action
						? {
								label: t.action.label,
								onClick: () => {
									t.action?.onClick()
									dismissToast(t.id)
								},
							}
						: undefined
				}
				onDismiss={() => dismissToast(t.id)}
			/>
		</div>
	)
}
