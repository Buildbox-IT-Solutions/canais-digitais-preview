import type { Meta, StoryObj } from '@storybook/react-vite'
import { ESPECIALISTAS } from '~/mocks/articles'
import { EspecialistasSection } from '.'

const meta: Meta<typeof EspecialistasSection> = {
	title: 'Sections/EspecialistasSection',
	component: EspecialistasSection,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof EspecialistasSection>

export const Default: Story = {
	args: { items: ESPECIALISTAS },
	render: (args) => (
		<div className="w-[1280px]">
			<EspecialistasSection {...(args as Parameters<typeof EspecialistasSection>[0])} />
		</div>
	),
}
