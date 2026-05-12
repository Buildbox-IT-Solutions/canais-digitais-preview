import type { Meta, StoryObj } from '@storybook/react-vite'
import { HeaderDesktop } from '.'

const meta: Meta<typeof HeaderDesktop> = {
	title: 'Navigation/HeaderDesktop',
	component: HeaderDesktop,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof HeaderDesktop>

export const Anonymous: Story = {}
export const ActiveCategory: Story = { args: { activeCategory: 'tecnologia' } }
export const Logged: Story = {
	args: {
		userLoggedIn: true,
		userName: 'Mariana Albuquerque',
		userInitials: 'MA',
	},
}
