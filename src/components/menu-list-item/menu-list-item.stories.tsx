import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from '~/components/icon'
import { MenuListItem } from '.'

const meta: Meta<typeof MenuListItem> = {
	title: 'Navigation/MenuListItem',
	component: MenuListItem,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	args: { label: 'Item de menu' },
}

export default meta
type Story = StoryObj<typeof MenuListItem>

export const Default: Story = {}
export const Compact: Story = { args: { density: 'compact' } }
export const WithLeading: Story = {
	args: { leading: <Icon name="account-circle" className="size-5" /> },
}
export const AsLink: Story = { args: { href: '#' } }
export const Static: Story = { args: { label: 'Não-clicável' } }
