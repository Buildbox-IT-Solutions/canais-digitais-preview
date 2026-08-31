import type { IconName } from '~/components/icon/types'

export interface IFilterChipProps {
	label: string
	/** Estado "Selected" do Figma. Componente controlado — não guarda estado próprio. */
	selected?: boolean
	/** Alternância pedida pelo clique. Recebe o PRÓXIMO estado. */
	onSelectedChange?: (next: boolean) => void
	/**
	 * Ícone à esquerda quando NÃO selecionado (`Configuration=Label & leading icon`).
	 * Selecionado, o check ocupa esse lugar — é a regra do MD3 e do component set.
	 */
	leadingIcon?: IconName
	/** `Show trailing icon=True` — ex.: `expand-more` nos filtros-dropdown da busca. */
	trailingIcon?: IconName
	/**
	 * Quando o chip abre um menu em vez de alternar um filtro (o caso dos chips com
	 * `expand-more`). Troca `aria-pressed` por `aria-haspopup`: um disparador de menu não
	 * é um botão de dois estados, e anunciar "pressionado" ali seria mentira.
	 */
	ariaHasPopup?: 'menu' | 'listbox'
	disabled?: boolean
	className?: string
}
