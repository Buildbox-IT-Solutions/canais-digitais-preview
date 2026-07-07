import type { ReactNode } from 'react'

export interface IBottomSheetProps {
	/** Controla montagem/visibilidade. Fechado = desmontado (sem animação de saída). */
	open: boolean
	/** Chamado quando o usuário fecha por Esc, backdrop ou swipe para baixo. */
	onClose: () => void
	/** id do container do diálogo (para `aria-controls` no trigger). */
	id?: string
	/** id do elemento que rotula o sheet (aria-labelledby). Ex.: o título do conteúdo. */
	labelledById?: string
	/** Rótulo textual alternativo quando não há `labelledById`. */
	ariaLabel?: string
	children: ReactNode
	className?: string
}
