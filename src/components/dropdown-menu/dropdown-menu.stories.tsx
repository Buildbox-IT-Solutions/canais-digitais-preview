import type { Meta, StoryObj } from '@storybook/react-vite'
import { MenuListItem } from '~/components/menu-list-item'
import { DropdownMenu } from '.'

const meta: Meta<typeof DropdownMenu> = {
	title: 'Navigation/DropdownMenu',
	component: DropdownMenu,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Neutral: Story = {
	args: {
		children: (
			<>
				<MenuListItem label="Item 1" href="#" />
				<MenuListItem label="Item 2" href="#" />
				<MenuListItem label="Item 3" href="#" />
			</>
		),
	},
}

export const White: Story = {
	args: {
		tone: 'white',
		width: 'w-[264px]',
		children: (
			<>
				<MenuListItem label="Minha Conta Informa" href="#" />
				<MenuListItem label="Sair" href="#" />
			</>
		),
	},
}
