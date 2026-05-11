import type { Meta, StoryObj } from '@storybook/react-vite'
import { Loading } from '.'

const meta: Meta<typeof Loading> = {
	title: 'Components/Loading',
	component: Loading,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Indicador de carregamento animado (spin). Tamanho e cor controlados via className.',
			},
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Loading>

export const Default: Story = {
	args: {},
}

export const Small: Story = {
	args: { className: 'h-4 w-4' },
}

export const Large: Story = {
	args: { className: 'h-12 w-12' },
}

export const Colored: Story = {
	args: { className: 'text-secondary-500' },
}
