import type { Meta, StoryObj } from '@storybook/react-vite'
import { LoginButton } from '.'

const meta: Meta<typeof LoginButton> = {
	title: 'Buttons/LoginButton',
	component: LoginButton,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoginButton>

export const NotLogged: Story = { args: { logged: false, href: '#' } }
export const LoggedWithInitials: Story = {
	args: { logged: true, name: 'Mariana Albuquerque', initials: 'MA' },
}
export const LoggedWithAvatar: Story = {
	args: {
		logged: true,
		name: 'Mariana Albuquerque',
		initials: 'MA',
		avatar: 'https://i.pravatar.cc/64?img=5',
	},
}
