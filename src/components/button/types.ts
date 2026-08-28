import type { ReactNode } from 'react'

export type ButtonType = 'filled' | 'outlined' | 'ghost'
export type ButtonTone = 'default' | 'inverse'
export type ButtonSize = 'large' | 'medium' | 'small'
export type ButtonIcon = 'none' | 'arrow-forward' | 'add'

export interface IButtonProps {
	label: string
	href?: string
	type?: ButtonType
	/** Para uso sobre fundo escuro/colorido (ex.: banners com gradient). Default: 'default'. */
	tone?: ButtonTone
	size?: ButtonSize
	icon?: ButtonIcon | ReactNode
	/**
	 * Ação em voo: spinner à esquerda do label (que continua visível), `disabled` e
	 * `aria-busy`. Sobrepõe `icon` e força render como `<button>` mesmo com `href`.
	 */
	loading?: boolean
	disabled?: boolean
	/**
	 * Com `href`, INTERCEPTA a navegação (preventDefault) e age na própria página — o
	 * href passa a ser o destino de fallback sem JS.
	 */
	onClick?: () => void
	className?: string
}
