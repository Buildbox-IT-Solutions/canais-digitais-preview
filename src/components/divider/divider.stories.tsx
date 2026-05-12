import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from '.'

const meta: Meta<typeof Divider> = {
	title: 'Foundations/Divider',
	component: Divider,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Linha separadora 1px. Cor única `bg-neutral-100` (#D6D8DD). Sem padding/margin próprios — quem usa decide o espaçamento via container.',
			},
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Divider>

export const Horizontal: Story = {
	args: { orientation: 'horizontal' },
	decorators: [
		(Story) => (
			<div className="w-80">
				<Story />
			</div>
		),
	],
}

export const Vertical: Story = {
	args: { orientation: 'vertical' },
	decorators: [
		(Story) => (
			<div className="h-20">
				<Story />
			</div>
		),
	],
}
