import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavItem } from '.'

const meta: Meta<typeof NavItem> = {
	title: 'Navigation/NavItem',
	component: NavItem,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	args: { label: 'Eventos', href: '#' },
}

export default meta
type Story = StoryObj<typeof NavItem>

export const Default: Story = {}
export const Active: Story = { args: { active: true } }
export const WithDropdown: Story = {
	args: {
		dropdown: true,
		dropdownItems: [
			{ label: 'Sub-item 1', href: '#' },
			{ label: 'Sub-item 2', href: '#' },
			{ label: 'Sub-item 3', href: '#' },
		],
	},
}
export const ActiveWithDropdown: Story = {
	args: {
		dropdown: true,
		active: true,
		dropdownItems: [
			{ label: 'Sub-item 1', href: '#' },
			{ label: 'Sub-item 2', href: '#' },
		],
	},
}
