import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconTile } from '.'

const meta: Meta<typeof IconTile> = {
	title: 'Cards/IconTile',
	component: IconTile,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	args: { icon: 'download' },
}

export default meta
type Story = StoryObj<typeof IconTile>

export const Neutral: Story = { args: { tone: 'neutral' } }
export const Danger: Story = { args: { tone: 'danger', icon: 'logout' } }
export const Disabled: Story = { args: { tone: 'disabled' } }
