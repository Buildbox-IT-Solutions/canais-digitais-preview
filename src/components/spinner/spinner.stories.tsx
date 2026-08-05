import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from '.'

const meta: Meta<typeof Spinner> = {
	title: 'Foundations/Spinner',
	component: Spinner,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {}

export const Large: Story = {
	args: { className: 'size-10' },
}

export const OnPrimaryButton: Story = {
	decorators: [
		(Story) => (
			<div className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-primary-600 text-white font-body font-bold text-body-lg">
				<Story />
				Enviando...
			</div>
		),
	],
}
