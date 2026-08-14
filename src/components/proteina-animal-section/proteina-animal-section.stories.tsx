import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { PROTEINA_ANIMAL } from '~/mocks/articles'
import { ProteinaAnimalSection } from '.'

const meta: Meta<typeof ProteinaAnimalSection> = {
	title: 'Sections/ProteinaAnimalSection',
	component: ProteinaAnimalSection,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
	decorators: [
		// Feature Favoritos: cards viraram NewsCard com contentId — exige Router.
		(Story) => (
			<MemoryRouter initialEntries={['/?logado=true']}>
				<Story />
			</MemoryRouter>
		),
	],
}
export default meta

type Story = StoryObj<typeof ProteinaAnimalSection>

export const Default: Story = {
	args: { articles: PROTEINA_ANIMAL },
	render: (args) => (
		<div className="w-[1280px]">
			<ProteinaAnimalSection {...(args as Parameters<typeof ProteinaAnimalSection>[0])} />
		</div>
	),
}
