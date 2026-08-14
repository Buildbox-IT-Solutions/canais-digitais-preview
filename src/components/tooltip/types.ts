import type { ReactNode } from 'react'

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left'

export interface ITooltipProps {
	/** Texto do balão. */
	label: string
	/** Lado em que o balão aparece — a seta sempre fica na lateral oposta, apontando pro gatilho. */
	side?: TooltipSide
	/** Delay (ms) antes do balão aparecer no hover/focus — Instagram-style, não é valor do Figma. */
	delay?: number
	/** Suprime o balão inteiro (ex.: mesmo estado "disabled" do controle que ele envolve). */
	disabled?: boolean
	/** Gatilho — o wrapper (`span`) escuta hover/focus nele, não precisa clonar/injetar props. */
	children: ReactNode
	className?: string
}
