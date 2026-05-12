import type { Meta, StoryObj } from '@storybook/react-vite'
import { HeaderInforma } from '.'

const meta: Meta<typeof HeaderInforma> = {
	title: 'Navigation/HeaderInforma',
	component: HeaderInforma,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof HeaderInforma>

export const Default: Story = {}
