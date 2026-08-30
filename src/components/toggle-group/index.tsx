import { twMerge } from '~/lib/tw-merge'
import { Toggle } from '~/components/toggle'
import type { IToggleGroupProps, ToggleGroupItem } from './types'

/**
 * Componente: ToggleGroup
 * Base de interação: shadcn/ui ToggleGroup (single/multiple, aparência e tamanho
 * ditados pelo grupo). Sem Figma spec dedicado — é composição de `Toggle [1.0]`, não
 * um componente novo do arquivo. Ver `figma-specs/toggle.md`.
 *
 * Conjunto de `Toggle`s que se conhecem: o grupo é dono do `value`, cada item só
 * reporta o clique. Controlado, como o `Toggle` — nada de estado interno.
 *
 * Duas diferenças deliberadas em relação ao shadcn:
 * · O prop de modo se chama `selection`, não `type` — `type` aqui já é a APARÊNCIA
 *   (ghost/outlined/filled), herdada de Button/IconButton/Toggle. Ver `types.ts`.
 * · Os itens NÃO viram um controle segmentado (cantos retos grudados). A geometria
 *   deste DS é pílula; cortar o raio das pontas internas exigiria um raio fora da
 *   tabela do DS. Ficam pílulas separadas por `gap-2`, que é o mesmo espaçamento das
 *   Tags e dos botões do repo.
 *
 * `flex-wrap`: mobile está sempre em escopo. Um grupo de filtros que não quebra linha
 * ou estoura a viewport ou vira scroll horizontal escondido — as duas coisas somem com
 * o item mais à direita, que é onde os filtros menos usados ficam.
 *
 * `role="group"` + `aria-label` (obrigatório): os botões continuam sendo botões de
 * dois estados com `aria-pressed`, exatamente como o `Toggle` isolado. Não vira
 * `radiogroup` no modo `single` — quem dita isso é o Radix pelo mesmo motivo: um
 * radio não pode ser desmarcado, e aqui `allowDeselect` permite voltar a "nenhum".
 */
export function ToggleGroup(props: IToggleGroupProps) {
	const { items, ariaLabel, type, size, surface, disabled, className } = props

	function isSelected(item: ToggleGroupItem): boolean {
		return props.selection === 'multiple' ? props.value.includes(item.value) : props.value === item.value
	}

	function handlePressedChange(item: ToggleGroupItem, next: boolean): void {
		if (props.selection === 'multiple') {
			props.onValueChange(
				next ? [...props.value, item.value] : props.value.filter((value) => value !== item.value),
			)
			return
		}
		// Single: ligar troca a seleção; desligar volta a "nenhum" só se permitido —
		// com `allowDeselect: false` o clique no item já ativo é um no-op, e não um
		// caminho para um estado vazio que o grupo não aceita.
		if (next) props.onValueChange(item.value)
		else if (props.allowDeselect !== false) props.onValueChange(null)
	}

	return (
		<div role="group" aria-label={ariaLabel} className={twMerge('inline-flex flex-wrap items-center gap-2', className)}>
			{items.map((item) => {
				const shared = {
					pressed: isSelected(item),
					onPressedChange: (next: boolean) => handlePressedChange(item, next),
					icon: item.icon,
					iconOn: item.iconOn,
					iconOff: item.iconOff,
					type,
					size,
					surface,
					disabled: disabled || item.disabled,
				}

				// Tooltip nos dois estados com o mesmo texto: o balão descreve o item
				// ("Vídeos"), não a ação — quem carrega o estado é o `aria-pressed`.
				return item.text !== undefined ? (
					<Toggle key={item.value} {...shared} text={item.text} tooltipOn={item.tooltip} tooltipOff={item.tooltip} />
				) : (
					<Toggle
						key={item.value}
						{...shared}
						labelOn={item.label}
						labelOff={item.label}
						tooltipOn={item.tooltip}
						tooltipOff={item.tooltip}
					/>
				)
			})}
		</div>
	)
}
