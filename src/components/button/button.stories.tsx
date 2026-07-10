import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '.'

const meta: Meta<typeof Button> = {
	title: 'Buttons/Button',
	component: Button,
	parameters: { layout: 'centered', docs: { description: { component: 'Button [1.1] — pill rounded-full. 3 types × 3 sizes × icones built-in (arrow-right, plus) ou custom (ReactNode).' } } },
	tags: ['autodocs'],
	args: { label: 'Ver mais' },
}

export default meta
type Story = StoryObj<typeof Button>

export const FilledMedium: Story = { args: { type: 'filled', size: 'medium' } }
export const FilledMediumIcon: Story = { args: { type: 'filled', size: 'medium', icon: 'arrow-right' } }
export const Outlined: Story = { args: { type: 'outlined', size: 'medium' } }
export const Ghost: Story = { args: { type: 'ghost', size: 'medium' } }
export const Large: Story = { args: { type: 'filled', size: 'large', icon: 'arrow-right' } }
export const Small: Story = { args: { type: 'filled', size: 'small' } }
export const Disabled: Story = { args: { type: 'filled', size: 'medium', disabled: true } }
export const AsLink: Story = { args: { type: 'filled', size: 'medium', href: '#' } }

const onDark: Story['decorators'] = [
	(Story) => (
		<div className="bg-gradient-to-br from-primary-600 to-secondary-950 p-8 rounded-lg">
			<Story />
		</div>
	),
]

export const InverseFilled: Story = {
	args: { type: 'filled', tone: 'inverse', size: 'medium' },
	decorators: onDark,
}
export const InverseOutlined: Story = {
	args: { type: 'outlined', tone: 'inverse', size: 'medium' },
	decorators: onDark,
}
export const InverseGhost: Story = {
	args: { type: 'ghost', tone: 'inverse', size: 'medium' },
	decorators: onDark,
}
