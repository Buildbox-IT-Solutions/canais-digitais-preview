import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconButton } from '.'

const meta: Meta<typeof IconButton> = {
	title: 'Buttons/IconButton',
	component: IconButton,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	args: { icon: 'search', label: 'Buscar' },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Filled: Story = { args: { type: 'filled' } }
export const Outlined: Story = { args: { type: 'outlined' } }
export const Ghost: Story = { args: { type: 'ghost' } }
export const Large: Story = { args: { size: 'large' } }
export const Small: Story = { args: { size: 'small' } }
export const Disabled: Story = { args: { type: 'outlined', disabled: true } }

const onDark: Story['decorators'] = [
	(Story) => (
		<div className="bg-gradient-to-br from-primary-600 to-secondary-950 p-8 rounded-lg">
			<Story />
		</div>
	),
]

export const InverseFilled: Story = {
	args: { type: 'filled', tone: 'inverse' },
	decorators: onDark,
}
export const InverseOutlined: Story = {
	args: { type: 'outlined', tone: 'inverse' },
	decorators: onDark,
}
export const InverseGhost: Story = {
	args: { type: 'ghost', tone: 'inverse' },
	decorators: onDark,
}
