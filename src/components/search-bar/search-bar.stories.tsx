import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchBar } from '.'

const meta: Meta<typeof SearchBar> = {
	title: 'Form/SearchBar',
	component: SearchBar,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	decorators: [(Story) => <div className="w-80"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof SearchBar>

export const Default: Story = {}
export const Expanded: Story = { args: { expanded: true, value: 'Inteligência artificial' } }
