import type { Meta, StoryObj } from '@storybook/react-vite'
import { PodcastMeta } from '.'

const meta: Meta<typeof PodcastMeta> = {
	title: 'Cards/PodcastMeta',
	component: PodcastMeta,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	args: { time: '1h 30m', author: 'Mariana Albuquerque', href: '#' },
}

export default meta
type Story = StoryObj<typeof PodcastMeta>

export const Md: Story = {}
export const Sm: Story = { args: { size: 'sm' } }
