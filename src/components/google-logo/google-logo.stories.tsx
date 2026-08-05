import type { Meta, StoryObj } from '@storybook/react-vite'
import { GoogleLogo } from '.'

const meta: Meta<typeof GoogleLogo> = {
	title: 'Foundations/GoogleLogo',
	component: GoogleLogo,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof GoogleLogo>

export const Default: Story = {}

export const Large: Story = {
	args: { className: 'size-10' },
}
