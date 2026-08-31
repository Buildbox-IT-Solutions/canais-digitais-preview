import { twMerge } from '~/lib/tw-merge'
import { FilterChip } from '~/components/filter-chip'
import { TEMA_TODOS } from '~/lib/biblioteca'
import type { IFilterBarProps } from './types'

/**
 * Componente: FilterBar
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=8458-115949
 * Tokens: herdados do `FilterChip` — nenhum token próprio.
 *
 * Barra de filtro por categoria da Biblioteca exclusiva. Anotação do Figma: "1. lista de
 * filtros de categorias; 2. filtram os conteúdos abaixo".
 *
 * NÃO tem markup de pílula próprio: cada filtro é um `FilterChip` — o "Filter chip" do
 * Figma (`1859:18460`), o MESMO controle que a barra de refino da busca usa. Uma versão
 * anterior desta barra montava os filtros com `Toggle` de rótulo, criando um segundo
 * controle para a mesma função; corrigido em 2026-08-30. **Filtrar conteúdo por categoria
 * tem um componente só neste DS, e é o `FilterChip`.**
 *
 * SELEÇÃO ÚNICA, garantida pela estrutura e não por lógica de componente: o componente
 * não guarda estado, só reporta `onSelecionar`. Quem consome grava um único `?tema=` na
 * URL, e o navegador não sustenta dois valores para o mesmo filtro. Não existe caminho
 * para múltipla — nem por clique com modificador, nem por estado interno. **Para o
 * back-end: `tema` é escalar, nunca array.**
 *
 * Clicar no filtro JÁ ATIVO desliga o filtro e volta ao acervo completo — é o que um
 * toggle faz, e é o gesto que o usuário tenta primeiro. A barra nunca fica sem nada
 * ativo: desligar acende o "Todos", que É a ausência de filtro (`?tema=` some da URL).
 *
 * Categoria sem acervo não entra na lista — quem filtra isso é `categoriasComAcervo()`,
 * não este componente, que só desenha o que recebe.
 *
 * Rolagem horizontal em vez de quebra de linha: quebrar empurra as seções para baixo da
 * dobra em telas de 360px. O `overflow-x-auto` é deste elemento; sem sangria por margem
 * negativa, que empurraria a barra para fora do container e daria scroll na página.
 */
export function FilterBar({ itens, ativo, onSelecionar, className }: IFilterBarProps) {
	return (
		<div
			data-handoff="filter-bar"
			role="group"
			aria-label="Filtrar por categoria"
			className={twMerge('w-full min-w-0 overflow-x-auto scrollbar-hide', className)}
		>
			<div className="flex w-max items-center gap-2 pb-1">
				{itens.map((item) => (
					<FilterChip
						key={item.slug}
						label={item.label}
						selected={item.slug === ativo}
						// Desligar o ativo devolve o slug "todos" — o consumidor não precisa
						// saber que foi um clique de desligamento, só recebe o novo filtro.
						onSelectedChange={(ligado) => onSelecionar(ligado ? item.slug : TEMA_TODOS)}
					/>
				))}
			</div>
		</div>
	)
}
