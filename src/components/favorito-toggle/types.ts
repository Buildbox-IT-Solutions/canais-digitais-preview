import type { ToggleSize, ToggleSurface, ToggleType } from '~/components/toggle/types'
import type { TooltipSide } from '~/components/tooltip/types'

export interface IFavoritoToggleProps {
	/** Vem de `useFavoritoToggle` — este componente não chama o hook (ver o bloco de doc). */
	pressed: boolean
	onPressedChange: (next: boolean) => void
	/**
	 * Mostra o rótulo "Favoritar" ao lado do coração. Nesse formato o tooltip some:
	 * um balão repetindo a palavra que já está na tela não informa nada.
	 */
	showLabel?: boolean
	type?: ToggleType
	size?: ToggleSize
	surface?: ToggleSurface
	disabled?: boolean
	/** Lado do balão — ver `tooltipSide` no Toggle. Ignorado quando `showLabel`. */
	tooltipSide?: TooltipSide
	className?: string
}
