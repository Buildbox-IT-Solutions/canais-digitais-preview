import type { Meta, StoryObj } from '@storybook/react-vite'
import { DashboardWelcome } from '.'

const meta: Meta<typeof DashboardWelcome> = {
	title: 'Dashboard/DashboardWelcome',
	component: DashboardWelcome,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	args: {
		firstName: 'Mariana',
		email: 'mariana.albuquerque@empresa.com.br',
		initials: 'MA',
	},
}

export default meta
type Story = StoryObj<typeof DashboardWelcome>

export const WithInitials: Story = {}
export const WithAvatar: Story = { args: { avatarSrc: 'https://i.pravatar.cc/240?img=5' } }
