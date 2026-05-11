import type { Meta, StoryObj } from '@storybook/react-vite'
import { DashboardHeader } from '.'

const meta: Meta<typeof DashboardHeader> = {
	title: 'Dashboard/DashboardHeader',
	component: DashboardHeader,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DashboardHeader>

export const Default: Story = { args: { activeSection: 'visao' } }
export const Perfil: Story = { args: { activeSection: 'perfil' } }
export const Logged: Story = {
	args: {
		activeSection: 'visao',
		headerProps: { userLoggedIn: true, userName: 'Mariana Albuquerque', userInitials: 'MA' },
	},
}
