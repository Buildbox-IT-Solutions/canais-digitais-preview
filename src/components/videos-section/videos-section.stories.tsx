import type { Meta, StoryObj } from '@storybook/react-vite'
import { VIDEOS_SECTION } from '~/mocks/articles'
import { VideosSection } from '.'

const meta: Meta<typeof VideosSection> = {
	title: 'Sections/VideosSection',
	component: VideosSection,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof VideosSection>

export const FourItems: Story = {
	args: { items: VIDEOS_SECTION },
	render: (args) => (
		<div className="w-[1280px]">
			<VideosSection {...(args as Parameters<typeof VideosSection>[0])} />
		</div>
	),
}

export const TwoItems: Story = {
	args: { items: VIDEOS_SECTION.slice(0, 2) },
	render: (args) => (
		<div className="w-[1280px]">
			<VideosSection {...(args as Parameters<typeof VideosSection>[0])} />
		</div>
	),
}
