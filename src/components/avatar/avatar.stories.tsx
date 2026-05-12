import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from '.'

const SAMPLE_SRC = 'https://i.pravatar.cc/160?img=12'

const meta: Meta<typeof Avatar> = {
	title: 'Foundations/Avatar',
	component: Avatar,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Imagem de perfil com duas formas (`rounded` / `squared`) e state-layer no hover (`bg-white/25`). Tamanho default 80×80 (`size-20`); ajuste via `className`.',
			},
		},
	},
	tags: ['autodocs'],
	args: {
		src: SAMPLE_SRC,
		alt: 'Avatar de exemplo',
	},
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Rounded: Story = {
	args: { shape: 'rounded' },
}

export const Squared: Story = {
	args: { shape: 'squared' },
}

export const Small: Story = {
	args: { shape: 'rounded', className: 'size-8' },
}

export const Medium: Story = {
	args: { shape: 'rounded', className: 'size-10' },
}

export const Large: Story = {
	args: { shape: 'rounded', className: 'size-20' },
}
