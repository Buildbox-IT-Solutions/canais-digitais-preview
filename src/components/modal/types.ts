import type { ReactNode } from 'react'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

export interface IModalProps {
	open: boolean
	children: ReactNode
	/** Largura máxima do painel: sm=400px, md=480px, lg=560px, xl=960px. Default: md */
	size?: ModalSize
	/**
	 * Padding interno + scroll do próprio painel. Default: true.
	 * Use `false` no modo painel (duas colunas, ex.: form + proof) — o painel vira flex,
	 * recorta com overflow-hidden e cada coluna controla seu padding/scroll.
	 */
	padded?: boolean
	/** href para o scrim/botão fechar (modo navegação por rota). Tem precedência sobre onClose. */
	closeHref?: string
	/** callback de fechamento (modo controlado) */
	onClose?: () => void
	/** id do elemento que rotula o diálogo (aria-labelledby) */
	labelledById?: string
	/** rótulo acessível quando não há título visível para referenciar */
	ariaLabel?: string
	/** exibe o botão de fechar no canto superior direito. Default: true */
	showClose?: boolean
	className?: string
}
