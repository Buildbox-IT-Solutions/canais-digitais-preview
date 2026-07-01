import type { Meta, StoryObj } from '@storybook/react-vite'
import { VideoCard } from './index'

const meta: Meta<typeof VideoCard> = {
	title: 'Cards/VideoCard',
	component: VideoCard,
	tags: ['autodocs'],
	parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof VideoCard>

const base = {
	title: 'Título do vídeo em destaque na home',
	image: 'https://picsum.photos/seed/video/600/338',
	href: '#',
	categoria: { label: 'Vídeos', color: 'mint' as const, chip: true, href: '#' },
}

export const LargeVertical: Story = { args: { ...base, size: 'large', orientation: 'vertical', lead: 'Descrição do vídeo.' } }
export const MediumHorizontal: Story = { args: { ...base, size: 'medium', orientation: 'horizontal' } }
export const XSmallHorizontal: Story = { args: { ...base, size: 'xsmall', orientation: 'horizontal' } }
