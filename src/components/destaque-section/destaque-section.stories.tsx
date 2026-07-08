import type { Meta, StoryObj } from '@storybook/react-vite'
import { HOME_HERO, HOME_HERO_BOTTOM, HOME_HERO_TEXT } from '~/mocks/articles'
import { DestaqueSection } from '.'

const meta: Meta<typeof DestaqueSection> = {
	title: 'Sections/DestaqueSection',
	component: DestaqueSection,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof DestaqueSection>

const [hero, top2, top3] = HOME_HERO

export const Default: Story = {
	args: { hero, top2, top3, heroText: HOME_HERO_TEXT, heroBottom: HOME_HERO_BOTTOM },
	render: (args) => (
		<div className="w-[1280px]">
			<DestaqueSection {...(args as Parameters<typeof DestaqueSection>[0])} />
		</div>
	),
}
