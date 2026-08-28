import type { ButtonSize, ButtonTone, ButtonType } from '~/components/button/types'

/**
 * `idle → pending → subscribed`. `subscribed` é TERMINAL: não há caminho de volta nem
 * cancelamento por aqui (decisão de produto de 28/08/2026 — quem cancela vai à aba
 * Newsletter do perfil). Falha não é status: quem chama volta para `idle` e avisa por
 * toast com ação "Repetir".
 */
export type SubscribeStatus = 'idle' | 'pending' | 'subscribed'

export interface ISubscribeButtonProps {
	status?: SubscribeStatus
	/** Chamada à ação em `idle`. Genérica de propósito: "Assine agora", "Inscrever-se", "Seguir". */
	label: string
	/** Texto durante a operação. Default: "Assinando...". */
	pendingLabel?: string
	/** Texto do selo terminal. Default: "Assinado". */
	subscribedLabel?: string
	type?: ButtonType
	tone?: ButtonTone
	size?: ButtonSize
	/**
	 * Destino de fallback sem JS (ex.: a tela onde a assinatura também é possível). Com
	 * `onSubscribe` presente, o clique é interceptado e não navega.
	 */
	href?: string
	onSubscribe?: () => void
	className?: string
}
