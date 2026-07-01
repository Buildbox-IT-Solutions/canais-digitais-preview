import type { Meta, StoryObj } from '@storybook/react-vite'
import { PodcastCard } from './index'

const meta: Meta<typeof PodcastCard> = {
	title: 'Cards/PodcastCard',
	component: PodcastCard,
	tags: ['autodocs'],
	parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof PodcastCard>

const base = {
	category: 'Food Service',
	title: 'Meu colega robô: WEG e Mitsubishi apostam em robôs que ajudam humanos',
	image: 'https://picsum.photos/seed/pod/208/208',
}

export const Default: Story = { args: base }
export const ComPatrocinador: Story = { args: { ...base, sponsor: 'Company Name' } }
