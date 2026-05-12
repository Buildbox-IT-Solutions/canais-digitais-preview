import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from '.'

const meta: Meta<typeof Tag> = {
	title: 'Foundations/Tag',
	component: Tag,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Chip clicável para keywords/temas. Padding 8×4, radius 4px, Open Sans SemiBold 14px. Default `bg-primary-100` / `text-primary-800`; hover `bg-neutral-50` / `text-secondary-950`.',
			},
		},
	},
	tags: ['autodocs'],
	args: {
		label: 'Sustentabilidade',
	},
}

export default meta
type Story = StoryObj<typeof Tag>

export const AsLink: Story = {
	args: { href: '#' },
}

export const AsSpan: Story = {
	args: { href: undefined },
}
