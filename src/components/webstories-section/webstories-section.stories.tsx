import type { Meta, StoryObj } from '@storybook/react-vite'
import { WEBSTORIES } from '~/mocks/articles'
import { WebstoriesSection } from '.'

const meta: Meta<typeof WebstoriesSection> = {
	title: 'Sections/WebstoriesSection',
	component: WebstoriesSection,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof WebstoriesSection>

export const Default: Story = {
	args: { items: WEBSTORIES },
	render: (args) => (
		<div className="w-[1280px]">
			<WebstoriesSection {...(args as Parameters<typeof WebstoriesSection>[0])} />
		</div>
	),
}
