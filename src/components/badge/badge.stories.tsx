import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '.'

const StarIcon = (
	<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
		<path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
	</svg>
)

const meta: Meta<typeof Badge> = {
	title: 'Foundations/Badge',
	component: Badge,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Pill informativo / status (label-sm 11px, semibold). Tons: `mint` (Ativo) · `neutral` (Em breve) · `coral` (Bloqueado / Erro) · `secondary` (Destaque). Shapes: `square` (rounded-sm) · `pill` (rounded-full).',
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

export const Pill: Story = {
	args: { tone: 'mint', shape: 'pill', label: 'Ativo' },
}

export const WithIcon: Story = {
	args: { tone: 'mint', label: 'Favorito', icon: StarIcon },
}
