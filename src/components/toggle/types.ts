import type { IconButtonSize } from '~/components/icon-button/types'
import type { IconName } from '~/components/icon/types'

/**
 * Superfícies do Figma "Toggle [1.0]" (node 7952:127473):
 * `default`: sem foto atrás — sem preenchimento em repouso, `Neutral/Light/0`
 * (`--color-neutral-50`, #E9EAEC) no hover.
 * `onMedia`: sobre fotografia arbitrária — branco 80% em repouso (fill cru, mesma
 * saída usada pelo Play Button 2.0 do Figma, que também não tem estilo de branco
 * com opacidade no arquivo), branco 100% no hover.
 */
export type ToggleSurface = 'default' | 'onMedia'

export interface IToggleProps {
	/** Estado atual — componente controlado, não guarda estado próprio. Equivale a "Selected" no Figma. */
	pressed: boolean
	onPressedChange: (next: boolean) => void
	/** Ícone mostrado quando `pressed` é true (Selected=On, preenchido no Figma). */
	iconOn: IconName
	/** Ícone mostrado quando `pressed` é false (Selected=Off, vazado no Figma). */
	iconOff: IconName
	/** Rótulo acessível (aria-label) quando `pressed` é true — normalmente a ação de desligar. */
	labelOn: string
	/** Rótulo acessível (aria-label) quando `pressed` é false — normalmente a ação de ligar. */
	labelOff: string
	/**
	 * Texto do Tooltip (feature Favoritos) quando `pressed` é true — curto, ex.
	 * "Remover", diferente do `labelOn` (aria-label, mais descritivo). Sem
	 * `tooltipOn`/`tooltipOff`, o Toggle não ganha tooltip nenhum.
	 */
	tooltipOn?: string
	/** Texto do Tooltip quando `pressed` é false — curto, ex. "Favoritar". */
	tooltipOff?: string
	/** Escala herdada do Icon Button [1.0]: 32/40/48 com ícone 16/24/32 — NÃO é a escala do Play Button. */
	size?: IconButtonSize
	/** Superfície sempre presente (com ou sem foto atrás) — default `'default'`. */
	surface?: ToggleSurface
	/**
	 * Estado "Disabled" do Figma — atributo nativo, não prop de "state" (Hover/Focus
	 * também não são prop: são CSS puro, `:hover`/`:focus-visible`, reagindo ao mouse
	 * e ao teclado de verdade).
	 */
	disabled?: boolean
	className?: string
}
