import type { ToastAction, ToastType } from '~/components/toast/types'

export interface ToastRecord {
	id: number
	type: ToastType
	message: string
	action?: ToastAction
	leaving: boolean
	status: 'visible' | 'queued'
	remainingMs: number
	timeoutId?: ReturnType<typeof setTimeout>
	startedAt?: number
}

export interface ToastOptions {
	action?: ToastAction
	/** Sobrescreve o auto-dismiss padrão (4s) — ex.: toasts com ação "Desfazer" usam uma janela maior. */
	durationMs?: number
}

const AUTO_DISMISS_MS = 4000
const LEAVE_MS = 200
/** Máximo de toasts simultaneamente visíveis (1 na frente + 2 espiando atrás) — igual ao default do sonner. */
const MAX_VISIBLE = 3

type Listener = () => void

let toasts: ToastRecord[] = []
let listeners: Listener[] = []
let nextId = 1
/** `true` enquanto a pilha estiver expandida no hover (ver `pauseAll`/`resumeAll`) — toasts que
 *  entram em `visible` nesse período (push novo ou promoção da fila) não ganham timer; `resumeAll`
 *  arma o timer deles quando o hover termina. */
let paused = false

function emitChange() {
	for (const listener of listeners) listener()
}

function visibleCount(): number {
	return toasts.filter((t) => t.status === 'visible' && !t.leaving).length
}

function startTimer(id: number, ms: number): void {
	const startedAt = Date.now()
	const timeoutId = setTimeout(() => dismissToast(id), ms)
	toasts = toasts.map((t) => (t.id === id ? { ...t, timeoutId, startedAt, remainingMs: ms } : t))
}

/** Promove o próximo toast em fila para visível, se houver vaga — inicia o timer só agora (tempo em fila não conta como tempo de vida), a menos que a pilha esteja pausada em hover. */
function promoteQueued(): void {
	if (visibleCount() >= MAX_VISIBLE) return
	const next = toasts.find((t) => t.status === 'queued')
	if (!next) return
	toasts = toasts.map((t) => (t.id === next.id ? { ...t, status: 'visible' } : t))
	emitChange()
	if (!paused) startTimer(next.id, next.remainingMs)
}

/** Marca o toast como "saindo" (permite animação de saída) e remove do store logo em seguida. */
export function dismissToast(id: number): void {
	const current = toasts.find((t) => t.id === id)
	if (!current || current.leaving) return
	if (current.timeoutId) clearTimeout(current.timeoutId)
	toasts = toasts.map((t) => (t.id === id ? { ...t, leaving: true } : t))
	emitChange()
	setTimeout(() => {
		toasts = toasts.filter((t) => t.id !== id)
		emitChange()
		promoteQueued()
	}, LEAVE_MS)
}

function pushToast(type: ToastType, message: string, options?: ToastOptions): number {
	const id = nextId++
	const durationMs = options?.durationMs ?? AUTO_DISMISS_MS
	const status = visibleCount() < MAX_VISIBLE ? 'visible' : 'queued'
	toasts = [
		...toasts,
		{ id, type, message, action: options?.action, leaving: false, status, remainingMs: durationMs },
	]
	emitChange()
	if (status === 'visible' && !paused) startTimer(id, durationMs)
	return id
}

/** Pausa o auto-dismiss de todos os toasts visíveis (pilha expandida no hover), preservando o tempo restante de cada um. */
export function pauseAll(): void {
	paused = true
	const now = Date.now()
	toasts = toasts.map((t) => {
		if (t.status !== 'visible' || t.leaving || !t.timeoutId) return t
		clearTimeout(t.timeoutId)
		const elapsed = t.startedAt ? now - t.startedAt : 0
		return { ...t, timeoutId: undefined, startedAt: undefined, remainingMs: Math.max(0, t.remainingMs - elapsed) }
	})
}

/** Retoma o auto-dismiss de todos os toasts visíveis pausados, usando o `remainingMs` salvo. */
export function resumeAll(): void {
	paused = false
	for (const t of toasts) {
		if (t.status === 'visible' && !t.leaving && !t.timeoutId) startTimer(t.id, t.remainingMs)
	}
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
