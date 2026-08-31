import type { Meta, StoryObj } from '@storybook/react-vite'
import { FilterBar } from '.'
import { CATEGORIAS_PORTAL } from '~/mocks/biblioteca'
import { TEMA_TODOS } from '~/lib/biblioteca'

const itens = [
	{ slug: TEMA_TODOS, label: 'Todos' },
	...CATEGORIAS_PORTAL.map((c) => ({ slug: c.slug, label: c.label })),
]

const meta: Meta<typeof FilterBar> = {
	title: 'Biblioteca/FilterBar',
	component: FilterBar,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Filtro por categoria da Biblioteca exclusiva (Figma 8458:115949). Cada filtro é um `FilterChip` — o mesmo componente da barra de refino da busca; a barra não tem markup de pílula próprio. Seleção única garantida pela estrutura: o componente não guarda estado, e o consumidor grava um único `?tema=` na URL. Clicar no chip ativo desliga o filtro e acende o "Todos". Categoria sem acervo nem chega aqui — quem filtra isso é `categoriasComAcervo()`.',
			},
		},
	},
	tags: ['autodocs'],
	args: { itens, onSelecionar: () => {} },
}

export default meta
type Story = StoryObj<typeof FilterBar>

export const Todos: Story = {
	name: 'Todos (sem filtro)',
	args: { ativo: TEMA_TODOS },
}

export const CategoriaSelecionada: Story = {
	args: { ativo: 'proteina-animal' },
}
