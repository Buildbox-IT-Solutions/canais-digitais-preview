import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { INGREDIENTES_LIST, FOOD_SERVICE_LIST } from '~/mocks/articles'
import { CategoryColumn } from '.'

const meta: Meta<typeof CategoryColumn> = {
	title: 'Sections/CategoryColumn',
	component: CategoryColumn,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
	decorators: [
		// Feature Favoritos: CategoryColumn e o NewsCard da lista usam useFavoritoAuthModal/
		// useFavoritoToggle (useNavigate/useSearchParams) — exige Router.
		(Story) => (
			<MemoryRouter initialEntries={['/?logado=true']}>
				<Story />
			</MemoryRouter>
		),
	],
}
export default meta

type Story = StoryObj<typeof CategoryColumn>

export const Ingredientes: Story = {
	args: {
		color: 'mint',
		label: 'Ingredientes',
		boxedTitle: 'Suplemento em gomas: a doce revolução que está transformando o mercado de nutrição',
		boxedSeed: 'ing-boxed',
		boxedSponsorName: 'Bridge & Co.',
		list: INGREDIENTES_LIST,
	},
	render: (args) => (
		<div className="w-[392px]">
			<CategoryColumn {...(args as Parameters<typeof CategoryColumn>[0])} />
		</div>
	),
}

/** Coluna sem selo de patrocinado (node 973:6783 — frame "Sponsor" oculto nesta instância). */
export const FoodService: Story = {
	args: {
		color: 'saffron',
		label: 'Food Service',
		boxedTitle: 'Análise essencial: saiba como as crises internacionais impactam a indústria de alimentos',
		boxedSeed: 'fs-boxed',
		list: FOOD_SERVICE_LIST,
	},
	render: (args) => (
		<div className="w-[392px]">
			<CategoryColumn {...(args as Parameters<typeof CategoryColumn>[0])} />
		</div>
	),
}
