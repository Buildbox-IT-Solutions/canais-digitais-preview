import type { Meta, StoryObj } from '@storybook/react-vite'
import { INGREDIENTES_LIST } from '~/mocks/articles'
import { CategoryColumn } from '.'

const meta: Meta<typeof CategoryColumn> = {
	title: 'Sections/CategoryColumn',
	component: CategoryColumn,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof CategoryColumn>

export const Ingredientes: Story = {
	args: {
		color: 'mint',
		label: 'Ingredientes',
		boxedTitle: 'Suplemento em gomas: a doce revolução que está transformando o mercado de nutrição',
		boxedSeed: 'ing-boxed',
		list: INGREDIENTES_LIST,
	},
	render: (args) => (
		<div className="w-[392px]">
			<CategoryColumn {...(args as Parameters<typeof CategoryColumn>[0])} />
		</div>
	),
}
