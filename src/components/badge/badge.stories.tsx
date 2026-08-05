import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '.'
import { Icon } from '~/components/icon'

const StarIcon = <Icon name="star" className="size-4" />

const meta: Meta<typeof Badge> = {
	title: 'Foundations/Badge',
	component: Badge,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Pill informativo / status (label-sm 11px, semibold). Tons: `mint` (Ativo) · `neutral` (Em breve) · `coral` (Bloqueado / Erro) · `secondary` (Destaque) · `saffron` (Em aprovação). Shapes: `square` (rounded-sm) · `pill` (rounded-full).',
			},
		},
	},
	tags: ['autodocs'],
	args: {
		label: 'Ativo',
	},
}

export default meta
type Story = StoryObj<typeof Badge>

export const Mint: Story = {
	args: { tone: 'mint', label: 'Ativo' },
}

export const Neutral: Story = {
	args: { tone: 'neutral', label: 'Em breve' },
}

export const Coral: Story = {
	args: { tone: 'coral', label: 'Bloqueado' },
}

export const Secondary: Story = {
	args: { tone: 'secondary', label: 'Destaque' },
}

export const Saffron: Story = {
	args: { tone: 'saffron', label: 'Em aprovação' },
}

export const Pill: Story = {
	args: { tone: 'mint', shape: 'pill', label: 'Ativo' },
}

export const WithIcon: Story = {
	args: { tone: 'mint', label: 'Favorito', icon: StarIcon },
}
