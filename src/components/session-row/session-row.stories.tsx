import type { Meta, StoryObj } from '@storybook/react-vite'
import { SessionRow } from '.'

const meta: Meta<typeof SessionRow> = {
	title: 'Dashboard/SessionRow',
	component: SessionRow,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	decorators: [(Story) => <div className="w-[640px]"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof SessionRow>

export const Current: Story = {
	args: {
		device: 'MacBook Pro 14"',
		browser: 'Chrome 128',
		location: 'São Paulo, BR',
		last: 'Agora mesmo',
		current: true,
	},
}

export const Other: Story = {
	args: {
		device: 'iPhone 15',
		browser: 'Safari 18',
		location: 'Rio de Janeiro, BR',
		last: 'há 2 horas',
	},
}
