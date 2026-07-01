import type { Meta, StoryObj } from '@storybook/react-vite'
import { WebstoryCard } from './index'

const meta: Meta<typeof WebstoryCard> = {
	title: 'Cards/WebstoryCard',
	component: WebstoryCard,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof WebstoryCard>

export const Default: Story = {
	args: {
		title: 'Como a robótica está mudando o food service',
		image: 'https://picsum.photos/seed/ws/640/1138',
		label: 'Tecnologia',
		color: 'coral',
		href: '#',
	},
}
