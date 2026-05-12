import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchBar } from '.'

const meta: Meta<typeof SearchBar> = {
	title: 'Form/SearchBar',
	component: SearchBar,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SearchBar>

export const Compact: Story = { args: { state: 'compact' } }
export const Opened: Story = { args: { state: 'opened' } }
export const OpenedWithValue: Story = {
	args: { state: 'opened', value: 'Inteligência artificial' },
}
