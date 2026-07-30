import type { Meta, StoryObj } from '@storybook/react-vite'
import { AvatarStack } from '.'

const AUTHORS = [
	{ name: 'Autor 1', avatarUrl: 'https://i.pravatar.cc/96?img=1' },
	{ name: 'Autor 2', avatarUrl: 'https://i.pravatar.cc/96?img=2' },
	{ name: 'Autor 3', avatarUrl: 'https://i.pravatar.cc/96?img=3' },
	{ name: 'Autor 4', avatarUrl: 'https://i.pravatar.cc/96?img=4' },
	{ name: 'Autor 5', avatarUrl: 'https://i.pravatar.cc/96?img=5' },
	{ name: 'Autor 6', avatarUrl: 'https://i.pravatar.cc/96?img=6' },
]

const meta: Meta<typeof AvatarStack> = {
	title: 'Foundations/AvatarStack',
	component: AvatarStack,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof AvatarStack>

export const Qty2: Story = { args: { authors: AUTHORS.slice(0, 2) } }
export const Qty3: Story = { args: { authors: AUTHORS.slice(0, 3) } }
export const Qty4: Story = { args: { authors: AUTHORS.slice(0, 4) } }
export const Qty5: Story = { args: { authors: AUTHORS.slice(0, 5) } }
export const Qty6: Story = { args: { authors: AUTHORS.slice(0, 6) } }
