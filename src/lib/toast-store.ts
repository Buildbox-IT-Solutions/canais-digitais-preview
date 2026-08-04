import type { ToastAction, ToastType } from '~/components/toast/types'

export interface ToastRecord {
	id: number
	type: ToastType
	message: string
	action?: ToastAction
	leaving: boolean
}

export interface ToastOptions {
	action?: ToastAction
	/** Sobrescreve o auto-dismiss padrão (4s) — ex.: toasts com ação "Desfazer" usam uma janela maior. */
	durationMs?: number
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

function pushToast(type: ToastType, message: string, options?: ToastOptions): number {
	const id = nextId++
	toasts = [...toasts, { id, type, message, action: options?.action, leaving: false }]
	emitChange()
	setTimeout(() => dismissToast(id), options?.durationMs ?? AUTO_DISMISS_MS)
	return id
}

/**
 * API imperativa de toasts — dispara de qualquer lugar (handler de clique, etc.),
 * sem precisar de contexto/provider. Referência de comportamento: shadcn/ui Toast
 * (https://ui.shadcn.com/docs/components/base/toast). `<Toaster />` (montado uma
 * vez na raiz, ver router.tsx) é quem renderiza a pilha.
 */
export const toast = {
	success: (message: string, options?: ToastOptions) => pushToast('success', message, options),
	error: (message: string, options?: ToastOptions) => pushToast('error', message, options),
	warning: (message: string, options?: ToastOptions) => pushToast('warning', message, options),
	info: (message: string, options?: ToastOptions) => pushToast('info', message, options),
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
