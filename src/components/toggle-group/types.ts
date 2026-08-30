import type { IconName } from '~/components/icon/types'
import type { ToggleSize, ToggleSurface, ToggleType } from '~/components/toggle/types'

interface IToggleGroupItemBase {
	/** Identidade do item dentro do grupo — é o que entra e sai por `value`. */
	value: string
	icon?: IconName
	iconOn?: IconName
	iconOff?: IconName
	disabled?: boolean
}

/** Item com rótulo visível — o texto é o nome acessível, então `label` é proibido. */
interface ILabeledItem extends IToggleGroupItemBase {
	text: string
	label?: never
	tooltip?: string
}

/** Item só-ícone — `label` (aria-label) é obrigatório, mesma regra do `Toggle`. */
interface IIconOnlyItem extends IToggleGroupItemBase {
	text?: never
	label: string
	tooltip?: string
}

export type ToggleGroupItem = ILabeledItem | IIconOnlyItem

interface IToggleGroupBaseProps {
	items: ToggleGroupItem[]
	/**
	 * Nome do GRUPO para leitor de tela (ex.: "Filtrar por formato"). Obrigatório: um
	 * `role="group"` sem nome não diz a que os botões dentro dele pertencem.
	 */
	ariaLabel: string
	/** Repassados a todos os itens — o grupo é a única fonte de aparência. */
	type?: ToggleType
	size?: ToggleSize
	surface?: ToggleSurface
	/** Desabilita o grupo inteiro. Some com o `disabled` de cada item, não o substitui. */
	disabled?: boolean
	className?: string
}

/**
 * `selection` (não `type`, como no shadcn): `type` aqui já é a aparência, herdada do
 * `Button`/`IconButton`/`Toggle`. Dois nomes para o mesmo prop em componentes vizinhos
 * é o começo da divergência.
 */
export interface ISingleToggleGroupProps extends IToggleGroupBaseProps {
	selection?: 'single'
	/** `null` = nada selecionado. */
	value: string | null
	onValueChange: (next: string | null) => void
	/**
	 * Clicar no item já selecionado o desliga e devolve `null`. Default `true` (é o do
	 * Radix). `false` para grupos onde "nenhum" não é um estado válido — ex.: filtro que
	 * sempre precisa de um formato escolhido.
	 */
	allowDeselect?: boolean
}

export interface IMultipleToggleGroupProps extends IToggleGroupBaseProps {
	selection: 'multiple'
	value: string[]
	onValueChange: (next: string[]) => void
	allowDeselect?: never
}

export type IToggleGroupProps = ISingleToggleGroupProps | IMultipleToggleGroupProps
