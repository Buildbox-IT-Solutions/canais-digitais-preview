import type { Meta, StoryObj } from '@storybook/react-vite'
import { WidgetEmAlta } from './index'

const meta: Meta<typeof WidgetEmAlta> = {
	title: 'Widgets/WidgetEmAlta',
	component: WidgetEmAlta,
	tags: ['autodocs'],
	parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof WidgetEmAlta>

export const Default: Story = {
	args: {
		items: [
			{ title: 'Robótica no food service cresce 40% em 2026', href: '#' },
			{ title: 'Novas regras de rotulagem entram em vigor', href: '#' },
			{ title: 'Sustentabilidade na cadeia de proteína animal', href: '#' },
			{ title: 'Tendências de embalagens inteligentes', href: '#' },
			{ title: 'IA generativa na pesquisa de ingredientes', href: '#' },
		],
	},
}
