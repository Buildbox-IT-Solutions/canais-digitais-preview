import { useEffect, useState, useSyncExternalStore } from 'react'
import { twMerge } from '~/lib/tw-merge'
import { Toast } from '~/components/toast'
import { dismissToast, getToasts, subscribeToasts, type ToastRecord } from '~/lib/toast-store'
import type { IToasterProps } from './types'

/**
 * Componente: Toaster
 * Container global que empilha os toasts disparados via `toast.success(...)` /
 * `toast.error(...)` (ver `~/lib/toast-store`) — API imperativa + pilha com
 * auto-dismiss, mesmo padrão do shadcn/ui Toast (https://ui.shadcn.com/docs/components/base/toast),
 * sem instalar a lib (sonner) em si. Montado uma única vez na raiz do app (ver router.tsx).
 * Tokens: herdados do componente `Toast`.
 */
export function Toaster({ className }: IToasterProps) {
	const toasts = useSyncExternalStore(subscribeToasts, getToasts, getToasts)

	if (toasts.length === 0) return null

	return (
		<div
			className={twMerge(
				'fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-[calc(100%-3rem)] max-w-[420px]',
				className,
			)}
		>
			{toasts.map((t) => (
				<ToasterSlot key={t.id} toast={t} />
			))}
		</div>
	)
}

function ToasterSlot({ toast: t }: { toast: ToastRecord }) {
	const [entered, setEntered] = useState(false)

	useEffect(() => {
		const raf = requestAnimationFrame(() => setEntered(true))
		return () => cancelAnimationFrame(raf)
	}, [])

	return (
		<div
			className={twMerge(
				'transition-all duration-200 ease-out',
				entered && !t.leaving ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
			)}
		>
			<Toast type={t.type} message={t.message} onDismiss={() => dismissToast(t.id)} />
		</div>
	)
}
