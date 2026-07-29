import type { ToastType } from '~/components/toast/types'

export interface ToastRecord {
	id: number
	type: ToastType
	message: string
	leaving: boolean
}

const AUTO_DISMISS_MS = 4000
const LEAVE_MS = 200

type Listener = () => void

let toasts: ToastRecord[] = []
let listeners: Listener[] = []
let nextId = 1

function emitChange() {
	for (const listener of listeners) listener()
}

/** Marca o toast como "saindo" (permite animação de saída) e remove do store logo em seguida. */
export function dismissToast(id: number): void {
	if (!toasts.some((t) => t.id === id && !t.leaving)) return
	toasts = toasts.map((t) => (t.id === id ? { ...t, leaving: true } : t))
	emitChange()
	setTimeout(() => {
		toasts = toasts.filter((t) => t.id !== id)
		emitChange()
	}, LEAVE_MS)
}

function pushToast(type: ToastType, message: string): number {
	const id = nextId++
	toasts = [...toasts, { id, type, message, leaving: false }]
	emitChange()
	setTimeout(() => dismissToast(id), AUTO_DISMISS_MS)
	return id
}

/**
 * API imperativa de toasts — dispara de qualquer lugar (handler de clique, etc.),
 * sem precisar de contexto/provider. Referência de comportamento: shadcn/ui Toast
 * (https://ui.shadcn.com/docs/components/base/toast). `<Toaster />` (montado uma
 * vez na raiz, ver router.tsx) é quem renderiza a pilha.
 */
export const toast = {
	success: (message: string) => pushToast('success', message),
	error: (message: string) => pushToast('error', message),
	warning: (message: string) => pushToast('warning', message),
	info: (message: string) => pushToast('info', message),
}

export function subscribeToasts(listener: Listener): () => void {
	listeners = [...listeners, listener]
	return () => {
		listeners = listeners.filter((l) => l !== listener)
	}
}

export function getToasts(): ToastRecord[] {
	return toasts
}
