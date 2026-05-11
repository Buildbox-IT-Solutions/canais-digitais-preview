import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatCard } from '.'

const meta: Meta<typeof StatCard> = {
	title: 'Dashboard/StatCard',
	component: StatCard,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	decorators: [(Story) => <div className="w-72"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof StatCard>

export const Favorites: Story = { args: { icon: 'bookmark', label: 'Matérias favoritadas', value: '24', href: '#' } }
export const Downloads: Story = { args: { icon: 'download', label: 'Downloads', value: '8', href: '#' } }
export const Newsletters: Story = { args: { icon: 'mail', label: 'Newsletters inscritas', value: '3', href: '#' } }
