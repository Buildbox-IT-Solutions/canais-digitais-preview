import type { Meta, StoryObj } from '@storybook/react-vite'
import { Categoria } from '.'

const meta: Meta<typeof Categoria> = {
	title: 'Chips/Categoria',
	component: Categoria,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	args: { label: 'Inovação', color: 'mint' },
}

export default meta
type Story = StoryObj<typeof Categoria>

export const Mint: Story = { args: { color: 'mint', label: 'Vídeos' } }
export const Coral: Story = { args: { color: 'coral', label: 'Saúde' } }
export const Saffron: Story = { args: { color: 'saffron', label: 'Construção' } }
export const Lavander: Story = { args: { color: 'lavander', label: 'Lifestyle' } }
export const Ultramarine: Story = { args: { color: 'secondary-950', label: 'Tecnologia' } }
export const Sky: Story = { args: { color: 'secondary-500', label: 'Negócios' } }
export const Indigo: Story = { args: { color: 'primary-600', label: 'Política' } }
export const Chip: Story = { args: { color: 'mint', chip: true, label: 'Vídeos', href: '#' } }
