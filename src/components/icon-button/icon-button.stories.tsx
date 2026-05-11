import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconButton } from '.'

const meta: Meta<typeof IconButton> = {
	title: 'Buttons/IconButton',
	component: IconButton,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	args: { icon: 'search', label: 'Buscar' },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Filled: Story = { args: { type: 'filled' } }
export const Outlined: Story = { args: { type: 'outlined' } }
export const Ghost: Story = { args: { type: 'ghost' } }
export const Large: Story = { args: { size: 'large' } }
export const Small: Story = { args: { size: 'small' } }
